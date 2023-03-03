Print "The program starts ..."
Delay 1000
.label1
Cls
Delay 1000
Print "Entering the goto loop ..."
Delay 1000
Goto label2
Print "This line never gets printed .."
End

.label2 Print "We just jumped here!"

; wait for ESC key before ending
While Not KeyHit(1)
Wend
Goto label1 ;start again
Print "This line never gets printed either .."
