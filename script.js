/* ============================================
   Valentine's Day Website JavaScript (updated)
   - Each NO message shows a different personal photo
   - Photo is larger for visibility
   - Messages last 3 seconds
   ============================================ */

// ============ DOM Elements ============
const introScreen = document.getElementById('introScreen');
const questionScreen = document.getElementById('questionScreen');
const startBtn = document.getElementById('startBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

// ============ Playful Messages for NO Button ============
const playfulMessages = [
    'HUH? BAKIT AYAW MO 🥺',
    'LUH! ANGAS MO PALA 😭',
    'NAGAGALIT NA KO MICHELLE ANN!!!',
    'PLS NAMAN OH🥺🙏',
    'ARAY MO KAWAWA E 🥹',
    'SAKIT MO BES',
    'SINASAKTAN MO TALAGA KO BE',
    'SIGE IIYAK AKO RITO',
];

// ============ Personal Photos for NO Button ============
// Put your personal photos in the project (e.g. VALENTINES/assets/)
// Replace the example paths below with your actual file names.
const PERSONAL_PHOTOS = [
    'huh.jpg',
    'luh.jpg',
    'galit.jpg',
    'pls.jpg',
    'HEHE.jpg',
    'MWE.jpg',
    'ble.jpg',
];

// Fallback remote images if PERSONAL_PHOTOS is empty
const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516802273409-68a78e52e71f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
];

// Prepare shuffled photo pool so each message shows a different photo until exhausted
let photoPool = shuffleArray([... (PERSONAL_PHOTOS.length ? PERSONAL_PHOTOS : FALLBACK_IMAGES) ]);

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getNextPhoto() {
    if (photoPool.length === 0) {
        photoPool = shuffleArray([... (PERSONAL_PHOTOS.length ? PERSONAL_PHOTOS : FALLBACK_IMAGES) ]);
    }
    return photoPool.pop();
}

// ============ Screen Navigation ============
startBtn && startBtn.addEventListener('click', () => {
    introScreen.classList.remove('active');
    setTimeout(() => {
        questionScreen.classList.add('active');
    }, 100);
});

// ============ YES Button Handler ============
yesBtn && yesBtn.addEventListener('click', () => {
    successModal.classList.add('active');
    createConfetti();
});

// ============ NO Button Handler (Playful) ============
if (noBtn) {
    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });
}

function moveNoButton() {
    const padding = 20;
    const maxX = Math.max(window.innerWidth - 150, 100);
    const maxY = Math.max(window.innerHeight - 80, 100);

    const randomX = Math.random() * (maxX - padding);
    const randomY = Math.random() * (maxY - padding);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    showPlayfulMessage();
}

function showPlayfulMessage() {
    const randomMessage = playfulMessages[Math.floor(Math.random() * playfulMessages.length)];
    showFloatingMessage(randomMessage);
}

/**
 * Creates a temporary floating message near the NO button.
 * Uses getNextPhoto() so each message has a different photo.
 * Message + photo visible for 3 seconds.
 */
function showFloatingMessage(message) {
    if (!noBtn) return;
    const rect = noBtn.getBoundingClientRect();

    const floatingMsg = document.createElement('div');
    floatingMsg.className = 'floating-msg';

    // Position to right of button if space, otherwise to left
    const approxWidth = 320;
    const spaceRight = window.innerWidth - rect.right;
    const leftPos = (spaceRight > approxWidth + 12) ? (rect.right + 12) : Math.max(rect.left - 12 - approxWidth, 8);
    const topPos = Math.max(rect.top - 8, 8);

    Object.assign(floatingMsg.style, {
        position: 'fixed',
        left: leftPos + 'px',
        top: topPos + 'px',
        background: '#fff',
        color: '#e91e63',
        padding: '0.5rem 0.6rem',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        boxShadow: '0 8px 26px rgba(0,0,0,0.14)',
        zIndex: '9999',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        minWidth: '180px',
        maxWidth: '360px',
        animation: 'fadeOut 1.5s ease-out forwards', // changed from 3s to 1.5s
    });

    // image element — larger for visibility
    const img = document.createElement('img');
    img.src = getNextPhoto();
    img.alt = 'Personal photo (replace personal photo paths in script.js)';
    Object.assign(img.style, {
        width: '96px',            // larger image
        height: '96px',
        objectFit: 'cover',
        borderRadius: '10px',
        flexShrink: '0',
        border: '2px solid rgba(233,30,99,0.08)',
        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
    });

    const text = document.createElement('div');
    text.textContent = message;
    Object.assign(text.style, {
        color: '#e91e63',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '200px',
        lineHeight: '1.2',
        fontSize: '0.95rem',
    });

    floatingMsg.appendChild(img);
    floatingMsg.appendChild(text);
    document.body.appendChild(floatingMsg);

    // remove after 1.5 seconds (was 3000 ms)
    setTimeout(() => {
        if (floatingMsg && floatingMsg.parentNode) floatingMsg.remove();
    }, 1500);
}

// ============ Modal Close Handler ============
closeModal && closeModal.addEventListener('click', () => {
    successModal.classList.remove('active');
});
successModal && successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// ============ Confetti Animation ============
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    if (!confettiContainer) return;
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        const colors = ['#ff69b4', '#e91e63', '#ff1493', '#ffc0cb', '#ffe4e1'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.background = randomColor;
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        const tx = (Math.random() - 0.5) * 300;
        confetti.style.setProperty('--tx', tx + 'px');
        confetti.style.transform = `rotateZ(${Math.random() * 360}deg)`;
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// ============ CSS Animation Injection ============
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0px);
        }
        90% {
            opacity: 1;
            transform: translateY(0px);
        }
        100% {
            opacity: 0;
            transform: translateY(-12px);
        }
    }
`;
document.head.appendChild(style);

// ============ Keyboard Navigation ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (introScreen && introScreen.classList.contains('active')) {
            startBtn && startBtn.click();
        } else if (questionScreen && questionScreen.classList.contains('active')) {
            yesBtn && yesBtn.click();
        }
    }
    if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
        closeModal && closeModal.click();
    }
});

// ============ Accessibility Improvements ============
const buttons = document.querySelectorAll('.btn');
buttons.forEach((btn) => {
    btn.addEventListener('focus', function () {
        this.style.outline = '3px solid #ff69b4';
        this.style.outlineOffset = '2px';
    });
    btn.addEventListener('blur', function () {
        this.style.outline = 'none';
    });
});
