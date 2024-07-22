from PIL import Image

img = Image.open("autism.png")
img.convert("RGBA")

with open("autism.sni", "wb") as f:
  data = b"SNI!"
  data += img.width.to_bytes(4, "little")
  data += img.tobytes()
  f.write(data)