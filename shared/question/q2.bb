Include "head.bb"
Cls: DrawBlock back, 0, 0
Color 255, 255, 128
printBlock(400, 250, "That's the Question\\Ronde 2", 400, 9, 0, 30)
Flip
While (Not KeyHit(57)) And (Not KeyHit(28))
	If KeyHit(1) Then End
Wend
a1$ = "........."
b1$ = "FRIESLAND"
c1$ = ".. ..... ......... ...... ... .... .... ....... .... ..........?"
d1$ = "In welke provincie hadden wij acht jaar geleden onze familiedag?"
For j = 0 To 19
	Select j
		Case 0: a$ = "WHISKY":				b$ = "O":	d$ = "Wat is de favoriete drank van kapitein Haddock uit de Kuifje strip?"
		Case 1: a$ = "ANUS":				b$ = "W":	d$ = "Wat is de artiesten achternaam van Urbanus in zijn beginjaren?"
		Case 2: a$ = "SESAMSTRAAT":			b$ = "C":	d$ = "Welk kleuterprogramma is al meer dan 30 jaar op de Nederlandse televisie?"
		Case 3: a$ = "PETE BEST":			b$ = "I":	d$ = "Wie was de eerste drummer van de Beatles?"
		Case 4: a$ = "PROOIDIER":			b$ = "H":	d$ = "Wat is het tegenovergestelde van een roofdier?"
		Case 5: a$ = "ONDERHUUR":			b$ = "T":	d$ = "Hoe wordt huur uit de tweede hand genoemd?"
		Case 6: a$ = "SPRINGFIELD":			b$ = "D":	d$ = "Wat is de woonplaats van Homer en Marge Simpson?"
		Case 7: a$ = "DATABASE":			b$ = "J":	d$ = "Hoe heet een digitaal opgeslagen archief?"
		Case 8: a$ = "NOSTALGIE":			b$ = "G":	d$ = "Hoe noem je heimwee naar het verleden?"
		Case 9: a$ = "SCHAAP":				b$ = "R":	d$ = "Van de melk van welk dier wordt Feta gemaakt?"
		Case 10:a$ = "PANORAMIX":			b$ = "M":	d$ = "Welke dru�de beschikt over een toverdrank, dat de Galli�rs onoverwinnelijk maakt?"
		Case 11:a$ = "PICKPOCKET":			b$ = "L":	d$ = "Wat is het Engelse woord voor zakkenroller?"
		Case 12:a$ = "JOHAN-CRUIJFF SCHAAL":b$ = "P":	d$ = "Wat was de eerste prijs die Ajax dit seizoen won?"
		Case 13:a$ = "KERKSTRAAT":			b$ = "V":	d$ = "Wat is de meest voorkomende straatnaam in Nederland?"
		Case 14:a$ = "BLINDGANGER":			b$ = "F":	d$ = "Hoe heet een niet afgeschoten granaat of bom?"
		Case 15:a$ = "CLARENCE SEEDORF":	b$ = "N":	d$ = "Welke Nederlandse voetballer speelt dit seizoen met rugnummer 10 bij AC-Milan?"
		Case 16:a$ = "EZEL":				b$ = "Z":	d$ = "Hoe noem je het statief van een schilder?"
		Case 17:a$ = "TELEFOONTERREUR":		b$ = "A":	d$ = "Hoe wordt het anoniem bellen om mensen lastig te vallen genoemd?"
		Case 18:a$ = "GOLDEN GLOBES":		b$ = "K":	d$ = "Welke filmprijzen worden vlak voor de Oscars uitgereikt?"
		Case 19:a$ = "MARIO":				b$ = "E":	d$ = "Welke computerheld heeft een broertje die Luigi heet?"
	End Select
	Include "main.bb"
Next
Include "foot.bb"