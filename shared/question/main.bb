c$ = scramble$(a$, b$)
a$=Upper$(a$)
b$=Upper$(b$)
b1$=Upper$(b1$)
d1$=Upper$(d1$)

For i=0 To 1
	For k = 1 To Len(d1$)
		If Mid$(d1$, k, 1) = b$
			If i = 0 Then c1$ = Left$(c1$, k-1) + "*" + Mid$(c1$, k+1) Else c1$ = Left$(c1$, k-1) + b$ + Mid$(c1$, k+1)
		EndIf
	Next
	FlushKeys
	tm = MilliSecs()
	While (Not KeyHit(28))
		If KeyHit(16) Then quest = 1 - quest
		Cls: DrawBlock back, 0, 0
		SetFont f2
		Color 255, 255, 128
		printBlock(400, 50, d$, 400, 8, 0, 40)
		Color 255, 255, 255
		SetFont f1
		If i=0
			printBlock(400, 250, Upper$(c$), 800, 2)
		Else
			printBlock(400, 250, Upper$(a$ + " (" + b$ + ")"), 800, 2)
		EndIf
		SetFont f3
		If Not quest
			Color 255, 255, 128
			printBlock(400, 380, Upper$(c1$), 400, 8, 0, 40)
			Color 255, 255, 255
			printBlock(400, 550, Upper$(a1$), 400, 8, 0, 40)
		Else
			Color 255, 255, 128
			printBlock(400, 380, Upper$(d1$), 400, 8, 0, 40)
			Color 255, 255, 255
			printBlock(400, 550, Upper$(b1$), 400, 8, 0, 40)
		EndIf
		If KeyHit(1) Then End
		ex = False
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
		If i = 0 Then t = (MilliSecs() - tm) / 42 Else t = 600
		Color 255, 255, 128
		Rect 100, 350, 600-t, 8
		If t < 600
			Color 0, 128, 255
			Rect 700-t, 350, t, 8
		EndIf
		Flip
	Wend
Next