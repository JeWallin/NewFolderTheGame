
class KeyManager 
{
    constructor()
    {
        console.log("KeyManager constructed");

        this.keyState = {};  
    }

    Input(keyCode, isDown)
    {
        this.keyState[keyCode] = isDown;
    }

    IsKeyDown(keyCode)
    {
        return this.keyState[keyCode];
    }
}