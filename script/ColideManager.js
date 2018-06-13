
class ColideManager
{
    constructor()
    {
        console.log("Colide manager constructed.");

        this.objects = [];
    }

    RegisterColidableObject( object )
    {
        if( !this.objects.includes( object ) )
        {
            this.objects.push( object );
        }
    }

    DeregisterColidableObject( object )
    {   
        if ( this.objects.includes( object ) )
        {
            var index = this.objects.indexOf(object);

            this.objects.splice( index, 1 );
        }
    }

    ColidingWith( sphere , ignore)
    {
        for ( var i = 0; i < this.objects.length; i++)
        {
            if ( !(ignore === this.objects[i]) && sphere.IsColiding(this.objects[i].SphereColider()) )
            {
                
                return {colide: true, with: this.objects[i]};
            }
        }
        return { colide : false };
    }
}