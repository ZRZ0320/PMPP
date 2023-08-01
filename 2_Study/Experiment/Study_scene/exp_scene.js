var jsPsych = initJsPsych({
  show_progress_bar: true,
  on_finish: function() {
      //jsPsych.data.displayData();
      jsPsych.data.get().localSave('csv',  `test_${id}.csv`);
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
    idx = parseFloat(data.response.subj_idx)%2+1;
    data.order = idx;
    id = data.response.subj_idx;
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


/*set up experiment structure*/
var timeline = [];
//
timeline.push(fullscreen_trial);
timeline.push(preload);



/*set up intro block*/
var instructions = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: "ALL_KEYS",
  on_finish: function () {
    $("body").css("cursor", "none");
 }
};

//
timeline.push(basic_information);
timeline.push(subj_idx);
timeline.push(subj_age);
timeline.push(subj_sex);
timeline.push(subj_education);


var intro1 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'intro1.png',
  choices: "ALL_KEYS",
  on_finish: function () {
    $("body").css("cursor", "none");
 }
};
timeline.push(intro1);

var intro2 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'intro2.png',
  choices: "ALL_KEYS",
};
timeline.push(intro2);

var intro3 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: function () {
    return dir+'intro3'+idx+'.png';
  },
  choices: "ALL_KEYS",
};
timeline.push(intro3);

var intro4 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'intro4.png',
  choices: "ALL_KEYS",
};
timeline.push(intro4);

var intro5 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'intro5.png',
  choices: "ALL_KEYS",
};
timeline.push(intro5);

var intro6 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'intro6.png',
  choices: "ALL_KEYS",
};
timeline.push(intro6);





/*set up example block*/
var example_instruction1 = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'example1.png',
  choices: "ALL_KEYS",
};
timeline.push(example_instruction1);
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
    if (jsPsych.timelineVariable('cue') == dir+'dinningroom.png'){
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
      if (jsPsych.pluginAPI.compareKeys(data.response, keys[idx-1]) && data.condition == 1) {
          correct = true;
      } else if (jsPsych.pluginAPI.compareKeys(data.response, keys[2-idx]) && data.condition == 0) {
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
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp'},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp'},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp'},
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
      if (jsPsych.pluginAPI.compareKeys(key_response, keys[0])) {
          return true;
      }else{
          return false;
    }
  }
};


timeline.push(example_proc);

/*set up prac block*/
var prac_instruction = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'prac1.png',
  choices: "ALL_KEYS",
};

//
timeline.push(prac_instruction);
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
    if (jsPsych.timelineVariable('cue') == dir+'dinningroom.png'){
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
    correct = false;
    if (jsPsych.pluginAPI.compareKeys(data.response, keys[idx-1]) && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, keys[2-idx]) && data.condition == 0) {
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
      var rt = Math.round(jsPsych.data.get().filter({type: 'prac_target'}).last(1).values()[0].rt)/1000;

      if(correct==true){
        var correct_text = '正确';
      }else{
        var correct_text = '错误';
      }
      return "<p style='font-size: 30px; font-family: SimSun;'>您的回答是 <strong>"+correct_text+"</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>你当前的反应时间为 <strong>"+rt.toFixed(2)+"秒</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>你当前的正确率为 <strong>"+accuracy+"%</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>按任意键结束</p>";},
  data: {type: 'prac_feedback',
  correct: function() {
    var total_trials = jsPsych.data.get().filter({type: 'prac_target'}).count();
    var accuracy = Math.round(jsPsych.data.get().filter({type: 'prac_target', correct: true}).count() / total_trials * 100);
    return accuracy}},

};

var prac_target_feedback = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('target'),
  prompt: "<p style='font-size: 30px; font-family: SimSun;'> </p> "+
  "<p style='font-size: 30px; font-family: SimSun;'>目标刺激如上图,</p> "+
  "<p style='font-size: 30px; font-family: SimSun;'>按任意键结束</p>",
  stimulus_width: 200, 
  maintain_aspect_ratio: true,
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
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
];


var practimeline = [
  prac_cue,
  prac_target,
  prac_feedback,
  prac_recon,
  prac_target_feedback,
  prac_iti,
];

var prac_proc = {
  timeline: practimeline,
  timeline_variables: prac_variables,
  randomize_order: true,
  loop_function: function(data){
      var total_trials = jsPsych.data.get().filter({type: 'prac_target'}).count();
      var accuracy = Math.round(jsPsych.data.get().filter({correct: true}).count() / total_trials * 100);
     if (accuracy < 75) {
          return true;
    } else {
          return false;
    }       
  }
};

timeline.push(prac_proc);
var prac_end = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'prac2.png',
  choices: "ALL_KEYS",
};

timeline.push(prac_end);


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
    if (jsPsych.timelineVariable('cue') == dir+'dinningroom.png'){
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
    //console.log(condition);

    return condition;
  }
    
    },
  //prompt:'</br>按任意键继续',
  on_finish: function(data) {
    var correct = false;
    if (jsPsych.pluginAPI.compareKeys(data.response, keys[idx-1]) && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, keys[2-idx]) && data.condition == 0) {
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
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
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

timeline.push(test1_proc);

var prac_feedback_test1 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
      var total_trials = jsPsych.data.get().filter({type: 'test1_target'}).count();
      var accuracy = Math.round(jsPsych.data.get().filter({type: 'test1_target', correct: true}).count() / total_trials * 100);
      var rt = Math.round(jsPsych.data.get().filter({type: 'test1_target'}).select('rt').mean())/1000;

      return "<p style='font-size: 30px; font-family: SimSun;'>你当前的平均反应时间为 <strong>"+rt.toFixed(3)+"秒</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>你当前的正确率为 <strong>"+accuracy+"%</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>按任意键结束</p>";},
  data: {type: 'prac_feedback',
  correct: function() {
    var total_trials = jsPsych.data.get().filter({type: 'test1_target'}).count();
    var accuracy = Math.round(jsPsych.data.get().filter({type: 'test1_target', correct: true}).count() / total_trials * 100);
    return accuracy}},

};

timeline.push(prac_feedback_test1);

/*set up test2 block*/
var test2_instruction = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'test2.png',
  choices: "ALL_KEYS",
};
timeline.push(test2_instruction);


var test2_cue = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('cue'),
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {type: 'test2_cue',
  cue: jsPsych.timelineVariable('cue')},
 // prompt:'按任意键继续'
}


var test2_target = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('target'),
  choices: [keys[0],keys[1]],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  data: {type: 'test2_target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d{3}(?=\.webp$)/));
    //console.log(jsPsych.timelineVariable('target'));
    //console.log(jsPsych.timelineVariable('cue'));    
    //console.log(num);
    if (jsPsych.timelineVariable('cue') == dir+'dinningroom.png'){
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
    return condition;
  }
    
    },
  //prompt:'</br>按任意键继续',
  on_finish: function(data) {
    var correct = false;
    if (jsPsych.pluginAPI.compareKeys(data.response, keys[idx-1]) && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, keys[2-idx]) && data.condition == 0) {
        correct = true;
    }
    data.correct = correct;
},
};


var test2_recon = {
  type: jsPsychReconstruct_wheel,
  image_path: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32',
  image_format: 'webp',
  uncertainty_range: true,
  random_circle_rotation: true,
  data: {type: 'test2_recon'},
}


var test2_iti = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:'<p style="font-size: 30px; font-family: SimSun;">+</p>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  data: {type: 'test2_iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};



var test2_variables = [
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},

];


var test2timeline = [
  test2_cue,
  test2_target,
  test2_recon,
  test2_iti,
];

var test2_proc = {
  timeline: test2timeline,
  timeline_variables:test2_variables,
  randomize_order: true,

};

timeline.push(test2_proc);
//




var prac_feedback_test2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
      var total_trials = jsPsych.data.get().filter({type: 'test2_target'}).count();
      var accuracy = Math.round(jsPsych.data.get().filter({type: 'test2_target', correct: true}).count() / total_trials * 100);
      var rt = Math.round(jsPsych.data.get().filter({type: 'test2_target'}).select('rt').mean())/1000;

      return "<p style='font-size: 30px; font-family: SimSun;'>你当前的平均反应时间为 <strong>"+rt.toFixed(3)+"秒</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>你当前的正确率为 <strong>"+accuracy+"%</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>按任意键结束</p>";},
  data: {type: 'prac_feedback',
  correct: function() {
    var total_trials = jsPsych.data.get().filter({type: 'test2_target'}).count();
    var accuracy = Math.round(jsPsych.data.get().filter({type: 'test2_target', correct: true}).count() / total_trials * 100);
    return accuracy}},

};
timeline.push(prac_feedback_test2);

/*set up test3 block*/
var test3_instruction = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'test3.png',
  choices: "ALL_KEYS",
};
timeline.push(test3_instruction);


var test3_cue = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('cue'),
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {type: 'test3_cue',
  cue: jsPsych.timelineVariable('cue')},
 // prompt:'按任意键继续'
}


var test3_target = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('target'),
  choices: [keys[0],keys[1]],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  data: {type: 'test3_target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d{3}(?=\.webp$)/));
    //console.log(jsPsych.timelineVariable('target'));
    //console.log(jsPsych.timelineVariable('cue'));    
    //console.log(num);
    if (jsPsych.timelineVariable('cue') == dir+'dinningroom.png'){
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
    return condition;
  }
    
    },
  //prompt:'</br>按任意键继续',
  on_finish: function(data) {
    var correct = false;
    if (jsPsych.pluginAPI.compareKeys(data.response, keys[idx-1]) && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, keys[2-idx]) && data.condition == 0) {
        correct = true;
    }
    data.correct = correct;
},
};


var test3_recon = {
  type: jsPsychReconstruct_wheel,
  image_path: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32',
  image_format: 'webp',
  uncertainty_range: true,
  random_circle_rotation: true,
  data: {type: 'test3_recon'},
}


var test3_iti = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:'<p style="font-size: 30px; font-family: SimSun;">+</p>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  data: {type: 'test3_iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};



var test3_variables = [
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},

];


var test3timeline = [
  test3_cue,
  test3_target,
  test3_recon,
  test3_iti,
];

var test3_proc = {
  timeline: test3timeline,
  timeline_variables:test3_variables,
  randomize_order: true,

};

timeline.push(test3_proc);
//




var prac_feedback_test3 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
      var total_trials = jsPsych.data.get().filter({type: 'test3_target'}).count();
      var accuracy = Math.round(jsPsych.data.get().filter({type: 'test3_target', correct: true}).count() / total_trials * 100);
      var rt = Math.round(jsPsych.data.get().filter({type: 'test3_target'}).select('rt').mean())/1000;

      return "<p style='font-size: 30px; font-family: SimSun;'>你当前的平均反应时间为 <strong>"+rt.toFixed(3)+"秒</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>你当前的正确率为 <strong>"+accuracy+"%</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>按任意键结束</p>";},
  data: {type: 'prac_feedback',
  correct: function() {
    var total_trials = jsPsych.data.get().filter({type: 'test3_target'}).count();
    var accuracy = Math.round(jsPsych.data.get().filter({type: 'test3_target', correct: true}).count() / total_trials * 100);
    return accuracy}},

};
timeline.push(prac_feedback_test3);

/*set up test4 block*/
var test4_instruction = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'test4.png',
  choices: "ALL_KEYS",
};
timeline.push(test4_instruction);


var test4_cue = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('cue'),
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {type: 'test4_cue',
  cue: jsPsych.timelineVariable('cue')},
 // prompt:'按任意键继续'
}


var test4_target = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('target'),
  choices: [keys[0],keys[1]],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  data: {type: 'test4_target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d{3}(?=\.webp$)/));
    //console.log(jsPsych.timelineVariable('target'));
    //console.log(jsPsych.timelineVariable('cue'));    
    //console.log(num);
    if (jsPsych.timelineVariable('cue') == dir+'dinningroom.png'){
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
    return condition;
  }
    
    },
  //prompt:'</br>按任意键继续',
  on_finish: function(data) {
    var correct = false;
    if (jsPsych.pluginAPI.compareKeys(data.response, keys[idx-1]) && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, keys[2-idx]) && data.condition == 0) {
        correct = true;
    }
    data.correct = correct;
},
};


var test4_recon = {
  type: jsPsychReconstruct_wheel,
  image_path: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32',
  image_format: 'webp',
  uncertainty_range: true,
  random_circle_rotation: true,
  data: {type: 'test4_recon'},
}


var test4_iti = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:'<p style="font-size: 30px; font-family: SimSun;">+</p>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  data: {type: 'test4_iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};



var test4_variables = [
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},

];


var test4timeline = [
  test4_cue,
  test4_target,
  test4_recon,
  test4_iti,
];

var test4_proc = {
  timeline: test4timeline,
  timeline_variables:test4_variables,
  randomize_order: true,

};

timeline.push(test4_proc);
//




var prac_feedback_test4 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
      var total_trials = jsPsych.data.get().filter({type: 'test4_target'}).count();
      var accuracy = Math.round(jsPsych.data.get().filter({type: 'test4_target', correct: true}).count() / total_trials * 100);
      var rt = Math.round(jsPsych.data.get().filter({type: 'test4_target'}).select('rt').mean())/1000;

      return "<p style='font-size: 30px; font-family: SimSun;'>你当前的平均反应时间为 <strong>"+rt.toFixed(3)+"秒</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>你当前的正确率为 <strong>"+accuracy+"%</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>按任意键结束</p>";},
  data: {type: 'prac_feedback',
  correct: function() {
    var total_trials = jsPsych.data.get().filter({type: 'test4_target'}).count();
    var accuracy = Math.round(jsPsych.data.get().filter({type: 'test4_target', correct: true}).count() / total_trials * 100);
    return accuracy}},

};
timeline.push(prac_feedback_test4);







/*set up test5 block*/
var test5_instruction = {
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'test5.png',
  choices: "ALL_KEYS",
};
timeline.push(test5_instruction);


var test5_cue = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('cue'),
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {type: 'test5_cue',
  cue: jsPsych.timelineVariable('cue')},
 // prompt:'按任意键继续'
}


var test5_target = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('target'),
  choices: [keys[0],keys[1]],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  data: {type: 'test5_target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d{3}(?=\.webp$)/));
    //console.log(jsPsych.timelineVariable('target'));
    //console.log(jsPsych.timelineVariable('cue'));    
    //console.log(num);
    if (jsPsych.timelineVariable('cue') == dir+'dinningroom.png'){
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
    return condition;
  }
    
    },
  //prompt:'</br>按任意键继续',
  on_finish: function(data) {
    var correct = false;
    if (jsPsych.pluginAPI.compareKeys(data.response, keys[idx-1]) && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, keys[2-idx]) && data.condition == 0) {
        correct = true;
    }
    data.correct = correct;
},
};


var test5_recon = {
  type: jsPsychReconstruct_wheel,
  image_path: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32',
  image_format: 'webp',
  uncertainty_range: true,
  random_circle_rotation: true,
  data: {type: 'test5_recon'},
}


var test5_iti = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:'<p style="font-size: 30px; font-family: SimSun;">+</p>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  data: {type: 'test5_iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};



var test5_variables = [
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),0,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),120,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'bedroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'dinningroom.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:dir+'restaurant.png',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+uniformwidth(Math.random(),240,15)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},

];


var test5timeline = [
  test5_cue,
  test5_target,
  test5_recon,
  test5_iti,
];

var test5_proc = {
  timeline: test5timeline,
  timeline_variables:test5_variables,
  randomize_order: true,

};

timeline.push(test5_proc);
//




var prac_feedback_test5 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
      var total_trials = jsPsych.data.get().filter({type: 'test5_target'}).count();
      var accuracy = Math.round(jsPsych.data.get().filter({type: 'test5_target', correct: true}).count() / total_trials * 100);
      var rt = Math.round(jsPsych.data.get().filter({type: 'test5_target'}).select('rt').mean())/1000;

      return "<p style='font-size: 30px; font-family: SimSun;'>你当前的平均反应时间为 <strong>"+rt.toFixed(3)+"秒</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>你当前的正确率为 <strong>"+accuracy+"%</strong></p> " +
      "<p style='font-size: 30px; font-family: SimSun;'>按任意键结束</p>";},
  data: {type: 'prac_feedback',
  correct: function() {
    var total_trials = jsPsych.data.get().filter({type: 'test5_target'}).count();
    var accuracy = Math.round(jsPsych.data.get().filter({type: 'test5_target', correct: true}).count() / total_trials * 100);
    return accuracy}},

};
timeline.push(prac_feedback_test5);










/*set the end slide*/
var end ={
  type: jsPsychImageKeyboardResponse,
  stimulus: dir+'end.png',
  choices: "ALL_KEYS",
  on_finish: function () {
    $("body").css("cursor", "default");
  }

};












//
timeline.push(end);

jsPsych.run(timeline);