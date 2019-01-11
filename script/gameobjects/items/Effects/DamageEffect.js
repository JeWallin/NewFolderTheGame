

class DamageEffect
{
    constructor(damage, objectManager)
    {
        this.Damage = damage;
        this.time = 2;
        this.timePassed = 0;
        this.objectManager = objectManager;
        
    }

    Update(deltaTime, obj)
    {
        if(obj.GetTag() === TAGS.BASEPLAYER)
        {
            obj.ChangeHealth(-this.Damage);
        }
        return true;
    }
}