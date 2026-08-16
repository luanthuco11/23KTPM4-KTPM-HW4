from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
DOCUMENTS = [
    (ROOT / "Main Report.md", ROOT / "Main Report.pdf"),
    (ROOT / "AI Audit Report.md", ROOT / "AI Audit Report.pdf"),
    (ROOT / "AI Critique.md", ROOT / "AI Critique.pdf"),
]


def register_fonts() -> None:
    regular = Path("C:/Windows/Fonts/arial.ttf")
    bold = Path("C:/Windows/Fonts/arialbd.ttf")
    if not regular.exists() or not bold.exists():
        raise FileNotFoundError("Arial fonts were not found in C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont("Arial", str(regular)))
    pdfmetrics.registerFont(TTFont("Arial-Bold", str(bold)))


def inline_markup(text: str) -> str:
    value = html.escape(text.strip())
    value = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"<u>\1</u> (\2)", value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"`([^`]+)`", r"<font name='Courier'>\1</font>", value)
    return value


def make_styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "TitleArial",
            parent=base["Title"],
            fontName="Arial-Bold",
            fontSize=20,
            leading=25,
            alignment=TA_CENTER,
            spaceAfter=14,
        ),
        "h2": ParagraphStyle(
            "H2Arial",
            parent=base["Heading2"],
            fontName="Arial-Bold",
            fontSize=14,
            leading=18,
            spaceBefore=10,
            spaceAfter=6,
        ),
        "h3": ParagraphStyle(
            "H3Arial",
            parent=base["Heading3"],
            fontName="Arial-Bold",
            fontSize=11,
            leading=15,
            spaceBefore=8,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "BodyArial",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=9.5,
            leading=14,
            spaceAfter=5,
        ),
        "bullet": ParagraphStyle(
            "BulletArial",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=9.5,
            leading=14,
            leftIndent=14,
            firstLineIndent=-8,
            spaceAfter=3,
        ),
        "code": ParagraphStyle(
            "CodeArial",
            parent=base["Code"],
            fontName="Courier",
            fontSize=8,
            leading=11,
            leftIndent=8,
            backColor=colors.HexColor("#F3F4F6"),
            borderPadding=5,
            spaceAfter=5,
        ),
        "table": ParagraphStyle(
            "TableArial",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=7.2,
            leading=9,
        ),
        "table_header": ParagraphStyle(
            "TableHeaderArial",
            parent=base["BodyText"],
            fontName="Arial-Bold",
            fontSize=7.2,
            leading=9,
            textColor=colors.white,
        ),
    }


def parse_table(lines: list[str], styles, available_width: float):
    rows = []
    for line in lines:
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if all(re.fullmatch(r":?-{3,}:?", cell.replace(" ", "")) for cell in cells):
            continue
        rows.append(cells)
    if not rows:
        return Spacer(1, 1)
    column_count = max(len(row) for row in rows)
    normalized = [row + [""] * (column_count - len(row)) for row in rows]
    data = []
    for row_index, row in enumerate(normalized):
        style = styles["table_header"] if row_index == 0 else styles["table"]
        data.append([Paragraph(inline_markup(cell), style) for cell in row])
    table = Table(data, colWidths=[available_width / column_count] * column_count, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#9CA3AF")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FAFC")]),
            ]
        )
    )
    return table


def markdown_story(markdown_text: str, styles, available_width: float):
    story = []
    lines = markdown_text.splitlines()
    index = 0
    in_code = False
    code_lines: list[str] = []

    while index < len(lines):
        line = lines[index]
        stripped = line.strip()

        if stripped.startswith("```"):
            if in_code:
                story.append(Paragraph("<br/>".join(html.escape(x) for x in code_lines), styles["code"]))
                code_lines = []
            in_code = not in_code
            index += 1
            continue
        if in_code:
            code_lines.append(line)
            index += 1
            continue
        if stripped.startswith("|"):
            table_lines = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                table_lines.append(lines[index])
                index += 1
            story.append(parse_table(table_lines, styles, available_width))
            story.append(Spacer(1, 7))
            continue
        if stripped.startswith("# "):
            story.append(Paragraph(inline_markup(stripped[2:]), styles["title"]))
        elif stripped.startswith("## "):
            story.append(Paragraph(inline_markup(stripped[3:]), styles["h2"]))
        elif stripped.startswith("### "):
            story.append(Paragraph(inline_markup(stripped[4:]), styles["h3"]))
        elif re.match(r"^[-*] ", stripped):
            story.append(Paragraph("• " + inline_markup(stripped[2:]), styles["bullet"]))
        elif re.match(r"^\d+\. ", stripped):
            story.append(Paragraph(inline_markup(stripped), styles["bullet"]))
        elif stripped == "---":
            story.append(Spacer(1, 8))
        elif stripped:
            story.append(Paragraph(inline_markup(stripped), styles["body"]))
        else:
            story.append(Spacer(1, 3))
        index += 1
    return story


def footer(canvas, document):
    canvas.saveState()
    canvas.setFont("Arial", 8)
    canvas.setFillColor(colors.HexColor("#4B5563"))
    canvas.drawString(18 * mm, 12 * mm, "HW04 – MSSV 23127414")
    canvas.drawRightString(A4[0] - 18 * mm, 12 * mm, f"Trang {document.page}")
    canvas.restoreState()


def export_document(source: Path, target: Path) -> None:
    styles = make_styles()
    document = SimpleDocTemplate(
        str(target),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=17 * mm,
        bottomMargin=19 * mm,
        title=source.stem,
        author="23127414",
    )
    story = markdown_story(source.read_text(encoding="utf-8"), styles, document.width)
    document.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f"Created {target.name}")


if __name__ == "__main__":
    register_fonts()
    for markdown_file, pdf_file in DOCUMENTS:
        export_document(markdown_file, pdf_file)
