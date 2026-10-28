"""Make a 1600x900 portfolio thumbnail (webp).

Two ways:
  python3 thumb.py mockup <pc.png> <sp.png> <out.webp>   PC screen with a phone in front, on light grey
  python3 thumb.py fit <image> <out.webp> [top|center]  crop any image to 16:9 and resize
  python3 thumb.py full <image> <out.webp>              tall full-page screenshot, 1600px wide
"""
import sys
from PIL import Image, ImageDraw, ImageFilter

W, H = 1600, 900


def shadow(size, box, radius, blur=28, off=14, alpha=70):
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    x, y, w, h = box
    ImageDraw.Draw(layer).rounded_rectangle((x, y + off, x + w, y + h + off), radius, fill=(0, 0, 0, alpha))
    return layer.filter(ImageFilter.GaussianBlur(blur))


def mockup(pc_path, sp_path, out):
    bg = Image.new("RGBA", (W, H), "#e4e4e4")
    pc = Image.open(pc_path).convert("RGB").resize((1160, 653), Image.LANCZOS)
    px, py = 110, 124
    bg.alpha_composite(shadow((W, H), (px, py, pc.width, pc.height), 8))
    mask = Image.new("L", pc.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, pc.width, pc.height), 8, fill=255)
    bg.paste(pc, (px, py), mask)

    sp = Image.open(sp_path).convert("RGB")
    sh = 640
    sp = sp.resize((int(sp.width * sh / sp.height), sh), Image.LANCZOS)
    bz = 14
    phone = Image.new("RGBA", (sp.width + bz * 2, sp.height + bz * 2), (0, 0, 0, 0))
    ImageDraw.Draw(phone).rounded_rectangle((0, 0, phone.width - 1, phone.height - 1), 44, fill="#111")
    smask = Image.new("L", sp.size, 0)
    ImageDraw.Draw(smask).rounded_rectangle((0, 0, sp.width, sp.height), 32, fill=255)
    phone.paste(sp, (bz, bz), smask)
    mx, my = W - phone.width - 110, H - phone.height - 60
    bg.alpha_composite(shadow((W, H), (mx, my, phone.width, phone.height), 44, alpha=90))
    bg.alpha_composite(phone, (mx, my))
    bg.convert("RGB").save(out, "WEBP", quality=84)


def fit(path, out, anchor="top"):
    im = Image.open(path).convert("RGB")
    target = W / H
    if im.width / im.height > target:  # too wide: trim the sides
        nw = int(im.height * target)
        left = (im.width - nw) // 2
        im = im.crop((left, 0, left + nw, im.height))
    else:  # too tall: trim the bottom (top) or both ends (center)
        nh = int(im.width / target)
        top = 0 if anchor == "top" else (im.height - nh) // 2
        im = im.crop((0, top, im.width, top + nh))
    im.resize((W, H), Image.LANCZOS).save(out, "WEBP", quality=84)


def full(path, out):
    im = Image.open(path).convert("RGB")
    if im.width > W:
        im = im.resize((W, int(im.height * W / im.width)), Image.LANCZOS)
    im.save(out, "WEBP", quality=82)


if __name__ == "__main__":
    mode, *args = sys.argv[1:]
    {"mockup": mockup, "fit": fit, "full": full}[mode](*args)
    print("saved", args[-1] if mode != "fit" else args[1])
