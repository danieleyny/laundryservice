/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')


/*=============== SCROLL REVEAL ANIMATION ===============*/
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Un-comment the line below if you only want the animation to happen once
            // revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // Triggers when 10% of the element is visible
});

revealElements.forEach(el => revealObserver.observe(el));

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 50,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-toggle-right'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-toggle-left' : 'bx-toggle-right'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-toggle-left' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})





 /*=============== QUESTIONS ACCORDION ===============*/
 const accordionItems = document.querySelectorAll('.questions__item')

 accordionItems.forEach((item) =>{
     const accordionHeader = item.querySelector('.questions__header')
 
     accordionHeader.addEventListener('click', () =>{
         const openItem = document.querySelector('.accordion-open')
 
         toggleItem(item)
 
         if(openItem && openItem!== item){
             toggleItem(openItem)
         }
     })
 })
 
 const toggleItem = (item) =>{
     const accordionContent = item.querySelector('.questions__content')
 
     if(item.classList.contains('accordion-open')){
         accordionContent.removeAttribute('style')
         item.classList.remove('accordion-open')
     }else{
         accordionContent.style.height = accordionContent.scrollHeight + 'px'
         item.classList.add('accordion-open')
     }
 
 }
 
/*=============== PDF Download ===============*/
document.addEventListener("DOMContentLoaded", function() {
    const openPDFButton = document.getElementById("openPDF");
  
    openPDFButton.addEventListener("click", function() {
      window.open("Laundry Day.pdf", "_blank");
    });
});


/*=============== SYNCHRONIZED SAVINGS & VFX ANIMATION ===============*/
const DURATION = 2000; // Total time for counter and bars (2 seconds)

const animateVault = () => {
    const startTime = performance.now();
    const counters = document.querySelectorAll('.counter');
    const bars = document.querySelectorAll('.v-bar');
    const character = document.querySelector('.character-wrap');

    // 1. Reset Progress Bars to 0
    bars.forEach(bar => {
        bar.style.transition = 'none';
        bar.style.width = '0%';
    });

    // Force a browser reflow to register the 0% state
    document.body.offsetHeight;

    // 2. Start Neon Bar Growth
    bars.forEach(bar => {
        const cardValue = bar.closest('.v-card').querySelector('.counter').getAttribute('data-target');
        // Use 75% for the $442 bar, otherwise use the percentage target
        const finalWidth = (cardValue === "663") ? "75%" : cardValue + "%";
        
        bar.style.transition = `width ${DURATION}ms linear`;
        bar.style.width = finalWidth;
    });

    // 3. Numerical Counter Loop (High-precision)
    const updateCounter = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const current = target * progress;
            counter.innerText = current.toFixed(target % 1 === 0 ? 0 : 1);
        });

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };
    requestAnimationFrame(updateCounter);

    // 4. Character Pop Animation
    if (character) {
        character.style.transform = 'scale(1.1)';
        setTimeout(() => { character.style.transform = 'scale(1)'; }, 500);
    }

    // 5. Continuous Shooting Coins Loop (Repeating indefinitely every 1.2 seconds)
    setInterval(createShootingCoin, 1500);
};

/*=============== VFX HELPERS (FIREWORKS & COINS) ===============*/
const createShootingCoin = () => {
    const container = document.getElementById('shooting-coins');
    if (!container) return;

    const coin = document.createElement('img');
    coin.src = './assets/img/goldcoin.png';
    coin.className = 'shooting-coin';
    
    const side = Math.random() > 0.5 ? 'left' : 'right';
    const startY = container.offsetHeight + 50; 
    const startX = side === 'left' ? -50 : container.offsetWidth + 50;
    
    const travelX = side === 'left' ? (Math.random() * 300 + 200) : -(Math.random() * 300 + 200);
    const travelY = -(Math.random() * 400 + 400); 

    coin.style.left = `${startX}px`;
    coin.style.top = `${startY}px`;
    coin.style.setProperty('--x', `${travelX}px`);
    coin.style.setProperty('--y', `${travelY}px`);
    
    // SLOWED DOWN: Increased from 1800ms to 3000ms
    const flightTime = 3000; 
    coin.style.animation = `shoot ${flightTime}ms cubic-bezier(0.25, 1, 0.5, 1) forwards`;
    container.appendChild(coin);

    setTimeout(() => {
        createFirework(startX + travelX, startY + travelY);
        coin.remove(); 
    }, flightTime);
};

const createFirework = (x, y) => {
    const container = document.getElementById('shooting-coins');
    const particleCount = 35; // Dense explosion for firework effect
    const colors = ['#ffd700', '#ffae00', '#ffffff', '#ffed4a'];

    for (let i = 0; i < particleCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'firework-spark';
        
        // Radial explosion math
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 180 + 70;
        const ex = Math.cos(angle) * velocity;
        const ey = Math.sin(angle) * velocity;

        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        spark.style.setProperty('--ex', `${ex}px`);
        spark.style.setProperty('--ey', `${ey}px`);
        
        container.appendChild(spark);
        
        // Cleanup particles after they fade
        setTimeout(() => spark.remove(), 1000);
    }
};

/*=============== VAULT OBSERVER ===============*/
const vaultSection = document.querySelector('#savings-impact');
if (vaultSection) {
    const vaultObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateVault();
                vaultObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    vaultObserver.observe(vaultSection);
}





/*=============== LIFETIME IMPACT OBSERVER ===============*/
const impactSection = document.querySelector('#lifetime-impact');

const animateImpact = (section) => {
    const counters = section.querySelectorAll('.counter');
    const DURATION = 2000;
    const startTime = performance.now();

    const updateCounter = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const current = Math.floor(target * progress);
            // Format with commas for large numbers
            counter.innerText = current.toLocaleString();
        });

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };
    requestAnimationFrame(updateCounter);
};

if (impactSection) {
    const impactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateImpact(entry.target);
                impactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    impactObserver.observe(impactSection);
}