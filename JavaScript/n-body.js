/* 
 * This file will contain the main code for drawing and calculating positions.
 */

var refresh = setInterval(frame, 20);

var particles = [];


var pp = new Particle(100, 20, 20);

particles.push(pp);
function frame()
{
    var canvas = document.getElementById("canvas");

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "#f00";

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    console.log(ctx.canvas.width);
    console.log(ctx.canvas.height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(pp.x, pp.y, pp.mass, pp.mass);

    ctx.fillRect(1, 1, 10, 10);
    // Update the position and move all the particles.
    for (var i = 0; i < particles.length; i++)
    {
        var currParticle = particles[i];

        // Perform particle math here:
        // Need to calculate the force between this particle and all other particles.
        //console.log(currParticle);

        currParticle.update(); // Update the position of the particle

        // Draw the particle
        ctx.fillRect(currParticle.x, currParticle.y, currParticle.mass, currParticle.mass);
    }
}

/*
 * This function will calculate the net force between the argument particle and 
 * all other particles currently in the simulation.
 * 
 * Formula found here: https://en.wikipedia.org/wiki/N-body_problem
 */
function calculateForce(particle)
{
    var netForceX = 0;
    var netForceY = 0;

    for (var i = 0; i < particles.length; i++)
    {
        var currParticle = particles[i];

        // Account for the particle not being the pass particle
        if (!currParticle.equal(particle))
        {
            var massProduct = currParticle.mass * particle.mass;

            var netParticleMag = Math.sqrt(Math.pow(currParticle.x - particle.x, 2) + Math.pow(currParticle.y - particle.y, 2));
            // 
            var netMagCubed = Math.pow(currParticleMag - particleMag, 3);

            // netForceX = massProduct * (currParticle.x - particle.x) / netMagCubed
        }
    }
}