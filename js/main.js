class PolyRhythm{
    constructor(){
        this.$cv = document.getElementById('paper');
        this.ctx = this.$cv.getContext('2d');

        this.pos = null;
        this.angle = 0;
        this.toLeft = true;
        this.stop = false;

        this.gradients = [
            "#d0e7f5",
            "#d9e7f4",
            "#d6e3f4",
            "#bcdff5",
            "#b7d9f4",
            "#c3d4f0",
            "#9dc1f3",
            "#9aa9f4",
            "#8d83ef",
            "#ae69f0",
            "#d46ff1",
            "#db5ae7",
            "#d911da",
            "#d601cb",
            "#e713bf",
            "#f23cae",
            "#fb79ab",
            "#ffb6c1",
            "#fed2cf",
            "#fddfd5",
            "#fedcd1",
        ];

        this.startTime = new Date().getTime();
    }//constructor

    init(){
        this.canvas_resize();
        this.set_pos();
        this.polyrhythm();
    }//init

    canvas_resize(){
        const wid = this.$cv.clientWidth; 
        const hei = this.$cv.clientHeight; 
        this.$cv.width = wid;
        this.$cv.height = hei;

        window.addEventListener('keyup',e =>{
            if(e.code != "Space") return;
            this.stop = !this.stop;
            cancelAnimationFrame(this.polyrhythm);
            this.polyrhythm();
        });
    }//canvas_resize

    set_pos(){
        this.pos = {
            xStart : this.$cv.width * 0.1,
            xEnd : this.$cv.width * 0.9,
            xCenter : this.$cv.width / 2,
            y : this.$cv.height * 0.9,
        };
    }//set_pos

    clear_canvas = () =>{
        this.ctx.clearRect(0,0,this.$cv.width, this.$cv.height);
    }//clear_canvas

    polyrhythm = () =>{
        if(this.stop) return;
        /* reset */
        this.clear_canvas();

        /* draw */
        this.draw();

        requestAnimationFrame(this.polyrhythm);
    }//polyrhythm


    draw = () =>{
        const {xStart,xEnd,xCenter,y} = this.pos;

        /* bottom line */
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 6;
        this.ctx.beginPath();
        this.ctx.moveTo(xStart, y);
        this.ctx.lineTo(xEnd, y);
        this.ctx.stroke();
        
        /* circles */
        const radius = (xEnd - xStart) / 2;
        const per = radius / 21;

        for(let i=0; i<21; i++){
            this.draw_arc({
                x : xCenter, 
                y : y, 
                radius : radius - (per * i),
                angle : this.angle,
                idx : i
            });
        }//for
    }//draw

    draw_arc = (OBJ = {}) => {
        const {x,y,radius,angle,idx} = OBJ;
        const deg = (Math.PI / 180);
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.gradients[idx];
        this.ctx.lineWidth = 1;
        this.ctx.arc(
            x,y, 
            radius,
            deg * 180, 0, 
            false
        );
        this.ctx.stroke();
        this.draw_point({
            angle : angle,
            parentRadius : radius,
            idx : idx
        });
    }//draw_arc

    draw_point(OBJ = {}){
        const {idx,parentRadius} = OBJ;
        const elapsedTime = new Date().getTime() - this.startTime;
        const v = (2 * Math.PI)  / 5000;
        const velocity = v + (idx * 0.0001);
        const maxAngle = 2 * Math.PI;
        const distance = Math.PI + elapsedTime * velocity;
        const modDistance = distance % maxAngle; 
        const adjustDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance;

        const {xCenter, y:parentY} = this.pos;
        const x = Math.cos(adjustDistance) * parentRadius + xCenter;
        const y = Math.sin(adjustDistance) * parentRadius + parentY;
        
        this.ctx.beginPath();
        this.ctx.fillStyle = this.gradients[idx];
        const radius = window.innerWidth * 0.8 / 21 / 6;
        this.ctx.arc(x,y, radius ,0,Math.PI * 2);
        this.ctx.fill();
    }//draw_point
}//class-PolyRhythm

/* ------------[실행]------------ */
new PolyRhythm().init();