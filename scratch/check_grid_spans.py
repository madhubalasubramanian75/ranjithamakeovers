import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

grid_match = re.search(r'<div[^>]*id="portfolioGrid"[^>]*>(.*?)</div>\s*</div>\s*</section>', html, re.DOTALL)
if grid_match:
    content = grid_match.group(1)
    buttons = re.findall(r'<button\s+class="([^"]*)"[^>]*aria-label="([^"]*)"', content)
    for i, (cls, label) in enumerate(buttons):
        span = "TALL (row-span-2)" if "row-span-2" in cls else "standard (1-row)"
        print(f"{i+1:02d}: {label} -> {span}")
