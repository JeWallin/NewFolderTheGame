
class TimeKill
{
    constructor(time)
    {
        this.currentTime = 0;
        this.time = time;
    }

    Update(deltaTime)
    {
        this.currentTime += deltaTime;
        return this.time < this.currentTime;
    }
}