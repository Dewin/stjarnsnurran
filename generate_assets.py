# Script to generate icons and verify graphics
import math
from PIL import Image, ImageDraw, ImageFont

def create_star_points(cx, cy, r_outer, r_inner, num_points=5, rotation=-math.pi/2):
    points = []
    angle_step = math.pi / num_points
    for i in range(num_points * 2):
        r = r_outer if i % 2 == 0 else r_inner
        angle = rotation + i * angle_step
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        points.append((x, y))
    return points

def generate_app_icon(size=512):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Red background circle / rounded rect
    draw.rounded_rectangle([16, 16, size-16, size-16], radius=size//4, fill='#C62828', outline='#8E0000', width=8)

    # Yellow inner contour
    draw.rounded_rectangle([36, 36, size-36, size-36], radius=size//4 - 10, outline='#FBC02D', width=6)

    # Center white star
    cx, cy = size // 2, size // 2
    star_pts = create_star_points(cx, cy, size * 0.32, size * 0.16)
    draw.polygon(star_pts, fill='#FFFDF0', outline='#E0E0E0', width=4)

    # Draw two curved arrows in center
    arrow_color = '#B71C1C'
    draw.arc([cx - size*0.14, cy - size*0.14, cx + size*0.14, cy + size*0.14], start=30, end=150, fill=arrow_color, width=12)
    draw.arc([cx - size*0.14, cy - size*0.14, cx + size*0.14, cy + size*0.14], start=210, end=330, fill=arrow_color, width=12)

    # Draw small colored stars around
    colors = ['#FACC15', '#0284C7', '#F97316', '#22C55E', '#A855F7']
    for idx, col in enumerate(colors):
        ang = -math.pi/2 + (idx + 1) * (2 * math.pi / 6)
        sx = cx + size * 0.38 * math.cos(ang)
        sy = cy + size * 0.38 * math.sin(ang)
        s_pts = create_star_points(sx, sy, size*0.07, size*0.035, rotation=ang)
        draw.polygon(s_pts, fill=col, outline='#FFFFFF', width=2)
        # red LED dot
        draw.ellipse([sx-size*0.02, sy-size*0.02, sx+size*0.02, sy+size*0.02], fill='#FF3D00')

    img.save(f'c:/Users/simon/Winvoice/star-spinner-app/icon-{size}.png')
    print(f'Saved icon-{size}.png')

if __name__ == '__main__':
    generate_app_icon(512)
    generate_app_icon(192)
