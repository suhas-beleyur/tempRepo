const skills = [
'React', 'JavaScript','TypeScript', 'Node.js', 'Figma', 'Next.js', 'DSA',
'Python', 'PostgreSQL', 'Tailwind', 'GraphQL',
'Docker', 'AWS', 'GSAP', ];
const marquee = document.getElementById('marquee');
const repeated = [...skills, ...skills, ...skills];
marquee.innerHTML = repeated.map(s => `<span class="marquee-item">${s}</span>`).join('');

// CUSTOM CURSOR

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
mx = e.clientX; my = e.clientY;
cursor.style.left = mx + 'px';
cursor.style.top = my + 'px';
});
(function animateRing() {
rx += (mx - rx) * 0.12;
ry += (my - ry) * 0.12;
ring.style.left = rx + 'px';
ring.style.top = ry + 'px';
requestAnimationFrame(animateRing);
})();
document.querySelectorAll('a, button').forEach(el => {
el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    ring.style.width = '56px';
    ring.style.height = '56px';
});
el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    ring.style.width = '36px';
    ring.style.height = '36px';
});
});

// ANIMATED DOODLE CANVAS
const canvas = document.getElementById('doodle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

const colors = ['#e8ff47', '#ff6b35', '#7c5cbf', '#4ade80'];
const doodles = [];

class Doodle {
constructor() { this.reset(true); }
reset(init) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : canvas.height + 40;
    this.size = 6 + Math.random() * 18;
    this.type = Math.floor(Math.random() * 5); // 0=circle, 1=star, 2=cross, 3=square, 4=zigzag
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = 0.08 + Math.random() * 0.18;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = -0.3 - Math.random() * 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.vr = (Math.random() - 0.5) * 0.02;
}
draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    const s = this.size;
    ctx.beginPath();
    switch(this.type) {
    case 0: // circle
        ctx.arc(0, 0, s, 0, Math.PI*2); break;
    case 1: // star
        for(let i = 0; i < 5; i++) {
        const a = (i * 4 * Math.PI / 5) - Math.PI/2;
        const b = a + 2*Math.PI/5;
        i === 0 ? ctx.moveTo(Math.cos(a)*s, Math.sin(a)*s) : ctx.lineTo(Math.cos(a)*s, Math.sin(a)*s);
        ctx.lineTo(Math.cos(b)*s*0.4, Math.sin(b)*s*0.4);
        }
        ctx.closePath(); break;
    case 2: // cross
        ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
        ctx.moveTo(0, -s); ctx.lineTo(0, s); break;
    case 3: // square
        ctx.rect(-s, -s, s*2, s*2); break;
    case 4: // zigzag
        ctx.moveTo(-s, s/2);
        for(let i = 0; i < 5; i++) {
        ctx.lineTo(-s + i*(s*2/4), i%2===0 ? s/2 : -s/2);
        }
        ctx.lineTo(s, s/2); break;
    }
    ctx.stroke();
    ctx.restore();
}
update() {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.vr;
    if (this.y < -40) this.reset(false);
}
}

for(let i = 0; i < 55; i++) doodles.push(new Doodle());

function animateCanvas() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
doodles.forEach(d => { d.update(); d.draw(); });
requestAnimationFrame(animateCanvas);
}
animateCanvas();

// ============================
// SCROLL REVEAL
// ============================
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
entries.forEach((e, i) => {
    if(e.isIntersecting) {
    setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
});
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// ============================
// PARALLAX DOODLES ON MOUSE
// ============================
document.addEventListener('mousemove', e => {
const doodleEls = document.querySelectorAll('.doodle');
const xRatio = (e.clientX / window.innerWidth - 0.5);
const yRatio = (e.clientY / window.innerHeight - 0.5);
doodleEls.forEach((d, i) => {
    const factor = (i % 3 + 1) * 8;
    d.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
});
});