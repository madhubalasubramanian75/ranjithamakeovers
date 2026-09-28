import re
import os
from PIL import Image

html_path = "index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Fix autocomplete on form inputs
# name input
html = re.sub(
    r'(<input[^>]*name=["\']name["\'][^>]*)>',
    lambda m: m.group(1) + ' autocomplete="name">' if 'autocomplete' not in m.group(1) else m.group(0),
    html,
    flags=re.IGNORECASE
)

# phone input
html = re.sub(
    r'(<input[^>]*name=["\']phone["\'][^>]*)>',
    lambda m: m.group(1) + ' autocomplete="tel">' if 'autocomplete' not in m.group(1) else m.group(0),
    html,
    flags=re.IGNORECASE
)

# date input
html = re.sub(
    r'(<input[^>]*name=["\']date["\'][^>]*)>',
    lambda m: m.group(1) + ' autocomplete="off">' if 'autocomplete' not in m.group(1) else m.group(0),
    html,
    flags=re.IGNORECASE
)

# 2. Add explicit width and height to all img tags
def replace_img(match):
    tag = match.group(0)
    
    # If already has width and height, leave as is
    if 'width=' in tag and 'height=' in tag:
        return tag
        
    src_match = re.search(r'src=["\']([^"\']+)["\']', tag)
    if not src_match:
        # e.g. lightbox placeholder
        return tag.replace('>', ' width="800" height="800">', 1)
        
    src = src_match.group(1).lstrip('/')
    
    # Check if file exists
    if os.path.exists(src):
        try:
            with Image.open(src) as im:
                w, h = im.size
                return tag.replace('>', f' width="{w}" height="{h}">', 1)
        except Exception as e:
            print(f"Error reading {src}: {e}")
            return tag.replace('>', ' width="800" height="800">', 1)
    else:
        print(f"Image not found on disk: {src}")
        return tag.replace('>', ' width="800" height="800">', 1)

# Perform replacement on <img ...>
new_html = re.sub(r'<img\b[^>]*>', replace_img, html, flags=re.IGNORECASE)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(new_html)

print("index.html updated successfully with autocomplete and explicit image dimensions!")
