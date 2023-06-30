var jsPsych = initJsPsych({
  show_progress_bar: true,
  on_finish: function() {
      //jsPsych.data.displayData();
      jsPsych.data.get().localSave('csv', 'test.csv');
      document.exitFullscreen();
    }
  }
);

var dir = 'img/instructions_scene/';


var basic_information = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'info.png',
  choices: "ALL_KEYS",
};

var subj_idx = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p style="font-size: 30px; font-family: SimSun;"> 你的被试编号是?</b> </p>',
  html: '<p style="font-size: 40px; font-family: SimSun;"> <input style="font-size: 20px; font-family: SimSun;" name="subj_idx" type="text" value="000" required>.</p>',
  button_label: "继续",
  on_finish: function (data) {   
    var idx = parseFloat(data.response.subj_idx)%2;
    data.order = idx;
}
};


var subj_age = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p style="font-size: 30px; font-family: SimSun;"> 你的出生年份是?</b> </p>',
  html:` <p style="font-size: 40px; font-family: SimSun;">
  <input style="font-size: 20px; font-family: SimSun;" name="Born" type="number" placeholder="1980~2023" min=1980 max=2023 oninput="if(value.length>4) value=value.slice(0,4)" value="1990" required>
  </p>`,
  button_label: "继续",
};

var subj_sex = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p style="font-size: 30px; font-family: SimSun;"> 你的性别是?</b> </p>',
  html:  `<p style="font-size: 40px; font-family: SimSun;"><select name="sex" size=3 required>
              <option style="font-size: 20px; font-family: SimSun;" value=1 selected>男</option>
              <option style="font-size: 20px; font-family: SimSun;" value=2>女</option>
              </select></p>`,
  button_label: "继续",
}
var subj_education = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p style="font-size: 30px; font-family: SimSun;"> 你的受教育程度是?</b> </p>',
  html: function () {
    return `
              <p style="font-size: 40px; font-family: SimSun;"><select name="education" size=10 required>
              <option value=1>小学以下</option>
              <option value=2>小学</option>
              <option value=3>初中</option>
              <option value=4>高中</option>
              <option value=5 selected>大学</option>
              <option value=6>硕士</option>
              <option value=7>博士</option>
              <option value=8>其他</option>
              </select></p>`
  },
  button_label: "继续",
}

var keys=['ArrowLeft','ArrowRight'];


var recon_images = [];

for (i = 0; i <360; i++){
  recon_images.push('img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+
  ('000000'+i).slice(-6).toString()+
  '.webp')
  }

recon_images.push(dir+'intro1.png');
recon_images.push(dir+'intro2.png');
recon_images.push(dir+'intro31.png');
recon_images.push(dir+'intro4.png');
recon_images.push(dir+'intro5.png');
recon_images.push(dir+'intro6.png');
recon_images.push(dir+'info.png');
recon_images.push(dir+'example1.png');
recon_images.push(dir+'example2.png');
recon_images.push(dir+'bedroom.png');
recon_images.push(dir+'dinningroom.png');
recon_images.push(dir+'restaurant.png');
recon_images.push(dir+'prac1.png');
recon_images.push(dir+'prac2.png');
recon_images.push(dir+'test1.png');
recon_images.push(dir+'test2.png');
recon_images.push(dir+'test3.png');


var preload_images = [[recon_images]];


/*set up instruction block*/
var fullscreen_trial = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: '<p style="font-size: 30px; font-family: SimSun;">当你按下“全屏”按钮后，这个实验将会切换到全屏</p>',
  button_label: '全屏'
};



var preload = {
  type: jsPsychPreload,
  images: preload_images,
  auto_preload: true
};

/*set up intro block*/
var instructions = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: "ALL_KEYS",
  on_finish: function () {
    $("body").css("cursor", "none");
 }
};




var intro_variables = [
  {stimulus: dir+'intro1.png'},
  {stimulus: dir+'intro2.png'},
  {stimulus: dir+'intro31.png'},
  {stimulus: dir+'intro4.png'},
  {stimulus: dir+'intro5.png'},
  {stimulus: dir+'intro6.png'},
  
];


var intimeline = [
  instructions
];

var into_proc = {
  timeline: intimeline,
  timeline_variables: intro_variables,
  randomize_order:false,
};


/*set up example block*/
var example_instruction1 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'example1.png',
  choices: "ALL_KEYS",
};

var example_fix = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 30px; font-family: SimSun;">+</p>',
  choices: "NO_KEYS",
  trial_duration: 500,
}

var example_cue = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('cue'),
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {type: 'example_cue',
  cue: jsPsych.timelineVariable('cue')},
}



var example_target = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('target'),
  choices: [keys[0],keys[1]],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  data: {type: 'example_target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d{3}(?=\.webp$)/));
    if (jsPsych.timelineVariable('cue') == dir+'bedroom.png'){
      if (num < 60 | num >= 300){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else if(jsPsych.timelineVariable('cue') == dir+'bedroom.png'){
      
      //console.log(jsPsych.timelineVariable('cue') == 'bedroom');
      if (num < 180 &&  num >= 60){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else{
      //console.log(jsPsych.timelineVariable('cue') == 'dinningroom');
      if (num < 300 && num >= 180){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }
    return condition;
  }
    
    },
    on_finish: function(data) {
      var correct = false;
      if (jsPsych.pluginAPI.compareKeys(data.response, keys[0]) && data.condition == 1) {
          correct = true;
      } else if (jsPsych.pluginAPI.compareKeys(data.response, keys[1]) && data.condition == 0) {
          correct = true;
      }
      data.correct = correct;
  },
};




var example_recon = {
  type: jsPsychReconstruct_wheel,
  image_path: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32',
  image_format: 'webp',
  uncertainty_range: true,
  random_circle_rotation: true,
  data: {type: 'example_recon'},
}


var confirmation = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'example2.png',
  choices: [keys[0], keys[1]],
  data: {type: 'example_confirmation'},
};


function randomNormalDistribution(u,v) {
  var mean = 120; 
  var std_deviation = 10; 
  var z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); 
  var zint = Math.floor(mean + z * std_deviation);
  if (zint < 0) {
    zint = 360+zint;
  }
  return zint;
}

function uniformwidth(v,mu,sd) {
  var z = Math.floor(v*sd*2-sd+mu);
  if (z < 0) {
    z = 360+z;
  }
  return z;
}

var extimeline_variables = [
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp'},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp'},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp'},
];

var example_variables_sp = jsPsych.randomization.sampleWithoutReplacement(extimeline_variables, 1);


var extimeline = [
  example_fix,
  example_cue,
  example_target,
  example_recon,
  confirmation,
];

var example_proc = {
  timeline: extimeline,
  timeline_variables: example_variables_sp,
  randomize_order:true,
  loop_function: function(data){
      var key_response = data.filter({type: 'example_confirmation'}).values()[0].response;
      //console.log(key_response)
      if (jsPsych.pluginAPI.compareKeys(key_response, keys[1])) {
          return true;
      }else{
          return false;
    }
  }
};



/*set up prac block*/
var prac_instruction = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'prac1.png',
  choices: "ALL_KEYS",
};


var prac_cue = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('cue'),
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {type: 'prac_cue',
  cue: jsPsych.timelineVariable('cue')},
 // prompt:'按任意键继续'
}


var prac_target = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('target'),
  choices: [keys[0],keys[1]],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  data: {type: 'prac_target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d{3}(?=\.webp$)/));
    if (jsPsych.timelineVariable('cue') == dir+'bedroom.png'){
      //console.log(jsPsych.timelineVariable('cue') == 'bedroom');
      if (num < 60 | num >= 300){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else if(jsPsych.timelineVariable('cue') == dir+'bedroom.png'){
      
      //console.log(jsPsych.timelineVariable('cue') == 'bedroom');
      if (num < 180 &&  num >= 60){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else{
      //console.log(jsPsych.timelineVariable('cue') == 'dinningroom');
      if (num < 300 && num >= 180){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }
    console.log(condition);
    return condition;
  }
    
    },
  //prompt:'</br>按任意键继续',
  on_finish: function(data) {
    var correct = false;
    if (jsPsych.pluginAPI.compareKeys(data.response, keys[0]) && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, keys[1]) && data.condition == 0) {
        correct = true;
    }
    data.correct = correct;
},
};


var prac_recon = {
  type: jsPsychReconstruct_wheel,
  image_path: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32',
  image_format: 'webp',
  uncertainty_range: true,
  random_circle_rotation: true,
  data: {type: 'prac_recon'},
}

var prac_feedback = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
      var total_trials = jsPsych.data.get().filter({type: 'prac_target'}).count();
      var accuracy = Math.round(jsPsych.data.get().filter({type: 'prac_target', correct: true}).count() / total_trials * 100);
      return "<p style='font-size: 30px; font-family: SimSun;'>你当前的正确率为 <strong>"+accuracy+"%</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>按任意键结束</p>";},
  data: {type: 'prac_feedback',
  correct: function() {
    var total_trials = jsPsych.data.get().filter({type: 'prac_target'}).count();
    var accuracy = Math.round(jsPsych.data.get().filter({type: 'prac_target', correct: true}).count() / total_trials * 100);
    return accuracy}},

};

var prac_iti = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:'<p style="font-size: 30px; font-family: SimSun;">+</p>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  data: {type: 'prac_iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};




var prac_variables = [
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
];


var practimeline = [
  prac_cue,
  prac_target,
  prac_recon,
  prac_feedback,
  prac_iti,
];

var prac_proc = {
  timeline: practimeline,
  timeline_variables: prac_variables,
  randomize_order: true,
  loop_function: function(data){
      var total_trials = jsPsych.data.get().filter({type: 'prac_target'}).count();
      var accuracy = Math.round(jsPsych.data.get().filter({correct: true}).count() / total_trials * 100);
     if (accuracy < 60) {
          return true;
    } else {
          return false;
    }       
  }
};

var prac_end = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'prac2.png',
  choices: "ALL_KEYS",
};



/*set up test1 block*/
var test1_instruction = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'test1.png',
  choices: "ALL_KEYS",
};


var test1_cue = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('cue'),
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {type: 'test1_cue',
  cue: jsPsych.timelineVariable('cue')},
 // prompt:'按任意键继续'
}


var test1_target = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('target'),
  choices: [keys[0],keys[1]],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  data: {type: 'test1_target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d{3}(?=\.webp$)/));
    //console.log(jsPsych.timelineVariable('target'));
    //console.log(jsPsych.timelineVariable('cue'));    
    //console.log(num);
    if (jsPsych.timelineVariable('cue') == 'bedroom'){
      //console.log(jsPsych.timelineVariable('cue') == dir+'bedroom.png');
      if (num < 60 | num >= 300){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else if(jsPsych.timelineVariable('cue') == dir+'bedroom.png'){
      
      //console.log(jsPsych.timelineVariable('cue') == 'bedroom');
      if (num < 180 &&  num >= 60){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else{
      //console.log(jsPsych.timelineVariable('cue') == 'dinningroom');
      if (num < 300 && num >= 180){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }
    console.log(condition);

    return condition;
  }
    
    },
  //prompt:'</br>按任意键继续',
  on_finish: function(data) {
    var correct = false;
    if (jsPsych.pluginAPI.compareKeys(data.response, keys[0]) && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, keys[1]) && data.condition == 0) {
        correct = true;
    }
    data.correct = correct;
},
};


var test1_recon = {
  type: jsPsychReconstruct_wheel,
  image_path: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32',
  image_format: 'webp',
  uncertainty_range: true,
  random_circle_rotation: true,
  data: {type: 'test1_recon'},
}


var test1_iti = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:'<p style="font-size: 30px; font-family: SimSun;">+</p>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  data: {type: 'test1_iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};



var test1_variables = [
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,30)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
];


var test1timeline = [
  test1_cue,
  test1_target,
  test1_recon,
  test1_iti,
];

var test1_proc = {
  timeline: test1timeline,
  timeline_variables:test1_variables,
  randomize_order: true,

};




/*set the end slide*/
var end ={
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'test3.png',
  choices: "ALL_KEYS",
  on_finish: function () {
    $("body").css("cursor", "default");
  }

};







/*set up experiment structure*/
var timeline = [];
//
timeline.push(fullscreen_trial);
timeline.push(preload);
//
timeline.push(basic_information);
timeline.push(subj_idx);
timeline.push(subj_age);
timeline.push(subj_sex);
timeline.push(subj_education);
//
timeline.push(into_proc);
timeline.push(example_instruction1);
timeline.push(example_proc);
//
timeline.push(prac_instruction);
timeline.push(prac_proc);
timeline.push(prac_end);
//
timeline.push(test1_instruction);
timeline.push(test1_proc);


//
timeline.push(end);

jsPsych.run(timeline);