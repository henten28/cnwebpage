// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Current slide tracker
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const carouselSection = document.getElementById('carousel-section');
    const mainPage = document.getElementById('main-page');
    const videoPage = document.getElementById('video-page');

    console.log('Total slides:', totalSlides);
    console.log('Carousel initialized');

    // Show specific slide
    function showSlide(index) {
        console.log('Showing slide:', index + 1);
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    // Next slide function
    function nextSlide() {
        console.log('Next button clicked, current slide:', currentSlide + 1);
        if (currentSlide < totalSlides - 1) {
            // Go to next carousel slide
            currentSlide++;
            showSlide(currentSlide);
        } else {
            // On slide 3, next button goes to main page (Desktop 4)
            console.log('Going to main page');
            goToMainPage();
        }
    }

    // Previous slide function
    function prevSlide() {
        console.log('Previous button clicked, current slide:', currentSlide + 1);
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    }

    // Navigation functions
    function goToMainPage() {
        carouselSection.style.display = 'none';
        mainPage.style.display = 'block';
        videoPage.style.display = 'none';
        mainPage.scrollTo(0, 0); // Scroll to top of main page
    }

    function goToVideoPage() {
        carouselSection.style.display = 'none';
        mainPage.style.display = 'none';
        videoPage.style.display = 'block';
    }

    function backToCarousel() {
        carouselSection.style.display = 'block';
        mainPage.style.display = 'none';
        videoPage.style.display = 'none';
        currentSlide = 2; // Go back to slide 3
        showSlide(currentSlide);
    }

    function backToMain() {
        carouselSection.style.display = 'none';
        mainPage.style.display = 'block';
        videoPage.style.display = 'none';
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        console.log('Next button listener attached');
    } else {
        console.error('Next button not found!');
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        console.log('Previous button listener attached');
    } else {
        console.error('Previous button not found!');
    }

    // Watch Demo Video button
    const watchVideoBtn = document.getElementById('watchVideoBtn');
    if (watchVideoBtn) {
        watchVideoBtn.addEventListener('click', goToVideoPage);
    }

    // Back to carousel from main page
    const backToCarouselBtn = document.getElementById('backToCarousel');
    if (backToCarouselBtn) {
        backToCarouselBtn.addEventListener('click', backToCarousel);
    }

    // Back to main page from video page
    const backToMainBtn = document.getElementById('backToMain');
    if (backToMainBtn) {
        backToMainBtn.addEventListener('click', backToMain);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only handle keyboard in carousel
        if (carouselSection.style.display !== 'none') {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        }
    });

    // Touch swipe support for carousel
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselSection) {
        carouselSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        if (carouselSection.style.display !== 'none') {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next slide
                nextSlide();
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target && mainPage.style.display !== 'none') {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Video placeholder click handler
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            alert('Video tutorial would play here. Replace with your actual video embed or URL.');
        });
    });

    // Add intersection observer for animations on main page
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for scroll animations
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Initialize - show first slide
    showSlide(currentSlide);

    console.log('EN-COMPASS website loaded successfully! 🎉');
    console.log('Navigation: Carousel (1→2→3) → Main Page (scrollable) → Video Page');
});