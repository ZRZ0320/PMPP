var jsPsychReconstruct_colorwheel = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "reconstruct-colorwheel",
      parameters: {        
        /**
         * The images composing the circular dimension. Use this only when the stimulus_type is 'image'
         */

        image_width: {
          type: jspsych.ParameterType.INT,
          default: 200,
        },
        image_height: {
          type: jspsych.ParameterType.INT,
          default: 200,
        },
        /**
         * Whether the answer to be reconstructed is displayed on the reconstruction display.
         * (This is particularly for perceptual reconstruction task).
         */
        show_answer: {
          type: jspsych.ParameterType.BOOL,
          default: false,
        },
        /**
         * Paramters for answer_image. Declare below three when 'show_answer=true.'
         */
        answer_image: {
          type: jspsych.ParameterType.INT, // in number
          default: null,
        },
        answer_image_width: {
          type: jspsych.ParameterType.INT,
          default: 200,
        },
        answer_image_height: {
          type: jspsych.ParameterType.INT,
          default: 200,
        },
        /**
         * The interval between two adjacent angles on the circle in a degree unit. (e.g. 1deg unit, 2 deg unit, 10 deg unit, etc.)  
         */
        step_size: {
          type: jspsych.ParameterType.INT,
          default: 1,
        },      
        /**
         * Wheter or not the indicator is displayed around the response image.       
         */
        show_indicator: {
          type: jspsych.ParameterType.BOOL,
          default: true,
        },  
        indicator_wheel_diameter:{
          type: jspsych.ParameterType.INT,
          default: 400,
        },     
        indicator_wheel_width:{
          type: jspsych.ParameterType.INT,
          default: 2
        },
        indicator_pointer_radius:{
          type: jspsych.ParameterType.INT,
          default: 4
        },      
        /**
         * The layout of reconstruction display
         * In case when displaying the answer image, you can use 'left', 'right', 'top', 'bottom'
         * The answe image will be presetned in 'right', 'left', 'bottom', 'top' respectively depending on the canvas position.
         */
        canvas_position: {
          type: jspsych.ParameterType.STRING,
          default: 'center'
        },
        answer_position: {
          type:jspsych.ParameterType.STRING,
          default: null
        },
        /**
         * Whether the starting point of the wheel would be randomized.
         */
        random_circle_rotation: {
          type: jspsych.ParameterType.BOOL,
          default: false,
        },
        /**
         * starting value. 
         * By default, for the image wheel, a grey box is set as starting value. 
         * So, please include grey image under the number 99999 
         */
        starting_value: {
          type: jspsych.ParameterType.INT,
          default: 999999
        },
        uncertainty_range: {
          type: jspsych.ParameterType.BOOL,
          default: false
        },
        image_format: { // ex) .jpg, .png, .webp, etc.
          type: jspsych.ParameterType.STRING,
          default: '.jpg'
        }, 
      },
    };
  
    /**
     * **colorwheel reconstruction**
     *
     * jsPsych plugin for reconstruction task with colorwheel
     *
     * @author Yikang Liu(liuyk11@126.com)
     */
    class mouseReconstructionPlugin_imageWheel {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
        this.display = display_element;
        this.params = trial;      
        this.wsp=0;
        if(this.params.random_circle_rotation == true){  // set random rotation angle
          this.wsp = Math.random()*Math.PI*2-Math.PI; // should be in radian range      
        }    
        //console.log(this.wsp/Math.PI*180)
        var initial_param = this.params.starting_value; // initial starting_value
        this.init_display(initial_param);
        this.setup_event_listeners();
        this.start_time = performance.now();
      }
      // display the canvas


      init_display(img_angle, pointer_angle) {
        this.add_css();
        // image      
        this.img_num = ('000000'+img_angle).slice(-6);
        let canvas_html;
        canvas_html=`<div id="arena_${this.params.canvas_position}">
        <canvas id="recon_canvas" width="${this.params.indicator_wheel_diameter}" height="${this.params.indicator_wheel_diameter}" class="indicator-circle"></canvas>
        <canvas id="myCanvas" width="${this.params.indicator_wheel_diameter*1.5}" height="${this.params.indicator_wheel_diameter*1.5}" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin: auto;"></canvas>      
        <canvas id="square" width="${this.params.indicator_wheel_diameter/2}" height="${this.params.indicator_wheel_diameter/2}" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin: auto;"></canvas>`      

        var answer_html = ``;

        if(this.params.show_answer==true){  
        var answer_img_num =  ('000000'+this.params.answer_image).slice(-6)     
        answer_html=`<div id="arena_${this.params.answer_position}">
        <img src="${this.params.image_path}/${answer_img_num}.${this.params.image_format}" 
        width="${this.params.answer_image_width}" height="${this.params.answer_image_height}"></div>`;
        }
        
        let display_html;
        display_html=`<div id="base_container">${canvas_html}${answer_html}</div>`
        this.display.innerHTML=display_html;
        this.recon_arena=this.display.querySelector('#recon_canvas');        
        // indicator 
        if(this.params.show_indicator==true){        
        var rect = this.recon_arena.getBoundingClientRect();
        var rel_cx = (rect.width/2)-this.params.indicator_wheel_width; //relative canvas center
        var rel_cy = (rect.height/2)-this.params.indicator_wheel_width;
        var pcx = Math.cos(pointer_angle) * (this.params.indicator_wheel_diameter/2-this.params.indicator_pointer_radius); // pointer center
        var pcy = Math.sin(pointer_angle) * (this.params.indicator_wheel_diameter/2-this.params.indicator_pointer_radius);  
        if (img_angle == 999999){
            pcx = 0; pcy = 0;
        }    
        this.draw_pointer(pcx+rel_cx, pcy+rel_cy, this.params.indicator_pointer_radius, 'black');
        }      
        const canvas = document.getElementById('myCanvas');
        const context = canvas.getContext('2d');
        
        const diameter = this.params.indicator_wheel_diameter ;
        const lineWidth = 20;
        const numSegments = 360; 
        
        canvas.width = diameter*1.5;
        canvas.height = diameter*1.5;
        
        context.beginPath();
        context.arc(diameter*1.5 / 2, diameter*1.5 / 2, diameter * 1.05 / 2, 0, 2 * Math.PI);

        var random_angle = 0;
        if (this.params.random_circle_rotation==true){
            var random_angle = this.wsp;

        }
        for (let i = 0; i < numSegments/3; i++) {
            const startColor = 'rgba(255, 0, 0, 1)'; 
            const endColor = 'rgba(0, 0, 255, 1)'; 
            const currentColor = interpolateColor(startColor, endColor, i / numSegments*3); 
            context.strokeStyle = currentColor;
            context.lineWidth = lineWidth;
            context.beginPath();
            const segmentAngle = 2 * Math.PI / numSegments;
            const startAngle = i * segmentAngle +random_angle;
            const endAngle = (i + 1) * segmentAngle  +random_angle;
            context.arc(diameter*1.5 / 2, diameter*1.5 / 2, diameter * 1.05 / 2, startAngle-0.02, endAngle+0.02);
            context.stroke();
            //console.log(currentColor)
        }
        

        for (let i = 0; i < numSegments/3; i++) {
            const startColor = 'rgba(0, 0, 255, 1)'; 
            const endColor = 'rgba(0, 255, 0, 1)'; 
            const currentColor = interpolateColor(startColor, endColor, i / numSegments*3); 
            context.strokeStyle = currentColor;
            context.lineWidth = lineWidth;
            context.beginPath();
            const segmentAngle = 2 * Math.PI / numSegments;
            const startAngle = i * segmentAngle + 2 * Math.PI / 3 +random_angle;
            const endAngle = (i + 1) * segmentAngle + 2 * Math.PI / 3 +random_angle;
            context.arc(diameter*1.5 / 2, diameter*1.5 / 2, diameter * 1.05 / 2, startAngle-0.02, endAngle+0.02);
            context.stroke();
            //console.log(currentColor)
        }

        for (let i = 0; i < numSegments/3; i++) {
            const startColor = 'rgba(0, 255, 0, 1)'; 
            const endColor = 'rgba(255, 0, 0, 1)'; 
            const currentColor = interpolateColor(startColor, endColor, i / numSegments*3); 
            context.strokeStyle = currentColor;
            context.lineWidth = lineWidth;
            context.beginPath();
            const segmentAngle = 2 * Math.PI / numSegments;
            const startAngle = i * segmentAngle + 4 * Math.PI / 3+random_angle;
            const endAngle = (i + 1) * segmentAngle + 4 * Math.PI / 3+random_angle;
            context.arc(diameter*1.5 / 2, diameter*1.5 / 2, diameter * 1.05 / 2, startAngle-0.02, endAngle+0.02);
            context.stroke();
            //console.log(currentColor)
          }
        const canvas2 = document.getElementById('square');
        const context2 = canvas2.getContext('2d');

        const diameter2 = this.params.indicator_wheel_diameter ;

        canvas2.width = diameter2;
        canvas2.height = diameter2;
        context2.fillStyle =sqaurecolor(img_angle);
        this.color = sqaurecolor(img_angle);
        context2.fillRect(diameter2/4, diameter2/4, diameter2/2, diameter2/2);
        //console.log(sqaurecolor(img_angle))

        
        function sqaurecolor(img_angle){
            if(img_angle<120 && img_angle>=0){
              const startColor = 'rgba(255, 0, 0, 1)'; 
              const endColor = 'rgba(0, 0, 255, 1)'; 
              const currentColor = interpolateColor(startColor, endColor, img_angle/120); 
              const color = currentColor;
              return color;
            }  
            if(img_angle<240 && img_angle>=120){
              const startColor = 'rgba(0, 0, 255, 1)';
              const endColor = 'rgba(0, 255, 0, 1)';
              const currentColor = interpolateColor(startColor, endColor, (img_angle-120)/120);
              const color = currentColor;
              return color;
            }
            if(img_angle<360 && img_angle>=240){
              const startColor = 'rgba(0, 255, 0, 1)';
              const endColor = 'rgba(255, 0, 0, 1)';
              const currentColor = interpolateColor(startColor, endColor, (img_angle-240)/120);
              const color = currentColor;
              return color;
            }
            if(img_angle > 360){
              const color = `rgba(255, 255, 255, 1)`;
              return color;
            }
            
        }



        function interpolateColor(startColor, endColor, frac) {
            const start = parseColor(startColor);
            const end = parseColor(endColor);
            const blended = [
            Math.floor(start[0] * (1 - frac) + end[0] * frac),
            Math.floor(start[1] * (1 - frac) + end[1] * frac),
            Math.floor(start[2] * (1 - frac) + end[2] * frac),
            start[3] * (1 - frac) + end[3] * frac,
            ];
            return `rgba(${blended[0]}, ${blended[1]}, ${blended[2]}, ${blended[3]})`;
            }
        
        function parseColor(color) {
            const regex = /rgba?\((\d+), (\d+), (\d+)(?:, (\d+(?:\.\d+)?))?\)/;
            const matches = color.match(regex);
            if (!matches) throw new Error(`Invalid color: ${color}`);
            return [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]), parseFloat(matches[4] || '1')];
    }
    
  }





      setup_event_listeners(){
        document.addEventListener("mousemove", this.search_event);
        document.addEventListener("click", this.search_confirm_event);      
      }
      search_event(e){
        this.is_search=true;
        this.angles = this.find_param(e);
        this.init_display(this.angles.img_angle, this.angles.mouse_angle);  
      }
      search_confirm_event(){
        this.search_end = performance.now();
        document.removeEventListener('mousemove', this.search_event);
        // change pointer color
        if(this.params.show_indicator==true){        
          var rect = this.recon_arena.getBoundingClientRect();
          var rel_cx = (rect.width/2)-this.params.indicator_wheel_width; //relative canvas center
          var rel_cy = (rect.height/2)-this.params.indicator_wheel_width;     
          var pcx = Math.cos(this.angles.mouse_angle) * (this.params.indicator_wheel_diameter/2-this.params.indicator_pointer_radius); // pointer center
          var pcy = Math.sin(this.angles.mouse_angle) * (this.params.indicator_wheel_diameter/2-this.params.indicator_pointer_radius);        
          this.draw_pointer(pcx+rel_cx, pcy+rel_cy, this.params.indicator_pointer_radius, 'gray');
        } 
        // record data
        this.trial_data={};
        this.trial_data.search_rt = this.search_end - this.start_time;
        this.trial_data.response = this.img_num;
        this.trial_data.img_angle = this.angles.img_angle;
        this.trial_data.color = this.color;
        this.trial_data.mouse_angle = this.angles.mouse_angle;
        this.trial.randrot_angle = this.wsp; 
        this.is_search = false;      
        // call uncertainty rating functions
        if(this.params.uncertainty_range == true) {
          document.addEventListener("mousemove", this.range_event);
          document.addEventListener("click", this.range_confirm_event);              
        } else { // or end this trial
            this.end_trial();  
        }
      }
      range_event(e){
        if(this.is_search == false){              
          document.removeEventListener("click", this.search_confirm_event);
          // canvas info        
          var rect = this.recon_arena.getBoundingClientRect();     
          var canvas_centerX = rect.left + (rect.width/2) - this.params.indicator_wheel_width;
          var canvas_centerY = rect.top + (rect.height/2) - this.params.indicator_wheel_width;             
          // get relative mouseposition in rect
          var x = e.clientX-canvas_centerX;
          var y = e.clientY-canvas_centerY;
          var end_angle = Math.atan2(y, x);          
          var draw_range=(start, one_end) => {
            var rad = this.params.indicator_wheel_diameter/2-4;          
            var ctx = this.recon_arena.getContext("2d");
            var start = (start+Math.PI) % (Math.PI*2) - Math.PI;
            var one_end = (one_end+Math.PI) % (Math.PI*2) - Math.PI;
            this.half_range = Math.abs((one_end - start+Math.PI) % (Math.PI*2) - Math.PI);
            ctx.clearRect(0, 0, this.params.indicator_wheel_diameter, this.params.indicator_wheel_diameter);            
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'gray';
            ctx.arc(rect.width/2-this.params.indicator_wheel_width, rect.height/2-this.params.indicator_wheel_width, rad, 
              start-this.half_range, start+this.half_range);
            ctx.stroke();
            ctx.closePath();          
          }        
          draw_range(this.angles.mouse_angle, end_angle);        
        }
      }
      range_confirm_event(){
        if(this.is_search == false){
            document.removeEventListener("mousemove", this.range_event);            
            this.trial_data.uncertainty_half_range = this.half_range; 
            this.trial_data.uncertainty_rt = performance.now() - this.search_end; // need to figure out        
            this.end_trial();            
        } 
      }
      find_param(e){
        // get mouseposition relative to canvas center
        var rect = this.recon_arena.getBoundingClientRect();    
        var canvas_centerX = rect.left + (rect.width/2) - this.params.indicator_wheel_width;
        var canvas_centerY = rect.top + (rect.height/2) - this.params.indicator_wheel_width;      
        var x = e.clientX-canvas_centerX;
        var y = e.clientY-canvas_centerY;
        // convert to angles
        var angles =[];
        angles.mouse_angle = Math.atan2(y, x); // range: -pi to pi
        angles.rotated_angle = angles.mouse_angle - this.wsp; // min: -2+pi (max this.wsp = pi)
        angles.rotated_angle_wrap = (angles.rotated_angle + (Math.PI*2)) % (Math.PI*2) // range: 0 ~ 2*pi
        angles.rotated_angle_deg = angles.rotated_angle_wrap/Math.PI * 180; 
        angles.img_angle = Math.floor(angles.rotated_angle_deg/this.params.step_size);       
        //console.log(angles);
        return angles;
      }
      draw_pointer(xx, yy, radius, color){
        var ctx = this.recon_arena.getContext("2d");        
        ctx.clearRect(0, 0, this.params.indicator_wheel_diameter, this.params.indicator_wheel_diameter);            
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(xx, yy, radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
      }
      end_trial(){
        document.removeEventListener("click", this.search_confirm_event);
        document.removeEventListener("mousemove", this.search_event);
        document.removeEventListener("mousemove", this.range_event);
        document.removeEventListener("click", this.range_confirm_event);
        this.display.innerHTML = "";
        document.querySelector("#recon-wheel-styles").remove();
        this.jsPsych.finishTrial(this.trial_data);
      }
      add_css (){
        document.querySelector("head").insertAdjacentHTML("beforeend", `<style id="recon-wheel-styles"> 
          #base_container {                
              position: relative;
              margin: auto;              
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              width: 1000px;
              height: 800px;                
              display: flex;
              align-items: center;                
              // border: 1px solid black;
          }            
          /** When using entire container space */
          #arena_center {   
              position: absolute;                           
              width: 100%;
              height: 100%;
              display: flex; 
              align-items: center;
              justify-content: center;                                      
          }            
          /** When dividing the container into 2 VERTICALLY*/
          #arena_left { 
              position: absolute;                        
              left: 0;             
              width: 50%;
              height: 100%;  
              display: flex;
              align-items: center;
              justify-content: center;                 
          }
          #arena_right {                 
              position: absolute;                 
              right: 0;                  
              width: 50%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;     
          }            
          /** when dividing the container into 2 HORIZONTALLY */
          #arena_top {
              position: absolute;                        
              top: 0;             
              width: 100%;
              height: 50%;  
              display: flex;
              align-items: center;
              justify-content: center;
          }
          #arena_bottom {
              position: absolute;                        
              top: 50%;             
              width: 100%;
              height: 50%;  
              display: flex;
              align-items: center;
              justify-content: center;
          }            
          /** When dividing the container into 3x3 sections*/
          #arena_TL { 
              position: absolute;
              top: 0; /** why 6.6...??? */                       
              left: 0;
              width: 33.3%;
              height: 33.3%;  
              display: flex;
              align-items: center;
              justify-content: center;                  
          }
          #arena_TM {                 
              position: absolute;                 
              left: 33.3%;
              top: 0;                                  
              width: 33.3%;
              height: 33.3%;
              display: flex;
              align-items: center;
              justify-content: center; 
          }
          #arena_TR {                 
              position: absolute;                 
              right: 0;
              top: 0;                                  
              width: 33.3%;
              height: 33.3%;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          #arena_ML {                 
              position: absolute;                 
              left: 0;
              top: 33.3%;                                  
              width: 33.3%;
              height: 33.3%;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          #arena_MM {                 
              position: absolute;                 
              left: 33.3%;
              top: 33.3%;                                  
              width: 33.3%;
              height: 33.3%;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          #arena_MR {                 
              position: absolute;                 
              right: 0;
              top: 33.3%;                                  
              width: 33.3%;
              height: 33.3%;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          #arena_BL {  
              position:absolute;              
              bottom: 0;
              left: 0;
              width: 33.3%;
              height: 33.3%;
              display: flex;
              align-items: center;
              justify-content: center;            
          }
          #arena_BM {                 
              position: absolute;                 
              left: 33.3%;
              top: 66.6%;                                  
              width: 33.3%;
              height: 33.3%;
              display: flex;
              align-items: center;
              justify-content: center; 
          }
          #arena_BR {
              position: absolute;               
              bottom: 0;
              right: 0;
              width: 33.3%;
              height: 33.3%;
              display: flex;
              align-items: center;
              justify-content: center;              
          }           
          #recon_canvas {              
              position: absolute;
              width: ${this.params.indicator_wheel_diamter}px;
              height: ${this.params.indicator_wheel_diameter}px;
              display: flex; 
              align-items: center;
              justify-content: center;               
              transform-origin: center center;   
              border: ${this.params.indicator_wheel_width}px solid;
          }  
          .indicator-circle{
              border-radius: ${this.params.indicator_wheel_diameter/2}px;
          }
          </style>`
        );
      };
    }
    mouseReconstructionPlugin_imageWheel.info = info;
  
    return mouseReconstructionPlugin_imageWheel;
  
  })(jsPsychModule);