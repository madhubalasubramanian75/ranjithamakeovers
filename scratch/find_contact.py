with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines, 1):
    if 'id="contact"' in line or 'ayyapakkam' in line.lower() or 'map' in line.lower():
        print(f"{i}: {line.strip()[:110]}")
