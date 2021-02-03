class Particle
{
    constructor(x, y, r)
    {
        var options=
        {
            isStatic: false,
            restitution: 0.75
        }
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
        this.colour = color(random(0, 255), random(0, 255), random(0, 255))
        World.add(world, this.body);
    }
    display()
    {
        push()
        translate(this.body.position.x, this.body.position.y);
        fill(this.colour);
        ellipseMode(CENTER);
        ellipse(0, 0, this.r*2);
        pop()
    }
}
