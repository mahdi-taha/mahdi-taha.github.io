document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('page-loader');

    loader.classList.add('loader-hidden');

    setTimeout(function () {
        loader.remove();
    }, 500);
});

const navbar = document.querySelector('.portfolio-navbar');
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const navbarLinks = document.querySelectorAll(
    '.navbar-menu a[href^="#"]'
);

/*
 * Mobile menu
 */
navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});


/*
 * Navbar background after scroll
 */
function updateNavbarBackground() {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbarBackground);
updateNavbarBackground();


/*
 * Active navigation section
 */
const sections = document.querySelectorAll(
    'section[id]'
);

function updateActiveNavigation() {
    const scrollPosition =
        window.scrollY + navbar.offsetHeight + 120;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }
    });

    navbarLinks.forEach(link => {
        link.classList.remove('active');

        const href = link.getAttribute('href');

        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavigation);
window.addEventListener('resize', updateActiveNavigation);

updateActiveNavigation();


/*
 * Scroll reveal
 */
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-enabled');

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');

                    /*
                     * Animate only once.
                     */
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}
document.addEventListener('DOMContentLoaded', function () {

    const hero = document.querySelector('.hero-section');
    const frame = document.querySelector('.hero-image-frame');

    if (!hero || !frame) {
        return;
    }

    hero.addEventListener('mousemove', function (event) {

        const rect = hero.getBoundingClientRect();

        const mouseX =
            (event.clientX - rect.left) / rect.width;

        const mouseY =
            (event.clientY - rect.top) / rect.height;


        /*
         * Convert 0 → 1
         * into -1 → +1
         */

        const x = (mouseX - 0.5) * 2;
        const y = (mouseY - 0.5) * 2;


        /*
         * Movement strength
         *
         * Increase these if you want
         * the effect more noticeable.
         */

        const moveX = x * 10;
        const moveY = y * 7;


        frame.style.setProperty(
            '--mouse-x',
            moveX + 'px'
        );

        frame.style.setProperty(
            '--mouse-y',
            moveY + 'px'
        );
    });


    hero.addEventListener('mouseleave', function () {

        frame.style.setProperty(
            '--mouse-x',
            '0px'
        );

        frame.style.setProperty(
            '--mouse-y',
            '0px'
        );
    });

});
