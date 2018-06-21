
class BulletBehavior
{
    constructor(objectManager, ignoreList)
    {
        this.objectManager= objectManager;
        this.ignoreList = ignoreList;
    }

    Update(deltaTime, projectile)
    {
        var currentPosition = new vector2d( projectile.position.x, projectile.position.y );

        var toMove = projectile.speed * deltaTime;

        var dirVector = projectile.GetDirection().Mult(toMove);

        currentPosition = dirVector.Add(currentPosition);

        projectile.SetPosition(currentPosition.x, currentPosition.y);


        var coldider = projectile.SphereColider();

        var colideResult = this.objectManager.IsColiding(coldider, this.ignoreList);

        if ( colideResult.colide )
        {
            colideResult.with.AffectedBy(projectile.projectorEffect);
            
            //projectile.toDestroy = true;
        }
    }
}