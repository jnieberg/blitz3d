Cls
Graphics 800,600,16,1
Print "Welke kleur is het lichtst?"
SeedRnd MilliSecs()
Global r1, r2, r3

WaitKey()
vierkantjes()

w=WaitKey()
w2=Int(Chr$(w))
vierkantjes()
res = getMax(r1,getMax(r2,r3))
Select w2
	Case 1: If res = r1 Then juich()
	Case 2: If res = r2 Then juich()
	Case 3: If res = r3 Then juich()
End Select

Function getMax(a,b)
	If a>=b Then Return a Else Return b
End Function

Function juich()
	Color 255,255,255
	Text 400,500,"Nou nou, goed hoor! yippie yee.",True
	WaitKey()
End Function

Function vierkantjes()

	r1=Rand(0,255)
	r2=Rand(0,255)
	r3=Rand(0,255)

	Color 0,r1,234
	Rect 100,100,150,150,False
	Locate 171,265:Print 1

	Color 0,r2,234
	Rect 300,100,150,150,False
	Locate 371,265:Print 2

	Color 0,r3,234
	Rect 500,100,150,150,False
	Locate 571,265:Print 3


End Function