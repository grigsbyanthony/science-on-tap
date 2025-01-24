class Snowflake {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = 0;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 0.5 + 0.2;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;

        if (this.y > this.canvas.height) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function initSnow() {
    const navbar = document.querySelector('.navbar');
    const canvas = document.createElement('canvas');
    canvas.classList.add('snow-canvas');
    navbar.appendChild(canvas);

    // Add toggle button
    const navLinks = document.querySelector('.nav-links');
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'snow-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-snowflake"></i>';
    toggleBtn.title = 'Toggle snow effect';
    
    // Add tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = 'Click me!';
    toggleBtn.appendChild(tooltip);
    
    const li = document.createElement('li');
    li.appendChild(toggleBtn);
    navLinks.appendChild(li);

    // Check if tooltip has been shown before
    if (localStorage.getItem('snowTooltipShown')) {
        tooltip.style.display = 'none';
    }

    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    const numSnowflakes = 50;
    let isSnowing = false;
    let animationFrame;
    
    // Set initial state
    canvas.style.display = 'none';
    toggleBtn.style.opacity = '0.5';

    // Load snow state from localStorage
    if (localStorage.getItem('snowEnabled') === 'true') {
        isSnowing = true;
        canvas.style.display = 'block';
        toggleBtn.style.opacity = '0.7';
    }

    function resizeCanvas() {
        canvas.width = navbar.offsetWidth;
        canvas.height = navbar.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < numSnowflakes; i++) {
        snowflakes.push(new Snowflake(canvas));
    }

    function animate() {
        if (!isSnowing) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw(ctx);
        });

        animationFrame = requestAnimationFrame(animate);
    }

    toggleBtn.addEventListener('click', () => {
        isSnowing = !isSnowing;
        localStorage.setItem('snowEnabled', isSnowing);
        
        // Remove tooltip on first click
        if (!localStorage.getItem('snowTooltipShown')) {
            tooltip.style.display = 'none';
            localStorage.setItem('snowTooltipShown', 'true');
        }
        
        if (isSnowing) {
            canvas.style.display = 'block';
            toggleBtn.style.opacity = '0.7';
            animate();
        } else {
            canvas.style.display = 'none';
            toggleBtn.style.opacity = '0.5';
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        }
    });

    animate();
}

document.addEventListener('DOMContentLoaded', initSnow);
