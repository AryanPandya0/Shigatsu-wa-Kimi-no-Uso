// Main entry script
document.addEventListener('DOMContentLoaded', () => {
    console.log("Your Lie in April Tribute Loaded");

    // Start background fade in
    document.body.style.opacity = '1';

    // Refresh ScrollTrigger to ensure accurate calculations after images load
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
});
