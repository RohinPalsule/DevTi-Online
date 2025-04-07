var debug_mode = 0; // debug mode determines how long the blocks are, 5 sec in debug mode, 5 minutes in actual experiment
//var data_save_method = 'csv_server_py';
var data_save_method = 'csv_server_py';

// Will be set to true when experiment is exiting fullscreen normally, to prevent above end experiment code
var normal_exit = false;
var window_height = window.screen.height;

var initialCode = "C78LSMTN"
var midwayFail = "CHULV336"
var endCode = "CIMBPENS"

let failed_code = initialCode



//this is to test if the user leave the webpage
var detectfocus=0
var isinfocus=1
document.addEventListener('mouseleave', e=>{
  detectfocus=detectfocus+1
  isinfocus=0
  //this is to see if user are focus or not
})
document.addEventListener('visibilitychange', e=>{
   if (document.visibilityState === 'visible') {
 //report that user is in focus
 isinfocus=1
  } else {
  detectfocus=detectfocus+1
  isinfocus=0
  //this is to see if user are focus or not
  }  
})

// Randomly generate an 8-character alphanumeric subject ID via jsPsych
var subject_id = jsPsych.randomization.randomID(8);

// Load PsiTurk
var psiturk = new PsiTurk(uniqueId, adServerLoc, mode);
var condition = psiturk.taskdata.get('condition') + 1; // they do zero-indexing

var timeline = []
var pluscheck = []
var pluscolor = []
var curr_learning_trial=0
var colordetretime=colorStart()
var removecolor=colorStop(colordetretime)
var timetakenforpluswindow=removecolor

var thecrossant = {}
var learningcorrectness = {}
var thecrossant_black = {} 
var TaskFailed = {}
var thecrossant_break = {}
var learn_phase = {}
var learn_phase_color = {}
var directmemory_phase = {}

//welcome page
var welcome = {
  type: 'survey-html-form',
  html: "<label for='worker_id'>Enter your Prolific Worker ID. Please make sure this is correct! </label><br><input type='text' id='worker_id' name='worker_id' required><br><br>",
  on_finish: function (data) {
    data.trial_type = "id_enter";
    window.useridtouse = data.responses;
    window.useridtouse = useridtouse.split('"')[3];
    data.identifier_a = `"${aList.join("; ")}"`;
    data.identifier_b = `"${bList.join("; ")}"`;
    data.identifier_c = `"${cList.join("; ")}"`;
    data.tasktype = taskStructure;

    // Add browser type and local time
    data.browser_type = navigator.userAgent;
    data.local_time = new Date().toLocaleString();
    console.log(navigator.userAgent)
    subject_id = useridtouse;
    save_data()
  }
};

//welcome page end
var form = null
var radios = null
var feedbackN = null
var feedbackP = null
var continuePrompt = null
var checkedBox = null
var loadNum = 0

var enterFullscreen = {
  type: 'html-button-response',
  stimulus: `
        <style>
            ul {
                list-style-type: disc;
                margin: 20px 0;
                padding-left: 100px;
                text-align: left;
            }
            li {
                margin-bottom: 15px;
                font-size: 18px;
                line-height: 1.6;
            }
            p {
                font-size: 18px;
                line-height: 1.6;
                margin: 10px 0;
                text-align: center;
            }
        </style>
        <h3 style='text-align: center'><strong>Thank you for your participation in this study. Please:</strong></h3>
        <br />
        <ul>
            <li>Follow the instructions for each task and try your best to perform well.</li>
            <li>Maximize your browser and focus completely on the task without any distractions.</li>
            <li><strong>DO NOT</strong> take notes during the experiment, as this interferes with our ability to accurately measure the learning process.</li>
            <li><strong>DO NOT</strong> participate if you feel you cannot fully commit to these requirements.</li>
            <li>Failure to comply with instructions may cause the experiment to abort, and you will be ineligible for the full compensation amount.</li>
        </ul> <br />
        <p>When you are ready to take the experiment, click 'Enter Fullscreen' to begin.</p> <br />
    `,
  choices: ['Enter Fullscreen'],
  on_finish: function(data) {
      // Trigger fullscreen mode when the button is clicked
      data.trial_type = "make_fullscreen"
      data.stimulus = "fullscreen"
      document.documentElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
      });
  }
};


//Instruction page

function createinstruct(instruct_1,number){
  var intro={
    type: 'html-keyboard-response',
    choices: ['spacebar'],
    stimulus: instruct_1,
    on_finish: function (data) {
      data.trial_type = 'intro_'+ number;
      data.stimulus='instruct'
    }
  }
  return intro
}

var advanceButton = null
let tester = 0
function createQuestioninstruct(instruct_1,number){

  var intro={
    type: 'html-keyboard-response',
    choices: jsPsych.NO_KEYS,
    stimulus: instruct_1,
    on_load: function() {
      
      feedbackP = document.getElementById('feedbackP');
      advanceButton = document.getElementById('advance-button');
      restartButton = document.getElementById('restart-button');
     
      document.addEventListener('keydown', handleKeyPress);

      function handleKeyPress(event) {
        const key = event.key; // Get the pressed key
        if (key === '1' || key === '2' || key === '3') {
          if (key === '3') {
            if (tester === 0) {
              feedbackP.style.visibility = 'visible';
              advanceButton.style.visibility = 'visible';
              tester = 1;
            }
          } else {
            feedbackP.style.visibility = 'hidden';
            advanceButton.style.visibility = 'hidden';
            restartButton.style.visibility = 'visible';
            tester = 1;
          }
        }
      }
  

      advanceButton.addEventListener('click', function() {

        document.removeEventListener('keydown', handleKeyPress);
        jsPsych.finishTrial();
      });
  
      restartButton.addEventListener('click', function() {
        document.removeEventListener('keydown', handleKeyPress);
        jsPsych.finishTrial();
        jsPsych.endCurrentTimeline();
        attentioncheck(directmemory_phase, sfa, curr_direct_trial, n_direct_trial, short_break);
        tester = 0;
      });
    },
    on_finish: function(data){
      data.trial_type = 'intro_'+ number;
      data.stimulus='instruct'
    }
    
  }
  return intro
}


function createfulintro(instruct,instructnames){
  intro={}
for (let i = 0; i < instructnames.length; i++) {
  instructname=instructnames[i]
  if (instructname == 'instruct_short_4'){
    intro[i] = createQuestioninstruct(instruct[instructname],i)
  }else {
    intro[i] = createinstruct(instruct[instructname],i)
  }

}return intro
}


intro_learn=createfulintro(instruct,instructnames)
postprac_learn=createfulintro(post_instruct, post_instructnames)
remembering_prac=createfulintro(dir_instruct,dir_instructnames)
learning_intro_text=createfulintro(learning_instruct,learningnames)
remembering_intro_text=createfulintro(remembering_instruct,rememberingnames)
intro_mem=createfulintro(mem_instruct,mem_instructnames)
intro_dir=createfulintro(dir_instruct,dir_instructnames)
intro_short=createfulintro(short_instruct,short_instructnames)

//Instruction page end

// practice phase

var prac_curr_learning_trial=0
var colordetretime=colorStart()
var removecolor=colorStop(colordetretime)
var timetakenforpluswindow=removecolor

var prac_thecrossant= {
  type: 'html-keyboard-response',
  choices: ['1','2'],
  stimulus_height: 100,
  stimulus_width: 100,
  stimulus_duration: 500,
  trial_duration: 500,
  response_ends_trial: false,
  stimulus:create_learningcolor_trial(prac_curr_learning_trial,prac_pluscolor[prac_curr_learning_trial]),
  prompt:parse("<br><br><style>body {background-color: #ffff;}</style>"),
  on_finish: function(data) {
    data.stimulus=prac_pluscolor[prac_curr_learning_trial]
    data.stimulus_left=learn_left[prac_curr_learning_trial]
    data.stimulus_right=learn_right[prac_curr_learning_trial]
    data.trial_type='prac_rt_plussign_withcolor'
    console.log(colordetretime)
    kp=data.key_press
  }
}
praclearningcorrectness = []
var prac_thecrossant_black={
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
    data.trial_type ='prac_rt_thecrossant_black'
    data.stimulus='black_plus_sign'
    op=data.key_press
    if (kp){
      data.rt=null
    if(kp!=prac_pluscheck[prac_curr_learning_trial]) {
      checkfail=checkfail+1
      data.accuracy = 0
      praclearningcorrectness.push(0)
      if(checkfail>=checkthreshold&&checkfail<4){
        jsPsych.endCurrentTimeline(),
        jsPsych.addNodeToEndOfTimeline({
          timeline: [warning_page,prac_thecrossant_break],
        }, jsPsych.resumeExperiment)
      }else if(checkfail>4){
        jsPsych.endCurrentTimeline(),
        jsPsych.addNodeToEndOfTimeline({
        timeline:[TaskEarlyFail],},jsPsych.resumeExperiment)
        //end experiment
      }
    }else{
      checkfail=0
      data.accuracy = 1
      praclearningcorrectness.push(1)
    }
  }else if(op){
    data.rt=data.rt+100+timetakenforpluswindow
    if(op!=prac_pluscheck[prac_curr_learning_trial]) {
      checkfail=checkfail+1
      data.accuracy = 0
      praclearningcorrectness.push(0)
      if(checkfail>=checkthreshold&&checkfail<4){
        jsPsych.endCurrentTimeline(),
        jsPsych.addNodeToEndOfTimeline({
          timeline: [warning_page,prac_thecrossant_break],
        }, jsPsych.resumeExperiment)
      }else if(checkfail>4){
        jsPsych.endCurrentTimeline(),
        jsPsych.addNodeToEndOfTimeline({
        timeline:[TaskEarlyFail],},jsPsych.resumeExperiment)
        //end experiment
      }
    }else{
      checkfail=0
      data.accuracy = 1
      praclearningcorrectness.push(1)
    }
  }else{
    checkfail=checkfail+1
    if(checkfail>=checkthreshold&&checkfail<4){
      jsPsych.endCurrentTimeline(),
      jsPsych.addNodeToEndOfTimeline({
        timeline: [warning_page,prac_thecrossant_break],
        }, jsPsych.resumeExperiment)
    }else if(checkfail>4){
      jsPsych.endCurrentTimeline(),
      jsPsych.addNodeToEndOfTimeline({
      timeline:[TaskEarlyFail],},jsPsych.resumeExperiment)
      //end experiment
    }
  }
  let learnsum = 0;
    praclearningcorrectness.forEach(function(value) {
      learnsum += value;
    });

    data.practice_cumulative_accuracy = learnsum / praclearningcorrectness.length;
}
}

// var TaskFailed = {
//   type: 'html-keyboard-response',
//   stimulus: `<p>Unfortunately, you do not qualify to continue this experiment. Your completion code is ${failed_code}</p>` +
//             '<p>Please press <strong>Escape</strong> to close the window. You will be paid for your time up to now.</p>',
//   choices: ['Esc'],
//   on_finish: function(data){
//     data.completion_code = failed_code
//     save_data(True)
//     window.close();
//   }
// };

var prac_thecrossant_break={
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
    data.trial_type='prac_color_black'
    data.stimulus='black_plus_sign'
    timetakenforpluswindow=removecolor
    colordetretime=colorStart()
    removecolor=colorStop(colordetretime)
    prac_learn_phase_color.stimulus_duration= removecolor
    prac_learn_phase_color.trial_duration=removecolor
    prac_thecrossant_black.stimulus_duration= 2000-removecolor
    prac_thecrossant_black.trial_duration=2000-removecolor
    prac_curr_learning_trial=prac_curr_learning_trial+1,
    prac_learn_phase.stimulus=create_learning_trial(prac_learn_left,prac_learn_right,prac_curr_learning_trial)
    prac_learn_phase.trial_duration=3500
    prac_learn_phase.stimulus_duration=3500
    prac_thecrossant_black.stimulus=create_memory_ten('black')
    prac_thecrossant.stimulus=create_learningcolor_trial(prac_curr_learning_trial,prac_pluscolor[prac_curr_learning_trial])
    attentioncheck_learningphase(prac_learn_phase,sfa,prac_curr_learning_trial,n_prac_learning_trial,instruct_dir_01,prac_thecrossant,prac_thecrossant_black,prac_thecrossant_break)
    
  }
}

var prac_learn_phase = {
  type: 'html-keyboard-responsefl',
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  stimulus:create_learning_trial(prac_learn_left,prac_learn_right,prac_curr_learning_trial),
  stimulus_duration:3500,
  trial_duration:3500,
  on_finish: function(data) {
    data.trial_type = 'prac_learn_phase(without_color)';
    data.stimulus='black_plus_sign'
    data.stimulus_left=learn_left[prac_curr_learning_trial],
    data.stimulus_right=learn_right[prac_curr_learning_trial],
    sfa=1
  }
}

var prac_learn_phase_color = {
  type: 'html-keyboard-responsefl',
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  stimulus:create_memory_ten(),
  stimulus_duration:removecolor,
  trial_duration:removecolor,
  on_finish: function(data) {
    data.stimulus=prac_pluscolor[prac_curr_learning_trial]
    data.stimulus_left=learn_left[prac_curr_learning_trial]
    data.stimulus_right=learn_right[prac_curr_learning_trial]
    data.trial_type = 'prac_black_cross(without_color)';
    sfa=1
  }
}


// practice remembering
let prac_feedback = {}
let correct_prac = 0
let prac_directmemory_phase = {}
var prac_directcorrectness = []
var prac_curr_direct_trial = 0
prac_directmemory_phase = {
  type: 'html-keyboard-response',
  choices: ['1','2','3'],
  response_ends_trial: true,
  stimulus:create_direct_trial(room_prac_direct_up,room_prac_direct_left,room_prac_direct_mid,room_prac_direct_right,prac_curr_direct_trial),
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
    data.trial_type = 'prac_directmemory_phase';
    sfa=data.key_press
    console.log(sfa)
    data.stimulus=room_prac_direct_up[prac_curr_direct_trial];
    data.stimulus_down_left=room_prac_direct_left[prac_curr_direct_trial],
    data.stimulus_down_mid=room_prac_direct_mid[prac_curr_direct_trial]
    data.stimulus_down_right=room_prac_direct_right[prac_curr_direct_trial];
    data.stimulus_correct=room_prac_direct_correct[prac_curr_direct_trial];
    if ((data.key_press == 49 && room_prac_direct_left[prac_curr_direct_trial] == room_prac_direct_correct[prac_curr_direct_trial])||
    (data.key_press == 50 && room_prac_direct_mid[prac_curr_direct_trial] == room_prac_direct_correct[prac_curr_direct_trial]) ||
    (data.key_press == 51 && room_prac_direct_right[prac_curr_direct_trial] == room_prac_direct_correct[prac_curr_direct_trial])) {
      data.accuracy = 1
      prac_directcorrectness.push(1)
      data.prac_weighted_accuracy = 1
      correct_prac +=1
      console.log("correct")
    } else {
      data.accuracy = 0
      prac_directcorrectness.push(0)
      data.prac_weighted_accuracy = 0
      console.log("incorrect")
    }
    let directsum = 0;
    prac_directcorrectness.forEach(function(value) {
      directsum += value;
    });
    getPRACvalues()
    data.cumulative_accuracy = directsum / prac_directcorrectness.length;
    
    prac_curr_direct_trial=prac_curr_direct_trial+1
    prac_directmemory_phase.stimulus=create_direct_trial(room_prac_direct_up,room_prac_direct_left,room_prac_direct_mid,room_prac_direct_right,prac_curr_direct_trial)
    attentioncheck(prac_directmemory_phase,sfa,prac_curr_direct_trial,n_prac_direct_trial,prac_feedback)    
  }
}
let restart_num = 0
function getPRACvalues() {
  if (prac_directcorrectness.length == 4){
    if (correct_prac >= prac_directcorrectness.length-1){
        prac_feedback = {
          type: 'html-button-response',
          stimulus: `<div style='margin-left:200px; margin-right: 200px; text-align: center;'>
                        <p style='font-size: 30px; line-height:1.5'>
                          Thank you for completing the practice, your score is ${correct_prac}/${prac_directcorrectness.length}. If you would like to practice some more, please click 'Try Again'. Otherwise, press 'Continue' to start the real task.
                        </p><br>
                      </div>`,
          choices: ['Try Again', 'Continue'],
          button_html: [
            '<button id="prac-retry-button" class ="custom-button" style="font-size: 20px; padding: 10px; margin: 10px;">%choice%</button>',
            '<button id="prac-continue-button" class="custom-button" style="font-size: 20px; padding: 10px; margin: 10px;">%choice%</button>'
          ],
          response_ends_trial: true, 
          on_load: function() {
            document.getElementById("prac-continue-button").addEventListener("click", function() {
              attentioncheck(prac_directmemory_phase,sfa,prac_curr_direct_trial,n_prac_direct_trial,proceed_actualTask) 
            });
        
            document.getElementById("prac-retry-button").addEventListener("click", function() {
              correct_prac = 0
              prac_curr_direct_trial = 0
              prac_directcorrectness = []
              prac_curr_learning_trial = 0
              timetakenforpluswindow=removecolor
              colordetretime=colorStart()
              removecolor=colorStop(colordetretime)
              prac_learn_phase_color.stimulus_duration= removecolor
              prac_learn_phase_color.trial_duration=removecolor
              prac_thecrossant_black.stimulus_duration= 2000-removecolor
              prac_thecrossant_black.trial_duration=2000-removecolor
              prac_learn_phase.stimulus=create_learning_trial(prac_learn_left,prac_learn_right,prac_curr_learning_trial)
              prac_learn_phase.trial_duration=3500
              prac_learn_phase.stimulus_duration=3500
              prac_thecrossant_black.stimulus=create_memory_ten('black')
              prac_thecrossant.stimulus=create_learningcolor_trial(prac_curr_learning_trial,prac_pluscolor[prac_curr_learning_trial])
              prac_directmemory_phase.stimulus=create_direct_trial(room_prac_direct_up,room_prac_direct_left,room_prac_direct_mid,room_prac_direct_right,prac_curr_direct_trial)
              jsPsych.addNodeToEndOfTimeline({
                timeline: [instruct_lastonebefore_practice,prac_learn_phase,prac_learn_phase_color,prac_thecrossant,prac_thecrossant_black,prac_thecrossant_break],
              }, jsPsych.resumeExperiment)
          });
        },
        on_finish: function(data) {
          data.trial_type = 'practice_feedback';
          data.stimulus = 'practice_feedback';

        }
      };
      
    } else {
      restart_num += 1
      if (restart_num > practice_threshold){
        jsPsych.addNodeToEndOfTimeline({
          timeline: [TaskEarlyFail],
        }, jsPsych.resumeExperiment)
      }else {
        prac_feedback = {
          type: 'html-button-response',
          stimulus: `<div style='margin-left:200px; margin-right: 200px; text-align: center;'>
                        <p style='font-size: 30px; line-height:1.5'>
                          Thank you for completing the practice, your score is ${correct_prac}/${prac_directcorrectness.length}. Please try again to learn the pairs and respond as accurately as possible. We would like you to practice again to try to improve your accuracy.
                        </p><br>
                      </div>`,
          choices: ['Try Again'],
          button_html: '<button id="prac-retry-button" class ="custom-button" style="font-size: 20px; padding: 10px; margin: 10px;">%choice%</button>',
          response_ends_trial: true, 
          on_load: function() {
        
            document.getElementById("prac-retry-button").addEventListener("click", function() {
              correct_prac = 0
              prac_curr_direct_trial = 0
              prac_directcorrectness = []
              prac_curr_learning_trial = 0
              timetakenforpluswindow=removecolor
              colordetretime=colorStart()
              removecolor=colorStop(colordetretime)
              prac_learn_phase_color.stimulus_duration= removecolor
              prac_learn_phase_color.trial_duration=removecolor
              prac_thecrossant_black.stimulus_duration= 2000-removecolor
              prac_thecrossant_black.trial_duration=2000-removecolor
              prac_learn_phase.stimulus=create_learning_trial(prac_learn_left,prac_learn_right,prac_curr_learning_trial)
              prac_learn_phase.trial_duration=3500
              prac_learn_phase.stimulus_duration=3500
              prac_thecrossant_black.stimulus=create_memory_ten('black')
              prac_thecrossant.stimulus=create_learningcolor_trial(prac_curr_learning_trial,prac_pluscolor[prac_curr_learning_trial])
              prac_directmemory_phase.stimulus=create_direct_trial(room_prac_direct_up,room_prac_direct_left,room_prac_direct_mid,room_prac_direct_right,prac_curr_direct_trial)
              jsPsych.addNodeToEndOfTimeline({
                timeline: [instruct_lastonebefore_practice,prac_learn_phase,prac_learn_phase_color,prac_thecrossant,prac_thecrossant_black,prac_thecrossant_break],
              }, jsPsych.resumeExperiment)
            });
          },
          on_finish: function(data) {
            data.trial_type = 'practice_feedback_force_restart';
            data.stimulus = 'practice_feedback';
            data.failed_practice = restart_num
          }
        };
      }
    }
  }
}

// practice phase end

// learning phase

// learning phase end
var directcorrectness = []
//Direct Memory test
var curr_direct_trial=0


//Direct Memory test end

correctness = []
//Shortest Path memory test
var curr_shortest_trial=0
var shortestpath_phase = {
  type: 'html-keyboard-response',
  choices: ['1','2','3'],
  response_ends_trial: true,
  stimulus:create_direct_trial(room_shortest_up,room_shortest_left,room_shortest_mid,room_shortest_right,curr_shortest_trial),
  stimulus_duration:15000,
  trial_duration:15000,
  on_load: function() {
    clearInterval(intervalId)
    setTimeout(function() {
      for(let i = 0;i<document.getElementsByClassName('bottom').length;i++){
        document.getElementsByClassName('bottom')[i].style.visibility = 'visible';
      }
    }, randomDelay);
  },
  on_finish: function(data) {
    data.trial_type = 'inference_phase';
    data.stimulus=room_shortest_up[curr_shortest_trial];
    data.stimulus_left=room_shortest_left[curr_shortest_trial];
    data.stimulus_middle=room_shortest_mid[curr_shortest_trial];
    data.stimulus_right=room_shortest_right[curr_shortest_trial]
    data.stimulus_correct=room_shortest_correct[curr_shortest_trial];
    if ((data.key_press == 49 && data.stimulus_left == data.stimulus_correct)||(data.key_press == 51 && data.stimulus_right == data.stimulus_correct)||(data.key_press == 50 && data.stimulus_middle == data.stimulus_correct)) {
      data.accuracy = 1
      correctness.push(1)
    } else {
      data.accuracy = 0
      correctness.push(0)
    }

    infKP += 1
    if (infKP==1){
      // Start the timer
      timer = 0;
      infINT = setInterval(() => {
          timer++;;
      }, 1000);
    }

    if (infKP == 4 && timer < 4) {
      clearInterval(infINT)
      jsPsych.addNodeToEndOfTimeline({
      timeline: [too_quick],
      }, jsPsych.resumeExperiment)
      infKP = -1
      timer = 0;
      data.tooquick = 1
    } else if ((infKP <= 4 && timer >= 4)){
      infKP = 0
      clearInterval(infINT);
      timer = 0
    }

    let sum = 0;
    correctness.forEach(function(value) {
      sum += value;
    });

    data.cumulative_accuracy = sum / correctness.length;
    sfa=data.key_press,
    curr_shortest_trial=curr_shortest_trial+1,
    shortestpath_phase.stimulus=create_direct_trial(room_shortest_up,room_shortest_left,room_shortest_mid, room_shortest_right,curr_shortest_trial)
    if (curr_shortest_trial == n_shortest_trial){
      jsPsych.addNodeToEndOfTimeline({
        timeline: [end_questions,thank_you],
      }, jsPsych.resumeExperiment)
    } else {
      attentioncheck_end(shortestpath_phase,sfa,curr_shortest_trial,n_shortest_trial)
    }
  }
}
//Shortest Path memory end

generate_learning_block(learn_left, learn_right, n_learning_trial)
//generate_remembering_block(room_direct_up, room_direct_left, room_direct_mid, room_direct_right, n_direct_trial)
post_break=createbreak(postprac_learn,post_instructnames,[learn_phase,learn_phase_color,thecrossant,thecrossant_black,thecrossant_break])
remembering_instruct_break=createbreak(remembering_prac,dir_instructnames,prac_directmemory_phase)
short_break=createbreak(intro_short,short_instructnames,shortestpath_phase)
//Goal directed planning end

//The proceed page from practice to actual experiment
proceed_actualTask = {
  type: 'html-button-response',
  stimulus: "<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Thank you for completing the practice, you will be compensated for 2$ and if you wish to end early you can click the button below. If you would like to continue the task (30 mins) to receive up to 10$ in bonus payments, please press continue.</p><br>",
  choices: ['End Early', 'Continue'],
  button_html: [
    '<button id="prac-retry-button" class ="custom-button" style="font-size: 20px; padding: 10px; margin: 10px;">%choice%</button>',
    '<button id="prac-continue-button" class="custom-button" style="font-size: 20px; padding: 10px; margin: 10px;">%choice%</button>'
  ],
  response_ends_trial: true, 
on_finish: function(data) {
  data.trial_type = 'proceed_actualTask';
  data.stimulus = 'proceed_actualTask';
  if (data.button_pressed == 0) {
    data.response = 'End Early';
    jsPsych.addNodeToEndOfTimeline({
        timeline: [TaskEndEarly],
      }, jsPsych.resumeExperiment)
  } else if (data.button_pressed == 1) {
    data.response = 'Continue';
    jsPsych.addNodeToEndOfTimeline({
        timeline: [last_inst,learn_phase,learn_phase_color,thecrossant,thecrossant_black,thecrossant_break],
      }, jsPsych.resumeExperiment)
  }
}
};

var last_inst = {
  type: 'html-keyboard-response',
  stimulus: "<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>We will start the first learning block now. Please make sure to respond to every trial, as too many missed trials will disqualify you from participating. Only the first response will be taken, and please try to respond as quickly and as accurately as possible.</p><p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
  choices: ["Space"],
  on_finish: function (data){
    data.trial_type = 'last_inst'
    data.stimulus = 'last_inst'
  }
}


// final thank you
var thank_you = {
  type: 'html-keyboard-response',
  choices: ['space'],
  stimulus: `<p> Congratulations, you are all done!</p><p> <strong>Please click space on your keyboard to end the experiment!</strong> The secret code to enter at the beginning screen is: <strong>${endCode}</strong></p><p> Please make sure to submit the HIT and email uciccnl@gmail.com if you had any issues! </p><br><p>Please remember to submit this data by clicking space after copying the code. Failure of submission will lead to in-complete payment</p>`,
  on_start: function(data){
    save_data()
  },
  on_finish: function (data) {
    data.trial_type = 'thank_you';
    data.detectfocus = detectfocus;
    data.breakfocus = blurNUM
    data.completion_code = "C78LSMTN"
    save_data()
  }
}


//practice attention check
// 1: The black plus sign, the color change, the black plus sign for response
var ac_colorprepare=colorStart()
var ac_colorstop=colorStop(ac_colorprepare)
var ac_colorlist=['blue','green','green','blue','green','green','blue','green','blue','blue']
var ac_colornumber=0
var total_ac = 0
var correct_ac = 0
ac_feedback = {}

var prac_attentioncheck_blackplus={
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus_height: 100,
  stimulus_width: 100,
  stimulus_duration: ac_colorprepare,
  trial_duration: ac_colorprepare,
  response_ends_trial: false,
  stimulus:create_memory_ten(),
  prompt:parse("<br><br><style>body {background-color: #ffff;}</style>"),
  on_finish: function(data) {
    data.trial_type='prac_atten_color_black'
    data.stimulus='black_plus_sign'
    prac_attentioncheck_colorchange.stimulus=create_color_wow(ac_colorlist[ac_colornumber])
    jsPsych.addNodeToEndOfTimeline({
      timeline: [prac_attentioncheck_colorchange],
    }, jsPsych.resumeExperiment)
  }
}
var csfa=[]

//attention check color cross
function create_color_wow(color) {
  return parse("<p style='position:absolute;top: 50%;right: 50%;transform: translate(50%, -50%);font-size: 125px;color: %s;'>\u002B</p>"
  ,color)
}

var prac_attentioncheck_colorchange={
  type: 'html-keyboard-responsefl',
  choices: ['1','2'],
  response_ends_trial: false,
  stimulus:create_color_wow(ac_colorlist[ac_colornumber]),
  stimulus_duration:ac_colorstop,
  trial_duration:ac_colorstop,
  on_finish: function(data) {
    data.trial_type = 'prac_atten_color';
    csfa=data.key_press
    jsPsych.addNodeToEndOfTimeline({
      timeline: [prac_attentioncheck_thethird],
    }, jsPsych.resumeExperiment)
  }
}

var prac_attentioncheck_thethird={
  type: 'html-keyboard-response',
  choices: ['1','2'],
  stimulus_height: 100,
  stimulus_width: 100,
  stimulus_duration: 2000,
  trial_duration: 2000,
  response_ends_trial: false,
  stimulus:create_memory_ten(),
  prompt:parse("<br><br><style>body {background-color: #ffff;}</style>"),
  on_finish: function(data) {
    data.trial_type='prac_atten_color_black'
    data.stimulus='black_plus_sign'
    if(ac_colornumber<ac_colortotal){
      if (csfa==49&&ac_colorlist[ac_colornumber]=='blue'){
        correct_ac += 1
        jsPsych.addNodeToEndOfTimeline({
          timeline: [prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
      }else if (csfa==50&&ac_colorlist[ac_colornumber]=='green'){
        correct_ac += 1
        jsPsych.addNodeToEndOfTimeline({
          timeline: [prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
      }else if (data.key_press==49&&ac_colorlist[ac_colornumber]=='blue'){
        correct_ac += 1
        jsPsych.addNodeToEndOfTimeline({
          timeline: [prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
      }else if (data.key_press==50&&ac_colorlist[ac_colornumber]=='green'){
        correct_ac += 1
        jsPsych.addNodeToEndOfTimeline({
          timeline: [prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
      }else{
        jsPsych.addNodeToEndOfTimeline({
          timeline: [helpofattentioncheck,prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
      }
    }else{
      if (csfa==49&&ac_colorlist[ac_colornumber]=='blue' || csfa==50&&ac_colorlist[ac_colornumber]=='green' || data.key_press==49&&ac_colorlist[ac_colornumber]=='blue' || data.key_press==49&&ac_colorlist[ac_colornumber]=='green') {
        correct_ac += 1
      }
      total_ac += 1
      getACvalues()
      if (kickout_record>kickout_total){
          jsPsych.addNodeToEndOfTimeline({
            timeline: [TaskEarlyFail],
          }, jsPsych.resumeExperiment)
      }else{
          jsPsych.addNodeToEndOfTimeline({
            timeline: [ac_feedback],
          }, jsPsych.resumeExperiment)
      }
  }
    ac_colornumber+=1
    total_ac +=1
    csfa=[]
    ac_colorprepare=colorStart()
    ac_colorstop=colorStop(ac_colorprepare)
    prac_attentioncheck_blackplus.stimulus_duration=ac_colorprepare
    prac_attentioncheck_blackplus.trial_duration=ac_colorprepare
    prac_attentioncheck_colorchange.stimulus_duration=ac_colorstop
    prac_attentioncheck_colorchange.trial_duration=ac_colorstop
  }
}

function getACvalues() {
  if (correct_ac/total_ac<0.7){
  kickout_record+=1
  ac_feedback = {
    type: 'html-button-response',
    stimulus: `<div style='margin-left:200px; margin-right: 200px; text-align: center;'>
                 <p style='font-size: 30px; line-height:1.5'>
                   Thank you for completing the practice, your score is ${correct_ac}/${total_ac}. 
                   <br><br> 
                   Please try to respond to each color change as accurately as possible during the task. 
                   To continue this experiment, please make sure to get at least 7 of the 10 trials correct. When you are ready press 'Try Again'. 
                 </p><br>
               </div>`,
    choices: ['Try Again'],
    button_html: [
      '<button id="retry-button" class ="custom-button" style="font-size: 20px; padding: 10px; margin: 10px;">%choice%</button>',
    ],
    response_ends_trial: true, 
    on_load: function() {
      document.getElementById("retry-button").addEventListener("click", function() {
        ac_colornumber = 0
        total_ac = 0
        correct_ac = 0
        jsPsych.addNodeToEndOfTimeline({
          timeline: [prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
        console.log("Try Again button clicked!");
      });
    },
    on_finish: function(data) {
      data.trial_type = 'attentioncheck_feedback';
      data.stimulus = 'cross_check_feedback';
      data.failed_practice = kickout_record
    }
  };
}else{
  ac_feedback = {
    type: 'html-button-response',
    stimulus: `<div style='margin-left:200px; margin-right: 200px; text-align: center;'>
                 <p style='font-size: 30px; line-height:1.5'>
                   Thank you for completing the practice, your score is ${correct_ac}/${total_ac}. 
                   <br><br> 
                   Please try to respond to each color change as accurately as possible during the task. 
                   If you are ready to continue to the next practice, press 'Continue'.
                 </p><br>
               </div>`,
    choices: ['Continue'],
    button_html: [
      '<button id="continue-button" class="custom-button" style="font-size: 20px; padding: 10px; margin: 10px;">%choice%</button>'
    ],
    response_ends_trial: true, 
    on_load: function() {
      document.getElementById("continue-button").addEventListener("click", function() {
        jsPsych.addNodeToEndOfTimeline({
          timeline: [instruct_lastonebefore_practice,prac_learn_phase,prac_learn_phase_color,prac_thecrossant,prac_thecrossant_black,prac_thecrossant_break],
        }, jsPsych.resumeExperiment)
      });
    },
    on_finish: function(data) {
      data.trial_type = 'attentioncheck_feedback';
      data.stimulus = 'cross_check_feedback';
    }
  };
}
}



var helpofattentioncheck={
  type: 'html-keyboard-response',
  choices: ['spacebar'],
  stimulus: "<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>It seems you got one wrong. Remember, for the cross below:</p><img src= '../static/images/isi.png' width='150' height='150'><p style ='font-size: 30px;line-height:1.5'>If the cross flashes <span style='color: blue;'>blue,</span> press the '1' key on your keyboard, if it flashes <span style='color: green;'>green,</span> press '2'.<p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
  on_finish: function (data) {
    data.trial_type = 'attentioncheck_help';
    data.stimulus='instruct'
  }
}

var instruct_lastonebefore_practice={
  type: 'html-keyboard-response',
  choices: ['spacebar'],
  stimulus: "<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Now we will do a practice of the <strong>LEARNING</strong> phase altogether. Make sure to remember the two objects as a pair, and additionally respond '1' when the cross flashes blue, and '2' when it flashes green. Please respond as quickly and as accurately as possible.<p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
  on_finish: function (data) {
    data.trial_type = 'last_instruct';
    data.stimulus='instruct'
  }
}


//practice attention check end

//instruction part 2
//instruction part 2
// Remembering text
remembering_text = "<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 55px;margin-bottom:40px'><b>REMEMBERING</b><br><br>",

rememberingnames = ["remembering_text"]
remembering_instruct = {remembering_text}
//Text for direct memory instruction
instruct_dir_1="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'><strong>REMEMBERING</strong> phase: Your job is to show us how well you remember the pairs! You will see one made up object on the top of the screen. You should pick which object on the bottom of the screen was paired with the one on top during <strong>LEARNING</strong>.</p><br><br>",
// instruct_dir_1 is for post test learning phase
instruct_dir_3="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>For example, if you had studied the following pair in <strong>LEARNING</strong>:</p><img src= '../static/images/introEX.png' width='700' height='500'><br><br>",
instruct_dir_4="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>And in <strong>REMEMBERING</strong> were shown this:</p><img src= '../static/images/introEX2.png' width='700' height='500'><p style ='font-size: 30px;line-height:1.5'>You would press '1', as the hot pink image on the left was paired with the green image at the top."
instruct_dir_2="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>To pick the object on the left, press '1'. To pick the object in the middle, press '2', and to pick the object on the right, press '3'.</p><br><br>",
instruct_dir_5=remembering_text
dir_instructnames = ["instruct_dir_1","instruct_dir_2","instruct_dir_3", "instruct_dir_4","instruct_dir_5"] //Same for above, if you want to delete or add, just decrease or add the var
dir_instruct={instruct_dir_1,instruct_dir_2,instruct_dir_3,instruct_dir_4,instruct_dir_5} //same for above

var instruct_dir_01 = {
  type: 'html-button-response',
  choices: ['Next'], 
  stimulus: instruct_dir_1,
  button_html: '<button class="custom-button">%choice%</button>',
  on_finish: function(data) {
    data.trial_type = 'instruct_dir_01';
    data.stimulus = 'instruct';
    console.log(data.button_pressed)
    if (data.button_pressed == 0) {
      data.response = 'Next';
      jsPsych.addNodeToEndOfTimeline({
          timeline: [instruct_dir_02],
        }, jsPsych.resumeExperiment)
    }
  }
};


var instruct_dir_02 = {
  type: 'html-button-response',
  choices: ['Previous', 'Next'], 
  stimulus: instruct_dir_2,
  button_html: '<button class="custom-button">%choice%</button>',
  on_finish: function(data) {
    // Add a custom trial type and stimulus
    data.trial_type = 'instruct_dir_2';
    data.stimulus = 'instruct';
    // Check which button was pressed
    if (data.button_pressed == 0) {
      data.response = 'Previous';
      jsPsych.addNodeToEndOfTimeline({
          timeline: [instruct_dir_01],
        }, jsPsych.resumeExperiment)
    } else if (data.button_pressed == 1) {
      data.response = 'Next';
      jsPsych.addNodeToEndOfTimeline({
          timeline: [instruct_dir_03],
        }, jsPsych.resumeExperiment)
    }
  }
};

var instruct_dir_03= {
  type: 'html-button-response',
  choices: ['Previous', 'Next'], 
  stimulus: instruct_dir_3,
  button_html: '<button class="custom-button">%choice%</button>',
  on_finish: function(data) {
    // Add a custom trial type and stimulus
    data.trial_type = 'instruct_dir_3';
    data.stimulus = 'instruct';
    // Check which button was pressed
    if (data.button_pressed == 0) {
      data.response = 'Previous';
      jsPsych.addNodeToEndOfTimeline({
          timeline: [instruct_dir_02],
        }, jsPsych.resumeExperiment)
    } else if (data.button_pressed == 1) {
      data.response = 'Next';
      jsPsych.addNodeToEndOfTimeline({
          timeline: [instruct_dir_04],
        }, jsPsych.resumeExperiment)
    }
  }
};

var instruct_dir_04 = {
  type: 'html-button-response',
  choices: ['Previous', 'Start'], 
  stimulus: instruct_dir_4,
  button_html: '<button class="custom-button">%choice%</button>',
  on_finish: function(data) {
    // Add a custom trial type and stimulus
    data.trial_type = 'instruct_dir_4';
    data.stimulus = 'instruct';
    // Check which button was pressed
    if (data.button_pressed == 0) {
      data.response = 'Previous';
      jsPsych.addNodeToEndOfTimeline({
          timeline: [instruct_dir_03],
        }, jsPsych.resumeExperiment)
    } else if (data.button_pressed == 1) {
      data.response = 'Start';
      jsPsych.addNodeToEndOfTimeline({
          timeline: [remembering_instruct_break],
        }, jsPsych.resumeExperiment)
    }
  }
};

//instruction part 2 end


var end_questions = {
  type: 'survey-html-form',
  preamble: "<br><br><h1>Post-Task Survey</h1><p style='font-size: 16px'>Thank you for completing the task! We would like you to answer the following questions before the experiment ends. <br>Note: <span style='color: red;'>*</span> = required</p><hr>",
  html: survey_questions + `
        <button id="submit" class="custom-button">Submit Answers</button><br><br>`,
  on_load: function() {
    document.querySelector('.jspsych-btn').style.display = 'none';
    document.getElementById("submit").addEventListener("click", function(event) {
      
      event.preventDefault();
      problems = []
      for (i=0;i<3;i++){
          var response1=document.getElementsByName("smooth")[i].checked
          if (response1){
              smooth = document.getElementsByName("smooth")[i].value
          }
          var response2=document.getElementsByName("problems")[i].checked
          if (response2){
              problems.push(document.getElementsByName("problems")[i].value)
          }
      }
    
      distraction = document.getElementById("distraction").value
      strategies = document.getElementById("strategies").value
      easier = document.getElementById('easier').value
      similar = document.getElementById('similar').value
      comments = document.getElementById('comments').value
      let checked = validateForm()
      if (checked){
        jsPsych.finishTrial()
      }
  
  });
  },
  on_finish: function(data) {
    data.trial_type = "survey"
    data.stimulus = "survey-questions"
    data.problems = problems
    data.smooth = smooth
    data.distraction = distraction
    data.strategies = strategies
    data.easier = easier
    data.similar = similar
    data.comments = comments
    console.log(problems,smooth,distraction,strategies,easier,similar,comments)
    save_data()
  }
};
function validateForm() {
  let requiredFields = document.querySelectorAll("[required]");
  let allFilled = true;


  if (allFilled) {
      console.log("Form is valid!");
      return true;
  } else {
      alert("Please fill out all required fields.");
      return false;
  }
}
var problems = []
var smooth = 0 
var distraction = 0 
var strategies = 0 
var easier = 0 
var similar = 0 
var comments = 0 

// const preload = {
//   type: 'jsPsychPreload',
//   images: all_images,
//   show_progress_bar: true,
// }

// // Listen for fullscreen changes
// document.addEventListener("fullscreenchange", checkFullscreen);


// Detect when the user clicks away or switches tabs



//time line here
timeline.push(welcome, enterFullscreen)
timeline.push(instruct_01)
// timelinepushintro(postprac_learn,post_instructnames)
// timeline.push(learn_phase)
// timeline.push(learn_phase_color,thecrossant,thecrossant_black,thecrossant_break)
jsPsych.init({
  timeline: timeline,
  preload_images: all_images,
  max_load_time: 20000,
  on_load: function() {
    console.log('loaded!')
  },
  on_finish: function () {
    /* Retrieve the participant's data from jsPsych */
    // Determine and save participant bonus payment
    psiturk.recordUnstructuredData("subject_id", subject_id);
    console.log('loaded!')
  },
})

let blurNUM = 0
window.addEventListener("blur", () => {
  blurNUM+=1
  console.log(blurNUM)
});

// // Event listeners to detect focus/blur
// let focusTimeout;

// window.addEventListener("blur", () => {
//   // Pause the experiment immediately when the page loses focus
//   jsPsych.pauseExperiment();
//   console.log("Experiment paused due to losing focus.");
// });

// window.addEventListener("focus", () => {
//   // Once the page regains focus, display "Resuming..." immediately
//   document.getElementById("jspsych-content").innerHTML = "Resuming...";

//   // Wait for 3 seconds before resuming the experiment
//   clearTimeout(focusTimeout);
//   focusTimeout = setTimeout(() => {
//     // Resume the experiment after the delay
//     jsPsych.resumeExperiment();
//     console.log("Experiment resumed.");
//   }, 3000); // Delay for 3 seconds before resuming
// });