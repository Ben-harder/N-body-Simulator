/* 
 * This file will contain the main code for drawing and calculating positions.
 */

var refresh = setInterval(frame, 20);
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var particles = [];
var gravitationalConstant = 6.67408*Math.pow(10, -2);


var pp = new Particle(15, 150, 300);
var jj = new Particle(15, 10, 10);
var gg = new Particle(120, 300, 50);
particles.push(pp);
particles.push(jj);
particles.push(gg);



function frame()
{
    draw(ctx);
}

/*
 * This function will draw all the particles in their current state.
 */
function draw(ctx)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = "#FFFFFF";

    // Update the position and move all the particles.
    for (var i = 0; i < particles.length; i++)
    {
        var currParticle = particles[i];
        // Check to see if the particle left the canvas
        if (currParticle.pos.first > canvas.width || currParticle.pos.second > canvas.height || currParticle.pos.first < 0 || currParticle.pos.second < 0)
        {
            delete currParticle;
            particles.splice(i, 1);
        }
        else
        {
            // Check to see if the particle should be merged
            mergeAllClose(currParticle);

            // Calculate the netforce vector between this particle and all others.
            var netForce = calculateForce(currParticle);

            // Use net force to find acceleration.
            currParticle.A.set(netForce.first / currParticle.mass, netForce.second / currParticle.mass);

            currParticle.update(); // Update the position of the particle

            // Area of the circle will be proportional to it's mass.
            // A = pi*r^2 => r = sqrt(A/pi) where A = mass
            var radius = Math.sqrt(currParticle.mass / Math.PI) * 2;

            // Draw the particle
            ctx.beginPath();

            ctx.ellipse(currParticle.pos.first, currParticle.pos.second, radius, radius, 0, 0, 2 * Math.PI);

            ctx.fill();
        }
    }

    // Display Particle count
    document.getElementById("particleCount").innerHTML = "Particle count: " + particles.length;
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

        // Account for the particle not being the passed particle
        if (!currParticle.equals(particle))
        {
            var massProduct = currParticle.mass * particle.mass;
            var netParticleMag = Math.sqrt(Math.pow(currParticle.pos.first - particle.pos.first, 2) + Math.pow(currParticle.pos.second - particle.pos.second, 2));
            var netMagCubed = Math.pow(netParticleMag, 3);

            netForceX += gravitationalConstant * massProduct * (currParticle.pos.first - particle.pos.first) / netMagCubed;
            netForceY += gravitationalConstant * massProduct * (currParticle.pos.second - particle.pos.second) / netMagCubed;
        }
    }

    return new Pair(netForceX, netForceY);
}

/*
 * Click event to spawn a particle.
 */
var startPos;

canvas.addEventListener("mousedown", function ()
{
    //console.log("Mouse down at " + (event.pageX - canvas.offsetLeft) + ", " + (event.pageY - canvas.offsetTop));

    startPos = new Pair(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
}, false);

canvas.addEventListener("mouseup", function ()
{
    //console.log("Mouse up at " + (event.pageX - canvas.offsetLeft) + ", " + (event.pageY - canvas.offsetTop));

    // Mass equals the vector magnitude between mouse down and mouse up
    var endPos = new Pair(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    var dx = Math.abs(endPos.first - startPos.first);
    var dy = Math.abs(endPos.second - startPos.second);
    var mass = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    if (mass <= 0)
        mass = 1;

    var particle = new Particle(mass, startPos.first, startPos.second);
    particles.push(particle);

}, false);

/*
 * This function will loop through the particles and see if there are particles that meet a distance threshold to merge them.
 */
function mergeAllClose(particle)
{
    var joinThreshhold = Math.sqrt(particle.mass / Math.PI) * 2;

    for (var i = 0; i < particles.length; i++)
    {
        var currParticle = particles[i];

        // Make sure it's not the same particle
        if (!currParticle.equals(particle))
        {
            var netParticleMag = Math.sqrt(Math.pow(particle.pos.first - currParticle.pos.first, 2) + Math.pow(particle.pos.second - currParticle.pos.second, 2));

            if (netParticleMag <= joinThreshhold)
            {
                particle.merge(currParticle);
                delete currParticle;
                particles.splice(i, 1);
            }
        }
    }
}

/* 
 * This function will clear all the particles from the canvas.
 */
function clearParticles()
{
    for (var i = particles.length; i >= 0; i--)
    {
        delete particles[i];
        particles.splice(i, 1);
    }
}

var clearParticlesButton = document.getElementById("clearParticlesButton");

clearParticlesButton.addEventListener("click", function () 
{
    clearParticles();
}, false);