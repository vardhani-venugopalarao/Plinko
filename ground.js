class Ground
{
    constructor(x, y, width, height)
    {
        var options =
        {
            isStatic: true
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        World.add(world, this.body);
    }
    display(colour)
    {   
        rectMode(CENTER)
        strokeWeight(0);
        fill(colour);
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
    }
}