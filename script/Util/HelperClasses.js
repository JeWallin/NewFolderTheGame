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
        this.x += vector.x;
        this.y += vector.y;
    }

    Sub(vector)
    {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    Mult(factor)
    {
        this.x *= factor;
        this.y *= factor;
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