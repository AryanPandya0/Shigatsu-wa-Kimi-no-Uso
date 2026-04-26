const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');

let cw = canvas.width = window.innerWidth;
let ch = canvas.height = window.innerHeight;

const maxPetals = 80;
const petals = [];

// Handle Resize
window.addEventListener('resize', () => {
    cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;
});

class Petal {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * cw;
        this.y = Math.random() * ch * -1; // Start above screen
        this.w = 10 + Math.random() * 15; // Width
        this.h = 10 + Math.random() * 15; // Height
        this.opacity = 0.4 + Math.random() * 0.5;
        this.speedX = -1 + Math.random() * 2; // Drift left or right
        this.speedY = 1 + Math.random() * 2; // Fall down
        this.rotation = Math.random() * 360;
        this.rotSpeed = -2 + Math.random() * 4;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        
        ctx.beginPath();
        
        // Petal shape (slightly asymmetrical)
        ctx.moveTo(0, this.h / 2);
        ctx.quadraticCurveTo(this.w / 2, 0, this.w, this.h / 2);
        ctx.quadraticCurveTo(this.w / 2, this.h, 0, this.h / 2);
        
        ctx.fillStyle = `rgba(247, 198, 217, ${this.opacity})`; // Pastel pink
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotSpeed;

        // Slight hovering motion
        this.x += Math.sin(this.y * 0.01) * 0.5;

        // Reset if it goes off screen
        if (this.y > ch + 20 || this.x > cw + 20 || this.x < -20) {
            this.reset();
            this.y = -20; // reset to top
            // randomize x again
            this.x = Math.random() * cw;
        }
    }
}

// Interactive cursor repelling
let mouse = { x: -1000, y: -1000 };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function initPetals() {
    for (let i = 0; i < maxPetals; i++) {
        petals.push(new Petal());
    }
}

function animatePetals() {
    ctx.clearRect(0, 0, cw, ch);
    
    for (let i = 0; i < petals.length; i++) {
        let p = petals[i];
        
        // Interaction logic
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
            p.x += dx * 0.05;
            p.y += dy * 0.05;
        }

        p.update();
        p.draw();
    }
    
    requestAnimationFrame(animatePetals);
}

// Start
initPetals();
animatePetals();
