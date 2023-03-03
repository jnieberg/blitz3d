; Load sound sample
sndDeath=LoadSound("sounds/audiodeath.wav")

; Pan sound effect half to the left
SoundPan sndDeath,-.5

; Play sound
PlaySound sndDeath
