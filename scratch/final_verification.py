import urllib.request
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("--- VERIFICATION CHECKS ---")
print("1. 'High-Definition Evening Makeover Artistry' in HTML:", "High-Definition Evening Makeover Artistry" in html)
print("2. 'portfolio-24' in HTML:", "portfolio-24" in html)

# Check portfolio buttons
grid_match = re.search(r'<div[^>]*id="portfolioGrid"[^>]*>(.*?)</div>\s*</div>\s*</section>', html, re.DOTALL)
if grid_match:
    btns = re.findall(r'<button\s+class="([^"]*)"[^>]*aria-label="([^"]*)"', grid_match.group(1))
    print(f"3. Total portfolio items: {len(btns)}")
    print("4. Last 4 items:")
    for b in btns[-4:]:
        print("   -", b[1], "->", "TALL" if "row-span-2" in b[0] else "STANDARD")

print("5. Floating Instagram button in HTML:", "id=\"floating-instagram-btn\"" in html)
print("6. Google Maps iframe in HTML:", "title=\"Makeovers by Ranjitha Studio Location Map\"" in html)

# Verify localhost:3000 server response
try:
    resp = urllib.request.urlopen("http://localhost:3000/")
    print(f"7. Localhost:3000 status: {resp.status}")
except Exception as e:
    print(f"7. Localhost:3000 error: {e}")
