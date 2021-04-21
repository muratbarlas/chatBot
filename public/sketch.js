var chat_input;
var chat_button;
var theFont;
let img, img2;

var question = ""
var reply = ""

function preload() {
  img = loadImage('bubbleLeft.png');
  img2 = loadImage('bubbleRight.png');
  theFont = loadFont('SHPinscher-Regular.otf');
}



var show_text = "";

var apple_respones = ["I love Apple products", "Can't wait for iPhone 13", "Steve Jobs is my idol"]

var covid_responses = ["Get your vaccine!", "TurboVax <3 me", "#vaccinatenewyork", "Wear your mask!"];

var food_responses = ["I should start cooking more", "I should do more meatless Mondays", "I love burgers and fries"];

var politics_responses = ["Register to vote", "I don't think we're fully appreciating not having to hear what Trump is thinking right now", "Please stop Kanye West from running for president"];

var env_responses = ["Every nation should join Paris Climate Agreement", "Aiming for net zero emissions by 2050", "I stand by Greta Thunberg"];

function setup() {
  createCanvas(1200, 800);
  background('#b3ecff');
  img.resize(600, 0);
  img2.resize(600, 0);
  
  chat_input = createInput();
  chat_input.position(520,100)
  chat_input.size(350);

  chat_button = createButton("Enter");
  chat_button.position(890, 100);
  chat_button.mousePressed(enteredChat);

  

  // set up socket
  socket = io.connect('http://localhost:3000');
  socket.on('guess', makeAGuess);
}

function enteredChat(){
  question = chat_input.value();
  socket.emit('guess', question);
}

function makeAGuess(data){
  if(data == 'apple'){
    reply = apple_respones[floor(random(0, apple_respones.length))]
    
  } else if(data == 'covid'){
    reply = covid_responses[floor(random(0, covid_responses.length))]
  }
  else if(data == 'food'){
    reply = food_responses[floor(random(0, food_responses.length))]
  }
  else if(data == 'environment'){
    reply = env_responses[floor(random(0, env_responses.length))]
  }
  else if(data == 'politics'){
    reply = politics_responses[floor(random(0, politics_responses.length))]
  }

}

function draw() {
  image(img, 100, 400);
  image(img2,500, 150);
 

  push()
  fill("white")
  noStroke()
  rect(550, 260, 20, 20)
  rect(630, 510, 20, 20)
  pop()
  
  textFont(theFont);
  push();
  textSize(52);
  text("Tell me something about Apple, Covid-19, politics, environment, or food!", 30, 60, 950)
  pop();
  textSize(32);
  text(question, 550, 200, 500)
  text(reply, 150, 450, 500)
   
}

