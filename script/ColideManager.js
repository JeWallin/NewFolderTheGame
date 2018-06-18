
class ObjectManager
{
    constructor()
    {
        console.log("Colide manager constructed.");

        this.objects = [];
    }

    RegisterObject( object )
    {
        if( !this.objects.includes( object ) )
        {
            this.objects.push( object );
        }
    }

    DeregisterObject( object )
    {   
        if ( this.objects.includes( object ) )
        {
            var index = this.objects.indexOf(object);

            this.objects.splice( index, 1 );
        }
    }

    IsColiding( sphere , ignore )
    {
        for ( var i = 0; i < this.objects.length; i++)
        {
            if ( this.objects[i].colidable && 
                !(ignore.includes(this.objects[i])) && 
                sphere.IsColiding(this.objects[i].SphereColider()) )
            {
                
                return {colide: true, with: this.objects[i]};
            }
        }
        return { colide : false };
    }

    GetObjects()
    {
        return this.objects;
    }
}