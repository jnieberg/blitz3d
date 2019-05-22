Graphics 640, 480, 16, 2
SeedRnd MilliSecs()
f = LoadFont("times new roman", 38, False, False, False)
SetFont f
Dim tip$(1)

While True
	Cls: Locate 0, 0
	i$ = Input$("Geef 't woord hier: "): If i$ = "" Then End
	c$ = Input$("Geef 't categorietje hier: "): If c$ = "" Then End
	For a = 0 To 1
		tip$(a) = Input$("Geef tip numero "+(a+1)+": "): If tip$(a) = "" Then End
	Next
	Dim gad(Len(i$))
	Cls: Locate 0, 0
	For a = 1 To Len(i$)
		Repeat
			r = Rand(1, Len(i$))
		Until gad(r) = 0
		Write Upper$(Mid$(i$, r, 1))
		gad(r) = 1
	Next
	Print
	Print "Categorie: "+c$
	For a = 0 To 2
		o$ = Input$("Wat woord nu? ")
		If Upper$(o$) = Upper$(i$) Then Print "GOED!":Exit Else Print "FOUT!"
		Delay 2000
		If a < 2 Then Print "Tip "+(a+1)+": "+tip(a) Else Print "Het is: "+i$
	Next
	Delay 2000
Wend