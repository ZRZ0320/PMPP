


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

var img_dir = ['img/sceneWheel_images_webp/Wheel01/wheel01_r02',
'img/sceneWheel_images_webp/Wheel02/wheel02_r02',
'img/sceneWheel_images_webp/Wheel03/wheel03_r02',
'img/sceneWheel_images_webp/Wheel04/wheel04_r02',
'img/sceneWheel_images_webp/Wheel05/wheel05_r02']






/*set up instruction block*/
var fullscreen_trial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: '<p>这个实验将会切换到全屏进行</p>',
    button_label: '全屏'
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
    '<p>在本次实验中，你将会看到一个提示，随后将出现一幅图片，请判断图片与提示是否一致，并用鼠标选择你印象中最接近该刺激的图片</p>'],
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
    prompt:'</br>判断该页面呈现的图片与之前呈现的图片是否一致，若一致按“f”键，不一致按“j”键',
  };




var example_recon = {
    type: jsPsychReconstruct_wheel,
    image_path: jsPsych.timelineVariable('recon'),
    image_format: 'webp',
    uncertainty_range: true,
    random_circle_rotation: true,
    //starting_value: ('00000'+Math.floor(Math.random()*360)).slice(-6).toString(),
  }

var confirmation = {
   type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p>你准备好进入下一个阶段了吗?</p>'+
              '<p>如果准备好了请按“f”键进入下一个阶段，没有准备好就按“j”键继续</p>',
    choices: ['f', 'j'],
    data: {type: 'confirmation'},
  };



var extimeline_variables = [
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02'},
  ];


var extimeline = [
    example_cue,
    example_target,
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




/*set up experiment structure*/
var timeline = [];
timeline.push(preload);
timeline.push(example_instruction);
timeline.push(example_proc);

jsPsych.run(timeline);