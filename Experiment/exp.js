


var jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function() {
        //jsPsych.data.displayData();
        jsPsych.data.get().localSave('csv', 'test.csv');
        document.exitFullscreen();
      }
    }
  );


/*set up instruction block*/
var fullscreen_trial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
  };





var recon_images = [];
for (k=0;k<5;k++){
  for (j=0;j<5;j++){
    for (i = 0; i <360; i++){
      recon_images.push('img/sceneWheel_images_webp/Wheel'+
      ('00'+(k+1)).slice(-2).toString()+
      '/wheel'+
      ('00'+(k+1)).slice(-2).toString()+
      '_r'+
      ('00'+Math.pow(2,j+1)).slice(-2).toString()+
      '/'+
      ('00000'+i).slice(-6).toString()+
      '.webp')
      }
    }
  } 

var preload_images = [[recon_images]];


var preload = {
    type: jsPsychPreload,
    images: preload_images,
    auto_preload: true
  };



var instructions = {
    type: jsPsychInstructions,
    pages: ['<p><b>Welcome to the experiment</b></p>'+
      '<br>'+
      '<p>In this experiment, you will be asked to see and remember various indoor scenes.</p>'+
      '<p>The detailed procedure of the task would be followed on the next page.</p>'+
      '</br>'+
      '<p>Please click the NEXT button below to see the procedure</p>',
      '<p>This is the second page of instructions.</p>',
      '<p>This is the final page.</p>'],
    show_clickable_nav: true,
    show_page_number: true,
    button_label_previous: 'Previous',
    button_label_next: 'Next',
    page_label: 'Page',
    on_finish: function () {
      $("body").css("cursor", "none");
   }
  };




/*set up example block*/
var example_instruction = {
    type: jsPsychInstructions,
    pages: ['<p><b>Welcome to the example procedure</b></p><br>',],
    show_clickable_nav: true,
    show_page_number: true,
    button_label_previous: 'Previous',
    button_label_next: 'Next',
    page_label: 'Page',
  };



var example_cue = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable('cue'),
    choices: "ALL_KEYS",
    trial_duration: null,
    prompt:'any'
  }
  
  
var example_target = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('target'),
    choices: "ALL_KEYS",
    trial_duration: null,
    stimulus_width: 400, 
    maintain_aspect_ratio: true,
    post_trial_gap: 0,
    prompt:'</br>any',
  };


var example_judgement = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p style="color: black; font-size: 48px; font-weight: bold;">congruent</p>'+
      '<p style="color: black; font-size: 30px; font-weight: bold;">vs</p>'+
      '<p style="color: black; font-size: 48px; font-weight: bold;">incongruent</p>',
    choices: ['f','j'],
    trial_duration: null,
    //post_trial_gap:1000,
    prompt:'fj'
  };

var example_recon = {
    type: jsPsychReconstruct_wheel,
    image_path: 'img/sceneWheel_images_webp/Wheel05/wheel05_r02',
    image_format: 'webp',
    uncertainty_range: true
  }

var confirmation = {
   type: jsPsychHtmlKeyboardResponse,
    stimulus: 'Are you ready to proceed to the next phase?',
    choices: ['f', 'j'],
    data: {type: 'confirmation'},
  };



var extimeline_variables = [
    {cue:'example',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp'},
  ];


var extimeline = [
    example_cue,
    example_target,
    example_judgement,
    example_recon,
    confirmation,
  ];
  
var example_proc = {
    timeline: extimeline,
    timeline_variables: extimeline_variables,
    randomize_order:true,
    loop_function: function(data){
        var key_response = data.filter({type: 'confirmation'}).values()[0].response;
        console.log(key_response)
        if (jsPsych.pluginAPI.compareKeys(key_response, 'j')) {
            return true;
        }else{
            return false;
      }
    }
  };


  
/*set up prac block*/
var prac_instruction = {
    type: jsPsychInstructions,
    pages: ['<p><b>Welcome to the practice procedure</b></p><br>',],
    show_clickable_nav: true,
    show_page_number: true,
    button_label_previous: 'Previous',
    button_label_next: 'Next',
    page_label: 'Page',
  };



var prac_cue = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable('cue'),
    data: {condition: jsPsych.timelineVariable('condition'),
           type: 'cue'},
    choices: "ALL_KEYS",
    trial_duration: null,
    prompt:'any'
  }
  
  
var prac_target = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('target'),
    data: {condition: jsPsych.timelineVariable('condition'),
           type: 'target'},
    choices: "ALL_KEYS",
    trial_duration: null,
    stimulus_width: 400, 
    maintain_aspect_ratio: true,
    post_trial_gap: 0,
    prompt:'</br>any',
  };


var prac_judgement = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p style="color: black; font-size: 48px; font-weight: bold;">congruent</p>'+
      '<p style="color: black; font-size: 30px; font-weight: bold;">vs</p>'+
      '<p style="color: black; font-size: 48px; font-weight: bold;">incongruent</p>',
    choices: ['f','j'],
    data: {type: 'judgement',
           condition: jsPsych.timelineVariable('condition')},
    on_finish: function(data) {
        var correct = false;
        if (jsPsych.pluginAPI.compareKeys(data.response, 'f') && data.condition == 'congruent') {
            correct = true;
        } else if (jsPsych.pluginAPI.compareKeys(data.response, 'j') && data.condition == 'incongruent') {
            correct = true;
        }
        data.correct = correct;
    },
    trial_duration: null,
    prompt:'fj'
  };

var prac_recon = {
    type: jsPsychReconstruct_wheel,
    image_path: 'img/sceneWheel_images_webp/Wheel05/wheel05_r02',
    image_format: 'webp',
    uncertainty_range: true
  };

var prac_feedback = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        var total_trials = jsPsych.data.get().filter({type: 'judgement'}).count();
        var accuracy = Math.round(jsPsych.data.get().filter({correct: true}).count() / total_trials * 100);
        return "<p>You responded correctly on <strong>"+accuracy+"%</strong> of the trials.</p> " +
        "<p>Press any key to complete the experiment. Thank you!</p>";
    }
  };



var prac_variables = [
    {cue:'Wheel01',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',condition: 'congruent'},
    {cue:'Wheel01',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r04/000001.webp',condition: 'incongruent'},
    {cue:'Wheel01',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r08/000001.webp',condition: 'congruent'},
  ];



var practimeline = [
    prac_cue,
    prac_target,
    prac_judgement,
    prac_recon,
    prac_feedback,
  ];
  
var prac_proc = {
    timeline: practimeline,
    timeline_variables: prac_variables,
    randomize_order: true,
    loop_function: function(data){
        var total_trials = jsPsych.data.get().last().filter({type: 'judgement'}).count();
        var accuracy = Math.round(jsPsych.data.get().last().filter({correct: true}).count() / total_trials * 100);
        if (accuracy >= 80) {
            return false;
      } else {
            return true;
      }       
    }
  };




/*set up test block*/
var test_instruction = {
    type: jsPsychInstructions,
    pages: ['<p><b>Welcome to the test procedure</b></p><br>',],
    show_clickable_nav: true,
    show_page_number: true,
    button_label_previous: 'Previous',
    button_label_next: 'Next',
    page_label: 'Page',
  };


var test_cue = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable('cue'),
    data: {condition: jsPsych.timelineVariable('condition'),
           type: 'cue'},
    choices: "ALL_KEYS",
    trial_duration: null,
    prompt:'any'
  }
  
  
var test_target = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('target'),
    data: {condition: jsPsych.timelineVariable('condition'),
           type: 'target'},
    choices: "ALL_KEYS",
    trial_duration: null,
    stimulus_width: 400, 
    maintain_aspect_ratio: true,
    post_trial_gap: 0,
    prompt:'</br>any',
  };


var test_judgement = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p style="color: black; font-size: 48px; font-weight: bold;">congruent</p>'+
      '<p style="color: black; font-size: 30px; font-weight: bold;">vs</p>'+
      '<p style="color: black; font-size: 48px; font-weight: bold;">incongruent</p>',
    data: {type: 'judgement'},
    choices: ['f','j'],
    trial_duration: null,
    prompt:'fj'
  };

var test_recon = {
    type: jsPsychReconstruct_wheel,
    image_path: 'img/sceneWheel_images_webp/Wheel05/wheel05_r02',
    image_format: 'webp',
    uncertainty_range: true
  }

var test_variables = [
    {cue:'Wheel01',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',condition: 'congruent'},
    {cue:'Wheel01',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r04/000001.webp',condition: 'incongruent'},
    {cue:'Wheel01',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r08/000001.webp',condition: 'congruent'},
  ];



var testtimeline = [
    test_cue,
    test_target,
    test_judgement,
    test_recon
  ];
  
var test_proc = {
    timeline: testtimeline,
    timeline_variables: test_variables,
    randomize_order: true,
    repetitions: 1,
  };



/*set the end slide*/
var end ={
    type: jsPsychInstructions,
    pages: ['<p><b>Thank you for your participation!</b></p><br>',],
    show_clickable_nav: true,
    show_page_number: true,
    on_finish: function () {
      $("body").css("cursor", "default");
    }

  };



/*set up experiment structure*/
var timeline = [];
timeline.push(fullscreen_trial);
timeline.push(preload);
timeline.push(instructions);
timeline.push(example_instruction);
timeline.push(example_proc);
timeline.push(prac_instruction);
timeline.push(prac_proc);
timeline.push(test_instruction);
timeline.push(test_proc);
timeline.push(end);

jsPsych.run(timeline);