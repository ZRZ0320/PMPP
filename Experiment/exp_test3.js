


var jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function() {
        //jsPsych.data.displayData();
        jsPsych.data.get().localSave('csv', 'test.csv');
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

var img_dir = ['img/sceneWheel_images_webp/Wheel01/wheel01_r02',
'img/sceneWheel_images_webp/Wheel02/wheel02_r02',
'img/sceneWheel_images_webp/Wheel03/wheel03_r02',
'img/sceneWheel_images_webp/Wheel04/wheel04_r02',
'img/sceneWheel_images_webp/Wheel05/wheel05_r02']
var preload_images = [[recon_images]];

var example_cue = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable('cue'),
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {type: 'cue'},
  //prompt:'按任意键继续'
}


var example_target = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('target'),
  choices: ['f','j'],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  prompt:'</br>按任意键继续',
  data: {type: 'target'},
};

var example_recon = {
    type: jsPsychReconstruct_colorwheel,
    uncertainty_range: true,
    random_circle_rotation: true,
    data: {type: 'recon'},
  }



var iti = {
  type: jsPsychImageKeyboardResponse,
  stimulus:'img/materials/999999.png',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  //prompt:'</br>按任意键继续',
  data: {type: 'iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};


var extimeline_variables = [
    {cue:'示例',target: 'img/color/color_001.png',tdtime:Math.floor(Math.random() * 500) + 1000},
    {cue:'示例',target: 'img/color/color_011.png',tdtime:Math.floor(Math.random() * 500) + 1000},
    {cue:'示例',target: 'img/color/color_001.png',tdtime:Math.floor(Math.random() * 500) + 1000},
    {cue:'示例',target: 'img/color/color_011.png',tdtime:Math.floor(Math.random() * 500) + 1000},    
    {cue:'示例',target: 'img/color/color_001.png',tdtime:Math.floor(Math.random() * 500) + 1000},
    {cue:'示例',target: 'img/color/color_011.png',tdtime:Math.floor(Math.random() * 500) + 1000},
  ];


var extimeline = [
    example_cue,
    example_target,
    example_recon,
    iti,
  ];
  
var example_proc = {
    timeline: extimeline,
    timeline_variables: extimeline_variables,
    randomize_order:true,

  };




/*set up experiment structure*/
var timeline = [];
timeline.push(example_proc);

jsPsych.run(timeline);