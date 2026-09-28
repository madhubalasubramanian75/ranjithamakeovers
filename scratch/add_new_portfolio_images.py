with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_cards = [
    {
        "file": "assets/images/portfolio/portfolio-15.jpg",
        "title": "Festive Sangeet Glow & Artistry",
        "alt": "Festive Sangeet Glow & Artistry by Makeovers by Ranjitha",
        "tall": True,
        "width": 1440,
        "height": 1920
    },
    {
        "file": "assets/images/portfolio/portfolio-16.jpg",
        "title": "Ayyapakkam Bridal Studio Portrait",
        "alt": "Ayyapakkam Bridal Studio Portrait by Makeovers by Ranjitha",
        "tall": False,
        "width": 688,
        "height": 860
    },
    {
        "file": "assets/images/portfolio/portfolio-17.jpg",
        "title": "Outdoor Daylight Bridal Radiance",
        "alt": "Outdoor Daylight Bridal Radiance by Makeovers by Ranjitha",
        "tall": True,
        "width": 1440,
        "height": 1919
    },
    {
        "file": "assets/images/portfolio/portfolio-18.jpg",
        "title": "Sweat-Proof HD Base Detailing",
        "alt": "Sweat-Proof HD Base Detailing by Makeovers by Ranjitha",
        "tall": False,
        "width": 1440,
        "height": 1800
    },
    {
        "file": "assets/images/portfolio/portfolio-19.jpg",
        "title": "Intricate Bridal Floral Bun Adornment",
        "alt": "Intricate Bridal Floral Bun Adornment by Makeovers by Ranjitha",
        "tall": False,
        "width": 1029,
        "height": 706
    },
    {
        "file": "assets/images/portfolio/portfolio-20.jpg",
        "title": "Classic Ivory & Gold Silk Draping",
        "alt": "Classic Ivory & Gold Silk Draping by Makeovers by Ranjitha",
        "tall": True,
        "width": 1440,
        "height": 1800
    },
    {
        "file": "assets/images/portfolio/portfolio-21.jpg",
        "title": "Hands-on Technique Demonstration",
        "alt": "Hands-on Technique Demonstration by Makeovers by Ranjitha",
        "tall": False,
        "width": 1440,
        "height": 1920
    },
    {
        "file": "assets/images/portfolio/portfolio-22.jpg",
        "title": "Banarasi Silk Pre-Pleating Drape",
        "alt": "Banarasi Silk Pre-Pleating Drape by Makeovers by Ranjitha",
        "tall": False,
        "width": 1440,
        "height": 1918
    },
    {
        "file": "assets/images/portfolio/portfolio-23.jpg",
        "title": "Reception Crimson Glamour Makeover",
        "alt": "Reception Crimson Glamour Makeover by Makeovers by Ranjitha",
        "tall": True,
        "width": 1440,
        "height": 1800
    },
    {
        "file": "assets/images/portfolio/portfolio-24.jpg",
        "title": "High-Definition Evening Makeover Artistry",
        "alt": "High-Definition Evening Makeover Artistry by Makeovers by Ranjitha",
        "tall": False,
        "width": 1440,
        "height": 1800
    }
]

new_cards_html = ""
for item in new_cards:
    span = "md:row-span-2" if item["tall"] else ""
    new_cards_html += f'<button class="group relative overflow-hidden rounded-md text-left {span}" aria-label="View {item["title"]}"><img src="{item["file"]}" alt="{item["alt"]}" class="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" width="{item["width"]}" height="{item["height"]}"/><span class="absolute inset-x-0 bottom-0 bg-wine/85 p-4 text-xs tracking-wider opacity-0 transition group-hover:opacity-100 flex flex-col justify-end"><span class="font-display text-sm text-wine-foreground mt-0.5">{item["title"]}</span></span></button>\n'

# Find the end of portfolioGrid: right before </div>\n\t\t\t</div>\n\t\t</section>
grid_end_marker = "</div>\n\t\t\t</div>\n\t\t</section>"
pos = html.find(grid_end_marker)
if pos != -1:
    updated_html = html[:pos] + new_cards_html + html[pos:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(updated_html)
    print("SUCCESS: 10 new Drive images added to portfolioGrid in index.html!")
else:
    print("ERROR: grid_end_marker not found!")
