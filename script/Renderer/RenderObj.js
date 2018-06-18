
class RenderObj
{
    constructor( renderFunction )
    {
        this.position           = new vector2d( 0, 0 );
        this.size               = new vector2d( 10, 10 );
        this.rotation           = 0;
        this.image              = undefined;
        this.renderFunction     = renderFunction;
        this.parentObj          = undefined;
        /* sprite sheets */
        this.spriteSheetVector  = new vector2d( 1, 1);
        this.currentSprite      = 0;
    }

    /* GET FUNCTIONS */

    GetTranslateVector()
    {
        return this.position;
    }

    GetScaleVector()
    {
        return this.size;
    }

    GetRotationRadians()
    {
        return this.rotation;
    }

    GetImage()
    {
        return this.image;
    }

    GetRenderFunction()
    {
        return this.renderFunction;
    }

    GetSpriteSheetVector()
    {
        return this.spriteSheetVector;
    }

    GetCurrentSprite()
    {
        return this.currentSprite;
    }

    GetParent( )
    {
        return this.parentObj;
    }




    /* SET FUNCTIONS */

    SetParent( parent )
    {
        this.parentObj = parent;
    }

    SetPosition( positionVector )
    {
        this.position = positionVector;
    }

    SetSize( sizeVector )
    {
        this.size = sizeVector;
    }

    SetRotationAngle( rotationAngle )
    {
        this.rotation = (3.14/180) * rotationAngle;
    }

    SetRotationRadians( rotationRadians )
    {
        this.rotation = rotationRadians;
    }

    SetImage( imageData )
    {
        this.image = imageData;
    }

    SetRenderFunction( renderFunction )
    {
        this.renderFunction = renderFunction;
    }

    SetSpriteSheetVector( spriteSheetVector )
    {
        this.spriteSheetVector = spriteSheetVector;
    }

    SetCurrentSprite( currentSprite ) 
    {
        this.currentSprite = currentSprite;
    }

}