


var jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function() {
        //jsPsych.data.displayData();
        jsPsych.data.get().localSave('csv', 'test.csv');
        document.exitFullscreen();
      }
    }
  );


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
var cue_scene = ['Wheel01',
  'Wheel02',
  'Wheel03',
  'Wheel04',
  'Wheel05']

var target_dir =['img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',
'img/sceneWheel_images_webp/Wheel02/wheel02_r02/000001.webp',
'img/sceneWheel_images_webp/Wheel03/wheel03_r02/000001.webp',
'img/sceneWheel_images_webp/Wheel04/wheel04_r02/000001.webp',
'img/sceneWheel_images_webp/Wheel05/wheel05_r02/000001.webp']

var img_dir = ['img/sceneWheel_images_webp/Wheel01/wheel01_r02',
'img/sceneWheel_images_webp/Wheel02/wheel02_r02',
'img/sceneWheel_images_webp/Wheel03/wheel03_r02',
'img/sceneWheel_images_webp/Wheel04/wheel04_r02',
'img/sceneWheel_images_webp/Wheel05/wheel05_r02',]

/*set up instruction block*/
var fullscreen_trial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: '<p>这个实验将会切换到全屏进行</p>',
    button_label: '<p>全屏</p>'
  };


var preload_images = [[recon_images]];


var preload = {
    type: jsPsychPreload,
    images: preload_images,
    auto_preload: true
  };



var instructions = {
    type: jsPsychInstructions,
    pages: ['<p><b>欢迎参加本次实验</b></p>'+
      '<br>'+
      '<p>在本次实验中，你将会看到一系列场景，请尝试记住并回忆这些场景</p>'+
      '<p>稍后你将进入一个示例环节，体验该实验的流程</p>'+
      '</br>'+
      '<p>请点击"下一页"的按钮以进入下一个环节</p>'],
    show_clickable_nav: true,
    show_page_number: true,
    button_label_previous: '上一页',
    button_label_next: '下一页',
    page_label: '页码',
    on_finish: function () {
      $("body").css("cursor", "none");
   }
  };




/*set up example block*/
var example_instruction = {
    type: jsPsychInstructions,
    pages: ['<p><b>欢迎进入示例流程</b></p><br>'+
    '<p>在本次实验中，你将会看到一个提示，随后将出现一幅图片，请判断图片与提示是否一致，并用鼠标选择你印象中最近接近该刺激的图片</p>'],
    show_clickable_nav: true,
    show_page_number: true,
    button_label_previous: '上一页',
    button_label_next: '下一页',
    page_label: '页码',
  };



var example_cue = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable('cue'),
    choices: "ALL_KEYS",
    trial_duration: null,
    prompt:'按任意键继续'
  }
  
  
var example_target = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('target'),
    choices: "ALL_KEYS",
    trial_duration: null,
    stimulus_width: 400, 
    maintain_aspect_ratio: true,
    post_trial_gap: 0,
    prompt:'</br>按任意键继续',
  };


var example_judgement = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p style="color: black; font-size: 48px; font-weight: bold;">一致        不一致</p>',
    choices: ['f','j'],
    trial_duration: null,
    //post_trial_gap:1000,
    prompt:'</br>如果一致则按f，不一致按j',
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
  //wheel01
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[1],condition: 'incongruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[2],condition: 'incongruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[3],condition: 'incongruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[4],condition: 'incongruent', recon: img_dir[0]},
  //wheel02
  {cue:cue_scene[1],target: target_dir[0],condition: 'incongruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[2],condition: 'incongruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[3],condition: 'incongruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[4],condition: 'incongruent', recon: img_dir[1]},
  //wheel03
  {cue:cue_scene[2],target: target_dir[0],condition: 'incongruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[1],condition: 'incongruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[3],condition: 'incongruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[4],condition: 'incongruent', recon: img_dir[2]},
  //wheel04
  {cue:cue_scene[3],target: target_dir[0],condition: 'incongruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[1],condition: 'incongruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[2],condition: 'incongruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[4],condition: 'incongruent', recon: img_dir[3]},
  //wheel05
  {cue:cue_scene[4],target: target_dir[0],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[1],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[2],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[3],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
//
];

var prac_variables_subset = jsPsych.randomization.sampleWithoutReplacement(prac_variables, 4);

var practimeline = [
    prac_cue,
    prac_target,
    prac_judgement,
    prac_recon,
    prac_feedback,
  ];
  
var prac_proc = {
    timeline: practimeline,
    timeline_variables: prac_variables_subset,
    randomize_order: true,
    loop_function: function(data){
        var total_trials = jsPsych.data.get().filter({type: 'judgement'}).count();
        var accuracy = Math.round(jsPsych.data.get().filter({correct: true}).count() / total_trials * 100);
        if (accuracy < 60) {
            return true;
      } else {
            return false;
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
    image_path: jsPsych.timelineVariable('recon'),
    image_format: 'webp',
    uncertainty_range: true
  }




var test_variables = [
  //wheel01
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[1],condition: 'incongruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[2],condition: 'incongruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[3],condition: 'incongruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[4],condition: 'incongruent', recon: img_dir[0]},
  //wheel02
  {cue:cue_scene[1],target: target_dir[0],condition: 'incongruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[2],condition: 'incongruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[3],condition: 'incongruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[4],condition: 'incongruent', recon: img_dir[1]},
  //wheel03
  {cue:cue_scene[2],target: target_dir[0],condition: 'incongruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[1],condition: 'incongruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[3],condition: 'incongruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[4],condition: 'incongruent', recon: img_dir[2]},
  //wheel04
  {cue:cue_scene[3],target: target_dir[0],condition: 'incongruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[1],condition: 'incongruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[2],condition: 'incongruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[4],condition: 'incongruent', recon: img_dir[3]},
  //wheel05
  {cue:cue_scene[4],target: target_dir[0],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[1],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[2],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[3],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  //
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
    repetitions: 5,
  };

/*set up test2 block*/
var test2_instruction = {
  type: jsPsychInstructions,
  pages: ['<p><b>Welcome to the test procedure</b></p><br>',],
  show_clickable_nav: true,
  show_page_number: true,
  button_label_previous: 'Previous',
  button_label_next: 'Next',
  page_label: 'Page',
};


var test2_cue = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable('cue'),
  data: {condition: jsPsych.timelineVariable('condition'),
         type: 'cue'},
  choices: "ALL_KEYS",
  trial_duration: null,
  prompt:'any'
}


var test2_target = {
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


var test2_judgement = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="color: black; font-size: 48px; font-weight: bold;">congruent</p>'+
    '<p style="color: black; font-size: 30px; font-weight: bold;">vs</p>'+
    '<p style="color: black; font-size: 48px; font-weight: bold;">incongruent</p>',
  data: {type: 'judgement'},
  choices: ['f','j'],
  trial_duration: null,
  prompt:'fj'
};

var test2_recon = {
  type: jsPsychReconstruct_wheel,
  image_path: jsPsych.timelineVariable('recon'),
  image_format: 'webp',
  uncertainty_range: true
}




var test2_variables = [
  //wheel01
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[0],condition: 'congruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[1],condition: 'incongruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[2],condition: 'incongruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[3],condition: 'incongruent', recon: img_dir[0]},
  {cue:cue_scene[0],target: target_dir[4],condition: 'incongruent', recon: img_dir[0]},
  //wheel02
  {cue:cue_scene[1],target: target_dir[0],condition: 'incongruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[1],condition: 'congruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[2],condition: 'incongruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[3],condition: 'incongruent', recon: img_dir[1]},
  {cue:cue_scene[1],target: target_dir[4],condition: 'incongruent', recon: img_dir[1]},
  //wheel03
  {cue:cue_scene[2],target: target_dir[0],condition: 'incongruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[1],condition: 'incongruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[2],condition: 'congruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[3],condition: 'incongruent', recon: img_dir[2]},
  {cue:cue_scene[2],target: target_dir[4],condition: 'incongruent', recon: img_dir[2]},
  //wheel04
  {cue:cue_scene[3],target: target_dir[0],condition: 'incongruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[1],condition: 'incongruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[2],condition: 'incongruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[3],condition: 'congruent', recon: img_dir[3]},
  {cue:cue_scene[3],target: target_dir[4],condition: 'incongruent', recon: img_dir[3]},
  //wheel05
  {cue:cue_scene[4],target: target_dir[0],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[1],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[2],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[3],condition: 'incongruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  {cue:cue_scene[4],target: target_dir[4],condition: 'congruent', recon: img_dir[4]},
  //
];



var test2timeline = [
  test2_cue,
  test2_target,
  test2_judgement,
  test2_recon
];

var test2_proc = {
  timeline: test2timeline,
  timeline_variables: test2_variables,
  randomize_order: true,
  repetitions: 5,
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
timeline.push(test2_instruction);
timeline.push(test2_proc);
timeline.push(end);

jsPsych.run(timeline);