/**
 * UI Components Module
 * Handles basic UI functionalities like spinner, scroll effects, etc.
 */

const UIComponents = (function ($) {
  "use strict";

  // Private methods
  const _initSpinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };

  const _initWOW = function () {
    if (typeof WOW !== "undefined") {
      new WOW().init();
    }
  };

  const _initStickyNavbar = function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $(".sticky-top").addClass("shadow-sm").css("top", "0px");
      } else {
        $(".sticky-top").removeClass("shadow-sm").css("top", "-150px");
      }
    });
  };

  const _initBackToTop = function () {
    // Show/hide button based on scroll position
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $(".back-to-top").fadeIn("slow");
      } else {
        $(".back-to-top").fadeOut("slow");
      }
    });

    // Smooth scroll to top
    $(".back-to-top").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
      return false;
    });
  };

  const _initVideoModal = function () {
    let videoSrc;

    $(".btn-play").click(function () {
      videoSrc = $(this).data("src");
    });

    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#video").attr("src", videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    });

    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", videoSrc);
    });
  };

  // Public methods
  return {
    init: function () {
      _initSpinner();
      _initWOW();
      _initStickyNavbar();
      _initBackToTop();
      _initVideoModal();

      console.log("UI Components initialized");
    },

    // Expose methods for external use
    reinitWOW: function () {
      _initWOW();
    },
  };
})(jQuery);
