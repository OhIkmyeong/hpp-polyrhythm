class PolyRhythm{
    constructor(){
        this.$cv = document.getElementById('paper');
        this.ctx = this.$cv.getContext('2d');

        this.pos = {
            xStart : this.$cv.width * 0.1,
            xEnd : this.$cv.width * 0.9,
            xCenter : this.$cv.width / 2,
            y : this.$cv.height * 0.6,
        };
    }//constructor

    init(){
        this.canvas_resize();
        this.set_pos();
        this.draw_background();
        
    }//init

    canvas_resize(){
        const wid = this.$cv.clientWidth; 
        const hei = this.$cv.clientHeight; 

        this.$cv.width = wid;
        this.$cv.height = hei;
        this.ctx.clearRect(0,0,wid,hei);
    }//canvas_resize

    set_pos(){
        this.pos = {
            xStart : this.$cv.width * 0.1,
            xEnd : this.$cv.width * 0.9,
            xCenter : this.$cv.width / 2,
            y : this.$cv.height * 0.6,
        };
    }//set_pos

    draw_background(){
        const {xStart,xEnd,xCenter,y} = this.pos;
        
        /* circles */
        const radius = (xEnd - xStart) / 2;
        const per = radius / 21;

        for(let i=0; i<21; i++){
            this.draw_arc(xCenter, y, radius - (per * i),0);
        }//for

        /* bottom line */
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 6;
        this.ctx.beginPath();
        this.ctx.moveTo(xStart, y);
        this.ctx.lineTo(xEnd, y);
        this.ctx.stroke();
    }//draw_background

    draw_arc(x,y,radius,angle){
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
        const x = Math.cos(angle) * parentRadius + xCenter;
        const y = Math.sin(angle) * parentRadius + parentY;
        
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ffffff";
        const radius = window.innerWidth * 0.8 / 21 / 6;
        this.ctx.arc(x,y - 6, radius ,0,Math.PI * 2);
        this.ctx.fill();
    }//draw_point
}//class-PolyRhythm

/* ------------[실행]------------ */
new PolyRhythm().init();