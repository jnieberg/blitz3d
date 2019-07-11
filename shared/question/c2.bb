Include "head.bb"
Cls: DrawBlock back, 0, 0
Color 255, 255, 128
printBlock(400, 250, "De Cryptogrammen\\Ronde 2", 400, 9, 0, 40)
Flip
While (Not KeyHit(57)) And (Not KeyHit(28))
	If KeyHit(1) Then End
Wend
For j = 0 To 9
	Select j
		Case 0: a$ = "KLASGENOTEN": b$ = "K.........N": c$ = "Hadden samen met de gezusters van der Haar plezier op school"
		Case 1: a$ = "BLOOTSTAAN": b$ = "B........N": c$ = "Geen bescherming hebben als nudist"
		Case 2: a$ = "PERSONENLIFT": b$ = "P..........T": c$ = "Hiermee kwam Wim hogerop"
		Case 3: a$ = "LEIDERSTRUI": b$ = "L.........I": c$ = "Kledingstuk van een aanvoerder"
		Case 4: a$ = "HOOFDSCHOTEL": b$ = "H..........L": c$ = "Belangrijkste maaltijd voor kannibalen"
		Case 5: a$ = "SCHARRELKIP": b$ = "S.........P": c$ = "Vogel met wisselende kontakten"
		Case 6: a$ = "JAN VAN GENT": b$ = "J..........T": c$ = "Opvliegende Vlaming"
		Case 7: a$ = "STUITLIGGING": b$ = "S..........G": c$ = "Houding die niet goed bevalt"
		Case 8: a$ = "ADVOCATENTOGA": b$ = "A...........A": c$ = "Meesterlijke kleding"
		Case 9: a$ = "TRAININGSPAKKEN": b$ = "T..............N": c$ = "Wat maakte Pa/Opa als leerling kleermaker"
	End Select
	tt# = 40000.0/Len(b$)
	tm = MilliSecs()
	ex = False
	For i = 1 To Len(a$)-1
		If i > 1
			r = 1: While Mid$(b$, r, 1) <> ".": r = Rand(2, Len(a$)-1): Wend
			b$ = Left$(b$, r-1) + Mid$(a$, r, 1) + Mid$(b$, r+1)
		EndIf
		t2 = MilliSecs()
		While MilliSecs() - t2 < tt#
			Cls: DrawBlock back, 0, 0
			Color 255, 255, 128
			SetFont f2
			Color 255, 255, 128
			printBlock(400, 150, c$, 400, 8, 0, 40)
			Color 255, 255, 255
			SetFont f3
			printBlock(400, 380, b$, 400, 8, 0, 40)
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
			t = (MilliSecs() - tm) / ((Len(b$)-2) * (tt#/600.0))
			Color 255, 255, 128
			Rect 100, 350, 600-t, 8
			If t < 600
				Color 0, 128, 255
				Rect 700-t, 350, t, 8
			EndIf
			If ex Or KeyHit(28) Then ex = True: Exit
			Flip
		Wend
		If ex Or KeyHit(28) Then ex = True: Exit
	Next
	Cls: DrawBlock back, 0, 0
	Color 255, 255, 128
	SetFont f2
	Color 255, 255, 128
	printBlock(400, 150, c$, 400, 8, 0, 40)
	Color 255, 255, 255
	SetFont f3
	printBlock(400, 380, a$, 400, 8, 0, 40)
	Flip
	FlushKeys
	While (Not KeyHit(57)) And (Not KeyHit(28)): Wend: FlushKeys
Next