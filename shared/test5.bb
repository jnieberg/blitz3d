Graphics 640, 480, 32,2

WritePixel 10, 10, $ff0000
WritePixel 20, 10, $00ff00
WritePixel 30, 10, $0000ff

LockBuffer FrontBuffer()

pix1 = ReadPixelFast(10, 10, FrontBuffer())
pix2 = ReadPixelFast(20, 10, FrontBuffer())
pix3 = ReadPixelFast(30, 10, FrontBuffer())

WritePixelFast 10, 20, pix1
WritePixel 20, 20, pix2
WritePixel 30, 20, pix3

UnlockBuffer FrontBuffer()

Color 255,255,255
locate 100,100
Print pix1
Print pix2
Print pix3

Print 256 And 256