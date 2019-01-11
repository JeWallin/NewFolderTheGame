class vector2d
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Length()
    {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    Normalize()
    {
        var length = this.Length();
        if ( length != 0 )
        {
            this.x /= length;
            this.y /= length; 
        }
        return this;
    }

    DiffVector(vector)
    {
        var xDif = this.x - vector.x;
        var yDif = this.y - vector.y;

        return new vector2d(xDif, yDif);
    }

    DistanceTo(vector)
    {
        var xDif = this.x - vector.x;
        var yDif = this.y - vector.y;

        var distance = Math.sqrt(xDif*xDif + yDif*yDif);

        return distance;
    }

    Add(vector)
    {
        var newVector = new vector2d(0,0);
        newVector.x = vector.x + this.x;
        newVector.y = vector.y + this.y;
        return newVector;
    }

    Sub(vector)
    {
        var newVector = new vector2d(0,0);
        newVector.x = this.x - vector.x;
        newVector.y = this.y - vector.x;
        return newVector;

    }

    Mult(factor)
    {
        var newVector = new vector2d(0,0);
        newVector.x = this.x*factor;
        newVector.y = this.y*factor;
        return newVector;
    }
}

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
}