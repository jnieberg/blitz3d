; --- Start second code set ---
; Copy this code to another instance of Blitz Basic
; Run the above code first, then run this ... they will 'talk'

; Create a Client and push data

strmGame=OpenTCPStream("127.0.0.1",8080)

If strmGame<>0 Then 
Print "Client Connected successfully."
Else
Print "Server failed to connect."
WaitKey 
End
End If

; write stream to server
WriteString strmGame,"Mission Control, this is Apollo X ..."
Print "Completed sending message to Mission control..."

Delay 2000
CloseTCPStream strmGame
; --- End second code set --- 