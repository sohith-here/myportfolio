const canvas = document.getElementById('triangle-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();

class Triangle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;

    if (this.x < this.size) {
      this.x = this.size;
      this.vx *= -1;
    } else if (this.x > width - this.size) {
      this.x = width - this.size;
      this.vx *= -1;
    }

    if (this.y < this.size) {
      this.y = this.size;
      this.vy *= -1;
    } else if (this.y > height - this.size) {
      this.y = height - this.size;
      this.vy *= -1;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.beginPath();
    const heightTri = (this.size * Math.sqrt(3)) / 2;
    ctx.moveTo(0, -heightTri / 1.5);
    ctx.lineTo(-this.size / 2, heightTri / 3);
    ctx.lineTo(this.size / 2, heightTri / 3);
    ctx.closePath();

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 180, 220, 0.4)';  // softer cyan
    ctx.shadowColor = 'rgba(0, 180, 220, 0.6)';
    ctx.shadowBlur = 8;
    ctx.stroke();

    ctx.restore();
  }
}

const triangles = [];
const triangleCount = 40;
const baseSize = 40;
const connectionDistance = 150;

function init() {
  triangles.length = 0;
  for (let i = 0; i < triangleCount; i++) {
    const x = Math.random() * (width - baseSize * 2) + baseSize;
    const y = Math.random() * (height - baseSize * 2) + baseSize;
    triangles.push(new Triangle(x, y, baseSize));
  }
}

function drawConnections() {
  for (let i = 0; i < triangles.length; i++) {
    for (let j = i + 1; j < triangles.length; j++) {
      const dx = triangles[i].x - triangles[j].x;
      const dy = triangles[i].y - triangles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < connectionDistance) {
        const alpha = 1 - dist / connectionDistance;
        ctx.strokeStyle = `rgba(0, 180, 220, ${alpha * 0.25})`;  // softer lines
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(triangles[i].x, triangles[i].y);
        ctx.lineTo(triangles[j].x, triangles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  drawConnections();

  triangles.forEach(tri => {
    tri.update();
    tri.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resize();
  init();
});

init();
animate();

const roles = ['a Developer.', 'a Tech Enthusiast.', 'a Web3 Explorer.'];
const typingElement = document.getElementById('typing');

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let delay = 100;

function type() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
    typingElement.textContent = currentRole.substring(0, charIndex);
    delay = 50;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    delay = 120;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    delay = 1000; // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 300; // Pause before next word
  }

  setTimeout(type, delay);
}

type()

const skills = [
  "HTML", "CSS", "JavaScript", "ReactJS", "NodeJS",
  "Bootstrap", "Git", "Python", "MongoDB", "Express",
  "PHP", "RESTAPI", "SQL", "Firebase"
];

const container = document.getElementById("sphere-container");
const radius = 150;
const tags = [];
const total = skills.length;

skills.forEach((skill, i) => {
  const phi = Math.acos(-1 + (2 * i + 1) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;

  const tag = document.createElement("div");
  tag.className = "skill-tag";
  tag.textContent = skill;
  container.appendChild(tag);

  tags.push({
    element: tag,
    phi,
    theta
  });
});

function render() {
  const time = Date.now() * 0.001;

  tags.forEach(tag => {
    // Rotate angles over time
    const theta = tag.theta + time * 0.4;

    const x = radius * Math.sin(tag.phi) * Math.cos(theta);
    const y = radius * Math.cos(tag.phi);
    const z = radius * Math.sin(tag.phi) * Math.sin(theta);

    const scale = 0.8 + (z / (2 * radius)); // z scaling
    const transform = `
      translate3d(${x}px, ${y}px, ${z}px)
      scale(${scale})
      rotateY(0deg) rotateX(0deg)
    `;
    tag.element.style.transform = transform;
    tag.element.style.zIndex = Math.floor(z + 200); // depth layering
    tag.element.style.opacity = 0.5 + scale / 1.5;   // fade further tags
  });

  requestAnimationFrame(render);
}

render();

document.querySelectorAll('.view-more-btn').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    const moreText = card.querySelector('.more-text');
    
    if (moreText.style.display === 'none' || moreText.style.display === '') {
      moreText.style.display = 'inline';  // or 'block' based on your layout
      button.textContent = 'view less';
    } else {
      moreText.style.display = 'none';
      button.textContent = 'view more';
    }
  });
});





