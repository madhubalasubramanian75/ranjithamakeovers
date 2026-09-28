import re
from PIL import Image
import numpy as np

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
unique_imgs = list(dict.fromkeys(imgs))

print(f"Checking {len(unique_imgs)} unique images...")
for src in unique_imgs:
    try:
        im = Image.open(src).convert('HSV')
        arr = np.array(im)
        # Check percentage of lime/green pixels (hue 35 to 95, sat > 50, val > 50)
        hues = arr[:,:,0]
        sat = arr[:,:,1]
        val = arr[:,:,2]
        green_mask = (hues >= 35) & (hues <= 95) & (sat > 50) & (val > 50)
        pct = np.mean(green_mask) * 100
        if pct > 1.0:
            print(f"GREEN DETECTED ({pct:.2f}%): {src}")
    except Exception as e:
        print(f"Error {src}: {e}")
