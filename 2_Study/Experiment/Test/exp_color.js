var jsPsych = initJsPsych({
  show_progress_bar: true,
  on_finish: function() {
      //jsPsych.data.displayData();
      jsPsych.data.get().localSave('csv', `test_.csv`);
      document.exitFullscreen();
    }
  }
);

/*set up experiment structure*/
var timeline = [];

var dir = 'img/instructions_color/';



var recon_images = [];
var img_dir = 'img/color/';
for (i = 0; i <360; i++){
  recon_images.push('img/color/color_'+
  ('00'+i).slice(-3).toString()+
  '.png')
  }
recon_images.push(dir+'intro1.png');
recon_images.push(dir+'intro2.png');
recon_images.push(dir+'intro31.png');
recon_images.push(dir+'intro32.png');
recon_images.push(dir+'intro4.png');
recon_images.push(dir+'intro5.png');
recon_images.push(dir+'intro6.png');
recon_images.push(dir+'info.png');
recon_images.push(dir+'example1.png');
recon_images.push(dir+'example2.png');
recon_images.push(dir+'red.png');
recon_images.push(dir+'blue.png');
recon_images.push(dir+'green.png');
recon_images.push(dir+'prac1.png');
recon_images.push(dir+'prac2.png');
recon_images.push(dir+'test0.png');
recon_images.push(dir+'test1.png');
recon_images.push(dir+'test2.png');
recon_images.push(dir+'test3.png');
recon_images.push(dir+'test4.png');
recon_images.push(dir+'end.png');






var preload_images = [[recon_images]];




var preload = {
  type: jsPsychPreload,
  images: preload_images,
  auto_preload: true
};

//
timeline.push(preload);





var example_recon = {
  type: jsPsychReconstruct_colorwheel,
  uncertainty_range: true,
  random_circle_rotation: true,
  data: {type: 'example_recon'},
}



var extimeline = [
  example_recon,
];

var example_proc = {
  timeline: extimeline,
  randomize_order:true,
  repetitions: 5,
};



timeline.push(example_proc);
 

jsPsych.run(timeline);