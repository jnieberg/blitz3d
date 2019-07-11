SetFont f3
FlushKeys
tm = MilliSecs()
While (Not KeyHit(28))
	Cls: DrawBlock back, 0, 0
	Color 255, 255, 128
	printBlock(400, 380, Upper$(d1$), 400, 8, 0, 40)
	Color 255, 255, 255
	printBlock(400, 550, Upper$(a1$), 400, 8, 0, 40)
	If KeyHit(1) Then End
	If KeyHit(57)
		tp = MilliSecs()
		FlushKeys()
		While Not(KeyHit(57))
			If ex Or KeyHit(28) Then ex = True: Exit
		Wend
		FlushKeys()
		tm = tm + (MilliSecs()-tp)
		t2 = t2 + (MilliSecs()-tp)
	EndIf
	t = (MilliSecs() - tm) / 42
	Color 255, 255, 128
	Rect 100, 350, 600-t, 8
	If t < 600
		Color 0, 128, 255
		Rect 700-t, 350, t, 8
	EndIf
	Flip
Wend

Cls: DrawBlock back, 0, 0
SetFont f3
Color 255, 255, 128
printBlock(400, 380, Upper$(d1$), 400, 8, 0, 40)
Color 255, 255, 255
printBlock(400, 550, Upper$(b1$), 400, 8, 0, 40)
Flip
While (Not KeyHit(28)): Wend