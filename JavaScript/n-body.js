/* 
 * This file will contain the main code for drawing and calculating positions.
 */

var refresh = setInterval(frame, 20);
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var particles = [];


var pp = new Particle(15, 150, 300);
var jj = new Particle(15, 10, 10);
var gg = new Particle(120, 300, 50);
particles.push(pp);
particles.push(jj);
particles.push(gg);


function frame() {

    draw(ctx);
}

/*
 * This function will draw all the particles in their current state.
 */
function draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF0000";
    // Update the position and move all the particles.
    for (var i = 0; i < particles.length; i++) 
    {
        var currParticle = particles[i];

        // Perform particle math here:
        // Need to calculate the force between this particle and all other particles.
        //console.log(currParticle);
        var netForce = calculateForce(currParticle);

        // Use net force to find acceleration.
        currParticle.A.set(netForce.first/currParticle.mass, netForce.second/currParticle.mass);

        currParticle.update(); // Update the position of the particle

        // Area of the circle will be proportional to it's mass.
        // A = pi*r^2 => r = sqrt(A/pi) where A = mass
        var radius = Math.sqrt(currParticle.mass/Math.PI) * 2;

        // Draw the particle
        ctx.beginPath();

        ctx.ellipse(currParticle.pos.first, currParticle.pos.second, radius, radius, 0, 0, 2 * Math.PI);
        
        ctx.fill();
        }
}

/*
 * This function will calculate the net force between the argument particle and 
 * all other particles currently in the simulation.
 * 
 * Formula found here: https://en.wikipedia.org/wiki/N-body_problem
 */
function calculateForce(particle) {
    var netForceX = 0;
    var netForceY = 0;

    for (var i = 0; i < particles.length; i++) {
        var currParticle = particles[i];

        // Account for the particle not being the passed particle
        if (!currParticle.equals(particle)) {
            var massProduct = currParticle.mass * particle.mass;
            var netParticleMag = Math.sqrt(Math.pow(currParticle.pos.first - particle.pos.first, 2) + Math.pow(currParticle.pos.second - particle.pos.second, 2));
            var netMagCubed = Math.pow(netParticleMag, 3);

            netForceX += massProduct * (currParticle.pos.first - particle.pos.first) / netMagCubed;
            netForceY += massProduct * (currParticle.pos.second - particle.pos.second) / netMagCubed;
        }
    }

    return new Pair(netForceX, netForceY);
}