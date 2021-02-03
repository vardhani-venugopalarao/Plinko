// define variables and constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var ground
var Division1
var particle
var grounds = [];
var particles = [];
var plinkos = [];
var divisions = [];
var textPos = [];
var divisionX = [];
var divisionHeight = 300;

var score = 0;
var turn = 0;

var gameState = "play";

var randScore1, randScore2, randScore3, highestRandScore;

function setup()
{
  // create canvas
  createCanvas(490,800);

  // create engine and put inside world
  engine = Engine.create();
  world = engine.world;

  // make textPos start from left wall for first text
  textPos.push(5);

  // make random numbers for scores for each division and multiply by 50 later
  randScore1 = Math.round(random(1, 10));
  randScore2 = Math.round(random(1, 10));
  randScore3 = Math.round(random(1, 10));
  // find the highest one for finding highest possible score
  if(randScore1 > randScore2 && randScore1 > randScore3)
  {
    highestRandScore = randScore1;
  }
  else
  {
    if(randScore2 > randScore1 && randScore2 > randScore3)
    {
      highestRandScore = randScore2;
    }
    else
    {
      if(randScore3 > randScore1 && randScore3 > randScore2)
      {
        highestRandScore = randScore3;
      }
      else
      {
        highestRandScore = randScore1;
      }
    }
  }

  // make ground
  ground = new Ground(width/2, height-10, width, 20);
  // make right and left wall
  lWall = new Division(5, height/2, 10, height);
  rWall = new Division(485, height/2, 10, height);

  // make divisions and grounds
  for(var i = 85; i <= width-5; i += 80)
  {
    if(i != width-5)
    {
      divisions.push(new Division(i, height - divisionHeight/2, 10, divisionHeight));
      textPos.push(i);
    }
    grounds.push(new Ground(i - 85/2 + 2.5, height - 10, 80, 20));
    divisionX.push(i);
  }
  // make rows of plinkos
  for(var j = 45; j <= width; j += 50)
  {
    plinkos.push(new Plinko(j, 75, 10));
  }
  for(var j = 20; j <= width; j += 50)
  {
    plinkos.push(new Plinko(j, 175, 10));
  }
  for(var j = 45; j <= width; j += 50)
  {
    plinkos.push(new Plinko(j, 275, 10));
  }
  for(var j = 20; j <= width; j += 50)
  {
    plinkos.push(new Plinko(j, 375, 10));
  }

  // run the engine
  Engine.run(engine);
}

function draw()
{
  // make darker background
  background(55);

  // display ground and walls
  ground.display(rgb(23, 236, 236));
  lWall.display(rgb(23, 236, 236));
  rWall.display(rgb(23, 236, 236));

  // draw yellow line
  strokeWeight(3);
  stroke("yellow");
  line(0, height - (divisionHeight + 20), width, height - (divisionHeight + 20));

  // display everything
  for(var i = 0; i < divisions.length; i++)
  {
    divisions[i].display(rgb(23, 236, 236));
  }
  for(var j = 0; j < plinkos.length; j++)
  {
    plinkos[j].display();
  }
  for(var k = 0; k < particles.length; k++)
  {
    particles[k].display();
  }
  // display grounds with different colours
  for(var l = 0; l < grounds.length; l++)
  {
    if (l === 1 || l === grounds.length - 2)
    grounds[l].display(rgb(255, 173, 47));

    if (l === 2 || l === grounds.length - 3)
    grounds[l].display(rgb(255, 255, 0));
    else
    {
      if(l === 0 || l === grounds.length - 1)
      {
        grounds[l].display(rgb(160, 255, 47));
      }
    }
  }

  // make textSize 20
  textSize(20);
  // display score over divisions
  for(var m = 0; m < textPos.length; m++)
  {
    if (m === 1 || m === textPos.length - 2)
      text(randScore2*50, textPos[m] + 25, height - (divisionHeight - 20));

    if (m === 2 || m === textPos.length - 3)
      text(randScore3*50, textPos[m] + 25, height - (divisionHeight - 20));

    else
    {
      if(m === 0 || m === textPos.length - 1)
      {
        text(randScore1*50, textPos[m] + 25, height - (divisionHeight - 20))
      }
    }
  }
  
  // display text score out of highest possible score
  textSize(15);
  text("Score: " + score + "/" + highestRandScore*250, 350, 25);

  // if the game is over
  if(gameState === "end")
  {
    // if the player did not get the highest possible score
    textSize(23);
    if(score !== highestRandScore*250)
    {
      text("GAME OVER! Your score was " + score, 80, 240);
    }
    else
    {
      // if the player did get the highest possible score
      if(score === highestRandScore*250)
      {
        text("YOU WIN! Your score was " + score, 80, 240);
      }
    }
  }

  // if the player has had five turns the game is over
  if(turn >= 5)
  {
    gameState = "end";
  }

  // display particle if it exists
  if(particle != null)
  {
    particle.display();

    // calculate score
    if(particle.body.position.y >= height - 30)
    {
      turn ++;
      if(particle.body.position.x < divisionX[0])
      {
        score += randScore1*50;
        particle = null;
      }
      else
      {
        if(particle.body.position.x < divisionX[1])
        {
          score += randScore2*50;
          particle = null;
        }
        else
        {
          if(particle.body.position.x < divisionX[2])
          {
            score += randScore3*50;
            particle = null;
          }
          else
          {
            if(particle.body.position.x < divisionX[3])
            {
              score += randScore3*50;
              particle = null;
            }
            else
            {
              if(particle.body.position.x < divisionX[4])
              {
                score += randScore2*50;
                particle = null;
              }
              else
              {
                if(particle.body.position.x < divisionX[5])
                {
                  score += randScore1*50;
                  particle = null;
                }
              }
            }
          }
        }
      }
    }
  }
}

// if the mouse is released create a new particle at the mouseX
function mouseReleased()
{
  if(gameState !== "end")
  {
    particle = new Particle(mouseX, 20, 10, 10);
  }
}
