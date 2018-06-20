

class SizeEffect
{
    constructor(Size, objectManager)
    {
        this.Size = Size;
        this.time = 2;
        this.timePassed = 0;
        this.objectManager = objectManager;
        this.Attempt = 0;
    }

    Update(deltaTime, obj)
    {
        var returnV = false;
        if (obj.SetSizeSafe(obj.size.x + this.Size, obj.size.y + this.Size , this.objectManager))
        {
            obj.SetPosition(obj.position.x, obj.position.y);
            returnV = true;
        }
        else
        {
            this.Attempt += 1;
            if ( this.Attempt > 32 )
            {
                returnV = true;
            }
        }
        return returnV;
    }
}