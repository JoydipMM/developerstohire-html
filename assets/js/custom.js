jQuery(function () {
    AOS.init({
        duration: 2000,
        once: false,
        offset: 120,
        easing: "ease-in-out",
        mirror: false,
    });
});

// Header sticky start
jQuery(document).ready(function (e) {
    let lastScroll = 0;
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        let currentScroll = window.pageYOffset;
        // scroll down
        if (currentScroll > lastScroll) {
            header.classList.add("hide");
            header.classList.remove("active-header");
        }
        // scroll up
        else {
            header.classList.remove("hide");
            // add bg color class when scrolling up
            if (currentScroll > 50) {
                header.classList.add("active-header");
            } else {
                header.classList.remove("active-header");
            }
        }
        lastScroll = currentScroll;
    });
});

/* DropDown Button Open */
jQuery(document).ready(function (e) {
    function t(t) {
        e(t).bind("click", function (t) {
            t.preventDefault();
            e(this).parent().fadeOut()
        })
    }
    e(".dropdown-btn .btn-fill").click(function () {
        var t = e(this).parents(".button-dropdown").children(".dropdown-btn ul").is(":hidden");
        e(".dropdown-btn ul").hide();
        e(".dropdown-btn .btn-fill").removeClass("active");
        if (t) {
            e(this).parents(".button-dropdown").children(".dropdown-btn ul").toggle().parents(".button-dropdown").children(".dropdown-btn .btn-fill").addClass("active")
        }
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".dropdown-btn ul").hide();
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".dropdown-btn .btn-fill").removeClass("active");
    })
});
/* DropDown Button Close */

/* Form Section Style Open */
jQuery('input,textarea,select').val("");
jQuery('.form-control, input, select, textarea').focusout(function () {
    var text_val = $(this).val();
    if (text_val === "") {
        console.log("empty!");
        $(this).removeClass('has-value');
    } else {
        $(this).addClass('has-value');
    }
});
/* Form Section Style Close */

/* Footer Dropdown Open */
const accordions = document.querySelectorAll(".footer-accordion-menu");
accordions.forEach(item => {
    const button = item.querySelector(".accordion-buuton-footer");
    button.addEventListener("click", () => {
        // Only Mobile
        if (window.innerWidth <= 991) {
            item.classList.toggle("active");
        }
    });
});
/* Footer Dropdown Close */

// Logo Scroller Start //
jQuery(document).ready(function () {
    jQuery('.logo-scroller').owlCarousel({
         loop: true,
        margin: 10,
        nav: false,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        freeDrag: false,
        autoplay: true,
        autoplaySpeed: 1500,
        slideTransition: 'linear',
        responsive: {
            0: {
                items: 2,
                autoplay: true,
            },
            480: {
                items: 2.5,
                autoplay: true,
            },
            600: {
                items: 3,
                autoplay: true,
            },
            1000: {
                items: 8
            }
        }
    });
});
// Logo Scroller End //

const counters = document.querySelectorAll(".counter-number");
function startCounter(counter) {
    const target = parseInt(counter.dataset.count);
    const duration = parseInt(counter.dataset.duration) || 2000;
    const sign = counter.dataset.sign || "+";
    let start = 0;
    let startTime = null;
    function animateCounter(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }
        const progress = timestamp - startTime;
        const value = Math.min(
            Math.floor((progress / duration) * target),
            target
        );
        counter.innerText = value + sign;
        if (progress < duration) {
            requestAnimationFrame(animateCounter);
        } else {
            counter.innerText = target + sign;
        }
    }
    requestAnimationFrame(animateCounter);
}
/* =========================
   INTERSECTION OBSERVER
========================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});
counters.forEach(counter => {
    observer.observe(counter);
});
// COUNTER SECTION END //

// Solutions Designed Start //
jQuery(document).ready(function () {
    
    jQuery('.case-study-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        items: 1,
        smartSpeed: 800,
        navText: [
            '<img src="assets/icons/NewArrowLeftSmall.svg" alt="Left">',
            '<img src="assets/icons/NewArrowRightSmall.svg" alt="Right">'
        ]
    });
});
// Solutions Designed End //

/* matrix growth network and testimonial section script start */
jQuery(document).ready(function () {
    /* ---------- Intersection Observer: Growth Framework Section ---------- */
    const $growthSection = $('#growth-framework');
    if ($growthSection.length) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('in-view');
                        // Animate progress line to each dot
                        animateProgressLine();
                    } else {
                        $(entry.target).removeClass('in-view');
                        // Reset progress line
                        const $timeline = $('.growth-timeline');
                        if ($timeline.length) {
                            $timeline[0].style.setProperty('--progress-width', '0px');
                        }
                    }
                });
            },
            {
                threshold: 0.2
            }
        );
        observer.observe($growthSection[0]);
    }
    /* ---------- Progress Line Animation ---------- */
    function animateProgressLine() {
        const $timeline = $('.growth-timeline');
        const $items = $('.growth-timeline-item');

        if (!$timeline.length || !$items.length) return;
        const isMobile = window.innerWidth <= 991;
        var delays = [0, 1000, 2000, 3000, 4000, 5000];
        $items.each(function (index) {
            var delay = delays[index] || 0;
            setTimeout(() => {
                if (isMobile) {
                    const $dot = $(this).find('.timeline-dot');
                    const dotTop =
                        $dot.offset().top -
                        $timeline.offset().top +
                        ($dot.outerHeight() / 2);
                    $timeline[0].style.setProperty(
                        '--progress-height',
                        dotTop + 'px'
                    );
                } else {
                    let widthPx;
                    if (index === $items.length - 1) {
                        widthPx = $(window).width();
                    } else {
                        const $dot = $(this).find('.timeline-dot');
                        widthPx =
                            $dot.offset().left +
                            ($dot.outerWidth() / 2);
                    }
                    $timeline[0].style.setProperty(
                        '--progress-width',
                        widthPx + 'px'
                    );
                }
            }, delay);
        });
    }
    /* ---------- Testimonial Slider (Owl Carousel) ---------- */
    if ($('.testimonial-carousel').length) {
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            items: 1,
            navText: [
                '<img src="assets/icons/NewArrowLeftSmall.svg" alt="Left">',
                '<img src="assets/icons/NewArrowRightSmall.svg" alt="Right">'
            ],
            autoplay: false,
            smartSpeed: 800
        });
    }
});
/* matrix growth network and testimonial section script ended */

/* faq ui start */
(function () {
    const container = document.querySelector('.faq-accordion');
    if (!container) return;
    const items = Array.from(container.querySelectorAll('.faq-item'));

    // initialize closed
    items.forEach(item => {
        const q = item.querySelector('.faq-question');
        const p = item.querySelector('.faq-answer');
        if (q) { q.classList.remove('active'); q.setAttribute('aria-expanded', 'false'); }
        if (p) { p.style.maxHeight = null; p.setAttribute('aria-hidden', 'true'); }
        const toggle = q && q.querySelector('.faq-toggle'); if (toggle) toggle.textContent = '▼';
    });
    // delegate clicks
    container.addEventListener('click', function (e) {
        const btn = e.target.closest('.faq-question');
        if (!btn || !container.contains(btn)) return;
        e.preventDefault();
        const item = btn.closest('.faq-item');
        const panel = item.querySelector('.faq-answer');
        const isActive = btn.classList.contains('active');
        // close all
        items.forEach(it => {
            const b = it.querySelector('.faq-question');
            const p = it.querySelector('.faq-answer');
            const t = b && b.querySelector('.faq-toggle');
            if (b) { b.classList.remove('active'); b.setAttribute('aria-expanded', 'false'); }
            if (p) { p.style.maxHeight = null; p.setAttribute('aria-hidden', 'true'); }
            if (t) t.textContent = '▼';
        });
        // open clicked if it was closed
        if (!isActive) {
            btn.classList.add('active');
            if (panel) { panel.style.maxHeight = panel.scrollHeight + 'px'; panel.setAttribute('aria-hidden', 'false'); }
            const toggle = btn.querySelector('.faq-toggle'); if (toggle) toggle.textContent = '▲';
            btn.setAttribute('aria-expanded', 'true');
        }
    });
})();
/* faq ui ended */

/* Aos Open */
$(window).on('load', function () {
    setTimeout(function () {
        AOS.refreshHard();
    }, 500);
});
/* Aos Close */

// File upload
jQuery(document).ready(function () {
    // Handle file input change
    const fileInput = document.getElementById('cv-upload');
    const fileNameSpan = document.getElementById('file-name');

    if (fileInput && fileNameSpan) {
        fileInput.addEventListener('change', function () {
            if (this.files && this.files.length > 0) {
                fileNameSpan.textContent = this.files[0].name;
            } else {
                fileNameSpan.textContent = 'Choose file & Upload CV*';
            }
        });

        // Also handle click on label to ensure file dialog opens
        const uploadBox = document.querySelector('.upload-box');
        if (uploadBox) {
            uploadBox.addEventListener('click', function (e) {
                if (e.target !== fileInput) {
                    fileInput.click();
                }
            });
        }
    }
});

/* Back To Top Open */
jQuery(document).ready(function ($) {
    var $backToTop = $('#backToTop');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $backToTop.addClass('show');
        } else {
            $backToTop.removeClass('show');
        }
    });
    $backToTop.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 700);
    });
});
/* Back To Top Close */

/* header mobile menu script start */
(()=>{
    const hdrMobileBurgerButton = document.querySelector('.mobile-toggle');
    const hdrMobileMenu = document.querySelector('.nav-menu');
    const htmlTag = document.querySelector('html');

    hdrMobileBurgerButton.addEventListener('click', () => {
        hdrMobileBurgerButton.classList.toggle('active');
        hdrMobileMenu.classList.toggle('active');
        htmlTag.classList.toggle('noscroll');
    });
})();
/* header mobile menu script ended */


/* suffle card script start */
function suffleCards() {
    const cards = document.querySelectorAll('.desktop-view .slide_card');
    const dots = document.querySelectorAll('.solution_card_nav_dot_list li');
    const navRow = document.querySelector('.slide_cardes_nav_row');
    if (cards.length > 0) {
        let activeIndex = 0;
        let autoSlideTimer = null;

        function updateClasses() {
            cards.forEach(card => card.className = 'slide_card'); // reset all
            dots.forEach(dot => dot.classList.remove('active'));

            const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
            const nextIndex = (activeIndex + 1) % cards.length;

            cards[activeIndex].classList.add('active');
            cards[nextIndex].classList.add('right-bottom');
            cards[prevIndex].classList.add('right-top');
            if (dots[activeIndex]) {
            dots[activeIndex].classList.add('active');
            }
        }

        function stopAutoSlideAnimation() {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }

        function autoSlideAnimation() {
            stopAutoSlideAnimation();
            autoSlideTimer = setInterval(() => {
            activeIndex = (activeIndex + 1) % cards.length;
            updateClasses();
            }, 2000);
        }

        document.getElementById('nextBtn').addEventListener('click', () => {
            activeIndex = (activeIndex + 1) % cards.length;
            updateClasses();
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            activeIndex = (activeIndex - 1 + cards.length) % cards.length;
            updateClasses();
        });

        cards.forEach((card, i) => {
            card.addEventListener('click', () => {
            activeIndex = i;
            updateClasses();
            });
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
            activeIndex = i;
            updateClasses();
            });
        });

        if (navRow) {
            navRow.addEventListener('mouseenter', stopAutoSlideAnimation);
            navRow.addEventListener('mouseleave', autoSlideAnimation);
        }

        // init
        updateClasses();
        autoSlideAnimation();
    }
}


suffleCards();
/* suffle card script ended */