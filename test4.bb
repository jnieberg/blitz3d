;HandleImage Example

Graphics 800,600,16
;Origin 100, 100
gfxPlayer=LoadImage("media/chest.png")

HandleImage gfxPlayer,20,20
DrawImage gfxPlayer,0,0
WaitKey