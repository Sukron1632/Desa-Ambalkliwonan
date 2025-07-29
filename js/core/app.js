/**
 * Main Application Entry Point
 * Initializes all core functionalities and modules
 */

(function ($) {
  "use strict";

  // Initialize all modules when DOM is ready
  $(document).ready(function () {
    // Initialize core UI components
    // Assuming UIComponents, CarouselComponents, NavigationComponents are defined elsewhere
    if (typeof UIComponents !== "undefined") {
      UIComponents.init();
    }

    // Initialize carousel components
    if (typeof CarouselComponents !== "undefined") {
      CarouselComponents.init();
    }

    // Initialize navigation components
    if (typeof NavigationComponents !== "undefined") {
      NavigationComponents.init();
    }

    // Initialize gallery modules (if present on page)
    if (typeof GalleryPotensiDesa !== "undefined") {
      GalleryPotensiDesa.init();
    }

    if (typeof GalleryDesa !== "undefined") {
      GalleryDesa.init();
    }

    // Initialize Potensi Desa Toggle module
    // This is the new module for the Pertanian/Peternakan section
    if (typeof PotensiDesaToggle !== "undefined") {
      PotensiDesaToggle.init();
    }

    console.log("Application initialized successfully");
  });
})(jQuery);
