Function printBlock(x, y, t$, w, ln, pg=0, h#=0.0, fnt=0)
	If fnt<>0 Then SetFont fnt
	cr=ColorRed(): cg=ColorGreen(): cb=ColorBlue()
	t$=t$+"\"
	If h=0.0 Then h=0.65*FontHeight()
	j=1: k=1: p=0: l=0: rn=False
	For i=1 To Len(t$)
		ch$=Mid$(t$, i, 1)
		If StringWidth(Mid$(t$, j, i-j))>=w Or ch$=" " Or ch$="\" Or ch$="|" Or i=Len(t$) Then j=i+1
		If StringWidth(Mid$(t$, k, i-k))>=w Or i=Len(t$) Or ch$="\" Or ch$="|"
			x1=0: y1=0: sw2=0: sw=0
			tf$=Mid$(t$, k, j-k)
			tf$=Left$(tf$, Len(tf$)-1)
			k=j
			If p=pg
				ce=False
				If Left$(tf$, 1)="#" ;simple color
					sp1=Mid$(tf$, 2, 1): sp2=Mid$(tf$, 3, 1): sp3=Mid$(tf$, 4, 1)
					Color getMin(sp1*32, 255), getMin(sp2*32, 255), getMin(sp3*32, 255)
					tf$=Mid$(tf$, 5)
				EndIf
				If Right$(tf$, 1)="#" ;end simple color
					ce=True
					tf$=Left$(tf$, Len(tf$)-1)
				EndIf
				;text
				tf2$=""
				For m=1 To Len(tf$)
					a1$=Mid$(tf$, m, 1)
					If fnt<>0
						If a1$="<" Then x1=0:y1=0: rn=True
						If a1$=">" Then x1=0:y1=0: rn=False
					EndIf
					If a1$<>"<" And a1$<>">"
						sw2=StringWidth(tf2$): sw=StringWidth(tf$)
						If rn Then SetFont fontSpellCast: a1$=a1$+"  "
						Color 0, 0, 0
						Text x+sw2-x1-0.5*sw, y+h*l+y1+2, a1$, False, False
						Color cr, cg, cb
						Text x+sw2-x1-0.5*sw, y+h*l+y1, a1$, False, False
						tf2$=tf2$+a1$
					EndIf
					If fnt<>0 Then SetFont fnt
				Next
				If textWriteTo=2 And i=Len(t$)-1
					Color 0, 0, 0
					Text x+sw2+StringWidth(Mid$(t$, Len(t$)-2, 1))-4-x1-0.5*sw, y+h*l+y1+2, "|", False, False
					Color cr, cg, cb
					Text x+sw2+StringWidth(Mid$(t$, Len(t$)-2, 1))-4-x1-0.5*sw, y+h*l+y1, "|", False, False
				EndIf
				If ce Then Color cr, cg, cb
			ElseIf p>pg
				Exit;gfxX/60
			EndIf
			l=l+1: If l>=ln Or ch$="|" Then l=0: p=p+1
		EndIf
	Next
End Function