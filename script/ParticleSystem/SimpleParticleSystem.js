
class SimpleParticleSystem
{
    constructor( pos, numberOfParticles, timeToLive, spawnRate )
    {
        console.log("base particle system constructed");

        this.timer = 0;
        this.spawnRate = spawnRate;
        this.NumberOfParticles = numberOfParticles;
        this.ParticleLifeTime = timeToLive;
        this.position = pos;
        this.particles = [];
        this.time = 0;
    };

    Update(deltaTime) 
    {
        this.timer += deltaTime;

        while ( this.timer > this.spawnRate )
        {
            this.timer = this.timer - this.spawnRate;

            this.time += this.spawnRate;
            if( this.particles.length < this.NumberOfParticles )
            {
                let x = Math.random() * 2 - 1;
                let dir = new vector2d(x * Math.sin(this.time), Math.cos(this.time));
                dir = dir.Normalize();
                let part = new Particle( this.position, dir, 100);
                part.timeAlive += 3*Math.random() - 1.5;
                this.particles.push(part);
            }
        }

        // UPDATE
        let gravity = new vector2d(0, 1).Mult(0.1);

        for (let i = 0; i < this.particles.length; i++)
        {
            let part = this.particles[i];

            part.timeAlive += deltaTime;

            if ( part.timeAlive > this.ParticleLifeTime )
            {
                this.particles.splice(i, 1);
                i--;
            }
            else
            {
                let myparticle = part.direction.Mult(part.velocity);

                let NewPosModifier = myparticle.Add(gravity);

                let NewSpeed = NewPosModifier.Length();
                let NewDir = NewPosModifier.Normalize();

                part.direction = NewDir;
                part.velocity = NewSpeed;

                part.position = part.position.Add(part.direction.Mult(part.velocity*deltaTime));

            }
        }
    };

    Render(renderContext)
    {
        let ctx = renderContext.getContext("2d");
        this.particles.forEach(part => {
            let swag = part.timeAlive/this.ParticleLifeTime;
            ctx.fillStyle = 'rgb(' + Math.floor(255*swag) + ', ' +
            Math.floor(255-255*swag) + ', 0)';
            ctx.fillRect(part.position.x,part.position.y, 2, 2);
        });
        
    }
}