import re
from PIL import Image
import numpy as np

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
print(f"Total img tags: {len(imgs)}")
for i, src in enumerate(imgs):
    try:
        im = Image.open(src)
        print(f"{i+1:02d}: {src} - {im.size} - {im.format}")
    except Exception as e:
        print(f"{i+1:02d}: {src} - ERROR: {e}")
