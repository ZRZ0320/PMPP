


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

var preload_images = [[recon_images]];



//function randomNormalDistribution(u,v) {
//  var mean = 120; 
//  var std_deviation = 10; 
//  var z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); 
//  var zint = Math.floor(mean + z * std_deviation);
//  if (zint < 0) {
//    zint = 360+zint;
//  }
//  return zint;
//}








var example_recon = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p>。</p>
    `,
    choices: "ALL_KEYS",
    data: {'target':jsPsych.timelineVariable('v')},
  }



var extimeline_variables = [
    //{cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:randomNormalDistribution(Math.random(),Math.random())},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
    {cue:'示例',target: 'img/sceneWheel_images_webp/Wheel01/wheel01_r02/000001.webp',recon:'img/sceneWheel_images_webp/Wheel05/wheel05_r02',v:Math.floor(Math.random()*20-10+180)},
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
timeline.push(example_proc);

jsPsych.run(timeline);