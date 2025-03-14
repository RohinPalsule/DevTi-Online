function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;
    return str.replace(/%s/g, () => args[i++]);
}



//Learning phase with color cross in the middle
function create_learningcolor_trial(trial_num,color) {
  return parse("<p style='position:absolute;top: 50%;right: 50%;transform: translate(50%, -50%);font-size: 125px;color: %s;'>\u002B</p>"
  ,color)
}

//learning phase
function create_learning_trial(room_choiceStims_left,room_choiceStims_right,trial_num) {
  return parse("<p style='position:absolute;top: 50%;right: 50%;transform: translate(50%, -50%);font-size: 125px;color:black;'>\u002B</p><img style='position:absolute;top: 50%;right: 70%;transform: translate(50%, -50%);z-score:0;width: 350px;height: 350px;' src='../static/images/%s' height='350'> <img style='position:absolute;top: 50%;right: 30%;transform: translate(50%, -50%);z-score:0;width: 350px;height: 350px;' src='../static/images/%s' height='350'><br><style>body {background-color: #ffff;}</style>"
  ,room_choiceStims_left[trial_num],room_choiceStims_right[trial_num])
}

//Direct Memory phase
function create_direct_trial(room_choice_up,room_choiceStims_left,room_choice_mid,room_choiceStims_right,trial_num) {
  return parse("<img style='position:absolute;top: 30%;right: 50%;transform: translate(50%, -50%);z-score:0;width: 250px;height: 250px;' src='../static/images/%s' height='250'><img class = 'bottom' style='position:absolute;top: 80%;right: 75%;transform: translate(50%, -50%);z-score:0;width: 250px;height: 250px;visibility: hidden;' src='../static/images/%s' height='250'><img class = 'bottom' style='position:absolute;top: 80%;right: 50%;transform: translate(50%, -50%);z-score:0;width: 250px;height: 250px;visibility: hidden;' src='../static/images/%s' height='250'> <img class = 'bottom' style='position:absolute;top: 80%;right: 25%;transform: translate(50%, -50%);z-score:0;width: 250px;height: 250px;visibility: hidden;' src='../static/images/%s' height='250'><br><style>body {background-color: #ffff;}</style>"
  ,room_choice_up[trial_num],room_choiceStims_left[trial_num],room_choice_mid[trial_num],room_choiceStims_right[trial_num])
}

//Shortest path judgement
function create_shortestpath_trial(room_choice_up,room_choiceStims_left,room_choiceStims_right,trial_num) {
  return parse("<img style='position:absolute;top: 30%;right: 50%;transform: translate(50%, -50%);z-score:0;width: 250px;height: 250px;' src='../static/images/%s' height='250'><img class = 'bottomshortest' style='position:absolute;top: 80%;right: 65%;transform: translate(50%, -50%);z-score:0;width: 250px;height: 250px;visibility: hidden;' src='../static/images/%s' height='250'><img class = 'bottomshortest' style='position:absolute;top: 80%;right: 35%;transform: translate(50%, -50%);z-score:0;width: 250px;height: 250px;visibility: hidden;' src='../static/images/%s' height='250'><br><style>body {background-color: #ffff;}</style>"
  ,room_choice_up[trial_num],room_choiceStims_left[trial_num],room_choiceStims_right[trial_num])
}

//plus sign
function create_memory_ten() {
  return parse("<p style='position:absolute;top: 50%;right: 50%;transform: translate(50%, -50%);font-size: 125px;color: black;'>\u002B</p>")
}


function create_memory_phase(blue_val,room_color,n_memory) {
  room_timeline = []
  for (var i = 0; i < n_memory; i++) {
    room_timeline.push({stimulus:create_memory_trial(),prompt:parse("<br><br><h2>Press 'N' if new, 'O' if old</h1><style>body {background-color: %s;}</style>",blue_val,room_color)})
  }
  return room_timeline
}


function add_room(room,room_timeline) {
  for (var i = 0; i < 4; i++) {
    room_timeline.push(room[i])
} return room_timeline

}

//function for attentioncheck
function attentioncheck_learningphase(learn_phase,sfa,curr_blue_trial,n_blue_rounds,thebreak,thecrossant,thecrossant_black,thecrossant_break){
  if(sfa && curr_blue_trial<n_blue_rounds) {
    jsPsych.addNodeToEndOfTimeline({
      timeline: [learn_phase,learn_phase_color,thecrossant,thecrossant_black,thecrossant_break],
    }, jsPsych.resumeExperiment)
  }else if(sfa&& curr_blue_trial>=n_blue_rounds) {
    jsPsych.addNodeToEndOfTimeline({
      timeline: [thebreak],
    }, jsPsych.resumeExperiment)
  }
}

function attentioncheck(learn_phase,sfa,curr_blue_trial,n_blue_rounds,thebreak){
  if(sfa && curr_blue_trial<n_blue_rounds) {
    jsPsych.addNodeToEndOfTimeline({
      timeline: [learn_phase],
    }, jsPsych.resumeExperiment)
  }else if(sfa&& curr_blue_trial>=n_blue_rounds) {
    jsPsych.addNodeToEndOfTimeline({
      timeline: [thebreak],
    }, jsPsych.resumeExperiment)
  }else if(warning<=2&& curr_blue_trial<n_blue_rounds){
    jsPsych.addNodeToEndOfTimeline({
      timeline: [warning_page,learn_phase],
    }, jsPsych.resumeExperiment)
  }else if(warning<=2&& curr_blue_trial>=n_blue_rounds){
    jsPsych.addNodeToEndOfTimeline({
      timeline: [warning_page,thebreak],
    }, jsPsych.resumeExperiment)
  }else if(warning>2){
    jsPsych.addNodeToEndOfTimeline({
      timeline: [warning_page],
    }, jsPsych.resumeExperiment)
  }
}

function attentioncheck_end(learn_phase,sfa,curr_blue_trial,n_blue_rounds){
  if(sfa && curr_blue_trial<n_blue_rounds) {
    jsPsych.addNodeToEndOfTimeline({
      timeline: [learn_phase],
    }, jsPsych.resumeExperiment)
  }else if(warning<=2&& curr_blue_trial<n_blue_rounds){
    jsPsych.addNodeToEndOfTimeline({
      timeline: [warning_page,learn_phase],
    }, jsPsych.resumeExperiment)
  }else if(warning<=2&& curr_blue_trial>=n_blue_rounds){
    jsPsych.addNodeToEndOfTimeline({
      timeline: [warning_page,thebreak],
    }, jsPsych.resumeExperiment)
  }else if(warning>2){
    jsPsych.addNodeToEndOfTimeline({
      timeline: [warning_page],
    }, jsPsych.resumeExperiment)
  }
}

//function to push the instruct
function timelinepushintro(intro,instructnames){
  for (let i = 0; i < instructnames.length; i++){
    timeline.push(intro[i],)
  }
}

function timelinepresent(intro, instructnames,directmemory_phase) {
  let timelinetemp = [];
  
  for (let i = 0; i < instructnames.length; i++) {
    timelinetemp.push(intro[i]);
  }

  if (Array.isArray(directmemory_phase)) {
    for (let i = 0; i < directmemory_phase.length;i++) {
      timelinetemp.push(directmemory_phase[i]);
    }
  } else {
    timelinetemp.push(directmemory_phase)
  }


  
  jsPsych.addNodeToEndOfTimeline({ timeline: timelinetemp }, jsPsych.resumeExperiment);
}

//function to generate the attention check of the plus sign
//random number
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
var prac_pluscheck=[]
var prac_pluscolor=[]
for (let i=0 ; i<n_prac_learning_trial;i++){
  plusdeter = randomIntFromInterval(1, 2)
  if (plusdeter==1){
    prac_pluscolor.push(atcheckcolor[0])
    prac_pluscheck.push(49)
  }else if(plusdeter==2){
    prac_pluscolor.push(atcheckcolor[1])
    prac_pluscheck.push(50)
  }
}
function generate_random_color(){
  pluscheck=[]
  pluscolor=[]
  for (let i=0 ; i<n_learning_trial*blocks;i++){
    plusdeter = randomIntFromInterval(1, 2)
    if (plusdeter==1){
      pluscolor.push(atcheckcolor[0])
      pluscheck.push(49)
    }else if(plusdeter==2){
      pluscolor.push(atcheckcolor[1])
      pluscheck.push(50)
    }
  }
} 

var warning_page = {
  type: 'html-keyboard-response',
  stimulus: '<h1 style="color: red; font-size: 50px">Please make sure to respond to the questions accurately.</h1><br>' +
    '<h1 style="color: red;font-size: 50px">Continued failure to respond will</h1><br>' +
    '<h1 style="color: red;font-size: 50px">result in the task ending early</h1><br>' +
    '<h1 style="color: red;font-size: 50px">The experiment will resume in 5 seconds</h1><br>',
  choices: jsPsych.NO_KEYS,
  stimulus_duration: 5000,
  trial_duration: 5000,
  on_finish: function(data) {
    data.trial_type = 'warning_page';
    data.stimulus = 'warning';
    warning = warning + 1;
  }
};

function createbreak(intro_dir,instructnames,directmemory_phase){
  let thebreak= {
    type: 'html-keyboard-response',
    choices:jsPsych.NO_KEYS,
    trial_duration: 100,
    stimulus:'<p></p>',
    on_finish: function(data) {
      data.trial_type='thebreak'
      timelinepresent(intro_dir,instructnames,directmemory_phase)
    }
  }
  return thebreak
}

// Creating direct num list

var room_gen_direct_left=[]
var room_gen_direct_mid=[]
var room_gen_direct_right=[]
var room_gen_direct_up=[]
var room_gen_direct_correct=[]

function gen_directList(trialType, structure) {
  let genRight = []
  let genMid = []
  let genLeft = []
  let genUp = []
  let genCorrect = []
  if (structure == 'blocked'){
    if (trialType =='ab') {
      for(let i = 0;i<15;i++){
        genUp.push(aList[i])
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
          genLeft.push(bList[i])
          genCorrect.push(bList[i])
          genMid.push(bList[incorrectArr])
          genRight.push(aList[wrongA])
        } else if (threeIndex == 2){
          genRight.push(bList[i])
          genCorrect.push(bList[i])
          genLeft.push(bList[incorrectArr])
          genMid.push(aList[wrongA])
        } else {
          genMid.push(bList[i])
          genCorrect.push(bList[i])
          genRight.push(bList[incorrectArr])
          genLeft.push(aList[wrongA])
        }
      }
    } else if (trialType == 'bc') {
      var bcArrayCorrect = []
      var bcArrayTop = []

      for(let i = 0;i<15;i++){
        if (Math.random() > 0.5){
          bcArrayTop = bList
          bcArrayCorrect = cList
        } else {
          bcArrayTop = cList
          bcArrayCorrect = bList
        }
        genUp.push(bcArrayTop[i])
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
          genLeft.push(bcArrayCorrect[i])
          genCorrect.push(bcArrayCorrect[i])
          genMid.push(bcArrayCorrect[incorrectArr])
          genRight.push(bcArrayTop[wrongA])
        } else if (threeIndex == 2){
          genRight.push(bcArrayCorrect[i])
          genCorrect.push(bcArrayCorrect[i])
          genLeft.push(bcArrayCorrect[incorrectArr])
          genMid.push(bcArrayTop[wrongA])
        } else {
          genMid.push(bcArrayCorrect[i])
          genCorrect.push(bcArrayCorrect[i])
          genRight.push(bcArrayCorrect[incorrectArr])
          genLeft.push(bcArrayTop[wrongA])
        }
      }
    }
  } else if (structure == 'interleaved') {
    if (trialType == 'ab' || trialType == 'bc' ) {
      for(let i = 0;i<15;i++){
        genUp.push(aList[i])
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
          genLeft.push(bList[i])
          genCorrect.push(bList[i])
          genMid.push(bList[incorrectArr])
          genRight.push(aList[wrongA])
        } else if (threeIndex == 2){
          genRight.push(bList[i])
          genCorrect.push(bList[i])
          genLeft.push(bList[incorrectArr])
          genMid.push(aList[wrongA])
        } else {
          genMid.push(bList[i])
          genCorrect.push(bList[i])
          genRight.push(bList[incorrectArr])
          genLeft.push(aList[wrongA])
        }
      }
      var bcArrayCorrect = []
      var bcArrayTop = []

      for(let i = 0;i<15;i++){
        if (Math.random() > 0.5){
          bcArrayTop = bList
          bcArrayCorrect = cList
        } else {
          bcArrayTop = cList
          bcArrayCorrect = bList
        }
        genUp.push(bcArrayTop[i])
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
          genLeft.push(bcArrayCorrect[i])
          genCorrect.push(bcArrayCorrect[i])
          genMid.push(bcArrayCorrect[incorrectArr])
          genRight.push(bcArrayTop[wrongA])
        } else if (threeIndex == 2){
          genRight.push(bcArrayCorrect[i])
          genCorrect.push(bcArrayCorrect[i])
          genLeft.push(bcArrayCorrect[incorrectArr])
          genMid.push(bcArrayTop[wrongA])
        } else {
          genMid.push(bcArrayCorrect[i])
          genCorrect.push(bcArrayCorrect[i])
          genRight.push(bcArrayCorrect[incorrectArr])
          genLeft.push(bcArrayTop[wrongA])
        }
      }
    }
  }
  

  let genarr = [];
  for (let i = 0; i < genLeft.length; i++) {
    genarr.push(i);
  }
  genarr = shuffle(genarr)
  genarr = shuffle(genarr)
  genarr = shuffle(genarr)
  room_gen_direct_left=[]
  room_gen_direct_mid=[]
  room_gen_direct_right=[]
  room_gen_direct_up=[]
  room_gen_direct_correct=[]


  for(let i = 0;i<genLeft.length;i++){
    room_gen_direct_up.push(genUp[genarr[i]])
    room_gen_direct_left.push(genLeft[genarr[i]])
    room_gen_direct_right.push(genRight[genarr[i]])
    room_gen_direct_mid.push(genMid[genarr[i]])
    room_gen_direct_correct.push(genCorrect[genarr[i]])
  }
  room_direct_correct = room_gen_direct_correct
  room_gen_direct_up = ensureNoConsecutiveDuplicates(room_gen_direct_up);

  console.log(room_gen_direct_up);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}




var num_of_learn_blocks = 0
// Calling the learning blocks
function generate_learning_block(img_left, img_right, num_of_trials,num_of_rem_blocks) {
  generate_random_color()
  curr_learning_trial=0
  colordetretime=colorStart()
  removecolor=colorStop(colordetretime)
  timetakenforpluswindow=removecolor


   thecrossant= {
    type: 'html-keyboard-response',
    choices: ['1','2'],
    stimulus_height: 100,
    stimulus_width: 100,
    stimulus_duration: 500,
    trial_duration: 500,
    response_ends_trial: false,
    stimulus:create_learningcolor_trial(curr_learning_trial,pluscolor[curr_learning_trial]),
    prompt:parse("<br><br><style>body {background-color: #ffff;}</style>"),
    on_finish: function(data) {
      data.stimulus=pluscolor[curr_learning_trial]
      data.stimulus_left=img_left[curr_learning_trial]
      data.stimulus_right=img_right[curr_learning_trial]
      var blockNUM = num_of_rem_blocks+1
      if (isNaN(blockNUM)){
        blockNUM = 1
      }
      data.trial_type='rt_plussign_withcolor'+ blockNUM
      console.log(colordetretime)
      kp=data.key_press
    }
  }

  learningcorrectness = []
   thecrossant_black={
    type: 'html-keyboard-response',
    choices: ['1','2'],
    stimulus_height: 100,
    stimulus_width: 100,
    stimulus_duration: 2000-removecolor,
    trial_duration: 2000-removecolor,
    response_ends_trial: false,
    stimulus:create_memory_ten('black'),
    prompt:parse("<br><br><style>body {background-color: #ffff;}</style>"),
    on_finish: function(data) {
      var blockNUM = num_of_rem_blocks+1
      if (isNaN(blockNUM)){
        blockNUM = 1
      }
      data.trial_type ='rt_thecrossant_black'+blockNUM
      data.stimulus='black_plus_sign'
      op=data.key_press
      if (kp){
        data.rt=null
      if(kp!=pluscheck[curr_learning_trial]) {
        cummulative_checkfail += 1
        checkfail=checkfail+1
        data.accuracy = 0
        learningcorrectness.push(0)
        if(checkfail>=checkthreshold&&checkfail<4 || (cummulative_checkfail >= cummulative_cf_warning && cummulative_checkfail < cummulative_cf_threshold)){
          jsPsych.endCurrentTimeline(),
          jsPsych.addNodeToEndOfTimeline({
            timeline: [warning_page,thecrossant_break],
          }, jsPsych.resumeExperiment)
        }else if(checkfail>4 || cummulative_checkfail >= cummulative_cf_threshold){
          jsPsych.endCurrentTimeline(),
          jsPsych.addNodeToEndOfTimeline({
          timeline:[TaskFailed],},jsPsych.resumeExperiment)
          //end experiment
        }
      }else{
        checkfail=0
        data.accuracy = 1
        learningcorrectness.push(1)
      }
    }else if(op){
      data.rt=data.rt+100+timetakenforpluswindow
      if(op!=pluscheck[curr_learning_trial]) {
        cummulative_checkfail += 1
        checkfail=checkfail+1
        data.accuracy = 0
        learningcorrectness.push(0)
        if(checkfail>=checkthreshold&&checkfail<4 || (cummulative_checkfail >= cummulative_cf_warning && cummulative_checkfail < cummulative_cf_threshold)){
          jsPsych.endCurrentTimeline(),
          jsPsych.addNodeToEndOfTimeline({
            timeline: [warning_page,thecrossant_break],
          }, jsPsych.resumeExperiment)
        }else if(checkfail>4 || cummulative_checkfail >= cummulative_cf_threshold){
          jsPsych.endCurrentTimeline(),
          jsPsych.addNodeToEndOfTimeline({
          timeline:[TaskFailed],},jsPsych.resumeExperiment)
          //end experiment
        }
      }else{
        checkfail=0
        data.accuracy = 1
        learningcorrectness.push(1)
      }
    }else{
      cummulative_checkfail += 1
      checkfail=checkfail+1
      if(checkfail>=checkthreshold&&checkfail<4 || (cummulative_checkfail >= cummulative_cf_warning && cummulative_checkfail < cummulative_cf_threshold)){
        jsPsych.endCurrentTimeline(),
        jsPsych.addNodeToEndOfTimeline({
          timeline: [warning_page,thecrossant_break],
          }, jsPsych.resumeExperiment)
      }else if(checkfail>4 || cummulative_checkfail >= cummulative_cf_threshold){
        jsPsych.endCurrentTimeline(),
        jsPsych.addNodeToEndOfTimeline({
        timeline:[TaskFailed],},jsPsych.resumeExperiment)
        //end experiment
      }
    }
    let learnsum = 0;
      learningcorrectness.forEach(function(value) {
        learnsum += value;
      });

      data.cumulative_accuracy = learnsum / learningcorrectness.length;
  }
  }

   TaskFailed = {
    type: 'html-keyboard-response',
    stimulus: '<p>Unfortunately, you do not qualify to continue this experiment.</p>' +
              '<p>Please press <strong>Escape</strong> to close the window. You will be paid for your time up to now.</p>',
    choices: ['Esc'],
    on_finish: function(data){
      window.close();
    }
  };

   thecrossant_break={
    type: 'html-keyboard-response',
    choices: jsPsych.NO_KEYS,
    stimulus_height: 100,
    stimulus_width: 100,
    stimulus_duration: 100,
    trial_duration: 100,
    response_ends_trial: false,
    stimulus:create_memory_ten('black'),
    prompt:parse("<br><br><style>body {background-color: #ffff;}</style>"),
    on_finish: function(data) {
      var blockNUM = num_of_rem_blocks+1
      if (isNaN(blockNUM)){
        blockNUM = 1
      }
      data.trial_type='color_black'+blockNUM
      data.stimulus='black_plus_sign'
      timetakenforpluswindow=removecolor
      colordetretime=colorStart()
      removecolor=colorStop(colordetretime)
      learn_phase_color.stimulus_duration= removecolor
      learn_phase_color.trial_duration=removecolor
      thecrossant_black.stimulus_duration= 2000-removecolor
      thecrossant_black.trial_duration=2000-removecolor
      curr_learning_trial=curr_learning_trial+1,
      learn_phase.stimulus=create_learning_trial(img_left,img_right,curr_learning_trial)
      learn_phase.trial_duration=3500
      learn_phase.stimulus_duration=3500
      thecrossant_black.stimulus=create_memory_ten('black')
      thecrossant.stimulus=create_learningcolor_trial(curr_learning_trial,pluscolor[curr_learning_trial])

      if (curr_learning_trial == num_of_trials){
        num_of_learn_blocks += 1
        // console.log(num_of_learn_blocks)


        if (taskStructure == "blocked"){
          if (num_of_learn_blocks % 2 == 0) {
            gen_directList('bc', 'blocked')
          } else {
            gen_directList('ab', 'blocked')
          }
        } else if (taskStructure == "interleaved"){
          gen_directList('ab', 'interleaved')
        }
        

        if (num_of_learn_blocks < blocks + 1) {
          generate_remembering_block(room_gen_direct_up, room_gen_direct_left, room_gen_direct_mid, room_gen_direct_right, n_direct_trial,num_of_learn_blocks)
          learn_break=createbreak(remembering_intro_text,rememberingnames,directmemory_phase)
          attentioncheck_learningphase(learn_phase,sfa,curr_learning_trial,num_of_trials,learn_break,thecrossant,thecrossant_black,thecrossant_break)
        }
      } else {
        attentioncheck_learningphase(learn_phase,sfa,curr_learning_trial,num_of_trials,post_break,thecrossant,thecrossant_black,thecrossant_break)
      }
      
    }
  }


   learn_phase = {
    type: 'html-keyboard-responsefl',
    choices: jsPsych.NO_KEYS,
    response_ends_trial: false,
    stimulus:create_learning_trial(img_left,img_right,curr_learning_trial),
    stimulus_duration:3500,
    trial_duration:3500,
    on_finish: function(data) {
      var blockNUM = num_of_rem_blocks+1
      if (isNaN(blockNUM)){
        blockNUM = 1
      }
      data.trial_type = 'learn_phase(without_color)'+blockNUM;
      data.stimulus='black_plus_sign'
      data.stimulus_left=img_left[curr_learning_trial],
      data.stimulus_right=img_right[curr_learning_trial],
      sfa=1
    }
  }

  learn_phase_color = {
    type: 'html-keyboard-responsefl',
    choices: jsPsych.NO_KEYS,
    response_ends_trial: false,
    stimulus:create_memory_ten(),
    stimulus_duration:removecolor,
    trial_duration:removecolor,
    on_finish: function(data) {
      data.stimulus=pluscolor[curr_learning_trial]
      data.stimulus_left=img_left[curr_learning_trial]
      data.stimulus_right=img_right[curr_learning_trial]
      var blockNUM = num_of_rem_blocks+1
      if (isNaN(blockNUM)){
        blockNUM = 1
      }
      data.trial_type = 'black_cross(without_color)'+blockNUM;
      sfa=1
    }
  }

  // learning phase end
} 


quickKP = 0;
infKP = 0;
let intervalId = null

var too_quick={
  type: 'html-keyboard-response',
  stimulus: '<h1 style="color: red;font-size: 50px">Your response was too quick. Please take your time to carefully consider your answer before responding.</h1>' +
            '<p style="color: red;font-size: 50px">The experiment will continue in 10 seconds.</p>',
  choices: jsPsych.NO_KEYS, // Prevent responses
  trial_duration: 10000, // Stay on screen for 10 seconds
  on_finish: function(data) {
    data.trial_type='slowdown_page'
    data.stimulus='too_quick'
    quickKP +=1
  }
}
let timer = null
// Generate remembering
let num_of_rem_blocks=0
function generate_remembering_block(imgUp, imgLeft, imgMid, imgRight, num_of_trials,num_of_learn_blocks){
  curr_direct_trial = 0
  directmemory_phase = {
    type: 'html-keyboard-response',
    choices: ['1','2','3'],
    response_ends_trial: true,
    stimulus:create_direct_trial(imgUp,imgLeft,imgMid,imgRight,curr_direct_trial),
    stimulus_duration:15000,
    trial_duration:15000,
    on_load: function() {
      // Reveal other rooms after 1500 ms
      setTimeout(function() {
        for(let i = 0;i<document.getElementsByClassName('bottom').length;i++){
          document.getElementsByClassName('bottom')[i].style.visibility = 'visible';
        }
      }, randomDelay);
    },
    on_finish: function(data) {
      // Check if the RT is too quick
      quickKP += 1
      if (quickKP==1){
        // Start the timer
        timer = 0;
        intervalId = setInterval(() => {
            timer++;;
        }, 1000);
      }

      if (quickKP == 4 && timer < 4) {
        clearInterval(intervalId)
        jsPsych.addNodeToEndOfTimeline({
        timeline: [too_quick],
        }, jsPsych.resumeExperiment)
        quickKP = -1
        timer = 0;
        data.tooquick = 1
      } else if ((quickKP <= 4 && timer >= 4)){
        quickKP = 0
        clearInterval(intervalId);
        timer = 0
      }
      
      // if (data.rt < 500) {
      //   quickKP += 1
      //   if (quickKP >= 3) {
      //     jsPsych.addNodeToEndOfTimeline({
      //       timeline: [too_quick],
      //       }, jsPsych.resumeExperiment)
      //   }
      // }
      
      data.trial_type = 'directmemory_phase'+num_of_learn_blocks;
      data.stimulus=imgUp[curr_direct_trial];
      data.stimulus_down_left=imgLeft[curr_direct_trial],
      data.stimulus_down_mid=imgMid[curr_direct_trial]
      data.stimulus_down_right=imgRight[curr_direct_trial];
      data.stimulus_correct=room_direct_correct[curr_direct_trial];
      if ((data.key_press == 49 && data.stimulus_down_left == data.stimulus_correct)||
      (data.key_press == 50 && data.stimulus_down_mid == data.stimulus_correct) ||(data.key_press == 51 && data.stimulus_down_right == data.stimulus_correct)) {
        data.accuracy = 1
        directcorrectness.push(1)
        data.weighted_accuracy = 1
      } else {
        data.accuracy = 0
        directcorrectness.push(0)
        data.weighted_accuracy = 0
      }
      
      let directsum = 0;
      directcorrectness.forEach(function(value) {
        directsum += value;
      });

      data.cumulative_accuracy = directsum / directcorrectness.length;
      sfa=data.key_press,
      curr_direct_trial=curr_direct_trial+1,
      console.log(curr_direct_trial)
      directmemory_phase.stimulus=create_direct_trial(imgUp,imgLeft,imgMid,imgRight,curr_direct_trial)

      if (curr_direct_trial == num_of_trials) {
        num_of_rem_blocks += 1
        // console.log(num_of_rem_blocks)
        if (num_of_rem_blocks < blocks) {
          generate_learning_block(leftLearnList[num_of_rem_blocks-1], rightLearnList[num_of_learn_blocks-1], n_learning_trial,num_of_rem_blocks)
          post_break = createbreak(learning_intro_text,learningnames,[learn_phase,learn_phase_color,thecrossant,thecrossant_black,thecrossant_break])
          attentioncheck(directmemory_phase,sfa,curr_direct_trial,num_of_trials,post_break)
        }
        else if (num_of_rem_blocks >= blocks) {
          attentioncheck(directmemory_phase,sfa,curr_direct_trial,n_direct_trial,short_break)
        }
      }else {
        attentioncheck(directmemory_phase,sfa,curr_direct_trial,num_of_trials,post_break)
      }
    }
  }
}