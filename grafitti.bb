Global gfxX=400, gfxY=400
Global charMax=256
Global gMax=0
Global grid=16
Global gridX#, gridY#
Global gridXMin, gridXMax, gridYMin, gridYMax
Global fuzz#=8.0
Global font, fontBig
Global grMax=10
Global dLine=False	;check if the char on the screen is fattened

Dim bb%(gfxX, gfxY)
Dim grNum(charMax-1)
Dim gr#(charMax-1, grMax-1, grid-1, grid-1)

Graphics gfxX, gfxY+64, 32

init()
menu()

Function init()
	font = LoadFont("Arial", 14)
	fontBig = LoadFont("Courier New", 255)
	SetFont font
	For c=0 To charMax-1
		grNum(c)=0
	Next
	loadGrid()
End Function

Function menu()
	Cls: message "", 0, True
	Repeat
		message "Number of characters trained (including multi-trains): "+trainedCharNum(), 1, False, 255, 255, 255
		message "<1> = train  |  <2> = test  |  <3> = erase chars  |  <ESC> = quit."
		FlushKeys(): c=WaitKey()
		message "", 0, True
		Select c
			Case 49: trainChar()
			Case 50: testChars(): message "", 0, True
			Case 51: eraseChars()
			Case 27: message "", 0, True: saveGrid(): End
		End Select
	Forever
End Function

Function trainedCharNum()
	rn=0
	For g=1 To charMax-1
		rn=rn+grNum(g)
	Next
	Return rn
End Function

Function trainChar()
	dLine=False
	Repeat
		Cls
		message "Number of characters trained (including multi-trains): "+trainedCharNum(), 1, True, 255, 255, 255
		message "Press the key that you wish to train  |  <ESC> = back."
		FlushKeys(): c=WaitKey()
		If c=27 Then message "", 0, True: Return
		If grNum(c)>=grMax message "You cannot train the same character more than "+grMax+" times.", 2, True, 255, 0, 0: Return
		Cls: message "", 0, True
		Repeat
			a=paintLines(c)
		Until a<>0
		If a<>2
			calculateGrid()
			drawLines()
			storeBB()
			storeGrid(c)
			drawGrid()
			message "Is this ok?", 1, True, 255, 255, 255
			message "<ENTER> = yes  |  <ESC> = no."
			FlushKeys(): q=WaitKey()
			If q=13 grNum(c)=grNum(c)+1: saveGrid()
		EndIf
	Forever
End Function

Function paintLines(c=0)
	viewTop()
	FlushMouse: FlushKeys
	Repeat
		mh=False
		If (Not MouseDown(1))
			If c=0 ;test
				message "Test. Draw a character on the screen with your mouse.", 2, False, 255, 255, 255
				If (Not dLine) m2$="  |  <ENTER> = done"
				message "<Left Butn> = draw  |  <Right Btn> = clear"+m2$, 1, False
				If dLine Then m1$="<1> = Train char  |  " Else m1$=""
				message m1$+"<ESC> = back", 0, False
			Else ;train
				message "Train. Draw the character '"+Chr$(c)+"' on the screen with your mouse.", 2, False, 255, 255, 255
				message "<Left Butn> = draw  |  <Right Btn> = clear  |  <ENTER> = done", 1, False
				message "<1> = Print char  |  <ESC> = back", 0, False
			EndIf
			Repeat
				mh=MouseHit(1)
				If MouseHit(2) dLine=False: Cls
				If KeyHit(28) Or KeyHit(156) Then If (Not dLine) Return storeBB()
				If KeyHit(1) Return 2
				If KeyHit(2)
					If c=0 And dLine
						If storeBB()=0 Return
						message "Press the key that you wish to train this drawing on  |  <ESC> = back.", 0, True
						FlushKeys(): c1=WaitKey()
						If c1=27 Then message "", 0, True: Return
						If grNum(c1)>=grMax message "You cannot train the same character more than "+grMax+" times.", 3, True, 255, 0, 0: Return
						storeGrid(c1)
						message "You want to train this drawing on the '"+Chr$(c1)+"' key. Is this ok?", 1, True, 255, 255, 255
						message "<ENTER> = yes  |  <ESC> = no."
						FlushKeys(): q=WaitKey()
						If q=13 grNum(c1)=grNum(c1)+1: saveGrid(): Cls
						message "", 0, True: Return
					ElseIf c<>0
						SetFont fontBig
						Color 255, 255, 255: Text gfxX/2, gfxY/2, Chr$(c), True, True
						SetFont font
					EndIf
				EndIf
			Until mh
		EndIf
		mxl=mx: myl=my
		mx=MouseX(): my=MouseY()
		n=True
		Color 255, 255, 255
		If n
			If Not(mh)
				Line mxl, myl, mx, my
			Else
				If dLine Then Cls
				Plot mx, my
				message "", 0, True
			EndIf
			dLine=False
		EndIf
	Forever
End Function

Function drawLines()
	Cls
	For c#=0.0 To 1.0 Step 0.1
		For y=0 To gfxY-1: For x=0 To gfxX-1
			If bb(x, y)>0
				Color c*256.0, c*256.0, c*256.0
				sx=getMax(1, fuzz*gridX*(1.0-c)): sy=getMax(1, fuzz*gridY*(1.0-c))
				Oval x-sx/2, y-sy/2, sx, sy
			EndIf
		Next: Next
	Next
	dLine=True
End Function

Function storeBB()
	cd=0
	For y=0 To gfxY-1: For x=0 To gfxX-1
		GetColor x, y
		bb(x, y)=ColorRed()
		If bb(x, y)>0 Then cd=cd+1
	Next: Next
	If cd<grid*4 Then message "Character is too small.", 3, True, 255, 0, 0: Return 0
	Return 1
End Function

Function calculateGrid()
	gridXMin=gfxX-1: gridXMax=0
	gridYMin=gfxY-1: gridYMax=0
	For y=0 To gfxY-1: For x=0 To gfxX-1
		If gridXMin>x And bb(x, y)>0 gridXMin=x
		If gridYMin>y And bb(x, y)>0 gridYMin=y
		If gridXMax<x And bb(x, y)>0 gridXMax=x
		If gridYMax<y And bb(x, y)>0 gridYMax=y
	Next: Next
	gridX=Float(gridXMax-gridXMin)/grid
	gridY=Float(gridYMax-gridYMin)/grid
	gridXMin=gridXMin-(fuzz*gridX)/2
	gridYMin=gridYMin-(fuzz*gridY)/2
	gridXMax=gridXMax+(fuzz*gridX)/2
	gridYMax=gridYMax+(fuzz*gridY)/2
	ax=(gridXMax+gridXMin)/2: ay=(gridYMax+gridYMin)/2
	If (gridXMax-gridXMin)*4<gridYMax-gridYMin gridXMin=ax-(gridYMax-gridYMin)*0.125: gridXMax=ax+(gridYMax-gridYMin)*0.125
	If (gridYMax-gridYMin)*4<gridXMax-gridXMin gridYMin=ay-(gridXMax-gridXMin)*0.125: gridYMax=ay+(gridXMax-gridXMin)*0.125
	gridXMin=getMax(0, gridXMin)
	gridYMin=getMax(0, gridYMin)
	gridXMax=getMin(gridXMax, gfxX-1)
	gridYMax=getMin(gridYMax, gfxY-1)
End Function

Function drawGrid()
	Color 0, 64, 255
	For y=0 To grid-1: For x=0 To grid-1
		sx1#=gridXMin+(gridXMax-gridXMin)*x/grid
		sy1#=gridYMin+(gridYMax-gridYMin)*y/grid
		sx2#=gridXMin+(gridXMax-gridXMin)*(x+1)/grid
		sy2#=gridYMin+(gridYMax-gridYMin)*(y+1)/grid
		Rect sx1, sy1, sx2-sx1+1, sy2-sy1+1, False
	Next: Next
End Function

Function storeGrid(c)
	gridX=Float(gridXMax-gridXMin)/grid
	gridY=Float(gridYMax-gridYMin)/grid
	o#=gridX*gridY
	For y=gridYMin To gridYMax: For x=gridXMin To gridXMax
		x1#=Float(x-gridXMin)/Float(gridXMax-gridXMin)*(grid-1)
		y1#=Float(y-gridYMin)/Float(gridYMax-gridYMin)*(grid-1)
		x1=getMax(0.0, getMin(x1, grid-1))
		y1=getMax(0.0, getMin(y1, grid-1))
		gr(c, grNum(c), x1, y1)=gr(c, grNum(c), x1, y1)+bb(x, y)/255.0
	Next: Next
	viewAll()
	For y=0 To grid-1: For x=0 To grid-1
		gr(c, grNum(c), x, y)=getMax(0.0, getMin(gr(c, grNum(c), x, y)/o, 1.0))
		cl=getMax(0, getMin(gr(c, grNum(c), x, y)*255, 255))
		Color cl, cl, cl
		Rect 60.0*x/grid+gfxX-63, 60.0*y/grid+gfxY+2, 60.0/grid+1, 60.0/grid+1
	Next: Next
	viewTop()
End Function

Function saveGrid()
	f=WriteFile("grafitti.trn")
	If f<>0
		For c=1 To charMax-1
			WriteByte(f, grNum(c))
			For gm=0 To grNum(c)-1
				For y=0 To grid-1: For x=0 To grid-1
					WriteFloat(f, gr(c, gm, x, y))
				Next: Next
			Next
		Next
		CloseFile(f)
	Else
		RuntimeError "Could not save file."
	EndIf
End Function

Function loadGrid()
	f=ReadFile("grafitti.trn")
	If f<>0
		For c=1 To charMax-1
			grNum(c)=ReadByte(f)
			For gm=0 To grNum(c)-1
				For y=0 To grid-1: For x=0 To grid-1
					gr(c, gm, x, y)=ReadFloat(f)
				Next: Next
			Next
		Next
		CloseFile(f)
	EndIf
End Function

Function testChars()
	dLine=False
	Repeat
		Repeat
			FlushKeys(): FlushMouse()
			a=paintLines(0)
		Until a<>0
		If a=2 Then Return
		calculateGrid()
		drawLines()
		storeBB()
		storeGrid(0)
		doTest()
	Forever
End Function

Function doTest()
	max#=0: maxNum=0
	For c=1 To charMax-1: For cn=0 To grNum(c)-1
		cd#=0.0
		For y=0 To grid-1: For x=0 To grid-1
			cd=cd+1.0-Abs(gr(0, 0, x, y)-gr(c, cn, x, y))
		Next: Next
		If max<cd Then max=cd: maxNum=c
	Next: Next
	message Chr$(maxNum), 3, True, 0, 255, 0
End Function

Function eraseChars()
	Repeat
		If trainedCharNum()=0 message "There are no characters to erase.", 2, True, 255, 0, 0: Return
		Cls
		message "Number of characters trained (including multi-trains): "+trainedCharNum(), 2, True, 255, 255, 255
		message "Erase characters. What characters do you want to erase from the training pool?", 1, False, 255, 255, 255
		message "<1> = one character  |  <2> = all characters  |  <ESC> = back"
		FlushKeys(): c=WaitKey()
		Select c
			Case 49: message "Press the key that you wish to erase  |  <ESC> = cancel.", 0, True
			FlushKeys(): c1=WaitKey()
			If c1<>27 Then grNum(c1)=0
			Case 50: message "Are you sure to erase all character from the trainingpool?", 1, True, 255, 255, 255
			message "<ENTER> = yes  |  <ESC> = no."
			FlushKeys(): q=WaitKey()
			If q=13 Then For c=0 To charMax-1: grNum(c)=0: Next: message "", 0, True: Return
			Case 27: message "", 0, True: Return
		End Select
	Forever
End Function

Function message(m$="", rw=0, cl=False, r=255, g=255, b=0)
	viewAll()
	Color 128, 128, 128
	Line 0, gfxY+1, gfxX, gfxY+1
	viewBottom()
	If cl Color 0, 0, 0: Rect 0, gfxY+2, gfxX-64, 62
	Locate 4, gfxY+48-rw*12: Color r, g, b
	Print m$
	viewTop()
End Function

Function getMin#(a#, b#)
	If a<=b Return a Else Return b
End Function
Function getMax#(a#, b#)
	If a>=b Return a Else Return b
End Function

Function viewAll()
	Viewport 0, 0, gfxX, gfxY+64
End Function
Function viewTop()
	Viewport 0, 0, gfxX, gfxY
End Function
Function viewBottom()
	Viewport 0, gfxY, gfxX-64, 63
End Function