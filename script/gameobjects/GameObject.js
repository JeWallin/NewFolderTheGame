class GameObject
{
    constructor()
    {
        this.position           = new vector2d(0, 0);
        this.size               = new vector2d(10, 10);
        this.image              = undefined;
        this.renderFunction     = undefined;
        this.rotation           = 0;
        this.colidable          = false;
        this.toDestroy          = false;
        this.Effects            = [];
        this.ignoreList         = [];
        this.spriteSheet        = new vector2d(1,1);
        this.currentSprite      = 0;

        this.IgnoreColideActor(this);
    }

    IgnoreColideActor(actor)
    {
        this.ignoreList.push(actor);
    }

    SetPosition(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

    SetSize(x, y)
    {
        this.size.x = x;
        this.size.y = y;
    }

    Init()
    {

    }

    Update(deltaTime)
    {
        
        for( var i = 0; i < this.Effects.length; i++)
        {
           
            if ( this.Effects[i].Update(deltaTime, this) )
            {
                this.Effects.splice(i, 1);
                i--;
            }
        }
    }

    AffectedBy(effect)
    {
        if ( effect !== undefined)
        {
            this.Effects.push(effect);
        }
        else
        {
            console.log("SHoULDNASDKASD ASDA");
        }
        
    }

    Render(renderContext)
    {

        renderContext.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    SetPosition(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

    SetSize( width, height )
    {
        this.size.x = Math.max(width, 1);
        this.size.y = Math.max(height,1);
    }

    SetSizeSafe(width, height, coliderChecker)
    {
        
        var oldW = this.size.x;
        var oldH = this.size.y;

        this.SetSize(width, height);
        var res = coliderChecker.IsColiding(this.SphereColider(), this.ignoreList);

        if ( res.colide )
        {
           this.SetSize( oldW, oldH );
           return false;
        }
        return true;
    }

    SetImage(image)
    {
        this.image = image;
    }

    SetRotation(rotation)
    {
        this.rotation = rotation;
    }

    SetColidable(colidable)
    {
        this.colidable = colidable;
    }

    GetColidable()
    {
        return this.colidable;
    }

    
    



    /* REFACTORED */

    RenderObject()
    {
        var renderObj = new RenderObj( this.renderFunction );
        renderObj.SetPosition( new vector2d(this.position.x, this.position.y) );
        renderObj.SetSize( new vector2d(this.size.x, this.size.y) );
        renderObj.SetRotationAngle( this.rotation );
        renderObj.SetImage ( this.image );
        renderObj.SetSpriteSheetVector( new vector2d( this.spriteSheet.x, this.spriteSheet.y) );
        renderObj.SetCurrentSprite( this.currentSprite );
        return renderObj;
    }

    ToBeRemoved()
    {
        return this.toDestroy;
    }

    SphereColider()
    {
        var sphereColider = new SphereColider( new vector2d(this.position.x , this.position.y ), this.size.x/2 );
        return sphereColider;
    }

    /* SET  */
    SetSpriteSheet( spriteSheet )
    {
        this.spriteSheet = spriteSheet;
    }

    SetCurrentSprite ( currentSprite )
    {
        this.currentSprite = currentSprite;
    }

    /* GET */

    GetSpriteSheet()
    {
        return this.spriteSheet;
    }

    GetCurrentSprite()
    {
        return this.currentSprite;
    }
}