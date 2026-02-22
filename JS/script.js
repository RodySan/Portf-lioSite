// Register Plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initCursor();
    initMagnetic();
    initTypewriter();
    initScrollAnimations();
});

// 1. LOADER ANIMATION
function initLoader() {
    const tl = gsap.timeline();
    
    tl.to(".word", {
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power4.out"
    });

    tl.to(".loader__bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    }, "-=0.2");

    tl.to(".loader", {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut"
    });

    tl.from(".hero__text .line", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out"
    }, "-=0.5");
}

// 2. CUSTOM CURSOR
function initCursor() {
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(follower, {
            x: e.clientX - 20,
            y: e.clientY - 20,
            duration: 0.3
        });
    });

    // Hover links
    document.querySelectorAll("a, .magnetic").forEach(el => {
        el.addEventListener("mouseenter", () => {
            gsap.to(follower, { scale: 2.5, backgroundColor: "rgba(255,255,255,0.1)", duration: 0.3 });
        });
        el.addEventListener("mouseleave", () => {
            gsap.to(follower, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
        });
    });
}

// 3. MAGNETIC EFFECT
function initMagnetic() {
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach((m) => {
        m.addEventListener('mousemove', function(e) {
            const bound = this.getBoundingClientRect();
            const strength = this.getAttribute('data-strength') || 20;
            const x = (e.clientX - bound.left - bound.width / 2) * (strength / 100);
            const y = (e.clientY - bound.top - bound.height / 2) * (strength / 100);
            
            gsap.to(this, { x: x, y: y, duration: 0.6, ease: "power2.out" });
        });
        m.addEventListener('mouseleave', function() {
            gsap.to(this, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        });
    });
}

// 4. TYPEWRITER
function initTypewriter() {
    const words = ["Game Designer.", "Lead Producer.", "Sound Artist.", "Pianist."];
    let mainTl = gsap.timeline({ repeat: -1 });

    words.forEach(word => {
        let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1.5 });
        tl.to("#typewriter", { duration: 1, text: word, ease: "none" });
        mainTl.add(tl);
    });
}

// 5. SCROLL TRIGGERS
function initScrollAnimations() {
    // Parallax Imagem About
    gsap.to(".parallax-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: ".about",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Reveal Elements on Scroll
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });

    // Project Stagger Reveal
    gsap.from(".project-item", {
        scrollTrigger: {
            trigger: ".projects",
            start: "top 80%"
        },
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
    });
}