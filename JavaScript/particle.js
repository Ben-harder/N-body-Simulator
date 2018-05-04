/* 
 * Class for particles. Each particle has a x and y velocity and acceleration
 * as well as a mass.
 */
class Particle
{
    constructor(mass, x, y)
    {
        this.mass = mass;
        this.xV = 0;
        this.yV = 0;
        this.xA = 0;
        this.yA = 0;

        this.x = x;
        this.y = y;
    }

    setVelocity(xV, yV)
    {
        this.xV = xV;
        this.yV = yV;
    }

    setAcceleration(xA, yA)
    {
        this.xA = xA;
        this.yA = yA;
    }

    update()
    {
        this.x += this.xV;
        this.y += this.yV;

        this.xV += this.xA;
        this.yV += this.yA;
    }

    equal(other)
    {
        return (this.x == other.x &&
            this.y == other.y && 
            this.xV == other.xV && 
            this.yV == other.yV && 
            this.xA == other.xA && 
            this.yA == other.yA &&  
            this.mass == other.mass);
    }
    
}