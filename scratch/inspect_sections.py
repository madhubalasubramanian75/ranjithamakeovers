import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

sections = re.findall(r'<section[^>]*id=["\']([^"\']+)["\']', html)
print('Section IDs:', sections)

# Search for any address, location, phone, avadi
for kw in ['avadi', 'chennai', 'ayyapakkam', 'address', 'map', 'location', 'contact', 'instagram', 'phone', '9791659424']:
    matches = len(re.findall(kw, html, re.I))
    print(f"'{kw}': {matches} matches")
