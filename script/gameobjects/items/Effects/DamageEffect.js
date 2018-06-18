

class DamageEffect
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
        if(obj.GetTag() === TAGS.BASEPLAYER)
        {
            obj.ChangeHealth(-1);
        }
        return true;
    }
}