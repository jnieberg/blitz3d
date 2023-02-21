; Dim Example
; Create a collection of 100 random numbers in a 2-dimensional array

; Create array
Dim grid(10, 10)

; Fill each element with a random number
For y = 0 to 10: For x = 0 to 10
    grid(x, y) = Rand(10, 99)
Next: Next

For y = 0 to 10: For x = 0 to 10
    Text x*40, y*20, grid(x,y)
Next: Next
