
class BulletBehavior
{
    constructor(objectManager, creator)
    {
        this.objectManager= objectManager;
        this.ignoreList = [this, creator];
    }

    Update(deltaTime, projectile)
    {
        var currentPosition = new vector2d( projectile.position.x, projectile.position.y );
        var dirVector;
        var toMove = projectile.speed * deltaTime;

        if(projectile.direction === DIRECTIONS.NORTH)
        {
            dirVector = new vector2d(0, -1);
        }
        else if (projectile.direction === DIRECTIONS.WEST)
        {
            dirVector = new vector2d(-1, 0);
        }
        else if (projectile.direction === DIRECTIONS.SOUTH)
        {
            dirVector = new vector2d(0, 1);
        }
        else
        {
            dirVector = new vector2d(1, 0);
        }

        dirVector = dirVector.Mult(toMove);

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