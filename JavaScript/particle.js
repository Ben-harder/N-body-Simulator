/* 
 * Class for particles. Each particle has a x and y velocity and acceleration
 * as well as a mass.
 */
class Particle
{
    constructor(mass, x, y)
    {
        this.mass = mass;
        this.V = new Pair(0, 0);
        this.A = new Pair(0, 0);
        this.pos = new Pair(x, y);
    }

    setVelocity(xV, yV)
    {
        this.V.set(xV, yV);
    }

    setAcceleration(xA, yA)
    {
        this.A.set(xA, yA);
    }

    update()
    {
        this.pos.first += this.V.first;
        this.pos.second += this.V.second;

        this.V.first += this.A.first;
        this.V.second += this.A.second;
    }

    equals(other)
    {
        return (this.V.equals(other.V) &&
            this.A.equals(other.A) &&
            this.pos.equals(other.pos) &&
            this.mass == other.mass);
    }
    
}