; Define a crafts Type

Type crafts
Field index
Field x
End Type 

; Create 100 crafts, with the unique name of alien
For t = 1 To 100 
alien.crafts = New crafts
alien\index = t
alien\x = Rnd(0,640)
Next 

; Move to the first object
alien.crafts = Last crafts 
Print alien\index
Print alien\x
Print

; Move to the next object
alien = After alien 
Print alien\index
Print alien\x
Print

; Move to the next object
alien = After alien 
Print alien\index
Print alien\x
Print