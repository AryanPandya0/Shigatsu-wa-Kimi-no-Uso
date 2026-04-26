// Using a public domain classical piece for the placeholder background
// Chopin - Nocturne op.9 No.2 (Standard romantic piano piece)
const bgMusic = new Howl({
    src: ['https://upload.wikimedia.org/wikipedia/commons/3/33/Fr%C3%A9d%C3%A9ric_Chopin_-_Nocturne_op._9_no._2_in_E_flat_major.ogg'], 
    loop: true,
    volume: 0.3, 
    html5: true 
});

const performanceMusic = new Howl({
    src: ['https://upload.wikimedia.org/wikipedia/commons/7/7b/Chopin_-_Ballade_No._1_in_G_Minor%2C_Op._23.ogg'], 
    volume: 0.5,
    html5: true
});

let isMuted = true; // Start muted usually for browser autoplay policies
let isPerformancePlaying = false;

const toggleBtn = document.getElementById('toggleAudio');
const iconUnmute = document.getElementById('icon-unmute');
const iconMute = document.getElementById('icon-mute');

// Play button for specific music experience
const playThemeBtn = document.getElementById('playTheme');
const audioVisualizer = document.getElementById('audioVisualizer');

// Try autoplay
window.addEventListener('load', () => {
    // Browsers block autoplay unless muted or interacted with.
    // We will wait for first interaction to start audio.
});

function initAudio() {
    if (!bgMusic.playing()) {
        bgMusic.play();
    }
}

// Global Interaction unlocking Audio Context
document.body.addEventListener('click', () => {
    if(Howler.ctx && Howler.ctx.state === 'suspended') {
        Howler.ctx.resume();
    }
}, { once: true });


toggleBtn.addEventListener('click', () => {
    // First interaction might be this button
    initAudio();

    if (isMuted) {
        Howler.mute(false);
        isMuted = false;
        iconMute.style.display = 'none';
        iconUnmute.style.display = 'block';
    } else {
        Howler.mute(true);
        isMuted = true;
        iconUnmute.style.display = 'none';
        iconMute.style.display = 'block';
    }
});

// Music Section interaction
if(playThemeBtn) {
    playThemeBtn.addEventListener('click', () => {
        if (!isPerformancePlaying) {
            bgMusic.fade(0.3, 0.0, 1000); // Fade out background
            setTimeout(() => performanceMusic.play(), 1000);
            isPerformancePlaying = true;
            
            // Visual feedback
            playThemeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M6 5H10V19H6V5ZM14 5H18V19H14V5Z"/></svg>'; // Pause icon
            audioVisualizer.classList.add('active');
            startVisualizer();
        } else {
            performanceMusic.pause();
            bgMusic.fade(0.0, 0.3, 1000); // Fade back in background
            isPerformancePlaying = false;
            
            // Revert icon
            playThemeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M8 5V19L19 12L8 5Z"/></svg>'; // Play icon
            audioVisualizer.classList.remove('active');
            stopVisualizer();
        }
    });
}

// Simple Fake Visualizer Animation
let visualizerInterval;
function startVisualizer() {
    const bars = audioVisualizer.querySelectorAll('.bar');
    visualizerInterval = setInterval(() => {
        bars.forEach(bar => {
            let ht = 10 + Math.random() * 40; // 10px to 50px
            bar.style.height = `${ht}px`;
        });
    }, 150);
}

function stopVisualizer() {
    clearInterval(visualizerInterval);
    const bars = audioVisualizer.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.height = `10px`;
    });
}
