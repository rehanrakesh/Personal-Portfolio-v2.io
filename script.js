// Create animated stars
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Matrix rain effect
const canvas = document.createElement('canvas');
canvas.id = 'matrix-canvas';
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height / fontSize;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');

mobileMenuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const nextBtn = document.getElementById('nextBtn');

const sectionOrder = ['profile', 'experience', 'education', 'skills', 'projects', 'certificates', 'v1'];
let currentSectionIndex = 0;

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    const targetNav = document.querySelector(`[data-section="${sectionId}"]`);
    
    if (targetSection && targetNav) {
        targetSection.classList.add('active');
        targetNav.classList.add('active');
        
        currentSectionIndex = sectionOrder.indexOf(sectionId);
        updateNextButton();
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Close mobile menu after selecting a section
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
}

function updateNextButton() {
    if (currentSectionIndex < sectionOrder.length - 1) {
        const nextSection = sectionOrder[currentSectionIndex + 1];
        nextBtn.textContent = `Next: ${nextSection.charAt(0).toUpperCase() + nextSection.slice(1)} →`;
        nextBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'none';
    }
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');
        showSection(sectionId);
    });
});

nextBtn.addEventListener('click', () => {
    if (currentSectionIndex < sectionOrder.length - 1) {
        const nextSection = sectionOrder[currentSectionIndex + 1];
        showSection(nextSection);
    }
});

updateNextButton();

const cards = document.querySelectorAll('.project-card, .cert-card, .timeline-item, .education-item, .skill-category');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Prevent sidebar from staying open when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});