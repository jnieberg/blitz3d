Include "head.bb"
Cls: DrawBlock back, 0, 0
Color 255, 255, 128
printBlock(400, 250, "That's the Question\\Ronde 5", 400, 9, 0, 30)
Flip
While (Not KeyHit(57)) And (Not KeyHit(28))
	If KeyHit(1) Then End
Wend
a1$ = ".... ... ..."
b1$ = "ANNA TEN DEN"
c1$ = "... ... .. ........... ... .. ...... ... ../...?"
d1$ = "WAT WAS DE MEISJESNAAM VAN DE MOEDER VAN PA/OPA?"
For j = 0 To 13
	Select j
		Case 0: a$ = "TWAALFDE MAN":		b$ = "A":	d$ = "Wat is de bijnaam van voetbalsupporters?"
		Case 1: a$ = "ANACONDA":			b$ = "O":	d$ = "Wat is de langste slang van de wereld?"
		Case 2: a$ = "PATRIOT":				b$ = "S":	d$ = "Wat is een ander woord voor vaderlander?"
		Case 3: a$ = "KOP VAN JUT":			b$ = "J":	d$ = "Welke attractie werd vernoemd naar een crimineel?"
		Case 4: a$ = "LEAGUE":				b$ = "D":	d$ = "Wat is de naam van de engelse voetbalcompetitie?"
		Case 5: a$ = "DE GRACHTENGORDEL":	b$ = "R":	d$ = "Welk gebied van Amsterdam staat op de wereld erfgoedlijst?"
		Case 6: a$ = "SENATOREN":			b$ = "I":	d$ = "Hoe worden de leden van de eerste kamer genoemd?"
		Case 7: a$ = "DE ARENA":			b$ = "W":	d$ = "Welk horecabedrijf ontving een schadevergoeding van 1 miljoen gulden?"
		Case 8: a$ = "AUDI":				b$ = "V":	d$ = "Welke naam van een Duits automerk betekent 'luister'?"
		Case 9: a$ = "BEP BAKHUIS":			b$ = "N":	d$ = "Wat was de eerste nederlandse prof voetballer?"
		Case 10:a$ = "DECISIONDAY":			b$ = "M":	d$ = "Waar is D-day een afkorting van?"
		Case 11:a$ = "REPLIEK":				b$ = "E":	d$ = "Wat is een ander woord voor weerwoord?"
		Case 12:a$ = "VENLO":				b$ = "T":	d$ = "Waar vind in 2012 de Floriade plaats?"
		Case 13:a$ = "RASMUSSEN":			b$ = "P":	d$ = "Wie won de bolletjes trui in 2006?"
	End Select
	Include "main.bb"
	print "HOI!"
Next
Include "foot.bb"