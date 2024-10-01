/*====== Mostrar Menu ======*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== Menu visible =====*/
/* Valida si la constante existe */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== Menu no visible =====*/
/* Valida si la constante existe */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*====== Quitar Menu de Movil ======*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    //Cuando nosotros hacemos click en nav__link, quitamos la calse show-menu
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*====== Cambiar fondo del menú ======*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    //When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header')
        : header.classList.remove('bg-header')
}

window.addEventListener('scroll', scrollHeader)


/*======== Scroll Sections Active Link ========*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*====== Show Scroll Up ======*/
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag whit the scrollup
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*====== SCROLL REVEAL ANIMATION ======*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`, {delay: 700, origin: 'bottom'})
sr.reveal(`.logos__img, .program__card, .pricing__card`, {interval: 100})
sr.reveal(`.choose__img, .calculate__content`, {origin: 'left'})
sr.reveal(`.choose__content, .calculate__img`, {origin: 'right'})

/*====== Calculate JS ======*/
const calculateForm = document.getElementById('calculate-form'),
    calculateCm = document.getElementById('calculate-cm'),
    calculateKg = document.getElementById('calculate-kg'),
    calculateMessage = document.getElementById('calculate-message')

const calculateBmi = (e) => {
    e.preventDefault()

    //Check if the fields have a value
    if (calculateCm.value === '' || calculateKg.value == '') {
        //Add and remove color
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')

        //Show message
        calculateMessage.textContent = 'Fill in the Height and Weight 👨‍💻👩‍💻'

        //Remove message three seconds
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 3000)
    } else {
        //BMI formula
        const cm = calculateCm.value / 100,
            kg = calculateKg.value,
            bmi = Math.round(kg / (cm * cm))


        calculateMessage.classList.remove('color-red')
        //Show your health status
        if (bmi < 18.5) {
            //Add color and display message
            // calculateMessage.classList.add('color-green')
            calculateMessage.classList.add('color-red')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny 😔`
        } else if (bmi < 25) {
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are healthy 🥳`
        } else if (bmi < 30) {
            // calculateMessage.classList.add('color-green')
            calculateMessage.classList.add('color-red')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are overweight 😔`
            // propio desde la linea 87 a 96
        } else if (bmi < 35) {
            // calculateMessage.classList.add('color-green')
            calculateMessage.classList.add('color-red')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are obese 😬`
        } else {
            // calculateMessage.classList.add('color-green')
            calculateMessage.classList.add('color-red')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are extremely obese 😱, you definitely need us`
        }

        //To clear the input field
        calculateCm.value = ''
        calculateKg.value = ''

        //Remove message four seconds 
        /* Arreglar, cuando haces el bmi muy seguido el tiempo no se resetea y se desaparece rapido */
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 4000)
    }
}

calculateForm.addEventListener('submit', calculateBmi)

/*====== Email JS ======*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message'),
    contactUser = document.getElementById('contact-user')

const sendEmail = (e) => {
    e.preventDefault()

    // Verificar si el campo tiene algun valor
    if (contactUser.value == '') {
        // Añade y remueve el color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')

        // Mostrar el mensaje
        contactMessage.textContent = 'You must enter your email ☝'

        // Borra el mensaje despues de 3 segundos
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 3000)
    } else {
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_wgvdw6d', 'template_p3p7w1s', '#contact-form', 'NmY15ZwhJ5SLy4zBH')
            .then(() => {
                // Muestra el mensaje y añade el color
                contactMessage.classList.remove('color-red')
                contactMessage.classList.add('color-green')
                contactMessage.textContent = 'You registered sucessfully 💪🤜🤛'

                // Borra el mensaje despues de 3 segundos
                setTimeout(() => {
                    contactMessage.textContent = ''
                }, 3000)
            }, (error) =>{
                //Error al enviar el mensaje
                alert('OOPS! SOMETHING HAS FAILED...', error)
            })
        // Limpiamos el campo de entrada
        contactUser.value = ''
    }
}

contactForm.addEventListener('submit', sendEmail)