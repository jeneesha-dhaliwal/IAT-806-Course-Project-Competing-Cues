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


// button and slider references
let nextBtn, sourceBtn1, sourceBtn2, toneBtn1, toneBtn2, credibilitySlider;

function setup(){
  let p5canvas = createCanvas(1300, 720);
  gui = GUI.get(p5canvas); 
	
	//creating posts
	introPost = new IntroPost();
	summaryPost = new SummaryPost();
	endPost = new EndPost();
	newsEmotionPost = new NewsPost('Oceans are boiling! Experts warn humanity is running out of time as marine life faces mass extinction from record-breaking heat.', 'Emotion');
	newsNeutralPost = new NewsPost('Scientists report rising ocean temperatures linked to ongoing climate trends and call for continued global monitoring efforts.', 'Neutral');
	aiEmotionPost = new AIPost('Oceans are boiling! Experts warn humanity is running out of time as marine life faces mass extinction from record-breaking heat.', 'Emotion');
	aiNeutralPost = new AIPost('Scientists report rising ocean temperatures linked to ongoing climate trends and call for continued global monitoring efforts.', 'Neutral');
	
	// put all posts in array - POLYMORPHISM
	posts = [introPost, newsNeutralPost, aiEmotionPost, newsEmotionPost, aiNeutralPost, summaryPost, newsNeutralPost, aiEmotionPost, newsEmotionPost, aiNeutralPost, endPost]; 

	
	
  // the canvasGUI controls will be created below, as instructed by CanvasGUI (p5.js library)

  // next button
  nextBtn = gui.button('nextBtn', 1190, 630, 100, 50)
    .text('Next')
    .textSize(22)
    .scheme('blue')
    .setAction((info) => {
      // Save rating
      credibilityRatings[currentPostIndex] = sliderValue;
      // Reset slider
      gui.$('credibilitySlider').value(0);
      sliderValue = 0;
      nextPost = true;
    });

  // source button
  sourceBtn1 = gui.button('sourceBtn1', 10, 600, 100, 40)
    .text('Source')
    .textSize(20)
    .scheme('blue')
    .setAction(() => sourceButton = true);
	
 //button to close source button
  sourceBtn2 = gui.button('sourceBtn2', 110, 600, 50, 40)
    .text('x')
    .textSize(20)
    .scheme('blue')
    .setAction(() => sourceButton = false);

  // tone button
  toneBtn1 = gui.button('emotionBtn1', 10, 530, 100, 40)
    .text('Tone')
    .textSize(20)
    .scheme('blue')
    .setAction(() => toneButton = true);

	//button to close tone button
  toneBtn2 = gui.button('emotionBtn2', 110, 530, 50, 40)
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

  // hide tone/source buttons at the beginning
  sourceBtn1.hide();
  sourceBtn2.hide();
  toneBtn1.hide();
  toneBtn2.hide();

  // hide slider at the beginning
  credibilitySlider.hide();
}

function draw(){
  push();
  background(240);

 // CanvasGUI (p5.js library) instructed me to add my own code here

  showPost();
  sourceButtonInfo();
  toneButtonInfo();
titleTexts();
 

	// CanvasGUI (p5.js library) instructed me to leave this code at the bottom of the draw() to ensure buttons show
  pop();
  gui.draw(); 
}


function showPost() {
  if (currentPostIndex < posts.length) {
    posts[currentPostIndex].display(); //first displays posts[0] since I set currentPost = 0 globally
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

  // move to next post when "Next" pressed
  if (nextPost === true && currentPostIndex < posts.length) {
    currentPostIndex++; //increments currentPostIndex by one with each button press
    nextPost = false;
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
    if (currentPostIndex == 6 || currentPostIndex == 8) rect(530, 150, 220, 30);
    else if (currentPostIndex == 7 || currentPostIndex == 9) rect(530, 150, 200, 30);
    pop();

    fill(0);
    textSize(18);
    textAlign(LEFT);

    // educational prompts and reflections about source cues
    if (currentPostIndex == 6 || currentPostIndex == 8) {
      sourceInfo('Human-written content tends to activate authority and social presence heuristics, which signal expertise and warmth.');
      sourceInfo('Reflection: Did you notice yourself trusting this post more because it felt human?', 175, 500);

    } else if (currentPostIndex == 7 || currentPostIndex == 9) {
      sourceInfo('AI sources can trigger machine heuristics: Some people assume AI is more objective and data-driven, a positive heuristic. Others see AI as rigid or lacking human judgment, a negative heuristic that can reduce trust.');
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
	  
    // educational prompts and reflections about tone cues
    if (currentPostIndex == 6 || currentPostIndex == 9) {
      toneInfo('News that avoids emotional wording may help people evaluate information more clearly by reducing emotional bias.');
      toneInfo('Reflection: Did the use of neutral tone influence how credible you thought this post was?', 1150, 600);

    } else if (currentPostIndex == 7 || currentPostIndex == 8) {
      toneInfo('When news headlines use strong emotional language, people may be more likely to believe them. This is because emotional reactions can override careful thinking.');
      toneInfo('Reflection: How do emotional headlines affect your own judgment of credibility?', 1150, 600);
    }
  }
}


//mimicking overloading, stackoverflow source (https://stackoverflow.com/questions/456177/function-overloading-in-javascript-best-practices) said that you can mimic overloading in p5.js using default settings
function toneInfo(infoContent, x = 1150, y = 400){ 
  fill(0);
  textSize(18);
  text(infoContent, x, y, 270, 400);
}

function sourceInfo(sourceContent, x = 175, y = 300){ 
  fill(0);
  textAlign(LEFT);
  textSize(18);
  text(sourceContent, x, y, 270, 400);
}


function titleTexts(){ //conditionals for when to draw various titles onto the interface
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


//--------------------------------------- CLASSES/OOP ---------------------------------------

//Post Class - abstract superclass 
class Post {
	constructor(userName, userNameHandle, postContent, emotionLevel, postDate){
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
		this.emotionLevel = emotionLevel; //specifying the tone type (emotional or neutral)
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


//AI Post - subclass of Post - Inheriting from Post Class & Overriding aspects of the display 
class AIPost extends Post {  
  constructor(postContent, emotionLevel) {
	  // hardcode the AI name + handle 
    super("AI News Assistant", "@AI_News_Assistant", postContent, emotionLevel, '12:00PM • Oct 2 2025');
  }

  display() {
    super.display(); // draw the normal post

	   // override to add AI-specific look
    fill(192);
    ellipse(460, 180, 100, 100);
    fill(255);
    textSize(128);
    text('A', 418, 220);
  }
}


//News Post - subclass of Post -  Inheriting from Post Class & Overriding
class NewsPost extends Post {
  constructor(postContent, emotionLevel) {
	  // hardcode the Human/news name + handle
    super("People's Daily News", "@Peoples_Daily_News", postContent, emotionLevel, '12:00PM • Oct 2 2025');
  }

  display() {
    super.display(); // draw the normal post

	  // override to add News-specific look
    fill(192);
    ellipse(460, 180, 100, 100);
    fill(255);
    textSize(132);
    text('P', 419, 229);
  }
}


//Introduction Post that contains instructions for user -subclass of Post -  Inheriting from Post Class & Overriding
class IntroPost extends Post {
  constructor() {
		super('', '', '', '');
  } 

  display() {
    super.display(); // draw the normal post

	  // override to add instructions to teach user how to use this program
		fill(0);
		textSize(21);
		textAlign(CENTER);
		text('Every day, we encounter countless posts online, some may seem credible, while others may not.',
  650, 330, 500, 400);
text( 'In this activity, you will see four posts. Using the slider, rate how credible each post feels to you on a scale from 0 to 5.',
  650, 420, 500, 400);

		text('Press "Next" to begin!', 650, 540, 500, 400);
  }
}



//Summary Post that contains updates for user -subclass of Post -  Inheriting from Post Class & Overriding
class SummaryPost extends Post {
  constructor() {
		super('', '', '', '');
  } 

  display() {
    super.display();  // draw the normal post
	  
credibilityRatings[0] = -1;
	   let maxValue = Math.max(...credibilityRatings);
    let maxIndex = credibilityRatings.indexOf(maxValue);

    console.log("Max credibility rating:", maxValue);
    console.log("Rated post index:", maxIndex);
	

	  //override to include summary details 
		fill(0);
		textSize(21);
		textAlign(CENTER);
		text('You have completed the ratings.',
  650, 330, 500, 400);
text( 'You found _______ most credible. What led to this decision?',
  650, 380, 500, 400);
	  text( 'Explore how Source and Tone cues may have competed to influence your judgement.',
  650, 450, 500, 400);
		text('Press "Next" to continue!', 650, 540, 500, 400);
  }

}


//End Post to wrap up the program -subclass of Post - Inheriting from Post Class & Overriding
class EndPost extends Post {
  constructor() {
		super('', '', '', '');
  } 

  display() {
    super.display();  // draw the normal post

	  //override to include summary details 
		fill(0);
		textSize(21);
		textAlign(CENTER);
		text('You have reached the end of this activity.',
  650, 330, 500, 400);
text( 'Take a moment to reflect: Which cue do you think influenced your perception of credibility more:',
  650, 380, 500, 400);
	  textStyle(BOLD);
	  fill(188, 71, 73);
	  text( 'Source or Tone?',
  650, 450, 500, 400);
	  fill(0);
	  textStyle(NORMAL);
		text('Next time you are scrolling through social media, take a moment to notice which cues may be competing for your attention and why.', 650, 500, 500, 400);
  }
}