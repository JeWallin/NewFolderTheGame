
class Renderer2d
{
    /* NEW RENDER! */

    constructor( canvas, renderFunction )
    {
        this.renderContext  = undefined;
        this.translate      = new vector2d(0,0);
        this.rotation       = 0;
        this.scale          = new vector2d(0,0);
        this.renderFunction = renderFunction;
        this.viewPortSize   = new vector2d(0, 0);

        this.SetTargetCanvas(canvas);
    }

    SetRenderContext( renderContext )
    {
        if( renderContext != undefined )
        {
            this.renderContext = renderContext;
        }
    }

    SetTranslate( translateVector )
    {
        this.translate = translateVector;
    }

    SetScale( scaleVector )
    {
        this.scale = scaleVector;
    }

    SetRotationAngle( rotationAngle )
    {
        this.rotation = (3.14/180) * rotationAngle;
    }

    SetRotationRadians( rotationRadians )
    {
        this.rotation = rotationRadians;
    }

    SetRenderFunction( renderFunction )
    {
        if ( renderFunction != undefined )
        {
            this.renderFunction =  renderFunction;
        }
    }

    SetViewPortSize( viewPortSize )
    {
        this.viewPortSize = viewPortSize;
    }

    SetTargetCanvas( canvas )
    {
        this.SetViewPortSize( new vector2d(canvas.width, canvas.height ));
        this.SetRenderContext( canvas.getContext("2d") );
    }

    InitNewFrame()
    {
        this.renderContext.clearRect(0,0, this.viewPortSize.x, this.viewPortSize.y);
    }

    PreRender()
    {
        this.renderContext.translate( this.translate.x, this.translate.y  );
        this.renderContext.rotate( this.rotation  );
    }

    Render(renderObj)
    {
        this.renderFunction( this.renderContext, renderObj );
    }

    PostRender()
    {
        this.renderContext.translate( -this.translate.x, -this.translate.y  );
        this.renderContext.rotate( -this.rotation  );
    }
    
}