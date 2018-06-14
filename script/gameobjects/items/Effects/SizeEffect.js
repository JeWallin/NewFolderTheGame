

class SizeEffect
{
    constructor(Size)
    {
        this.Size = Size;
        this.time = 2;
        this.timePassed = 0;
    }

    Update(deltaTime, obj)
    {
        this.timePassed += deltaTime;

        var toChange = (deltaTime/this.time) * this.Size;
        
        obj.SetSize(obj.size.x + toChange, obj.size.y + toChange );
        
        return this.timePassed >= this.time;
    }

}