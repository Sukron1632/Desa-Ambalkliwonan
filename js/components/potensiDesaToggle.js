/**
         * Potensi Desa Toggle Module - Fixed Version
         * Mengatasi masalah tumpang tindih dengan pendekatan yang lebih baik
         */
        const PotensiDesaToggle = (function ($) {
            "use strict";

            // Private method untuk smooth transition
            const _smoothTransition = function($currentContent, $targetContent) {
                // Fade out konten saat ini
                $currentContent.fadeOut(300, function() {
                    $currentContent.removeClass('active');
                    
                    // Fade in konten target
                    $targetContent.addClass('active').hide().fadeIn(400);
                });
            };

            // Private method untuk inisialisasi toggle handler
            const _initToggleHandler = function () {
                $('.toggle-btn').on('click', function(e) {
                    e.preventDefault();
                    
                    const $clickedBtn = $(this);
                    
                    // Jika tombol sudah aktif, tidak perlu melakukan apa-apa
                    if ($clickedBtn.hasClass('active')) {
                        return;
                    }

                    // Update button states
                    $('.toggle-btn').removeClass('active');
                    $clickedBtn.addClass('active');

                    // Get target content
                    const targetId = $clickedBtn.data('target');
                    const $currentActiveContent = $('.potential-content.active');
                    const $targetContent = $('#' + targetId);

                    // Lakukan transisi yang smooth
                    if ($currentActiveContent.length && $targetContent.length) {
                        _smoothTransition($currentActiveContent, $targetContent);
                    }
                });
            };

            // Public methods
            return {
                init: function () {
                    _initToggleHandler();
                    
                    // Inisialisasi awal - pastikan hanya pertanian yang aktif
                    $('.potential-content').removeClass('active').hide();
                    $('#pertanian').addClass('active').show();
                    
                    console.log('Potensi Desa Toggle Module initialized successfully');
                }
            };

        })(jQuery);

        // Initialize when document ready
        $(document).ready(function() {
            PotensiDesaToggle.init();
            
            // Simple WOW.js alternative for fade in animations
            function initAnimations() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, observerOptions);

                // Observe wow elements
                document.querySelectorAll('.wow').forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(el);
                });
            }

            // Initialize animations
            initAnimations();
        })(jQuery); // Lewatkan jQuery ke dalam scope modul