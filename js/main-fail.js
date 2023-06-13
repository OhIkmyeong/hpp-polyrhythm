class PolyRhythm{
    constructor(){
        this.$cv = document.getElementById('paper');
        this.ctx = this.$cv.getContext('2d');

        this.pos = null;
        this.angle = 0;
        this.toLeft = true;
        this.stop = false;
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

        /* angle */
        if(this.toLeft){
            this.angle--;
            if(this.angle < -180) this.toLeft = false;
        }else{
            this.angle++;
            if(this.angle > 0) this.toLeft = true;
        }

        requestAnimationFrame(this.polyrhythm);
    }//polyrhythm


    draw = () =>{
        const {xStart,xEnd,xCenter,y} = this.pos;
        
        /* circles */
        const radius = (xEnd - xStart) / 2;
        const per = radius / 21;

        for(let i=0; i<21; i++){
            this.draw_arc({
                x : xCenter, 
                y : y, 
                radius : radius - (per * i),
                angle : this.angle
            });
        }//for

        /* bottom line */
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 6;
        this.ctx.beginPath();
        this.ctx.moveTo(xStart, y);
        this.ctx.lineTo(xEnd, y);
        this.ctx.stroke();
    }//draw

    draw_arc = (OBJ = {}) => {
        const {x,y,radius,angle} = OBJ;
        const deg = (Math.PI / 180);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#aaaaaa";
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
        });
    }//draw_arc

    draw_point(OBJ = {}){
        const {xCenter, y:parentY} = this.pos;
        const {angle,parentRadius} = OBJ;
        const rad = angle * (Math.PI / 180);
        const x = Math.cos(rad) * parentRadius + xCenter;
        const y = Math.sin(rad) * parentRadius + parentY;
        
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ffffff";
        const radius = window.innerWidth * 0.8 / 21 / 6;
        this.ctx.arc(x,y - 6, radius ,0,Math.PI * 2);
        this.ctx.fill();
    }//draw_point
}//class-PolyRhythm

/* ------------[실행]------------ */
new PolyRhythm().init();