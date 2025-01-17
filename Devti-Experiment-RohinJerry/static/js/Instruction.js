// Add custom CSS for buttons dynamically
const style = document.createElement('style');
style.innerHTML = `
  .custom-button {
    background-color: lightgreen; /* Set the background color */
    color: black; /* Set the text color */
    font-size: 20px; /* Make the font size bigger */
    padding: 10px 25px; /* Adjust padding for larger buttons */
    border: none; /* Remove borders */
    border-radius: 5px; /* Add rounded corners */
    cursor: pointer; /* Change cursor to pointer when hovering */
  }
  .custom-button:hover {
    background-color: green; /* Darker green on hover */
    color: white; /* Change text color on hover */
  }
`;
document.head.appendChild(style); // Append the styles to the document head


//instruction part 01
var instruct_1="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 55px;margin-bottom:40px'><b>Welcome!</b></p><p style ='font-size: 30px;line-height:1.5'>This game will test your memory. The game will be broken up into <strong>LEARNING</strong> and <strong>REMEMBERING</strong> parts.<br><br>";
var instruct_2="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>During the <strong>LEARNING</strong> part, you will see pairs of made up objects presented on the screen. These are pretend objects that don’t exist in the real world. In this phase, you should try your hardest to remember that the two objects go together.</p><br><br>";
var instruct_3="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>Each pair will be on the screen for <strong>three and a half seconds</strong>. The best way that we’ve found for people to remember these pairs is to create a story or phrase relating the two objects.<br><br>";
var instruct_4="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>For example, if you are presented with this pair:</p><img src= '../static/images/introEX.png' width='600' height='400'></img><p style ='font-size: 30px;line-height:1.5'>It may help you to imagine the two items interacting. For example, you could imagine them being stacked on top of one another. Or, you might like to use words to help you remember the pair.</p><br><br>";


if (taskStructure == "blocked"){
  var instruct_5="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>You will see each pair 4 times while playing this game, which means you will have four chances to teach each pair to yourself. The game will be broken into 8 <strong>LEARNING</strong> and <strong>REMEMBERING</strong> parts. Each learning part will be followed by a remembering part.</p><br><br>";
} else if (taskStructure == "interleaved"){
  var instruct_5="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>You will see each pair 4 times while playing this game, which means you will have four chances to teach each pair to yourself. The game will be broken into 4 <strong>LEARNING</strong> and <strong>REMEMBERING</strong> parts. Each learning part will be followed by a remembering part.</p><br><br>";

}



var instruct_6="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>In the <strong>REMEMBERING</strong> phase, you will be tested on your memory of these pairs, so try your best to remember these pairs.</p><br><br>";
var instruct_7="<div style='margin-left:200px ;margin-right: 200px ;text-justify: auto'><p style ='font-size: 30px;line-height:1.5'>To make sure that you are paying attention on each trial, you will see a cross on the center of your screen like the one below:</p><img src= '../static/images/isi.png' width='150' height='150'><p style ='font-size: 30px;line-height:1.5'>If the cross flashes <span style='color: blue;'>blue,</span> press the '1' key on your keyboard, if it flashes <span style='color: green;'>green,</span> press '2'.<br><br>Now we will do a short practice on these color changes. You will be unable to advance until you get all the color changes correct.<br><br>";



var instruct_01 = {
    type: 'html-button-response',
    choices: ['Next'], 
    stimulus: instruct_1,
    button_html: '<button class="custom-button">%choice%</button>',
    on_finish: function(data) {
      data.trial_type = 'instruct_1';
      data.stimulus = 'instruct';
      console.log(data.button_pressed)
      if (data.button_pressed == 0) {
        data.response = 'Next';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_02],
          }, jsPsych.resumeExperiment)
      }
    }
};


var instruct_02 = {
    type: 'html-button-response',
    choices: ['Previous', 'Next'], 
    stimulus: instruct_2,
    button_html: '<button class="custom-button">%choice%</button>',
    on_finish: function(data) {
      // Add a custom trial type and stimulus
      data.trial_type = 'instruct_2';
      data.stimulus = 'instruct';
      // Check which button was pressed
      if (data.button_pressed == 0) {
        data.response = 'Previous';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_01],
          }, jsPsych.resumeExperiment)
      } else if (data.button_pressed == 1) {
        data.response = 'Next';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_03],
          }, jsPsych.resumeExperiment)
      }
    }
};

var instruct_03 = {
    type: 'html-button-response',
    choices: ['Previous', 'Next'], 
    stimulus: instruct_3,
    button_html: '<button class="custom-button">%choice%</button>',
    on_finish: function(data) {
      // Add a custom trial type and stimulus
      data.trial_type = 'instruct_3';
      data.stimulus = 'instruct';
      // Check which button was pressed
      if (data.button_pressed == 0) {
        data.response = 'Previous';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_02],
          }, jsPsych.resumeExperiment)
      } else if (data.button_pressed == 1) {
        data.response = 'Next';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_04],
          }, jsPsych.resumeExperiment)
      }
    }
};

var instruct_04 = {
    type: 'html-button-response',
    choices: ['Previous', 'Next'], 
    stimulus: instruct_4,
    button_html: '<button class="custom-button">%choice%</button>',
    on_finish: function(data) {
      // Add a custom trial type and stimulus
      data.trial_type = 'instruct_4';
      data.stimulus = 'instruct';
      // Check which button was pressed
      if (data.button_pressed == 0) {
        data.response = 'Previous';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_03],
          }, jsPsych.resumeExperiment)
      } else if (data.button_pressed == 1) {
        data.response = 'Next';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_05],
          }, jsPsych.resumeExperiment)
      }
    }
};

var instruct_05 = {
    type: 'html-button-response',
    choices: ['Previous', 'Next'], 
    stimulus: instruct_5,
    button_html: '<button class="custom-button">%choice%</button>',
    on_finish: function(data) {
      // Add a custom trial type and stimulus
      data.trial_type = 'instruct_5';
      data.stimulus = 'instruct';
      // Check which button was pressed
      if (data.button_pressed == 0) {
        data.response = 'Previous';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_04],
          }, jsPsych.resumeExperiment)
      } else if (data.button_pressed == 1) {
        data.response = 'Next';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_06],
          }, jsPsych.resumeExperiment)
      }
    }
};

var instruct_06 = {
    type: 'html-button-response',
    choices: ['Previous', 'Next'], 
    stimulus: instruct_6,
    button_html: '<button class="custom-button">%choice%</button>',
    on_finish: function(data) {
      // Add a custom trial type and stimulus
      data.trial_type = 'instruct_6';
      data.stimulus = 'instruct';
      // Check which button was pressed
      if (data.button_pressed == 0) {
        data.response = 'Previous';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_05],
          }, jsPsych.resumeExperiment)
      } else if (data.button_pressed == 1) {
        data.response = 'Next';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_07],
          }, jsPsych.resumeExperiment)
      }
    }
};

var instruct_07 = {
    type: 'html-button-response',
    choices: ['Previous', 'Start'], 
    stimulus: instruct_7,
    button_html: '<button class="custom-button">%choice%</button>',
    on_finish: function(data) {
      // Add a custom trial type and stimulus
      data.trial_type = 'instruct_7';
      data.stimulus = 'instruct';
      // Check which button was pressed
      if (data.button_pressed == 0) {
        data.response = 'Previous';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [instruct_06],
          }, jsPsych.resumeExperiment)
      } else if (data.button_pressed == 1) {
        data.response = 'Next';
        jsPsych.addNodeToEndOfTimeline({
            timeline: [prac_attentioncheck_blackplus],
          }, jsPsych.resumeExperiment)
      }
    }
};
//instruction part 1 end

