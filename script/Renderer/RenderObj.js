
class RenderObj
{
    constructor()
    {
        this.position = new vector2d(0,0);
        this.size = new vector2d(10,10);
        this.rotation = 0;
        this.image = undefined;
    }

    SetPosition(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

    SetSize(width, height)
    {
        this.size.x = width;
        this.size.y = height;
    }

    SetRotation(rotation)
    {
        this.rotation = rotation;
    }

    SetImage(image)
    {
        this.image = image;
    }

    Render(context)
    {
        var transformX = this.position.x + this.size.x/2;
        var transformY = this.position.y + this.size.y/2;
        context.translate( transformX, transformY  );
        context.rotate( this.rotation );
        context.drawImage( this.image, -this.size.x/2, -this.size.y/2, this.size.x, this.size.y );
        context.rotate( -this.rotation );
        context.translate( -transformX, -transformY );
    }

}