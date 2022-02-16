let canv;
let ctx;

let currX = 0;
let currY = 0;

let painting = false;
const valideSignature = document.getElementById('valideSignature')
const signature = document.getElementById('signature')

function initCanvas() {
    signature.style.display="block";

    canv = document.getElementById('canvas');
    ctx = canv.getContext("2d");

    canv.addEventListener("mousemove", event => {
        findxy('move', event)
    }, false);
    canv.addEventListener("mousedown", event => {
        findxy('down', event)
    }, false);
    canv.addEventListener("mouseup", event => {
        findxy('up', event)
    }, false);
    canv.addEventListener("mouseout", event => {
        findxy('out', event)
    }, false);
}

function findxy(action, e) {
    currX = e.offsetX;
    currY = e.offsetY;

    if (action === 'down') {
        painting = true;
        ctx.beginPath();
        ctx.moveTo(currX, currY);
    }

    if (action === 'up' || action === "out") {
        painting = false;
    }

    if (action === 'move') {
        if (painting) {
            ctx.lineTo(currX, currY);
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
}

valideSignature.addEventListener("click", () => {
    localStorage.setItem('signature', canv.toDataURL());
    signature.style.display="none";
})