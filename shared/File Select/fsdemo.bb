Graphics 800,600,32,1
SetBuffer BackBuffer()
Include "fileselect.bb"

For i=0 To 10
	Color Rand(0,255),Rand(0,255),Rand(0,255)
	Rect Rand(0,GraphicsWidth()),Rand(0,GraphicsHeight()),Rand(0,200),Rand(0,200)
Next
Flip
a$=fileSelector("a:\")
Color 255,255,255: Locate 0,0: Print a
b$=fileSelector("","*.*","PNG images","fsfileselect0.png","Select a PNG File...",0,3,2)
Color 255,255,255: Locate 0,16: Print b
WaitKey()
End