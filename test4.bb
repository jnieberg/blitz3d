graphics 1024, 768, 32, 2
; OpenTCPStream/CloseTCPStream Example

Print "Connecting..."
TCPTimeouts 1000, 1000
tcp=OpenTCPStream( "www.google.com",80 )

If Not tcp Print "Failed.":WaitKey:End

Print "Connected! Sending request..."

WriteLine tcp,"GET\r\n\r\n"

If Eof(tcp) Print "Failed.":WaitKey:End

Print "Request sent! Waiting for reply..."

While Not Eof(tcp)
Print ReadLine$( tcp )
Wend

If Eof(tcp)=1 Then Print "Success!" Else Print "Error!"

CloseTCPStream tcp

WaitKey
End