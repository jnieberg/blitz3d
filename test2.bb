Cls
Graphics 800,600,16,1
Print "Dit is een test"

functie()

Function functie()
	a=1
	key = WaitKey()
	If key = 32 Then
		Print "Spatie " + key
	Else
		Print "Dit is ook een test " + key
	End If
	If key = 40 Then Print "Hoi"
	key = WaitKey()
	Print "Dit is ook een test123" + key
End Function

a=2