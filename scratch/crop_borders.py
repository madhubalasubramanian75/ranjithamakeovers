import os
from PIL import Image
import numpy as np

def crop_white_borders(filepath):
    im = Image.open(filepath)
    im_rgb = im.convert('RGB')
    arr = np.array(im_rgb)
    
    # Mask of non-white pixels (where any channel is <= 245)
    non_white = np.any(arr < 240, axis=2)
    
    # Find bounding box
    rows = np.any(non_white, axis=1)
    cols = np.any(non_white, axis=0)
    
    if not np.any(rows) or not np.any(cols):
        print(f"Skipping {filepath}, completely white!")
        return
    
    ymin, ymax = np.where(rows)[0][[0, -1]]
    xmin, xmax = np.where(cols)[0][[0, -1]]
    
    orig_w, orig_h = im.size
    crop_w = xmax - xmin + 1
    crop_h = ymax - ymin + 1
    
    print(f"File: {os.path.basename(filepath)}")
    print(f"Original size: {orig_w}x{orig_h}")
    print(f"Crop box: left={xmin}, top={ymin}, right={xmax+1}, bottom={ymax+1}")
    print(f"New size: {crop_w}x{crop_h}")
    
    cropped = im.crop((xmin, ymin, xmax + 1, ymax + 1))
    cropped.save(filepath, quality=95)
    print(f"Saved cropped image to {filepath}\n")

# Process the affected files
files_to_crop = [
    "assets/images/shop_swaas_12eb7750005c4824a0659930ab6efdd8.jpg",
    "assets/images/shop_swaas_6b0b0d58cf1e4e30a5381f87b1ac2816.jpg",
    "assets/images/bridal-wine.jpeg",
    "assets/drive_images/shop_swaas_12eb7750005c4824a0659930ab6efdd8.jpg",
    "assets/drive_images/shop_swaas_6b0b0d58cf1e4e30a5381f87b1ac2816.jpg"
]

for f in files_to_crop:
    if os.path.exists(f):
        crop_white_borders(f)
