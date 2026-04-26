// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initial Load Animation (Hero)
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to('.fade-up', {
        y: 0,
        opacity: 1,
        visibility: 'visible',
        duration: 2,
        stagger: 0.5,
        ease: 'power3.out'
    });
});

// Story Section - Scroll Text Fades
gsap.utils.toArray('.fade-scroll').forEach(elem => {
    gsap.to(elem, {
        scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        visibility: 'visible',
        duration: 1.5,
        ease: 'power2.out'
    });
});

// Background Theme Shifts based on scroll position
ScrollTrigger.create({
    trigger: '#story',
    start: 'top 50%',
    onEnter: () => gsap.to('.sky-background', { background: 'linear-gradient(to bottom, #a8d8ea, #d5c6e0)' }),
    onLeaveBack: () => gsap.to('.sky-background', { background: 'linear-gradient(to bottom, #f7c6d9, #a8d8ea)' })
});

ScrollTrigger.create({
    trigger: '#music',
    start: 'top 50%',
    onEnter: () => gsap.to('.sky-background', { background: 'linear-gradient(to bottom, #d5c6e0, #fff3b0)' }),
    onLeaveBack: () => gsap.to('.sky-background', { background: 'linear-gradient(to bottom, #a8d8ea, #d5c6e0)' })
});

ScrollTrigger.create({
    trigger: '#finale',
    start: 'top 50%',
    onEnter: () => gsap.to('.sky-background', { background: 'linear-gradient(to bottom, #ffffff, #fff3b0)', opacity: 0.9 }),
    onLeaveBack: () => gsap.to('.sky-background', { background: 'linear-gradient(to bottom, #d5c6e0, #fff3b0)', opacity: 0.6 })
});

// Typewriter Effect for Quotes
const typeWriterElement = document.getElementById('typewriter-1');
if (typeWriterElement) {
    const textStr = typeWriterElement.innerText;
    typeWriterElement.innerText = '';
    typeWriterElement.style.opacity = '1';
    typeWriterElement.style.visibility = 'visible';
    
    // We recreate it char by char
    const chars = textStr.split('');
    chars.forEach(char => {
        let span = document.createElement('span');
        span.innerText = char;
        span.style.opacity = '0';
        typeWriterElement.appendChild(span);
    });

    gsap.to(typeWriterElement.querySelectorAll('span'), {
        scrollTrigger: {
            trigger: '#quotes',
            start: 'top 50%',
            toggleActions: 'play none none none' // Play once
        },
        opacity: 1,
        stagger: 0.05,
        duration: 0.1,
        ease: 'none'
    });
}

// Finale Letter Typewriter Effect
const finalLetterBox = document.getElementById('finalLetter');
if (finalLetterBox) {
    const paragraphs = Array.from(finalLetterBox.querySelectorAll('p'));
    
    paragraphs.forEach(p => {
        gsap.set(p, { opacity: 0, y: 20 });
        
        gsap.to(p, {
            scrollTrigger: {
                trigger: '#finale',
                start: 'top 30%',
                toggleActions: 'play none none none' 
            },
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 1.5, // Time between paragraphs
            ease: 'power1.inOut',
            delay: paragraphs.indexOf(p) * 2 // Manual stagger spacing
        });
    });
}

// Final 'Thank You' 
gsap.to('.final-thank-you', {
    scrollTrigger: {
        trigger: '#finale',
        start: 'top top',
        toggleActions: 'play none none reverse'
    },
    opacity: 1,
    duration: 5, // Very slow fade
    delay: 10 // Wait for letter to finish
});
