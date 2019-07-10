gfxX=800: gfxY=600
charmax=100
grMax=4
grid=10
c=0

Dim bb%(gfxX, gfxY)
Dim grNum(charMax-1, 10)
Dim gr#(charMax-1, grMax-1, grid-1, grid-1)

c=6

For y=0 To grid-1: For x=0 To grid-1
		gr(c, grNum(c, 4), x, y)=getMax(0.0, getMin(gr(c, grNum(c, 4), x, y)/o, 1.0))
Next: Next