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





/*=============== File Submission ===============*/

document.addEventListener("DOMContentLoaded", function() {
    const dropContainer = document.querySelector('.drop-container');
    const input = document.querySelector('.drop-container input');
    const maxFileSize = 5 * 1024 * 1024; // 5MB limit
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Add allowed file types

    dropContainer.addEventListener('click', () => {
        input.click();
    });

    input.addEventListener('change', () => {
        const file = input.files[0];
        
        if (file) {
            if (!allowedTypes.includes(file.type)) {
                alert("Invalid file type. Only JPEG, PNG, and PDF files are allowed.");
                input.value = ""; // Clear the input
                dropContainer.querySelector('.drop-title').textContent = "Click to upload";
                return;
            }

            if (file.size > maxFileSize) {
                alert("File size exceeds 5MB. Please upload a smaller file.");
                input.value = ""; // Clear the input
                dropContainer.querySelector('.drop-title').textContent = "Click to upload";
                return;
            }

            dropContainer.querySelector('.drop-title').textContent = 'Uploaded!';
        }
    });
});
