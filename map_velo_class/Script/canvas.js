class Canvas {

    constructor(canvId, storage) {
        this.storage = storage;
        this.canv = document.getElementById(canvId);
        this.ctx = this.canv.getContext("2d");

        this.painting = false;

        this.handleClick()
    }

    initCanvas (){
        signature.style.display="block";
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);

        this.canv.addEventListener("mousemove", event => {
            this.findxy('move', event)
        }, false);
        this.canv.addEventListener("mousedown", event => {
            this.findxy('down', event)
        }, false);
        this.canv.addEventListener("mouseup", event => {
            this.findxy('up', event)
        }, false);
        this.canv.addEventListener("mouseout", event => {
            this.findxy('out', event)
        }, false);
    }

    findxy(action, e) {
        this.currX = e.offsetX;
        this.currY = e.offsetY;

        if (action === 'down') {
            this.painting = true;
            this.ctx.beginPath();
            this.ctx.moveTo(this.currX, this.currY);
        }

        if (action === 'up' || action === "out") {
            this.painting = false;
        }

        if (action === 'move') {
            if (this.painting) {
                this.ctx.lineTo(this.currX, this.currY);
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }
        }
    }

    valideSignature (signature) {
        this.storage.update('signature', this.canv.toDataURL());
        signature.style.display="none";
    }

    handleClick () {
        const valideSignature = document.getElementById('valideSignature')
        valideSignature.addEventListener('click', () => {
            canvas.valideSignature(signature)
        })
    }
}
