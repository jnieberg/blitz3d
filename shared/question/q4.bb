Include "head.bb"
Cls: DrawBlock back, 0, 0
Color 255, 255, 128
printBlock(400, 250, "That's the Question\\Ronde 4", 400, 9, 0, 30)
Flip
While (Not KeyHit(57)) And (Not KeyHit(28))
	If KeyHit(1) Then End
Wend
a1$ = "........"
b1$ = "KROKODIL"
c1$ = "... .... .... .... ..... .... .........?"
d1$ = "Met welk wild dier heeft Henk gevochten?"
For j = 0 To 15
	Select j
		Case 0: a$ = "ZIEKTE VAN LYME":		b$ = "R":	d$ = "Welke ziekte wordt door teken overgebracht?"
		Case 1: a$ = "GOOGELEN":			b$ = "F":	d$ = "Hoe heet zoeken op internet?"
		Case 2: a$ = "OLIJFJE":				b$ = "K":	d$ = "Hoe heet de vriendin van Popeye?"
		Case 3: a$ = "PILOOT":				b$ = "L":	d$ = "Wat was het beroep van Ronald Garros?"
		Case 4: a$ = "BEVERWIJK":			b$ = "W":	d$ = "Waar ligt de grootste overdekte markt van Nederland?"
		Case 5: a$ = "HAVEL":				b$ = "M":	d$ = "Wie was de laatste president van Tsjecho-Slowakije?"
		Case 6: a$ = "WILLEM VAN HANEGEM":	b$ = "O":	d$ = "Welke voetballer kreeg de eerste gele kaart in de Nederlandse competitie?"
		Case 7: a$ = "MERCURIUS":			b$ = "D":	d$ = "Wat is de kleinste planeet van ons zonnestelsel?"
		Case 8: a$ = "SUIKERFEEST":			b$ = "I":	d$ = "Hoe heet het feest aan het einde van de Ramadan?"
		Case 9: a$ = "KLOOTSCHIETEN":		b$ = "G":	d$ = "Welke Twentse balsport bestaat al sinds de dertiende eeuw?"
		Case 10:a$ = "CENTURION":			b$ = "N":	d$ = "Welke Britse tank is ook een Romeinse aanvoerder?"
		Case 11:a$ = "FREDERIK VAN EDEN":	b$ = "T":	d$ = "Wie is de schrijver van de koele meren des doods?"
		Case 12:a$ = "YELLOW PRESS":		b$ = "C":	d$ = "Hoe heten Engelse roddelbladen?"
		Case 13:a$ = "PENTAGON":			b$ = "H":	d$ = "Hoe heet het grootste regeringsgebouw van Amerika?"
		Case 14:a$ = "JULES VERNE"	:		b$ = "V":	d$ = "Wie schreef 20.000 mijlen onder zee?"
		Case 15:a$ = "KUIFJE":				b$ = "E":	d$ = "Welke stripfiguur is als eerste op een euromunt afgebeeld?"
	End Select
	Include "main.bb"
Next
Include "foot.bb"