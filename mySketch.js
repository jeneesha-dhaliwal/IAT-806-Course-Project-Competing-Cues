//Jeneesha Dhaliwal, Alireza Karduni, Philippe Pasquier
//IAT 806 - Course Project - Competing Cues
//Interactive buttons and sliders made using CanvasGUI - A p5.js library created by Peter Lager (http://www.lagers.org.uk/canvasgui/index.html)

//declaring variables that will be used in the program
let newsEmotionPost; 
let newsNeutralPost; 
let aiEmotionPost;
let aiNeutralPost;
let introPost;
let summaryPost;
let endPost;
let nextPost;
let currentPostIndex = 0; 
let gui; 
let posts = []; 
let sourceButton;
let toneButton;
let sliderValue;
let credibilityRatings = [];
let nextBtn;  
let sourceBtn1; 
let sourceBtn2; 
let toneBtn1;
let toneBtn2; 
let credibilitySlider;
let content = [];
let emotionalContent; 
let neutralContent;

//File Processing, loading emotional and netural content for simulated social media posts using .txt file
function preload(){
	content = loadStrings('content.txt');
}


function setup(){
  let p5canvas = createCanvas(1300, 720);
  gui = GUI.get(p5canvas); 

  //Extracting emotional (high valence & high arousal) and neutral (low valence & low arousal) content to add to simulated social media posts 
  emotionalContent = content[0];
  neutralContent = content[1];
	
  //Creating posts
  introPost = new IntroPost();
  summaryPost = new SummaryPost();
  endPost = new EndPost();
  newsEmotionPost = new NewsPost(emotionalContent);
  newsNeutralPost = new NewsPost(neutralContent);
  aiEmotionPost = new AIPost(emotionalContent);
  aiNeutralPost = new AIPost(neutralContent);
	
  // Polymorphism: Add all posts into a single array
  posts = [introPost, newsNeutralPost, aiEmotionPost, aiNeutralPost, newsEmotionPost, summaryPost, newsNeutralPost, aiEmotionPost, aiNeutralPost, newsEmotionPost, endPost]; 

	
  // The CanvasGUI controls will be created below, as instructed by CanvasGUI (p5.js library)

  // Next button
  nextBtn = gui.button('nextBtn', 1190, 630, 100, 50)
    .text('Next')
    .textSize(22)
    .scheme('blue')
    .setAction((info) => {
      // Save credibility rating
      credibilityRatings[currentPostIndex] = sliderValue;
      // Resetting credibility slider
      gui.$('credibilitySlider').value(0);
      sliderValue = 0;
      nextPost = true;
    });

  //Source button
  sourceBtn1 = gui.button('sourceBtn1', 10, 600, 100, 40)
    .text('Source')
    .textSize(20)
    .scheme('blue')
    .setAction(() => sourceButton = true);
	
 //Button to close source button
  sourceBtn2 = gui.button('sourceBtn2', 110, 600, 50, 40)
    .text('x')
    .textSize(20)
    .scheme('blue')
    .setAction(() => sourceButton = false);

  // Tone button
  toneBtn1 = gui.button('toneBtn1', 10, 530, 100, 40)
    .text('Tone')
    .textSize(20)
    .scheme('blue')
    .setAction(() => toneButton = true);

	//Button to close tone button
  toneBtn2 = gui.button('toneBtn2', 110, 530, 50, 40)
    .text('x')
    .textSize(20)
    .scheme('blue')
    .setAction(() => toneButton = false);

  // Credibility slider
  credibilitySlider = gui.slider('credibilitySlider', 500, 530, 300, 30)
    .scheme('blue')
    .opaque()
    .ticks(5,0)
    .value(0)
    .limits(0, 5)
    .setAction((info) => sliderValue = info.value);

  //Hide tone/source buttons at the beginning
  sourceBtn1.hide();
  sourceBtn2.hide();
  toneBtn1.hide();
  toneBtn2.hide();

  //Hide slider at the beginning
  credibilitySlider.hide();
}

function draw(){
  push();
  background(240);

  // CanvasGUI (p5.js library) instructed me to add my own code here
  showPost();
  sourceButtonInfo();
  toneButtonInfo();
  programTexts();
 

  // CanvasGUI (p5.js library) instructed me to leave this code at the bottom of the draw() to ensure buttons show
  pop();
  gui.draw(); 
}


function showPost() {
  if (currentPostIndex < posts.length) {
    posts[currentPostIndex].display(); //First displays posts[0] since I set currentPostIndex = 0 globally
  } 

  // Only show Tone and Source buttons for posts[6] to posts[9]
  if (currentPostIndex >= 6 && currentPostIndex <= 9) {
    sourceBtn1.show();
    sourceBtn2.show();
    toneBtn1.show();
    toneBtn2.show();
  } else {
    sourceBtn1.hide();
    sourceBtn2.hide();
    toneBtn1.hide();
    toneBtn2.hide();
  }

  // Only show Credibility slider for posts[1] to posts[4]
  if (currentPostIndex >= 1 && currentPostIndex <= 4) {
    credibilitySlider.show();
  } else {
    credibilitySlider.hide();
  }

  if(currentPostIndex > 9){
		nextBtn.hide();
  }

  // Move to next post when "Next" pressed
  if (nextPost === true && currentPostIndex < posts.length) {
    currentPostIndex++; //Increments currentPostIndex by one with each button press
    nextPost = false;
  }
}


function programTexts(){ //Conditionals for when to draw various texts, titles, and labels onto the interface
	if (currentPostIndex >= 6 && currentPostIndex <= 9){
		 fill(0);
  textSize(20);
  textAlign(LEFT);
	noStroke();
  text('Learn More:', 10, 500);
	} if(currentPostIndex >=1 && currentPostIndex <=4) {
		fill(0);
      textSize(20);
      textAlign(CENTER);
      noStroke();
      text('How Credible do you find this post?', 650, 500);
      textSize(15)
      text('0', 510, 580);
      text('1', 565, 580);
      text('2', 622, 580);
      text('3', 678, 580);
      text('4', 734, 580);
	   text('5', 789, 580);
	   text('Least credible', 510, 620, 50, 50);
	   text('Most credible', 789, 620, 50, 50);
	} if(currentPostIndex >=0 && currentPostIndex <=4){
		fill(0);
      textSize(25);
      textAlign(CENTER);
	   noStroke();
      text('What influences your perception of credibility?', width/2, 50);
	} if(currentPostIndex >=5 && currentPostIndex <=9){
		fill(0);
      textSize(25);
      textAlign(CENTER);
	   noStroke();
      text('Competing Cues: What influences your perception of credibility?', width/2, 50);
	}
}


function maxResult(maxIndex){ //used to summarize credibility ratings for the SummaryPost
	if(maxIndex == 1){
		return 'a human-written news source using neutral tone'
	}
	if(maxIndex == 2){
		return 'an AI source using emotional tone'
	}
	if(maxIndex == 3){
		return 'an AI source using neutral tone'
	}
	if(maxIndex == 4){
		return 'a human-written news source using emotional tone'
	}
}

// ---------------------- Information to be shown during Source and Tone button clicks ----------------------
function sourceButtonInfo(){
  if (sourceButton == true && currentPostIndex >= 6 && currentPostIndex <= 9){

    // Draw yellow highlight on username of post
    push();
    fill(252, 243, 0, 95);
    noStroke();
    rectMode(CORNER);
    if (currentPostIndex == 6 || currentPostIndex == 9) rect(530, 150, 220, 30);
    else if (currentPostIndex == 7 || currentPostIndex == 8) rect(530, 150, 200, 30);
    pop();

    fill(0);
    textSize(18);
    textAlign(LEFT);

    // Educational prompts and reflections about source cues
  if (currentPostIndex == 6 || currentPostIndex == 9) { //Information on a human-written news outlet being the source of the post
	 stroke(0);
	 strokeWeight(2);
	 line(310, 150, 380, 150);
	 strokeWeight(1);
	 fill(118, 63, 163);
	 rect(170, 145, 280, 120, 10, 10, 10, 10);
    sourceInfo('Human-written content tends to activate authority and social presence heuristics, which signal expertise and warmth.');

	 stroke(0);
	 strokeWeight(2);
	 line(290, 330, 380, 150);
	 strokeWeight(1);
	 fill(227, 100, 20);
	 rect(160, 330, 260, 90, 10, 10, 10, 10);
    sourceInfo('Reflection: Did you notice yourself trusting this post more because it felt human?', 175, 500);

    } else if (currentPostIndex == 7 || currentPostIndex == 8) { //Information on an AI Assistant being the source of the post
		stroke(0);
		strokeWeight(2);
		line(310, 150, 380, 150);
		strokeWeight(1);
		fill(118, 63, 163);
		rect(170, 175, 280, 170, 10, 10, 10, 10);
      sourceInfo('AI sources can trigger machine heuristics: Some people assume AI is more objective and data-driven, a positive heuristic. Others see AI as rigid or lacking human judgment, a negative heuristic that can reduce trust.');

		stroke(0);
		strokeWeight(2);
		line(290, 330, 380, 150);
		strokeWeight(1);
		fill(227, 100, 20);
		rect(160, 330, 260, 90, 10, 10, 10, 10);
		sourceInfo('Reflection: Which side of the machine heuristic do you lean most towards?', 175, 500);
    }
  }
}

function toneButtonInfo(){
  if (toneButton == true && currentPostIndex >= 6 && currentPostIndex <= 9){

    // Draw red outline box around post content to draw attention to tone used in post
    push();
    noFill();
    stroke(217, 4, 41);
    strokeWeight(3);
    rectMode(CORNER);
    rect(400, 240, 470, 110);
    pop();

    fill(0);
    textSize(18);
    textAlign(LEFT);
	  
    // Educational prompts and reflections about tone cues
    if (currentPostIndex == 6 || currentPostIndex == 8) { //Information on the use of neutral tone (low valence & low arousal)
		stroke(0);
		strokeWeight(2);
		line(920, 240, 1005, 240);
		strokeWeight(1);
		fill(58, 124, 165);
		rect(1130, 250, 250, 140, 10, 10, 10, 10);
      toneInfo('News that avoids emotional wording may help people evaluate information more clearly by reducing emotional bias.');

		stroke(0);
		strokeWeight(2);
		line(920, 240, 1005, 430);
		strokeWeight(1);
		fill(227, 100, 20);
		rect(1145, 430, 280, 100, 10, 10, 10, 10);
      toneInfo('Reflection: Did the use of neutral tone influence how credible you thought this post was?', 1150, 600);

    } else if (currentPostIndex == 7 || currentPostIndex == 9) { //Information on the use of emotional tone (high valence & high arousal)
 		stroke(0);
		strokeWeight(2);
		line(920, 240, 1005, 430);
		strokeWeight(1);
		fill(227, 100, 20);
		rect(1135, 435, 260, 100, 10, 10, 10, 10);
      toneInfo('Reflection: How do emotional headlines affect your own judgment of credibility?', 1150, 600);
		
		
		strokeWeight(2);
		line(920, 240, 1005, 240);
		strokeWeight(1);
		fill(58, 124, 165);
		rect(1140, 265, 280, 150, 10, 10, 10, 10);
      toneInfo('When news headlines use strong emotional language, people may be more likely to believe them. This is because emotional reactions can override careful thinking.');


    }
  }
}


//Mimicking overloading, stackoverflow source (https://stackoverflow.com/questions/456177/function-overloading-in-javascript-best-practices) said that you can mimic overloading in p5.js using default settings
// Examples of overloading using the toneInfo function can be seen on lines 263 and 272
function toneInfo(infoContent, x = 1150, y = 400){ 
  fill(255);
  textSize(18);
  text(infoContent, x, y, 270, 400);
}

function sourceInfo(sourceContent, x = 175, y = 300){ 
  fill(255);
  textAlign(LEFT);
  textSize(18);
  text(sourceContent, x, y, 270, 400);
}


//--------------------------------------- CLASSES/OOP ---------------------------------------

//Post Class - Abstract Superclass 
class Post {
	constructor(userName, userNameHandle, postContent, postDate){
		this.xPost = 650; //post properties
		this.yPost = 250;
		this.wPost = 540;
		this.hPost = 290;
		this.bRadius =  10;
		this.diameterPic = 100;
		this.userName = userName; //userName properties
		this.xUserName = 530;
		this.yUserName = 175;
		this.userHandle = userNameHandle; //userHandle properties
		this.xUserHandle = 530;
		this.yUserHandle = 205;
		this.postContent = postContent; //postContent properties
		this.xPostContent = 660;
		this.yPostContent = 400;
		this.postDate = postDate; //postDate properties
		this.xPostDate = 403;
		this.yPostDate = 370;
	}
	
	display(){
		stroke(0); //post stroke
		fill(255); //post fill
		rectMode(CENTER); //UserName size
		rect(this.xPost, this.yPost, this.wPost, this.hPost, this.bRadius); //UserName

		noStroke(); //UserName stroke
		fill(0); //Username fill
		textSize(23);
		text(this.userName, this.xUserName, this.yUserName);

		textSize(16); //userHandle size
		text(this.userHandle, this.xUserHandle, this.yUserHandle); //userhandle

		textSize(23); //postContent size
		text(this.postContent, this.xPostContent, this.yPostContent, 510, 300); //postContent

		textSize(15); //postDate size
		text(this.postDate, this.xPostDate, this.yPostDate); //postDate
	}
}


//AI Post - Subclass of Post - Inheriting from Post Class & Overriding aspects of the display 
class AIPost extends Post {  
  constructor(postContent) {
	  // hardcode the AI Assitant's name + handle 
    super("AI News Assistant", "@AI_News_Assistant", postContent, '12:00PM Oct 2 2025');
  }

  display() {
    super.display(); // Draw the normal post, as outlined in the post class

	 //Override to add AI-specific look
    fill(192);
    ellipse(460, 180, 100, 100);
    fill(255);
    textSize(128);
    text('A', 418, 220);
  }
}


//Human-Written News Post (called "NewsPost" for short) - Subclass of Post -  Inheriting from Post Class & Overriding
class NewsPost extends Post {
  constructor(postContent) {
	  // hardcode the human-written news outlet name + handle
    super("People's Daily News", "@Peoples_Daily_News", postContent, '12:00PM Oct 2 2025');
  }

  display() {
    super.display(); // Draw the normal post, as outlined in the post class

	  // Override to add News-specific look
    fill(192);
    ellipse(460, 180, 100, 100);
    fill(255);
    textSize(132);
    text('P', 419, 229);
  }
}


//Introduction Post that contains instructions for user - Subclass of Post -  Inheriting from Post Class & Overriding
class IntroPost extends Post {
  constructor() {
	 super('', '', '', '');
  } 

  display() {
    super.display(); // Draw the normal post, as outlined in the post class

	  // Override to add instructions to teach user how to use this program
		fill(0);
		textSize(21);
		textAlign(CENTER);
		text('Every day, we encounter countless posts online, some may seem credible, while others may not.', 650, 330, 500, 400);
      text( 'In this activity, you will see four posts. Using the slider, rate how credible each post feels to you on a scale from 0 to 5.', 650, 420, 500, 400);
		text('Press "Next" to begin!', 650, 540, 500, 400);
  }
}



//Summary Post - Subclass of Post -  Inheriting from Post Class & Overriding
class SummaryPost extends Post {
  constructor() {
	 super('', '', '', '');
  } 

  display() {
    super.display();  // Draw the normal post, as outlined in the post class
	  
    credibilityRatings[0] = -1;
	 let maxValue = Math.max(...credibilityRatings);  //learned to use math.max using this YouTube source: https://www.youtube.com/watch?v=0bu1l4DK23M
    let maxIndex = credibilityRatings.indexOf(maxValue);
	

	//Override to include summary details 
	 fill(0);
	 textSize(21);
	 textAlign(CENTER);
	 textStyle(BOLD);
	 fill(188, 71, 73);
    text( `You found ${maxResult(maxIndex)} most credible.`, 650, 330, 500, 400);
	 textStyle(NORMAL);
	 fill(0);
	 text( 'What led to that decision?', 650, 400, 505, 400);
	 text( 'Explore how Source and Tone cues may have competed to influence your judgement.', 650, 450, 520, 400);
	 text('Press "Next" to continue!', 650, 550, 500, 400);
  }

}


//End Post to wrap up the program - Subclass of Post - Inheriting from Post Class & Overriding
class EndPost extends Post {
  constructor() {
	 super('', '', '', '');
  } 

  display() {
    super.display();  // Draw the normal post, as outlined in the post class

	 //Override to include summary details 
	 fill(0);
	 textSize(21);
	 textAlign(CENTER);
	 text('You have reached the end of this activity.', 650, 330, 500, 400);
    text( 'Take a moment to reflect: Which cue do you think influenced your perception of credibility more:', 650, 380, 500, 400);
	 textStyle(BOLD);
	 fill(188, 71, 73);
	 text( 'Source or Tone?', 650, 450, 500, 400);
	 fill(0);
	 textStyle(NORMAL);
	 text('Next time you are scrolling through social media, take a moment to notice which cues may be competing for your attention and why.', 650, 500, 500, 400);
  }
}
