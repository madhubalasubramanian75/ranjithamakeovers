from PIL import Image
import numpy as np

# Let's inspect what colors/clothing are in portfolio-15.jpg
img = Image.open('assets/images/portfolio/portfolio-15.jpg')
w, h = img.size
print(f"portfolio-15: {w}x{h}")

# Let's check the dominant colors in the body area (h/4 to 3*h/4, w/4 to 3*w/4)
body = img.crop((int(w*0.2), int(h*0.3), int(w*0.8), int(h*0.85)))
body_arr = np.array(body)

# Calculate average color
print("Mean RGB of body:", body_arr.mean(axis=(0,1)))

# Let's sample colors in body
# Find pixels where green is prominent
green_mask = (body_arr[:,:,1] > body_arr[:,:,0]) & (body_arr[:,:,1] > body_arr[:,:,2])
print("Percentage of pixels where Green is max channel in body:", np.mean(green_mask) * 100)

# Check hue histogram
hsv = body.convert('HSV')
hsv_arr = np.array(hsv)
# Hue 35 to 90 is yellow-green to green to cyan-green
hues = hsv_arr[:,:,0]
sat = hsv_arr[:,:,1]
val = hsv_arr[:,:,2]

green_dress_pixels = (hues >= 35) & (hues <= 95) & (sat > 50) & (val > 50)
print("Green/lime dress pixel % in body area:", np.mean(green_dress_pixels) * 100)
