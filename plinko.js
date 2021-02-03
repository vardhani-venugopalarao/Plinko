class Plinko
{
    constructor(x, y, r)
    {
        var options=
        {
            isStatic: true
        }
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
        World.add(world, this.body);
    }
    display()
    {
        strokeWeight(0)
        fill("white");
        ellipseMode(CENTER);
        ellipse(this.body.position.x, this.body.position.y, this.r*2);
    }
}
