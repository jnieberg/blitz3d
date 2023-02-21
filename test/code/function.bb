; Function Example

; Get the user's name
name$=Input$("Enter Your Name:")

; Call a function to print how many letters the name has
numletters(name$);

; Let's get something BACK from the function
thefirst$=firstletter$(name$)

; Now print results
If thefirst$ = "S" Then isFirstS = True Else isFirstS = False
Print "Was the first letter an 'S'? (1=True/0=False)" + isFirstS

;The program basically ends here, because functions don't run unless called.

; The actual function
Function numletters(passedname$)
    Print "Your name has " + Len(passedname) + " letters in it."
End Function

; Return from the function the first letter
Function firstletter$(passedname$)
    Return Left$(passedname,1)
End Function