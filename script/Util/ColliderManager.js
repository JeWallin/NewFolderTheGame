const COLLIDERS = { SPHERE : "SPHERE", BOX: "BOX" }

class SphereColider
{
    constructor(position, radius)
    {
        this.position = position;
        this.radius = radius;
    }

    IsColiding(Sphere)
    {
        var maxDistance = this.radius + Sphere.radius;
        
        var distance = this.position.DistanceTo(Sphere.position);

        return maxDistance >= distance;
    }

    GetPosition( )
    {
        return this.position;
    }

    GetRadius()
    {
        return this.radius;
    }

    GetCollider()
    {
        return COLLIDERS.SPHERE;
    }
}

class AABoxColider
{
    constructor( x, y, width, height)
    {
        // optimization
        this.halfWidth = width/2;
        this.halfHeight = height/2;

        // make sure its the top left side.
        this.position.x = x - this.halfWidth;
        this.position.y = y - this.halfHeight;
    }

    IsColiding(box)
    {
        return (Math.abs(this.position.x - box.position.x) < (this.halfWidth + box.halfWidth)) &&
            (Math.abs(this.position.y - box.position.y) < (this.halfHeight + box.halfHeight));
    }

    GetPositionX( )
    {
        return this.position.x;
    }

    GetPositionY( )
    {
        return this.position.y;
    }
    
    GetHalfWidth()
    {
        return this.halfWidth;
    }

    GetHalfHeight()
    {
        return this.halfHeight;
    }

    GetCollider()
    {
        return COLLIDERS.BOX;
    }
}

class ColliderManager
{
    constructor()
    {

    }

    GetColliderObject(gameObject)
    {
        var retValue = undefined;

        if ( gameObject.WantCollider() == COLLIDERS.SPHERE)
        {
            retValue = this.GetSphereObject(gameObject);
        }
        else if ( gameObject.WantCollider() == COLLIDERS.BOX)
        {
            retValue = this.GetBoxObject(gameObject);
        }

        return retValue;
    }
    GetSphereObject(gameObject)
    {
        var position = gameObject.GetPosition();
        var size = gameObject.GetSize()
        var paddingFactor = gameObject.GetColliderPadding();
        var sphereObject = new SphereColider( new vector2d( position.x, position.y ), size.x/2 * padding);

        return sphereObject;
    }

    GetBoxObject(gameObject)
    {
        var position = gameObject.GetPosition();
        var size = gameObject.GetSize();

        var boxObject = new AABoxColider( position.x, position.y, size.x, size.y );

        return boxObject;
    }

    IsColliding(objectOne, objectTwo)
    {
        var returnValue = false;
        if ( objectOne.GetCollider() == COLLIDERS.SPHERE &&
            objectTwo.GetCollider() == COLLIDERS.SPHERE)
        {
            returnValue = this.SphereColider( objectOne, objectTwo);
        }
        else if ( objectOne.GetCollider() == COLLIDERS.BOX &&
                objectTwo.GetCollider() == COLLIDERS.BOX)
        {
            returnValue = this.BoxCollision( objectOne, objectTwo );
        }
        else if ( objectOne.GetCollider() == COLLIDERS.SPHERE &&
                objectTwo.GetCollider() == COLLIDERS.BOX)
        {
            returnValue = this.SphereBoxCollision(objectOne, objectTwo);
        }
        else if ( objectOne.GetCollider() == COLLIDERS.BOX &&
                objectTwo.GetCollider() == COLLIDERS.SPHERE)
        {
            returnValue = this.SphereBoxCollision(objectTwo, objectOne);
        }
        return returnValue;
    }

    SphereCollision(sphereA, sphereB)
    {
        var maxDistance = sphereA.GetRadius() + sphereB.GetRadius();
        var distance = sphereA.GetPosition().DistanceTo(sphereB.GetPosition());
        return maxDistance > distance;
    }

    BoxCollision( boxA, boxB )
    {
        return (Math.abs(boxA.GetPositionX() - boxB.GetPositionX()) < (boxA.GetHalfWidth() + boxB.GetHalfWidth())) &&
            (Math.abs(boxA.GetPositionY() - boxB.GetPositionY()) < (boxA.GetHalfHeight() + boxB.GetHalfHeight()));
    }

    SphereBoxCollision( sphere, box )
    {
        return false;
    }
}