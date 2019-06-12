; OpenTCPStream/CloseTCPStream Example

Print "Connecting..."
tcp=OpenTCPStream( "www.nu.nl",80 )
print tcpstreamip(tcp)
print tcpstreamport(tcp)
If Not tcp Print "Failed.":WaitKey:End

Print "Connected! Sending request..."

WriteLine tcp,"GET http://www.nu.nl"
WriteLine tcp,Chr$(10)

If Eof(tcp) Print "Failed.":WaitKey:End

Print "Request sent! Waiting for reply..."

While Not Eof(tcp)
Print ReadLine$( tcp )
Wend

If Eof(tcp)=1 Then Print "Success!" Else Print "Error!"

CloseTCPStream tcp

WaitKey
End