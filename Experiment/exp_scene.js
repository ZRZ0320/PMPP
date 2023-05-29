var jsPsych = initJsPsych({
  show_progress_bar: true,
  on_finish: function() {
      //jsPsych.data.displayData();
      jsPsych.data.get().localSave('csv', 'test.csv');
      document.exitFullscreen();
    }
  }
);



var basic_information = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
   <p>本实验首先需要您填写一些基本个人信息。</p>
   <p> <div style = "color: dinningroom"><按任意键至下页></div></p>
   `,
  choices: "ALL_KEYS",
};

var subj_idx = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p> 你的被试编号是?</b> </p>',
  html: '<p> <input name="subj_idx" type="text" />.</p>'
};


var subj_age = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p> 你的出生年份是?</b> </p>',
  html:` <p>
  <input name="Born" type="number" placeholder="1980~2023" min=1980 max=2023 oninput="if(value.length>4) value=value.slice(0,4)" required />
  </p>`
};

var subj_sex = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p> 你的性别是?</b> </p>',
  html: function () {
    return `
              <p><select name="sex" size=3>
              <option value=1>男</option>
              <option value=2>女</option>
              </select></p>`
  },
}
var subj_education = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p> 你的受教育程度是?</b> </p>',
  html: function () {
    return `
              <p><select name="education" size=10>
              <option value=1>小学以下</option>
              <option value=2>小学</option>
              <option value=3>初中</option>
              <option value=4>高中</option>
              <option value=5>大学</option>
              <option value=6>硕士</option>
              <option value=7>博士</option>
              <option value=8>其他</option>
              </select></p>`
  },
}


var recon_images = [];

for (i = 0; i <360; i++){
  recon_images.push('img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+
  ('000000'+i).slice(-6).toString()+
  '.webp')
  }

var preload_images = [[recon_images]];


/*set up instruction block*/
var fullscreen_trial = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: '<p>这个实验将会切换到全屏进行</p>',
  button_label: '全屏'
};



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
  '<p>在本次实验中，你将会看到一个提示，随后将出现一种场景，请判断场景与提示是否一致，并用鼠标选择你印象中最接近该刺激的场景</p>'],
  show_clickable_nav: true,
  show_page_number: true,
  button_label_previous: '上一页',
  button_label_next: '下一页',
  page_label: '页码',
};



var example_cue = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable('cue'),
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {type: 'example_cue',
  cue: jsPsych.timelineVariable('cue')},
  prompt:'按任意键继续'
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
  data: {type: 'target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d+/));
    if (jsPsych.timelineVariable('cue') == 'livingroom'){
      if (num < 60 | num >= 300){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else if(jsPsych.timelineVariable('cue') == 'bedroom'){
      
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
      if (jsPsych.pluginAPI.compareKeys(data.response, 'f') && data.condition == 1) {
          correct = true;
      } else if (jsPsych.pluginAPI.compareKeys(data.response, 'j') && data.condition == 0) {
          correct = true;
      }
      data.correct = correct;
  },
  prompt:'</br>按任意键继续',
};




var example_recon = {
  type: jsPsychReconstruct_wheel,
  image_path: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32',
  image_format: 'webp',
  uncertainty_range: true,
  random_circle_rotation: true,
  data: {type: 'example_recon'},
}



var example_iti = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:'<p>+</p>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  data: {type: 'example_iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};


var confirmation = {
 type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>你准备好进入下一个阶段了吗?</p>'+
            '<p>如果准备好了请按“f”键进入下一个阶段，没有准备好就按“j”键继续</p>',
  choices: ['f', 'j'],
  data: {type: 'example_confirmation'},
};



var extimeline_variables = [
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
];


var extimeline = [
  example_cue,
  example_target,
  example_recon,
  example_iti,
  confirmation,
];

var example_proc = {
  timeline: extimeline,
  timeline_variables: extimeline_variables,
  randomize_order:true,
  loop_function: function(data){
      var key_response = data.filter({type: 'example_confirmation'}).values()[0].response;
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
  pages: ['<p><b>欢迎来到练习阶段</b></p><br>',],
  show_clickable_nav: true,
  show_page_number: true,
  button_label_previous: '上一页',
  button_label_next: '下一页',
  page_label: '页码',
};


var prac_cue = {
  type: jsPsychHtmlKeyboardResponse,
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
  choices: ['f','j'],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  data: {type: 'target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d+/));
    if (jsPsych.timelineVariable('cue') == 'livingroom'){
      console.log(jsPsych.timelineVariable('cue') == 'livingroom');
      if (num < 60 | num >= 300){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else if(jsPsych.timelineVariable('cue') == 'bedroom'){
      
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
    if (jsPsych.pluginAPI.compareKeys(data.response, 'f') && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, 'j') && data.condition == 0) {
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
      var total_trials = jsPsych.data.get().filter({type: 'target'}).count();
      var accuracy = Math.round(jsPsych.data.get().filter({correct: true}).count() / total_trials * 100);
      return "<p>你当前的正确率为 <strong>"+accuracy+"%</strong></p> " +
      "<p>按任意键结束</p>";},
  data: {type: 'prac_feedback',
  correct: function() {
    var total_trials = jsPsych.data.get().filter({type: 'target'}).count();
    var accuracy = Math.round(jsPsych.data.get().filter({correct: true}).count() / total_trials * 100);
    return accuracy}},

};

var prac_iti = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:'<p>+</p>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  data: {type: 'prac_iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};



var prac_variables = [
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},

  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
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
//  loop_function: function(data){
//      var total_trials = jsPsych.data.get().filter({type: 'prac_target'}).count();
//      var accuracy = Math.round(jsPsych.data.get().filter({correct: true}).count() / total_trials * 100);
//      if (accuracy < 60) {
//          return true;
//    } else {
//          return false;
//    }       
//  }
};





/*set up test1 block*/
var test1_instruction = {
  type: jsPsychInstructions,
  pages: ['<p><b>欢迎来到测试阶段</b></p><br>',],
  show_clickable_nav: true,
  show_page_number: true,
  button_label_previous: '上一页',
  button_label_next: '下一页',
  page_label: '页码',
};


var test1_cue = {
  type: jsPsychHtmlKeyboardResponse,
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
  choices: ['f','j'],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  data: {type: 'target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d+/));
    console.log(jsPsych.timelineVariable('target'));
    console.log(jsPsych.timelineVariable('cue'));    
    console.log(num);
    if (jsPsych.timelineVariable('cue') == 'livingroom'){
      console.log(jsPsych.timelineVariable('cue') == 'livingroom');
      if (num < 60 | num >= 300){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else if(jsPsych.timelineVariable('cue') == 'bedroom'){
      
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
    if (jsPsych.pluginAPI.compareKeys(data.response, 'f') && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, 'j') && data.condition == 0) {
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
  stimulus:'<p>+</p>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  data: {type: 'test1_iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};



var test1_variables = [
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
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

/*rest*/
var rest = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>休息一下，任意键结束</p>',
  choices: "All_KEYS",
  trial_duration: null,
 // prompt:'按任意键继续'
}


/*set up test2 block*/
var test2_instruction = {
  type: jsPsychInstructions,
  pages: ['<p><b>欢迎来到测试阶段</b></p><br>',],
  show_clickable_nav: true,
  show_page_number: true,
  button_label_previous: '上一页',
  button_label_next: '下一页',
  page_label: '页码',
};


var test2_cue = {
  type: jsPsychHtmlKeyboardResponse,
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
  choices: ['f','j'],
  stimulus_duration: 500,
  trial_duration: 2000,
  stimulus_width: 400, 
  maintain_aspect_ratio: true,
  post_trial_gap: 0,
  data: {type: 'target',
  'cue': jsPsych.timelineVariable('cue'),
  'target': jsPsych.timelineVariable('target'),
  'condition': function(){
    var str = jsPsych.timelineVariable('target');
    var num = parseInt(str.match(/\d+/));
    console.log(jsPsych.timelineVariable('target'));
    console.log(jsPsych.timelineVariable('cue'));    
    console.log(num);
    if (jsPsych.timelineVariable('cue') == 'livingroom'){
      console.log(jsPsych.timelineVariable('cue') == 'livingroom');
      if (num < 60 | num >= 300){
        var condition = 1;
      }else{
        var condition = 0;
      }
    }else if(jsPsych.timelineVariable('cue') == 'bedroom'){
      
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
    if (jsPsych.pluginAPI.compareKeys(data.response, 'f') && data.condition == 1) {
        correct = true;
    } else if (jsPsych.pluginAPI.compareKeys(data.response, 'j') && data.condition == 0) {
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
  stimulus:'<p>+</p>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.timelineVariable('tdtime'),
  data: {type: 'test2_iti',
  trial_duration: jsPsych.timelineVariable('tdtime')}
};



var test2_variables = [
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  //
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
  {cue:'bedroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'dinningroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  {cue:'livingroom',target: 'img/sceneWheel_images_webp/Wheel04/wheel04_r32/'+('000000'+Math.floor(Math.random() * 360)).slice(-6).toString()+'.webp',tdtime:Math.floor(Math.random() * 500) + 1000},
  
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

/*set the end slide*/
var end ={
  type: jsPsychInstructions,
  pages: ['<p><b>感谢您的参与！</b></p><br>',],
  show_clickable_nav: true,
  show_page_number: true,
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
timeline.push(instructions);
timeline.push(example_instruction);
timeline.push(example_proc);
//
timeline.push(prac_instruction);
timeline.push(prac_proc);
//
timeline.push(test1_instruction);
timeline.push(test1_proc);
//
timeline.push(rest);
//
timeline.push(test2_instruction);
timeline.push(test2_proc);
//
timeline.push(end);

jsPsych.run(timeline);