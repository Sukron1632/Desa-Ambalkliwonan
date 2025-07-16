/**
 * Navigation Components Module
 * Handles navigation related functionalities
 */

const NavigationComponents = (function ($) {
    "use strict";

    // Private methods
    const _initDropdownActiveState = function () {
        // Set active class for dropdown parent on current page
        $('.dropdown-menu .dropdown-item').each(function() {
            // Check if the current dropdown item has the 'active' class
            if ($(this).hasClass('active')) {
                // Find the closest parent dropdown container and add 'active' class
                // to its 'dropdown-toggle' link
                $(this).closest('.nav-item.dropdown').find('.nav-link.dropdown-toggle').addClass('active');
            }
        });
    };

    const _initMobileMenuToggle = function () {
        // Add mobile menu functionality if needed
        // This can be expanded based on your specific navigation structure
        $('.navbar-toggler').on('click', function() {
            $(this).toggleClass('collapsed');
        });
    };

    // Public methods
    return {
        init: function () {
            _initDropdownActiveState();
            _initMobileMenuToggle();
            
            console.log('Navigation Components initialized');
        },

        // Method to update active states (useful for SPA navigation)
        updateActiveState: function () {
            _initDropdownActiveState();
        }
    };

})(jQuery);