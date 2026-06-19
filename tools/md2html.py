import sys
import re
from pathlib import Path

def md_to_html(md_text):
    html_lines = []
    lines = md_text.splitlines()
    i = 0
    in_code = False
    code_block_lang = ''
    list_open = None
    while i < len(lines):
        line = lines[i]
        if line.startswith('```'):
            if not in_code:
                in_code = True
                code_block_lang = line[3:].strip()
                html_lines.append('<pre><code>')
            else:
                in_code = False
                html_lines.append('</code></pre>')
            i += 1
            continue
        if in_code:
            html_lines.append(escape_html(line))
            i += 1
            continue
        # Heading
        m = re.match(r'^(#{1,6})\s+(.*)', line)
        if m:
            level = len(m.group(1))
            html_lines.append(f'<h{level}>{inline_markup(m.group(2))}</h{level}>')
            i += 1
            continue
        # Horizontal rule
        if re.match(r'^-{3,}$', line):
            html_lines.append('<hr/>')
            i += 1
            continue
        # Unordered list
        m = re.match(r'^\s*[-\*+]\s+(.*)', line)
        if m:
            if list_open != 'ul':
                if list_open == 'ol':
                    html_lines.append('</ol>')
                html_lines.append('<ul>')
                list_open = 'ul'
            html_lines.append(f'<li>{inline_markup(m.group(1))}</li>')
            i += 1
            # continue consuming list
            while i < len(lines):
                lm = re.match(r'^\s*[-\*+]\s+(.*)', lines[i])
                if lm:
                    html_lines.append(f'<li>{inline_markup(lm.group(1))}</li>')
                    i += 1
                else:
                    break
            if list_open == 'ul':
                html_lines.append('</ul>')
                list_open = None
            continue
        # Ordered list
        m = re.match(r'^\s*\d+\.\s+(.*)', line)
        if m:
            if list_open != 'ol':
                if list_open == 'ul':
                    html_lines.append('</ul>')
                html_lines.append('<ol>')
                list_open = 'ol'
            html_lines.append(f'<li>{inline_markup(m.group(1))}</li>')
            i += 1
            while i < len(lines):
                lm = re.match(r'^\s*\d+\.\s+(.*)', lines[i])
                if lm:
                    html_lines.append(f'<li>{inline_markup(lm.group(1))}</li>')
                    i += 1
                else:
                    break
            if list_open == 'ol':
                html_lines.append('</ol>')
                list_open = None
            continue
        # Blank line
        if line.strip() == '':
            html_lines.append('')
            i += 1
            continue
        # Paragraph
        # Collect consecutive non-blank lines
        para_lines = [line]
        i += 1
        while i < len(lines) and lines[i].strip() != '':
            para_lines.append(lines[i])
            i += 1
        para = ' '.join(para_lines)
        html_lines.append(f'<p>{inline_markup(para)}</p>')
    return '\n'.join(html_lines)


def escape_html(text):
    return (text.replace('&', '&amp;')
                .replace('<', '&lt;')
                .replace('>', '&gt;'))


def inline_markup(text):
    # escape
    text = escape_html(text)
    # bold **text**
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    # italic *text*
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    # links [text](url)
    text = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2">\1</a>', text)
    # inline code `code`
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    return text


def make_html_page(body_html, title='Document'):
    return f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{escape_html(title)}</title>
<style>
body {{ font-family: Arial, Helvetica, sans-serif; max-width: 900px; margin: 40px auto; line-height:1.6; color:#111 }}
h1,h2,h3,h4 {{ color: #b30000 }}
pre {{ background:#f5f5f5; padding:10px; overflow:auto }}
code {{ background:#eee; padding:2px 4px }}
ul, ol {{ margin-left:1.2em }}
</style>
</head>
<body>
{body_html}
</body>
</html>'''


def main():
    if len(sys.argv) < 2:
        print('Usage: md2html.py input.md [output.html]')
        sys.exit(1)
    src = Path(sys.argv[1])
    if not src.exists():
        print('Source file not found:', src)
        sys.exit(2)
    dest = Path(sys.argv[2]) if len(sys.argv) >=3 else src.with_suffix('.html')
    md_text = src.read_text(encoding='utf-8')
    body = md_to_html(md_text)
    title = src.stem.replace('_', ' ').title()
    page = make_html_page(body, title=title)
    dest.write_text(page, encoding='utf-8')
    print('Wrote', dest)

if __name__ == '__main__':
    main()
