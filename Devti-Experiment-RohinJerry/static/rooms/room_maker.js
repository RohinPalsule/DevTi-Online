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
  for (let i=0 ; i<n_learning_trial;i++){
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

var warning_page={
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  trial_duration:3000,
  stimulus: '<h1 style="color: red;">Please make sure to respond to the questions.</h1><br><h1 style="color: red;">Continued failure to respond will</h1><br><h1 style="color: red;">result in the task ending early</h1><br><h1 style="color: red;">The experiment will resume in 3 seconds</h1>',
  on_finish: function(data) {
    data.trial_type='warning_page'
    data.stimulus='warning'
    warning=warning+1
  }
}

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

// Calling the learning blocks
function generate_learning_block(img_left, img_right, num_of_trials) {
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
      data.trial_type='rt_plussign_withcolor'
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
      data.trial_type ='rt_thecrossant_black'
      data.stimulus='black_plus_sign'
      op=data.key_press
      if (kp){
        data.rt=null
      if(kp!=pluscheck[curr_learning_trial]) {
        checkfail=checkfail+1
        data.accuracy = 0
        learningcorrectness.push(0)
        if(checkfail>=checkthreshold&&checkfail<4){
          jsPsych.endCurrentTimeline(),
          jsPsych.addNodeToEndOfTimeline({
            timeline: [warning_page,thecrossant_break],
          }, jsPsych.resumeExperiment)
        }else if(checkfail>4){
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
        checkfail=checkfail+1
        data.accuracy = 0
        learningcorrectness.push(0)
        if(checkfail>=checkthreshold&&checkfail<4){
          jsPsych.endCurrentTimeline(),
          jsPsych.addNodeToEndOfTimeline({
            timeline: [warning_page,thecrossant_break],
          }, jsPsych.resumeExperiment)
        }else if(checkfail>4){
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
      checkfail=checkfail+1
      if(checkfail>=checkthreshold&&checkfail<4){
        jsPsych.endCurrentTimeline(),
        jsPsych.addNodeToEndOfTimeline({
          timeline: [warning_page,thecrossant_break],
          }, jsPsych.resumeExperiment)
      }else if(checkfail>4){
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
      data.trial_type='color_black'
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
      attentioncheck_learningphase(learn_phase,sfa,curr_learning_trial,num_of_trials,learn_break,thecrossant,thecrossant_black,thecrossant_break)
      
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
      data.trial_type = 'learn_phase(without_color)';
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
      data.trial_type = 'black_cross(without_color)';
      sfa=1
    }
  }

  // learning phase end
} 