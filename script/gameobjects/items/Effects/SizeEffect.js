

class SizeEffect
{
    constructor(Size, objectManager)
    {
        this.Size = Size;
        this.time = 2;
        this.timePassed = 0;
        this.objectManager = objectManager;
    }

    Update(deltaTime, obj)
    {
        if (obj.SetSizeSafe(obj.size.x + this.Size, obj.size.y + this.Size , this.objectManager))
        {
            obj.SetPosition(obj.position.x - this.Size/2, obj.position.y - this.Size/2);
        }
        return true;
    }
}