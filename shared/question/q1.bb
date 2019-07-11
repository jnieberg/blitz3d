Include "head.bb"
Cls: DrawBlock back, 0, 0
Color 255, 255, 128
printBlock(400, 250, "That's the Question\\Ronde 1", 400, 9, 0, 30)
Flip
While (Not KeyHit(57)) And (Not KeyHit(28))
	If KeyHit(1) Then End
Wend
a1$ = "... ... ...."
b1$ = "VAN DER HAAR"
c1$ = "... .. .. ....... ....... ... .. ...... .. .........?"
d1$ = "Wat is de leukste familie van de wereld en omstreken?"
For j = 0 To 15
	Select j
		Case 0: a$ = "GELATINE":			b$ = "I":	d$ = "Wat is een ander woord voor beenderlijm in snoepgoed?"
		Case 1: a$ = "PHILIP COCU":			b$ = "A":	d$ = "Welke voetballer won in 2006 de zilveren schoen?"
		Case 2: a$ = "GROEN":				b$ = "T":	d$ = "Welke kleur heeft een briefje van 100 euro?"
		Case 3: a$ = "RICHARD WAGNER":		b$ = "W":	d$ = "Wie componeerde het lied  'Daar komt de bruid'?"
		Case 4: a$ = "MIEP GIES":			b$ = "O":	d$ = "Wie bewaarde tijdens de oorlog het dagboek van Anne Frank?"
		Case 5: a$ = "VIERENZESTIG":		b$ = "S":	d$ = "Hoeveel wedstrijden werden er op het laatste W.K. voetbal gespeeld?"
		Case 6: a$ = "WESTERKERK":			b$ = "D":	d$ = "In welke kerk ligt Rembrandt van Rijn begraven?"
		Case 7: a$ = "SAVOY":				b$ = "V":	d$ = "Wat is de naam van het laatste koningshuis in Italië?"
		Case 8: a$ = "CARIËS":				b$ = "L":	d$ = "Wat is de meest voorkomende infectieziekte in de wereld?"
		Case 9: a$ = "DIGESTIE":			b$ = "U":	d$ = "Wat is een ander woord voor 'spijsvertering'?"
		Case 10:a$ = "PAULINA":				b$ = "K":	d$ = "Wat was de derde voornaam van Ma/Oma?"
		Case 11:a$ = "HACKER":				b$ = "F":	d$ = "Hoe heet een computer-inbreker?"
		Case 12:a$ = "UDERZO":				b$ = "M":	d$ = "Wie was de geestelijke vader van de stripheld Asterix?"
		Case 13:a$ = "GREENBACK":			b$ = "E":	d$ = "Hoe wordt de Amerikaanse dollar ook wel genoemd?"
		Case 14:a$ = "REMAKE":				b$ = "N":	d$ = "Hoe heet een nieuwe versie van een eerder gemaakte film?"
		Case 15:a$ = "RAFTING":				b$ = "R":	d$ = "Wat is het engelse woord voor wildwater varen?"
	End Select
	Include "main.bb"
Next
Include "foot.bb"