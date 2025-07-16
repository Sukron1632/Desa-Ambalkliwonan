/**
 * Carousel Components Module
 * Handles all carousel related functionalities
 */

const CarouselComponents = (function ($) {
    "use strict";

    // Default carousel configurations
    const _defaultProductConfig = {
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    };

    const _defaultTestimonialConfig = {
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: true,
        nav: false
    };

    // Private methods
    const _initProductCarousel = function () {
        if ($(".product-carousel").length > 0) {
            $(".product-carousel").owlCarousel(_defaultProductConfig);
        }
    };

    const _initTestimonialCarousel = function () {
        if ($(".testimonial-carousel").length > 0) {
            $(".testimonial-carousel").owlCarousel(_defaultTestimonialConfig);
        }
    };

    // Public methods
    return {
        init: function () {
            _initProductCarousel();
            _initTestimonialCarousel();
            
            console.log('Carousel Components initialized');
        },

        // Method to reinitialize carousels (useful for dynamic content)
        reinitialize: function () {
            // Destroy existing carousels
            $(".product-carousel").trigger('destroy.owl.carousel');
            $(".testimonial-carousel").trigger('destroy.owl.carousel');
            
            // Reinitialize
            _initProductCarousel();
            _initTestimonialCarousel();
        },

        // Method to create custom carousel with specific config
        createCustomCarousel: function (selector, config) {
            if ($(selector).length > 0) {
                $(selector).owlCarousel(config);
            }
        }
    };

})(jQuery);