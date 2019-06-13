; CreateTCPServer, CloseTCPServer, AcceptTCPStream Example
; This code is in two parts, and needs to be run seperately on the same machine

; --- Start first code set ---
; Create a server and listen for push
TCPTimeouts 1000, 1000

svrGame=CreateTCPServer(8080)

Print svrGame

If svrGame<>0 Then 
Print "Server started successfully."
Else
Print "Server failed to start."
End
End If

While Not KeyHit(1)
;strStream=AcceptTCPStream(svrGame)
If strStream Then 
Print ReadString$(strStream)
Delay 2000
CloseTCPServer svrGame
End
Else 
Print "No word from Apollo X yet ..."
Delay 1000
End If 
Wend

End

; --- End first code set ---