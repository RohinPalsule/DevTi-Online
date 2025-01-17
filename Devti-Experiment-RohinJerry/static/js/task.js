var debug_mode = 0; // debug mode determines how long the blocks are, 5 sec in debug mode, 5 minutes in actual experiment
//var data_save_method = 'csv_server_py';
var data_save_method = 'csv_server_py';

// Will be set to true when experiment is exiting fullscreen normally, to prevent above end experiment code
var normal_exit = false;
var window_height = window.screen.height;



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
    data.trial_type = "id_enter"
    window.useridtouse=data.responses
    window.useridtouse = useridtouse.split('"')[3];
    subject_id=useridtouse
  }
}
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
        </ul> <br />
        <p>When you are ready to take the experiment, click 'Enter Fullscreen' to begin.</p> <br />
    `,
  choices: ['Enter Fullscreen'],
  on_finish: function() {
      // Trigger fullscreen mode when the button is clicked
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
      form = document.getElementById('choices-form');
      radios = form.querySelectorAll('input[type="radio"]');
      feedbackP = document.getElementById('feedbackP');
      advanceButton = document.getElementById('advance-button');
      restartButton = document.getElementById('restart-button');
      radios.forEach(radio => {
        radio.addEventListener('change', function() {
          checkedBox = Array.from(radios).find(rb => rb.checked);
          if (checkedBox) {
            if (checkedBox.value === '3') {
              if (tester == 0){
                feedbackP.style.visibility = 'visible';
                advanceButton.style.visibility = 'visible';
              }
            } else {
              feedbackP.style.visibility = 'hidden';
              advanceButton.style.visibility = 'hidden';
              restartButton.style.visibility = 'visible';
              tester = 1
            }
          }
        });
      });

      advanceButton.addEventListener('click', function() {
        jsPsych.finishTrial();
      });
      restartButton.addEventListener('click', function() {
        jsPsych.finishTrial();
        jsPsych.endCurrentTimeline();
        attentioncheck(directmemory_phase,sfa,curr_direct_trial,n_direct_trial,short_break)
        tester = 0
      });
    },
    on_finish: function(data){
      data.trial_type = 'intro_'+ number;
      data.stimulus='instruct'
      const formData = new FormData(form);
      const selectedResp = formData.getAll('response');
      data.selected_options = selectedResp;
      console.log('Selected options:', selectedResp);
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
        timeline:[TaskFailed],},jsPsych.resumeExperiment)
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
        timeline:[TaskFailed],},jsPsych.resumeExperiment)
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
      timeline:[TaskFailed],},jsPsych.resumeExperiment)
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

var TaskFailed = {
  type: 'html-keyboard-response',
  stimulus: '<p>Unfortunately, you do not qualify to continue this experiment.</p>' +
            '<p>Please press <strong>Escape</strong> to close the window. You will be paid for your time up to now.</p>',
  choices: ['Esc'],
  on_finish: function(data){
    window.close();
  }
};

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
    attentioncheck_learningphase(prac_learn_phase,sfa,prac_curr_learning_trial,n_prac_learning_trial,remembering_instruct_break,prac_thecrossant,prac_thecrossant_black,prac_thecrossant_break)
    
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
prac_directcorrectness = []
prac_curr_direct_trial = 0
  prac_directmemory_phase = {
    type: 'html-keyboard-response',
    choices: ['1','2','3'],
    response_ends_trial: true,
    stimulus:create_direct_trial(room_prac_direct_up,room_prac_direct_left,room_prac_direct_mid,room_prac_direct_right,prac_curr_direct_trial),
    // stimulus_duration:6500,//5 second for now, we will discuss it 
    // trial_duration:6500,//5 second for now 
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
      data.stimulus=room_prac_direct_up[prac_curr_direct_trial];
      data.stimulus_down_left=room_prac_direct_left[prac_curr_direct_trial],
      data.stimulus_down_mid=room_prac_direct_mid[prac_curr_direct_trial]
      data.stimulus_down_right=room_prac_direct_right[prac_curr_direct_trial];
      data.stimulus_correct=room_direct_correct[prac_curr_direct_trial];
      if ((data.key_press == 49 && data.stimulus_down_left == data.stimulus_correct)||
      (data.key_press == 50 && data.stimulus_down_mid == data.stimulus_correct) ||(data.key_press == 51 && data.stimulus_down_right == data.stimulus_correct)) {
        data.accuracy = 1
        prac_directcorrectness.push(1)
        data.weighted_accuracy = 1
      } else {
        data.accuracy = 0
        prac_directcorrectness.push(0)
        data.weighted_accuracy = 0
      }
      
      let directsum = 0;
      prac_directcorrectness.forEach(function(value) {
        directsum += value;
      });

      data.cumulative_accuracy = directsum / prac_directcorrectness.length;
      sfa=data.key_press,
      prac_curr_direct_trial=prac_curr_direct_trial+1,
      prac_directmemory_phase.stimulus=create_direct_trial(room_prac_direct_up,room_prac_direct_left,room_prac_direct_mid,room_prac_direct_right,prac_curr_direct_trial)
      attentioncheck(prac_directmemory_phase,sfa,prac_curr_direct_trial,n_prac_direct_trial,post_break)    
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
    if ((data.key_press == 49 && data.stimulus_left == data.stimulus_correct)||(data.key_press == 50 && data.stimulus_right == data.stimulus_correct)) {
      data.accuracy = 1
      correctness.push(1)
    } else {
      data.accuracy = 0
      correctness.push(0)
    }
    // if (data.rt < 800) {
    //   infKP += 1
    //   if (infKP >= 3) {
    //     jsPsych.addNodeToEndOfTimeline({
    //       timeline: [too_quick],
    //       }, jsPsych.resumeExperiment)
    //   }
    // }

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
        timeline: [thank_you],
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

// final thank you
var thank_you = {
  type: 'html-keyboard-response',
  choices: ['space'],
  stimulus: "<p> Congratulations, you are all done!</p><p> <strong>Please click space on your keyboard to end the experiment!</strong> The secret code to enter at the beginning screen is: AJFHBG897</p><p> Please make sure to submit the HIT and email uciccnl@gmail.com if you had any issues! </p>",
  on_finish: function (data) {
    data.trial_type = 'thank_you';
    data.detectfocus = detectfocus;
    data.breakfocus = blurNUM
    save_data(true)
  }
}


//practice attention check
// 1: The black plus sign, the color change, the black plus sign for response
var ac_colorprepare=colorStart()
var ac_colorstop=colorStop(ac_colorprepare)
var ac_colorlist=['blue','green','green','blue','green','green','blue','green','blue','blue']
var ac_colornumber=0
var ac_colortotal=6

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
        jsPsych.addNodeToEndOfTimeline({
          timeline: [prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
      }else if (csfa==50&&ac_colorlist[ac_colornumber]=='green'){
        jsPsych.addNodeToEndOfTimeline({
          timeline: [prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
      }else if (data.key_press==49&&ac_colorlist[ac_colornumber]=='blue'){
        jsPsych.addNodeToEndOfTimeline({
          timeline: [prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
      }else if (data.key_press==50&&ac_colorlist[ac_colornumber]=='green'){
        jsPsych.addNodeToEndOfTimeline({
          timeline: [prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
      }else{
        ac_colornumber=0
        jsPsych.addNodeToEndOfTimeline({
          timeline: [helpofattentioncheck,prac_attentioncheck_blackplus],
        }, jsPsych.resumeExperiment)
      }
    }else{
      jsPsych.addNodeToEndOfTimeline({
        timeline: [instruct_lastonebefore_practice,prac_learn_phase,prac_learn_phase_color,prac_thecrossant,prac_thecrossant_black,prac_thecrossant_break],
      }, jsPsych.resumeExperiment)
    }
    ac_colornumber=ac_colornumber+1
    csfa=[]
    ac_colorprepare=colorStart()
    ac_colorstop=colorStop(ac_colorprepare)
    prac_attentioncheck_blackplus.stimulus_duration=ac_colorprepare
    prac_attentioncheck_blackplus.trial_duration=ac_colorprepare
    prac_attentioncheck_colorchange.stimulus_duration=ac_colorstop
    prac_attentioncheck_colorchange.trial_duration=ac_colorstop
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
  stimulus: "<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Now we will do a practice of the <strong>LEARNING</strong> and <strong>REMEMBERING</strong> parts. Make sure to remember the two objects as a pair, and additionally respond '1' when the cross flashes blue, and '2' when it flashes green. Please respond as quickly and as accurately as possible.<p style= 'font-size:25px;margin-top:100px'>[press the spacebar to continue]</p>",
  on_finish: function (data) {
    data.trial_type = 'last_instruct';
    data.stimulus='instruct'
  }
}


//practice attention check end



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
timelinepushintro(intro_learn,instructnames)
timeline.push(prac_attentioncheck_blackplus)
// timelinepushintro(postprac_learn,post_instructnames)
// timeline.push(learn_phase)
// timeline.push(learn_phase_color,thecrossant,thecrossant_black,thecrossant_break)
jsPsych.init({
  timeline: timeline,
  preload_images: all_images,
  max_load_time: 5000,
  on_load: function() {
    console.log('loaded!')
  },
  on_finish: function () {
    /* Retrieve the participant's data from jsPsych */
    // Determine and save participant bonus payment
    psiturk.recordUnstructuredData("subject_id", subject_id);
    save_data(true)
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