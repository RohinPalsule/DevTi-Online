// Task structure (IF BLOCKED TYPE "blocked" IF INTERLEAVED TYPE "interleaved")
taskStructure = "interleaved"
let blocks = null
if (taskStructure == "blocked"){
  blocks = 8
  n_learning_trial=15 //This determine the number of learning trial you want in total
  n_direct_trial=15 //how many direct trial you want
}
else if (taskStructure == "interleaved"){
  blocks = 4
  n_learning_trial=30 //This determine the number of learning trial you want in total
  n_direct_trial=30 //how many direct trial you want
}


//debug moode on/off

debugmode= false
if (debugmode==true){
  kickout_record=0
  kickout_total=2
  ac_colortotal=9
  n_learning_trial=5 //This determine the number of learning trial you want in total
  n_direct_trial=5 //how many direct tests you want
  n_shortest_trial=5 //how many inference trials you want
  n_prac_learning_trial = 4
  n_prac_direct_trial = 4
}else{
  kickout_record=0
  kickout_total=2
  ac_colortotal=9
  n_shortest_trial=15 //how many inference trials you want
  n_prac_learning_trial = 4
  n_prac_direct_trial = 4
}

//warningpage
warning=0 //this is to start the counter of total warning
warning_1="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5;color:red'>Warning, you are missing too many trials, make sure to press the key '1' when you see a blue cross flash and '2' when you see a green one. If you keep missing trials you will be disqualified.</p>"
var checkfail = 0 //this is to start the attentioncheck
let cummulative_checkfail = 0 // ^
let practice_threshold = 2 // number of reattempts for practice learn remember
let checkthreshold=2 //this is to add the threshold for attentioncheck
let cummulative_cf_warning = 10 // this is the threshold for how many total wrong checks will give them a warning
let cummulative_cf_threshold = 15 // this is the threshold for how many total wrong checks to boot them from the experiment

// Learning text

learning_text = "<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 55px;margin-bottom:40px'><b>LEARNING</b><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",

learningnames = ["learning_text"]
learning_instruct = {learning_text}

// Remembering text

remembering_text = "<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 55px;margin-bottom:40px'><b>REMEMBERING</b><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",

rememberingnames = ["remembering_text"]
remembering_instruct = {remembering_text}


//Text for instruction
instruct_1="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 55px;margin-bottom:40px'><b>Welcome!</b></p><p style ='font-size: 30px;line-height:1.5'>This game will test your memory. The game will be broken up into <strong>LEARNING</strong> and <strong>REMEMBERING</strong> parts.<p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_2="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>During the <strong>LEARNING</strong> part, you will see pairs of made up objects presented on the screen. These are pretend objects that don’t exist in the real world. In this phase, you should try your hardest to remember that the two objects go together.</p><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_3="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Each pair will be on the screen for <strong>three and a half seconds</strong>. The best way that we’ve found for people to remember these pairs is to create a story or mental image relating the two objects.<p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_4="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>For example, if you are presented with this pair:</p><img src= '../static/images/introEX.png' width='600' height='400'></img><p style ='font-size: 30px;line-height:1.5'>It may help you to imagine the two items interacting. For example, you could imagine them being stacked on top of one another. Or, you might like use a short story to help you remember the pair. For example, you could imagine the images above as a porcupine (left object) trying to eat a cactus (right object). The story does not have to be realistic or make sense, as long as it’s memorable!</p><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_5=`<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>You will see each pair 4 times while playing this game, which means you will have four chances to teach each pair to yourself. The game will be broken into ${blocks} <strong>LEARNING</strong> and <strong>REMEMBERING</strong> parts. Each learning part will be followed by a remembering part.</p><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>`,
instruct_6="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>In the <strong>REMEMBERING</strong> phase, you will be tested on your memory of these pairs, so try your best to remember these pairs.</p><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_7="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>While you are learning to remember the object pairs, you will also see a cross on the center of your screen like the one below:</p><img src= '../static/images/isi.png' width='150' height='150'><p style ='font-size: 30px;line-height:1.5'>o make sure that you are paying attention on each trial, we will have you do a simple color detection task in addition to learning the pairs. If the cross flashes <span style='color: blue;'>blue,</span> press the '1' key on your keyboard, if it flashes <span style='color: green;'>green,</span> press '2'.<br><br>Now we will do a short practice on these color changes. You will be unable to advance until you get enough of the color check trials correct.<p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",



instruct_8="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Now we will do a practice of the <strong>LEARNING</strong> phase altogether. Make sure to remember the two objects as a pair, and additionally respond '1' when the cross flashes blue, and '2' when it flashes green. Please respond as quickly and as accurately as possible.<p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_9=learning_text

instructnames = ["instruct_1","instruct_2","instruct_3","instruct_4","instruct_5","instruct_6","instruct_7"]// IF you want to add or decrease number of page for instruct, just delete or add var name here.
instruct={instruct_1,instruct_2,instruct_3,instruct_4,instruct_5,instruct_6,instruct_7} // IF you want to add or decrease number of page for instruct, just delete or add var here.


// practice trials

post_instruct_1="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Thank you for completing the practice, we will start the first learning block now. Please make sure to respond to every trial, as too many missed trials will disqualify you from participating. Only the first response will be taken, and please try to respond as quickly and as accurately as possible.</p><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
post_instruct_2=learning_text
post_instructnames = ["post_instruct_1","post_instruct_2"]
post_instruct = {post_instruct_1,post_instruct_2}


//Text for direct memory instruction
instruct_dir_1="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Now, we will do a practice of the <strong>REMEMBERING</strong> phase. In this phase, your job is to show us how well you remember the pairs! You will see one made up object on the top of the screen. You should pick which object on the bottom of the screen was paired with the one on top during <strong><strong>LEARNING</strong></strong>.</p><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
// instruct_dir_1 is for post test learning phase
instruct_dir_3="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>For example, if you had studied the following pair in <strong>LEARNING</strong>:</p><img src= '../static/images/introEX.png' width='700' height='500'><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_dir_4="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>And in <strong>REMEMBERING</strong> were shown this:</p><img src= '../static/images/introEX2.png' width='700' height='500'><p style ='font-size: 30px;line-height:1.5'>You would press '1', as the hot pink image on the left was paired with the green image at the top. Now you will do a practice of the <strong>REMEMBERING</strong> phase.<p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>"
instruct_dir_2="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>To pick the object on the left, press '1'. To pick the object in the middle, press '2', and to pick the object on the right, press '3'.</p><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_dir_5=remembering_text
dir_instructnames = ["instruct_dir_5"] //Same for above, if you want to delete or add, just decrease or add the var
dir_instruct={instruct_dir_5} //same for above

//Text for shortest path instruction
instruct_short_1="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>You may have noticed that some objects were paired with more than one other object.<p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_short_2="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>For example, if you studied the following pairs: </p><img src= '../static/images/introEX3.png' width='700' height='500'><p style ='font-size: 30px;line-height:1.5'>Because the hot pink and peach objects are both paired with the same green object, we say that they are “friends”. So, even though you didn’t see the hot pink and peach objects together, they are still a kind of pair. <p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_short_3="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Now we will test you on these kinds of pairs. This <strong>REMEMBERING</strong> part will be the same as the ones you have done before.<p style= 'font-size:25px;margin-top:50px'>[press the spacebar to continue]</p>",



instruct_short_4=`
<div id = "test" style='margin-left:150px; margin-right:200px; text-justify:auto'>
  <p style='font-size:30px; line-height:1.5; margin-top: 50px'>According to the pairs we just showed you, if you saw this:</p>
  <img src='../static/images/introEX4.png' width='700' height='500'>
  <p style='font-size:30px; line-height:1.5'>Given the example above, which image choice would you choose?</p>

  <br />

  <p style='font-size:30px; line-height:1.5'><strong>Press '1' on your key for the left image, '2' for the middle image, and '3' for the right image.</strong></p>
  
  <p id="feedbackP" style='font-size:30px; margin-top:20px; color:green; visibility:hidden'>Correct!</p>
  <button id="restart-button" style="font-size: 18px; padding: 10px 20px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer; visibility:hidden">Try again!</button>
  <br>
  <button id="advance-button" style="font-size: 18px; padding: 10px 20px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer; visibility:hidden">Continue</button>
</div>
`


instruct_short_5="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Press the '1' key to choose the object on the LEFT, the '2' key to choose the object in the MIDDLE, and the '3' key to choose the object on the RIGHT. If you are unsure of your answer, just try your best to make an educated guess.</p><br /><p style= 'font-size:25px;margin-top:50px'>[press the spacebar to continue]</p>",
short_instructnames = ["instruct_short_1","instruct_short_2","instruct_short_3","instruct_short_4","instruct_short_5"]
short_instruct={instruct_short_1,instruct_short_2,instruct_short_3,instruct_short_4,instruct_short_5} 

//Text for phase 3 instruction
instruct_mem_1="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>In this next portion, you will help your clients book travel to and from specific locations via AerBorn Airlines.</p><br /><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_mem_2="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>You will see a starting location (where your client is located) on the left, and the client's desired destination on the right. </p><br /><img src= '../static/images/StLouis.png' width='120' height='150' style='margin-right:500px'></img><img src= '../static/images/Detroit.png' width='120' height='150'></img><p></p><br /><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_mem_3="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Using your knowledge of the flights offered by AerBorn Airlines, construct a travel plan for each client based on their desired travel destination. The best itinerary is one that minimizes the number of layovers.</p><br /><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_mem_4="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Fill in the appropriate flights by selecting the intermediate locations that will allow your client to get to their destination. </p><br /><img src= '../static/images/Instruction11.png' width='750' height='150'></img><p></p><br /><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
instruct_mem_5="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Click and drag the locations from the top that you wish to place in the gray container as a part of the itinerary. Then, to book a flight click on the two cities and a line will appear connecting them.</p><br /><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>"
instruct_mem_6="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>To remove a flight path, simply click on the two locations again and it will disappear. To remove a city from the itinerary, click on the image and then the return button in the bottom right.</p><br /><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
mem_instructnames = ["instruct_mem_1","instruct_mem_2","instruct_mem_3","instruct_mem_4","instruct_mem_5","instruct_mem_6"]
mem_instruct={instruct_mem_1,instruct_mem_2,instruct_mem_3,instruct_mem_4,instruct_mem_5,instruct_mem_6} 

// Survey questions

let survey_questions = `
<form id="survey">
<p>Did the experiment go smoothly or were there problems? (Note: Your compensation will not depend on your answer below, so please be honest!!!) <span style="color: red;">*</span></p>
<label><input type="radio" name="smooth" value="high" required> It went smoothly</label><br>
<label><input type="radio" name="smooth" value="med"> There were minor bumps</label><br>
<label><input type="radio" name="smooth" value="low"> There were significant problems. I don't think my responses should be included in the data.</label>

<hr>

<p>Which of the following problems did you have? <span style="color: red;">*</span></p>
<label><input type="checkbox" name="problems" value="reload"> Sometimes a page wouldn't load and I would have to reload the page</label><br>
<label><input type="checkbox" name="problems" value="connection"> During the experiment I experienced problems with my internet connection</label><br>
<label><input type="checkbox" name="problems" value="none"> none--Everything ran smoothly</label>

<hr>

<p>Were you doing anything else while participating in this study? PLEASE BE HONEST--your compensation will not depend on your answer to this question. <span style="color: red;">*</span></p>
<textarea id="distraction" name="distraction" rows="3" style="width: 70%;" required></textarea>

<hr>

<p>Please include any strategies you used to help learn during the task. Please be as specific as possible. <span style="color: red;">*</span></p>
<textarea id="strategies" name="strategies" rows="3" style="width: 70%;" required></textarea>

<hr>

<p>Were some trials easier to learn than others? Please explain in detail if so. <span style="color: red;">*</span></p>
<textarea id="easier" name="easier" rows="3" style="width: 70%;" required></textarea>

<hr>

<p>Have you participated in a similar study on another platform? If so, please provide the platform name (Mturk, Prolific, etc.) and your user ID for that platform. <br>PLEASE BE HONEST--your compensation will not depend on your answer to this question. <span style="color: red;">*</span></p>
<textarea id="similar" name="similar" rows="3" style="width: 70%;" required></textarea>

<hr>

<p>Is there anything you would like the experimenters to know? For instance, was the task too difficult, boring, etc?</p>
<textarea id="comments" name="comments" rows="3" style="width: 70%;"></textarea>
<br><br></form>`;


//learning phase

//generate triadLists
practiceTriads = []

practiceTriadList = []
PRACaList = []
PRACbList = []

for (let i = 1;i<5;i++){
  practiceTriads.push([`practice/object_0${i}a.png`, `practice/object_0${i}b.png`])

  PRACaList.push(practiceTriads[i-1][0])
  PRACbList.push(practiceTriads[i-1][1])
}
let practiceTriadArr = [];
for (let i = 0; i < 4; i++) {
  practiceTriadArr.push(i);
}
shuffle(practiceTriadArr)

prac_learn_left=[]
prac_learn_right=[]

for (let i = 0;i<4;i++){
  if (Math.random() < 0.5)  {
    prac_learn_left.push(PRACaList[practiceTriadArr[i]])
    prac_learn_right.push(PRACbList[practiceTriadArr[i]])
  } else {
    prac_learn_left.push(PRACbList[practiceTriadArr[i]])
    prac_learn_right.push(PRACaList[practiceTriadArr[i]])
  }
}


let prac_directRight = []
let prac_directMid = []
let prac_directLeft = []
let prac_directUp = []
let prac_directCorrect = []
let prac_directShort = []
let prac_directFar = []
var prac_directNodes = 0

for(let i = 0;i<prac_learn_left.length;i++){
  prac_directUp.push(PRACaList[i])
  incorrectArr = i
  wrongA = i
  while (i == incorrectArr) {
    incorrectArr = Math.floor(Math.random() * 4)
  } 
  while (i == wrongA) {
    wrongA = Math.floor(Math.random() * 4)
  } 
  threeIndex = Math.floor(Math.random() * 3)+1
  if (threeIndex == 1){
    prac_directLeft.push(PRACbList[i])
    prac_directCorrect.push(PRACbList[i])
    prac_directMid.push(PRACbList[incorrectArr])
    prac_directRight.push(PRACaList[wrongA])
  } else if (threeIndex == 2){
    prac_directRight.push(PRACbList[i])
    prac_directCorrect.push(PRACbList[i])
    prac_directLeft.push(PRACbList[incorrectArr])
    prac_directMid.push(PRACaList[wrongA])
  } else {
    prac_directMid.push(PRACbList[i])
    prac_directCorrect.push(PRACbList[i])
    prac_directRight.push(PRACbList[incorrectArr])
    prac_directLeft.push(PRACaList[wrongA])
  }
}

let prac_directarr = [];
  for (let i = 0; i < prac_directLeft.length; i++) {
    prac_directarr.push(i);
  }
prac_directarr = shuffle(prac_directarr)
prac_directarr = shuffle(prac_directarr)
prac_directarr = shuffle(prac_directarr)
let room_prac_direct_left=[]
let room_prac_direct_mid=[]
let room_prac_direct_right=[]
let room_prac_direct_up=[]
let room_prac_direct_correct=[]
let room_prac_direct_far=[]
let room_prac_direct_short=[]


for(let i = 0;i<prac_directLeft.length;i++){
  room_prac_direct_up.push(prac_directUp[prac_directarr[i]])
  room_prac_direct_left.push(prac_directLeft[prac_directarr[i]])
  room_prac_direct_right.push(prac_directRight[prac_directarr[i]])
  room_prac_direct_mid.push(prac_directMid[prac_directarr[i]])
  room_prac_direct_correct.push(prac_directCorrect[prac_directarr[i]])
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// old list NOT USING

// triadList = []
// aList = []
// bList = []
// cList = []

// for (let i = 1;i<16;i++){
//   if (i <10){
//     triadList.push([`object_0${i}a.png`, `object_0${i}b.png`, `object_0${i}c.png`])
//   }else{
//     triadList.push([`object_${i}a.png`,`object_${i}b.png`,`object_${i}c.png`])
//   }
//   aList.push(triadList[i-1][0])
//   bList.push(triadList[i-1][1])
//   cList.push(triadList[i-1][2])
// }
//


// Initialize lists
let allObjects = [];
let triadList = [];
let aList = [];
let bList = [];
let cList = [];

for (let i = 1; i < 16; i++) {
  let objA = i < 10 ? `object_0${i}a.png` : `object_${i}a.png`;
  let objB = i < 10 ? `object_0${i}b.png` : `object_${i}b.png`;
  let objC = i < 10 ? `object_0${i}c.png` : `object_${i}c.png`;

  allObjects.push(objA, objB, objC);
}

// Fully shuffle all objects
allObjects = shuffleArray(allObjects);

// Create new random triads and split back into lists
for (let i = 0; i < allObjects.length; i += 3) {
  let triad = [allObjects[i], allObjects[i + 1], allObjects[i + 2]];
  triadList.push(triad);

  // Assign back into aList, bList, cList
  aList.push(triad[0]);
  bList.push(triad[1]);
  cList.push(triad[2]);
}

let triadArr = [];
for (let i = 0; i < 15; i++) {
  triadArr.push(i);
}
shuffle(triadArr)

learn_left=[]
learn_right=[]

//need to add blockeed v interleaved
for (let j = 0;j<4;j++){
  for (let i = 0;i<15;i++){
    if (Math.random() < 0.5)  {
      learn_left.push(aList[triadArr[i]])
      learn_right.push(bList[triadArr[i]])
    } else {
      learn_left.push(bList[triadArr[i]])
      learn_right.push(aList[triadArr[i]])
    }
  }
  shuffle(triadArr)
  for (let i = 0;i<15;i++){
    if (Math.random() < 0.5)  {
      learn_left.push(bList[triadArr[i]])
      learn_right.push(cList[triadArr[i]])
    } else {
      learn_left.push(cList[triadArr[i]])
      learn_right.push(bList[triadArr[i]])
    }
  }
  shuffle(triadArr)
}

// Breaking down phases
learn1_ab_left = learn_left.slice(0,15)
learn1_ab_right = learn_right.slice(0,15)

learn1_bc_left = learn_left.slice(15,30)
learn1_bc_right = learn_right.slice(15,30)

learn2_ab_left = learn_left.slice(30,45)
learn2_ab_right = learn_right.slice(30,45)

learn2_bc_left = learn_left.slice(45,60)
learn2_bc_right = learn_right.slice(45,60)

learn3_ab_left = learn_left.slice(60,75)
learn3_ab_right = learn_right.slice(60,75)

learn3_bc_left = learn_left.slice(75,90)
learn3_bc_right = learn_right.slice(75,90)

learn4_ab_left = learn_left.slice(90,105)
learn4_ab_right = learn_right.slice(90,105)

learn4_bc_left = learn_left.slice(105,120)
learn4_bc_right = learn_right.slice(105,120)

// leftLearnList = [learn1_bc_left,learn2_ab_left,learn2_bc_left,learn3_ab_left,learn3_bc_left,learn4_ab_left,learn4_bc_left]
// rightLearnList = [learn1_bc_right,learn2_ab_right,learn2_bc_right,learn3_ab_right,learn3_bc_right,learn4_ab_right,learn4_bc_right]


leftBlocked = [learn2_ab_left, learn3_ab_left, learn4_ab_left, learn1_bc_left, learn2_bc_left, learn3_bc_left,learn4_bc_left]
rightBlocked = [learn2_ab_right, learn3_ab_right, learn4_ab_right, learn1_bc_right, learn2_bc_right, learn3_bc_right,learn4_bc_right]

inter1L = learn1_ab_left.concat(learn1_bc_left)
inter1R = learn1_ab_right.concat(learn1_bc_right)

inter2L = learn2_ab_left.concat(learn2_bc_left)
inter2R = learn2_ab_right.concat(learn2_bc_right)

inter3L = learn3_ab_left.concat(learn3_bc_left)
inter3R = learn3_ab_right.concat(learn3_bc_right)

inter4L = learn4_ab_left.concat(learn4_bc_left)
inter4R = learn4_ab_right.concat(learn4_bc_right)

let interArr = [];
let inter1LShuffled = []
let inter1RShuffled = []
let inter2LShuffled = []
let inter2RShuffled = []
let inter3LShuffled = []
let inter3RShuffled = []
let inter4LShuffled = []
let inter4RShuffled = []


for (let i = 0; i < 30; i++) {
  interArr.push(i);
}
shuffle(interArr)

for (i = 0;i < inter1L.length; i++){
  inter1LShuffled.push(inter1L[interArr[i]])
  inter1RShuffled.push(inter1R[interArr[i]])
}
shuffle(interArr)

for (i = 0;i < inter2L.length; i++){
  inter2LShuffled.push(inter2L[interArr[i]])
  inter2RShuffled.push(inter2R[interArr[i]])
}
shuffle(interArr)

for (i = 0;i < inter3L.length; i++){
  inter3LShuffled.push(inter3L[interArr[i]])
  inter3RShuffled.push(inter3R[interArr[i]])
}
shuffle(interArr)

for (i = 0;i < inter1L.length; i++){
  inter4LShuffled.push(inter4L[interArr[i]])
  inter4RShuffled.push(inter4R[interArr[i]])
}
shuffle(interArr)


leftInterleaved = [inter2LShuffled, inter3LShuffled, inter4LShuffled]
rightInterleaved = [inter2RShuffled, inter3RShuffled, inter4RShuffled]


if (taskStructure == "blocked") {
  leftLearnList = leftBlocked
  rightLearnList = rightBlocked
} else if (taskStructure == "interleaved") {
  leftLearnList = leftInterleaved
  rightLearnList = rightInterleaved
  learn_left = inter1LShuffled.concat(inter2LShuffled, inter3LShuffled, inter4LShuffled)
  learn_right = inter1RShuffled.concat(inter2RShuffled, inter3RShuffled, inter4RShuffled)
}




//Direct Memory phase
let directRight = []
let directMid = []
let directLeft = []
let directUp = []
let directCorrect = []
var directNodes = 0

for(let i = 0;i<15;i++){
  directUp.push(aList[i])
  incorrectArr = i
  wrongA = i
  while (i == incorrectArr) {
    incorrectArr = Math.floor(Math.random() * 14)
  } 
  while (i == wrongA) {
    wrongA = Math.floor(Math.random() * 14)
  } 
  threeIndex = Math.floor(Math.random() * 3)+1
  if (threeIndex == 1){
    directLeft.push(bList[i])
    directCorrect.push(bList[i])
    directMid.push(bList[incorrectArr])
    directRight.push(aList[wrongA])
  } else if (threeIndex == 2){
    directRight.push(bList[i])
    directCorrect.push(bList[i])
    directLeft.push(bList[incorrectArr])
    directMid.push(aList[wrongA])
  } else {
    directMid.push(bList[i])
    directCorrect.push(bList[i])
    directRight.push(bList[incorrectArr])
    directLeft.push(aList[wrongA])
  }
}

let directarr = [];
  for (let i = 0; i < directLeft.length; i++) {
    directarr.push(i);
  }
directarr = shuffle(directarr)
directarr = shuffle(directarr)
directarr = shuffle(directarr)
let room_direct_left=[]
let room_direct_mid=[]
let room_direct_right=[]
let room_direct_up=[]
let room_direct_correct=[]



for(let i = 0;i<directLeft.length;i++){
  room_direct_up.push(directUp[directarr[i]])
  room_direct_left.push(directLeft[directarr[i]])
  room_direct_right.push(directRight[directarr[i]])
  room_direct_mid.push(directMid[directarr[i]])
  room_direct_correct.push(directCorrect[directarr[i]])
}

function ensureNoConsecutiveDuplicates(arr) {
  for (let i = 1; i < arr.length; i++) {
      if (arr[i] === arr[i - 1]) {
          for (let j = i + 1; j < arr.length; j++) {
              if (arr[j] !== arr[i] && arr[j - 1] !== arr[i]) {
                  [arr[i], arr[j]] = [arr[j], arr[i]];
                  break;
              }
          }
      }
  }
  return arr;
}


let correctShortList = []
let upList = []
let leftList = []
let rightList = []
let middleList = []
let testnum = 0
let testnum2 = 0

for (let i = 0;i<15;i++){
  incorrectShortArr = i
  wrongShortA = i
  while (i == incorrectShortArr) {
    incorrectShortArr = Math.floor(Math.random() * 14)
  } 
  while (i == wrongShortA) {
    wrongShortA = Math.floor(Math.random() * 14)
  } 
  if (Math.random() > 0.5){
    upList.push(aList[i])
    correctShortList.push(cList[i])
    testnum = Math.floor(Math.random()*3) + 1
    if ( testnum == 1){
      leftList.push(cList[i])
      middleList.push(bList[incorrectShortArr])
      rightList.push(cList[wrongShortA])
    } else if (testnum == 2){
      leftList.push(bList[wrongShortA])
      middleList.push(cList[i])
      rightList.push(cList[incorrectShortArr])
    } else if (testnum == 3){
      leftList.push(bList[incorrectShortArr])
      middleList.push(cList[wrongShortA])
      rightList.push(cList[i])
    }
  }else{
    upList.push(cList[i])
    correctShortList.push(aList[i])
    testnum2 = Math.floor(Math.random()*3) + 1
    if (testnum2 == 1){
      leftList.push(aList[i])
      middleList.push(bList[incorrectShortArr])
      rightList.push(aList[wrongShortA])
    } else if (testnum2 == 2){
      leftList.push(aList[wrongShortA])
      middleList.push(aList[i])
      rightList.push(bList[incorrectShortArr])
    } else if (testnum2 == 3){
      leftList.push(aList[incorrectShortArr])
      middleList.push(bList[wrongShortA])
      rightList.push(aList[i])
    }
  }
}
let shortarr = []
  for (let i = 0; i < leftList.length; i++) {
    shortarr.push(i)
  }

shortarr = shuffle(shortarr)

var room_shortest_right = []
var room_shortest_left = []
var room_shortest_up = []
var  room_shortest_correct = []
var room_shortest_mid = []

for (let i = 0;i<n_shortest_trial;i++){
  room_shortest_up.push(upList[shortarr[i]])
  room_shortest_left.push(leftList[shortarr[i]])
  room_shortest_mid.push(middleList[shortarr[i]])
  room_shortest_right.push(rightList[shortarr[i]])
  room_shortest_correct.push(correctShortList[shortarr[i]])
}

room_shortest_up = ensureNoConsecutiveDuplicates(room_shortest_up);

console.log(room_shortest_up);

//color for the plus sign
atcheckcolor=['blue','green']

//determinant for the time for the flash color
function colorStart(){
    colordetretime= Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
    return colordetretime
}

//time for the duration of the color being present
function colorStop(colordetretime){
    removecolor= 1500-colordetretime-100;
    return removecolor
}


//randomDelay for Direct Memory Test and Shortest Path Judgement
var randomDelay = Math.floor(Math.random() * (100 - 100 + 1)) + 500;
