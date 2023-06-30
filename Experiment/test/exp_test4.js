


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
        recon_images.push('../img/sceneWheel_images_webp/Wheel'+
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

var recon_images = [];

for (i = 0; i <360; i++){
  recon_images.push('../img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+
  ('000000'+i).slice(-6).toString()+
  '.webp')
  }

var preload_images = [[recon_images]];

var preload = {
  type: jsPsychPreload,
  images: preload_images,
  auto_preload: true
};


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
  data: {type: 'target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d+/));
    console.log(jsPsych.timelineVariable('target'));
    console.log(jsPsych.timelineVariable('cue'));    
    console.log(num);
    if (jsPsych.timelineVariable('cue') == 'red'){
      console.log(jsPsych.timelineVariable('cue') == 'red');
      if (num < 60 | num >= 300){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else if(jsPsych.timelineVariable('cue') == 'blue'){
      
      //console.log(jsPsych.timelineVariable('cue') == 'blue');
      if (num < 180 &&  num >= 60){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else{
      //console.log(jsPsych.timelineVariable('cue') == 'green');
      if (num < 300 && num >= 180){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }
    return condition;
  }
    
    },
};


var example_recon = {
  type: jsPsychReconstruct_wheel,
  image_path: '../img/sceneWheel_images_webp/Wheel04/wheel04_r32',
  image_format: 'webp',
  uncertainty_range: true,
  random_circle_rotation: true,
  data: {type: 'test2_recon'},
}


var iti = {
  type: jsPsychImageKeyboardResponse,
  stimulus:'../img/materials/999999.png',
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
    {cue:'red',target: 'img/color/color_300.png', tdtime:Math.floor(Math.random() * 500) + 1000},
    {cue:'red',target: 'img/color/color_011.png', tdtime:Math.floor(Math.random() * 500) + 1000},
    {cue:'blue',target: 'img/color/color_001.png', tdtime:Math.floor(Math.random() * 500) + 1000},
  ];


var extimeline = [
    example_recon,
  ];
  
var example_proc = {
    timeline: extimeline,
    timeline_variables: extimeline_variables,
    randomize_order:true,

  };




/*set up experiment structure*/
var timeline = [];
timeline.push(preload,example_proc);

jsPsych.run(timeline);