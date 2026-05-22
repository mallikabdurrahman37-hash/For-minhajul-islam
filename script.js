// Purana code hata kar ye Naya iOS Premium JS code daalein

// 1. Dynamic Premium CSS for Slide & Fade Effect
const iosStyles = document.createElement('style');
iosStyles.innerHTML = `
    /* Scroll band karna aur screen fix karna */
    body, html {
        overflow: hidden;
        height: 100%;
    }
    .main-container {
        height: 100vh;
        justify-content: center;
        position: relative;
    }
    /* Scroll wale dividers hide kar do */
    .luxury-divider {
        display: none !important;
    }
    
    /* Premium iOS Slide Classes */
    .ios-section {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        padding: 20px;
        transform: translate(-50%, -40%) scale(0.95);
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1); /* iOS Smooth Spring Effect */
        text-align: center;
    }
    .ios-section.active {
        display: block;
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    .ios-section.exit {
        transform: translate(-50%, -60%) scale(0.95);
        opacity: 0;
    }
    
    /* Tap Indicator styling */
    .tap-indicator {
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Montserrat', sans-serif;
        font-size: 10px;
        letter-spacing: 3px;
        color: var(--rose-gold-dark);
        text-transform: uppercase;
        animation: pulse 2s infinite ease-in-out;
        pointer-events: none;
        z-index: 100;
        white-space: nowrap;
    }
    @keyframes pulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(iosStyles);

document.addEventListener("DOMContentLoaded", () => {
    // 2. Teeno main sections ko select karna
    const sections = [
        document.querySelector('.hero-section'),
        document.querySelector('.wish-section'),
        document.querySelector('.tribute-section')
    ];

    // Sabhi par iOS class lagana
    sections.forEach(sec => sec.classList.add('ios-section'));

    // 3. Tap to continue wala hint add karna
    const tapIndicator = document.createElement('div');
    tapIndicator.className = 'tap-indicator';
    tapIndicator.innerText = 'Tap anywhere to continue';
    document.body.appendChild(tapIndicator);

    let currentIndex = 0;
    let isAnimating = false;

    // 4. Pehla section show karna
    setTimeout(() => {
        sections[0].style.display = 'block';
        // Thoda delay taaki transition smooth ho
        setTimeout(() => sections[0].classList.add('active'), 50);
    }, 100);

    // 5. Screen par Click/Tap handle karna
    document.body.addEventListener('click', () => {
        // Agar animation chal rahi hai ya aakhiri slide hai, toh click ignore karo
        if (isAnimating || currentIndex >= sections.length - 1) return;
        
        isAnimating = true;

        // Current slide ko bahar bhejo (Fade out & up)
        sections[currentIndex].classList.remove('active');
        sections[currentIndex].classList.add('exit');

        setTimeout(() => {
            sections[currentIndex].style.display = 'none';
            currentIndex++;

            // Nayi slide ko andar lao
            sections[currentIndex].style.display = 'block';
            sections[currentIndex].classList.remove('exit');
            
            setTimeout(() => {
                sections[currentIndex].classList.add('active');
                isAnimating = false;
            }, 50);

            // Aakhiri section par "Tap to continue" text hide kar do
            if (currentIndex === sections.length - 1) {
                tapIndicator.style.opacity = '0';
                setTimeout(() => tapIndicator.remove(), 500);
            }
        }, 600); // Ye time CSS transition ke time se match hona chahiye
    });
});
