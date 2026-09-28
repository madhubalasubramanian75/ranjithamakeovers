import os
import glob
from PIL import Image
import numpy as np

def inspect_all_borders():
    files = glob.glob("assets/images/*.*")
    for f in sorted(files):
        if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            continue
        im = Image.open(f).convert('RGB')
        arr = np.array(im)
        h, w, _ = arr.shape
        
        # Check mean brightness of top 5 rows, bottom 5 rows, left 5 cols, right 5 cols
        top_mean = np.mean(arr[:5, :, :])
        bottom_mean = np.mean(arr[-5:, :, :])
        left_mean = np.mean(arr[:, :5, :])
        right_mean = np.mean(arr[:, -5:, :])
        
        # Check if any border is near white (> 220)
        has_white = any(m > 220 for m in [top_mean, bottom_mean, left_mean, right_mean])
        if has_white:
            print(f"{os.path.basename(f)}: Top={top_mean:.1f}, Bottom={bottom_mean:.1f}, Left={left_mean:.1f}, Right={right_mean:.1f}")

inspect_all_borders()
