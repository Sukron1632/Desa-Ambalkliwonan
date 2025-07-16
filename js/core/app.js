/**
 * Main Application Entry Point
 * Initializes all core functionalities and modules
 */

(function ($) {
    "use strict";

    // Initialize all modules when DOM is ready
    $(document).ready(function() {
        // Initialize core UI components
        UIComponents.init();
        
        // Initialize carousel components
        CarouselComponents.init();
        
        // Initialize navigation components
        NavigationComponents.init();
        
        // Initialize gallery modules (if present on page)
        if (typeof GalleryPotensiDesa !== 'undefined') {
            GalleryPotensiDesa.init();
        }
        
        if (typeof GalleryDesa !== 'undefined') {
            GalleryDesa.init();
        }
        
        console.log('Application initialized successfully');
    });

})(jQuery);