
class NewFolderTheGame
{
    constructor(canvasId)
    {
        console.log("NewFolderTheGame Constructed");

        this.canvas         = document.getElementById(canvasId);
		this.gameSize       = new vector2d(this.canvas.width, this.canvas.height);
        this.renderContext  = this.canvas.getContext('2d');
        


        this.object = new GameObject();
    }

    Init()
    {
        console.log("NewFolderTheGame Init");

        /*
        1) CREATE MAP
        2) CREATE WALLS ETC.
        3) CREATE HERO SWAPN.
        4) CREATE ZOMBIE SPAWN.
        5) ja det andra också
         */
    }

    Update(deltaTime)
    {

    }

    Render()
    {

        this.object.Render(this.renderContext);
    }
}