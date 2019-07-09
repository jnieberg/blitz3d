Type players
	Field x#, y#
	Field dirNew, dir
	Field speed#, speedMax#
	Field tract#
	Field dead, deadNew
	Field colorR, colorG, colorB
	Field keyR, KeyD, keyL, keyU
	Field keyE
End Type

Global gfxX, gfxY
Global playerMax = 4
Global gridSize
Global gfxGrid

init()
gameLoop()

Function gameLoop()
	gameStart()
	While Not KeyDown(1)
		keyEvents()
		plyEvents()
		gfxEvents()
		Delay 3
	Wend
	End
End Function

Function keyEvents()
	For player.players = Each players
		If Not player\deadNew Then
			If KeyHit(player\keyR) And player\dir Mod 2 = 1 Then
				player\dirNew = 0
			ElseIf KeyHit(player\keyD) And player\dir Mod 2 = 0 Then
				player\dirNew = 1
			ElseIf KeyHit(player\keyL) And player\dir Mod 2 = 1 Then
				player\dirNew = 2
			ElseIf KeyHit(player\keyU) And player\dir Mod 2 = 0 Then
				player\dirNew = 3
			ElseIf KeyHit(player\keyE) Then
				player\speed = player\speedMax * 2.5
			EndIf
		EndIf
	Next
End Function

Function plyEvents()
	For player.players = Each players
		If Not player\deadNew Then
			If player\dirNew <> player\dir Then
				If Int(player\x) Mod gridSize = 0 And Int(player\y) Mod gridSize = 0 Then
					player\dir = player\dirNew
					player\speed = player\speed * player\tract
					Select player\dir
						Case 0: player\x = player\x+1
						Case 1: player\y = player\y+1
						Case 2: player\x = player\x-1
						Case 3: player\y = player\y-1
					End Select
				EndIf
			EndIf
			px# = player\x: py# = player\y
			Select player\dir
				Case 0: player\x = player\x+player\speed
				Case 1: player\y = player\y+player\speed
				Case 2: player\x = player\x-player\speed
				Case 3: player\y = player\y-player\speed
			End Select
			If player\speed < player\speedMax Then player\speed = player\speed+0.0005
			If player\speed > player\speedMax Then player\speed = player\speed-0.0003
			If Int(px) <> Int(player\x) Or Int(py) <> Int(player\y) Then
				GetColor Int(player\x), Int(player\y)
				For ply2.players = Each players
					If ColorRed() = ply2\colorR And ColorGreen() = ply2\colorG And ColorBlue() = ply2\colorB Then
						player\deadNew = 800
					EndIf
				Next
			EndIf
			If player\x < 0 Then player\x = gfxX - 1
			If player\x >= gfxX Then player\x = 0
			If player\y < 0 Then player\y = gfxY - 1
			If player\y >= gfxY Then player\y = 0
		ElseIf player\deadNew > 0 And player\dead = 0 Then
			player\deadNew = player\deadNew-1
			If player\deadNew = 0 Then player\dead = -1: End
		EndIf
	Next
End Function

Function gfxEvents()
	For player.players = Each players
		If Not player\deadNew Then
			Color player\ColorR, player\ColorG, player\ColorB
			Select player\dir
				Case 0, 2: Rect player\x, player\y-1, 1, 3
				Case 1, 3: Rect player\x-1, player\y, 3, 1
			End Select
		EndIf
	Next	
End Function

Function gameStart()
	Color 0, 0, 100
	i= 0: While i < gfxX
		Rect i-1, 0, 3, gfxY
		If i < gfxY Then Rect 0, i-1, gfxX, 3
		i = i+gridSize
	Wend
End Function

Function init()
	gameInit()
	plyInit()
End Function

Function plyInit()
	player.players = New players
	player\x = Int(gfxX/gridSize)*gridSize: player\y = Int(gfxY*0.333/gridSize)*gridSize
	player\dir = 2: player\dirNew = 2
	player\speed = 0.0: player\speedMax = 0.2
	player\tract = 0.3
	player\dead = 0: player\deadNew = 0
	player\colorR = 248: player\colorG = 0: player\colorB = 0
	player\keyR = 77: player\keyD = 76: player\keyL = 75: player\keyU = 72
	player\keyE = 80

	player.players = New players
	player\x = 0: player\y = Int(gfxY*0.333/gridSize)*gridSize
	player\dir = 0: player\dirNew = 0
	player\speed = 0.0: player\speedMax = 0.2
	player\tract = 0.3
	player\dead = 0: player\deadNew = 0
	player\colorR = 0: player\colorG = 248: player\colorB = 0
	player\keyR = 32: player\keyD = 31: player\keyL = 30: player\keyU = 17
	player\keyE = 45

	;player.players = New players
	;player\x = Int(gfxX/gridSize)*gridSize: player\y = Int(gfxY*0.667/gridSize)*gridSize
	;player\dir = 2: player\dirNew = 2
	;player\speed = 0.0: player\speedMax = 0.2
	;player\tract = 0.3
	;player\dead = 0: player\deadNew = 0
	;player\colorR = 248: player\colorG = 248: player\colorB = 0
	
	;player.players = New players
	;player\x = 0: player\y = Int(gfxY*0.667/gridSize)*gridSize
	;player\dir = 0: player\dirNew = 0
	;player\speed = 0.0: player\speedMax = 0.2
	;player\tract = 0.3
	;player\dead = 0: player\deadNew = 0
	;player\colorR = 248: player\colorG = 0: player\colorB = 248
End Function

Function gameInit()
	gfxX = 1024: gfxY = 768
	Graphics gfxX, gfxY, 32, 2
	gridSize = 8
End Function