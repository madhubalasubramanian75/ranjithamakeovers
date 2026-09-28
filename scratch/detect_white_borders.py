import os
import glob
from PIL import Image, ImageChops

images_dir = "assets/images"
files = glob.glob(os.path.join(images_dir, "*.*"))

def analyze_borders(filepath):
    try:
        im = Image.open(filepath)
        im_rgb = im.convert('RGB')
        w, h = im_rgb.size
        
        # Check top row, bottom row, left col, right col
        # Sample pixels
        top_pixels = [im_rgb.getpixel((x, 0)) for x in range(0, w, max(1, w//20))]
        bottom_pixels = [im_rgb.getpixel((x, h-1)) for x in range(0, w, max(1, w//20))]
        left_pixels = [im_rgb.getpixel((0, y)) for y in range(0, h, max(1, h//20))]
        right_pixels = [im_rgb.getpixel((w-1, y)) for y in range(0, h, max(1, h//20))]
        
        is_white = lambda p: p[0] > 240 and p[1] > 240 and p[2] > 240
        
        top_white = sum(1 for p in top_pixels if is_white(p)) / len(top_pixels)
        bottom_white = sum(1 for p in bottom_pixels if is_white(p)) / len(bottom_pixels)
        left_white = sum(1 for p in left_pixels if is_white(p)) / len(left_pixels)
        right_white = sum(1 for p in right_pixels if is_white(p)) / len(right_pixels)
        
        if top_white > 0.8 or bottom_white > 0.8 or left_white > 0.8 or right_white > 0.8:
            print(f"WHITE BORDERS FOUND: {os.path.basename(filepath)} (top={top_white:.2f}, bottom={bottom_white:.2f}, left={left_white:.2f}, right={right_white:.2f}, size={w}x{h})")
            return True
        return False
    except Exception as e:
        print(f"Error {filepath}: {e}")
        return False

white_files = []
for f in files:
    if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        if analyze_borders(f):
            white_files.append(f)

print(f"\nTotal images with white borders: {len(white_files)}")
