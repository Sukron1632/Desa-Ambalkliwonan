(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: true,
        nav: false,
    });

    // Active class for dropdown parent on current page
    $(document).ready(function() {
        // Loop through each dropdown item
        $('.dropdown-menu .dropdown-item').each(function() {
            // Check if the current dropdown item has the 'active' class
            if ($(this).hasClass('active')) {
                // Find the closest parent dropdown container and add 'active' class
                // to its 'dropdown-toggle' link
                $(this).closest('.nav-item.dropdown').find('.nav-link.dropdown-toggle').addClass('active');
            }
        });
    });

    
    
})(jQuery);

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: true,
        nav: false,
    });

    // Active class for dropdown parent on current page
    $(document).ready(function() {
        // Loop through each dropdown item
        $('.dropdown-menu .dropdown-item').each(function() {
            // Check if the current dropdown item has the 'active' class
            if ($(this).hasClass('active')) {
                // Find the closest parent dropdown container and add 'active' class
                // to its 'dropdown-toggle' link
                $(this).closest('.nav-item.dropdown').find('.nav-link.dropdown-toggle').addClass('active');
            }
        });
    });


 // --- GALERI POTENSI DESA SCRIPTS START ---

    const JSON_DATA_URL = 'data/galeridata.json'; // URL ke file JSON Anda

    let galleryItemsData = {}; // Variabel untuk menyimpan data setelah di-fetch
    let currentCarouselInstance = null; // Untuk menyimpan instance carousel agar bisa dihancurkan/dibuat ulang

    // Fungsi untuk mengambil data JSON
    async function fetchgaleridata() { // Nama fungsi disesuaikan dengan yang Anda gunakan
        try {
            const response = await fetch(JSON_DATA_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            galleryItemsData = await response.json();
            console.log('Data galeri berhasil dimuat:', galleryItemsData);
            renderGalleryCards(); // Panggil fungsi untuk merender kartu setelah data dimuat
        } catch (error) {
            console.error('Gagal memuat data galeri:', error);
            const galleryContent = document.getElementById('galleryTabsContent');
            if (galleryContent) {
                galleryContent.innerHTML = `
                    <div class="alert alert-danger text-center" role="alert">
                        Oops! Maaf, kami tidak dapat memuat data potensi desa saat ini. <br>
                        Silakan coba refresh halaman atau hubungi administrator.
                    </div>
                `;
            }
        }
    }

    // Fungsi untuk merender kartu galeri untuk setiap kategori
    function renderGalleryCards() {
        for (const category in galleryItemsData) {
            const rowElement = document.getElementById(`${category}-gallery-row`);
            if (rowElement) {
                rowElement.innerHTML = ''; // Kosongkan baris sebelum mengisi
                galleryItemsData[category].forEach((item, index) => {
                    // Gunakan gambar pertama dari variasi sebagai gambar utama kartu
                    const mainImage = item.variations && item.variations.length > 0 ? item.variations[0].image : 'https://via.placeholder.com/600x400?text=No+Image';

                    // Tentukan harga yang ditampilkan di kartu (misalnya harga variasi pertama atau rentang)
                    let displayPrice = '';
                    if (item.variations && item.variations.length > 0) {
                        if (item.variations.length === 1) {
                            displayPrice = item.variations[0].price;
                        } else {
                            // Ambil harga terendah dan tertinggi jika ada banyak variasi
                            // Filter keluar string yang bukan angka atau kosong
                            const validPrices = item.variations
                                .map(v => parseFloat(v.price.replace(/[^0-9,.]/g, '').replace(',', '.'))) // Bersihkan string dan konversi ke float
                                .filter(p => !isNaN(p)); // Filter out NaN (misal: "Harga Negosiasi" akan jadi NaN)

                            if (validPrices.length > 0) {
                                const minPrice = Math.min(...validPrices);
                                const maxPrice = Math.max(...validPrices);

                                if (minPrice === maxPrice) {
                                    displayPrice = item.variations[0].price; // If only one valid price or min/max are same, show exact price
                                } else {
                                    const formattedMin = `Rp ${minPrice.toLocaleString('id-ID', {minimumFractionDigits: 0, maximumFractionDigits: 0})},-`;
                                    // const formattedMax = `Rp ${maxPrice.toLocaleString('id-ID', {minimumFractionDigits: 0, maximumFractionDigits: 0})},-`; // Uncomment if you want range
                                    displayPrice = `Mulai dari ${formattedMin}`;
                                }
                            } else {
                                displayPrice = 'Harga Negosiasi'; // If no valid numeric prices
                            }
                        }
                    } else {
                        displayPrice = 'Harga Negosiasi'; // Default jika tidak ada variasi sama sekali
                    }


                    const delay = (index * 0.1) + 0.1;
                    const cardHtml = `
                        <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="${delay}s">
                            <div class="card gallery-card h-100 shadow-sm border-0" data-bs-toggle="modal" data-bs-target="#detailModal" data-category="${category}" data-item="${item.id}">
                                <img src="${mainImage}" class="card-img-top" alt="${item.title}">
                                <div class="card-body text-center">
                                    <h5 class="card-title text-primary mb-1">${item.title}</h5>
                                    <p class="card-text text-muted small">${item.category}</p>
                                    <p class="card-text fw-bold text-success mt-2">${displayPrice}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    rowElement.insertAdjacentHTML('beforeend', cardHtml);
                });
            }
        }
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
    }

    // Event listener untuk mengisi modal saat dibuka
    const detailModal = document.getElementById('detailModal');
    detailModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const category = button.getAttribute('data-category');
        const itemId = parseInt(button.getAttribute('data-item'));

        const item = galleryItemsData[category].find(dataItem => dataItem.id === itemId);

        if (item) {
            const modalTitle = detailModal.querySelector('#modalTitle');
            const modalCategorySub = detailModal.querySelector('#modalCategorySub');
            const modalDescription = detailModal.querySelector('#modalDescription');
            const modalPrice = detailModal.querySelector('#modalPrice');
            // const modalImage = detailModal.querySelector('#modalImage'); // Ini dihapus dari HTML
            const modalWhatsapp = detailModal.querySelector('#modalWhatsapp');
            const modalPhone = detailModal.querySelector('#modalPhone');
            const modalProductCarousel = detailModal.querySelector('#modalProductCarousel');
            const modalCarouselInner = detailModal.querySelector('#modalCarouselInner');
            const variationList = detailModal.querySelector('#variationList'); // Elemen baru

            // Reset modal content
            modalTitle.textContent = '';
            modalCategorySub.textContent = '';
            modalDescription.textContent = '';
            modalPrice.textContent = '';
            variationList.innerHTML = ''; // Kosongkan daftar variasi
            modalCarouselInner.innerHTML = ''; // Kosongkan carousel

            // Destroy existing carousel instance if any before creating a new one
            // This is crucial to prevent multiple carousel instances on the same element
            if (currentCarouselInstance) {
                currentCarouselInstance.dispose(); // Hancurkan instance yang lama
                currentCarouselInstance = null;
            }

            // Fill basic details
            modalTitle.textContent = item.title;
            modalCategorySub.textContent = item.category;
            modalDescription.textContent = item.description;

            modalWhatsapp.href = `https://wa.me/${item.whatsapp}`;
            modalPhone.href = `tel:${item.phone}`;

            // Handle variations (ALWAYS EXPECTING VARIATIONS NOW)
            if (item.variations && item.variations.length > 0) {
                // Ensure carousel is visible (it's no longer hidden by default in HTML, but good to ensure)
                modalProductCarousel.classList.remove('d-none');

                let carouselHTML = '';

                item.variations.forEach((variation, idx) => {
                    carouselHTML += `
                        <div class="carousel-item ${idx === 0 ? 'active' : ''}">
                            <img src="${variation.image}" class="d-block w-100 rounded" alt="${item.title} - ${variation.name}">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${variation.name}</h5>
                                <p>${variation.price}</p>
                            </div>
                        </div>
                    `;

                    // Tambahkan variasi ke daftar di samping gambar
                    const listItem = document.createElement('a');
                    listItem.href = '#'; // Menggunakan # agar tidak reload halaman
                    listItem.classList.add('list-group-item', 'list-group-item-action');
                    if (idx === 0) {
                        listItem.classList.add('active'); // Set variasi pertama sebagai aktif
                        modalPrice.textContent = `Harga: ${variation.price}`; // Set harga awal
                    }
                    listItem.innerHTML = `
                        <div class="d-flex w-100 justify-content-between align-items-center">
                            <h6 class="mb-1">${variation.name}</h6>
                            <small class="text-success fw-bold">${variation.price}</small>
                        </div>
                    `;
                    // Event listener untuk setiap item variasi
                    listItem.addEventListener('click', (e) => {
                        e.preventDefault(); // Mencegah perilaku default link
                        // Update active state in list-group
                        variationList.querySelectorAll('.list-group-item').forEach(el => el.classList.remove('active'));
                        listItem.classList.add('active');
                        // Update price display
                        modalPrice.textContent = `Harga: ${variation.price}`;
                        // Go to the corresponding carousel slide
                        if (currentCarouselInstance) {
                            currentCarouselInstance.to(idx);
                        }
                    });
                    variationList.appendChild(listItem);
                });

                modalCarouselInner.innerHTML = carouselHTML;

                // Initialize Bootstrap Carousel
                currentCarouselInstance = new bootstrap.Carousel(modalProductCarousel, {
                    interval: false // Matikan autoplay jika tidak diinginkan
                });

                // Add event listener for carousel slide to update active list item and price
                modalProductCarousel.addEventListener('slide.bs.carousel', function (carouselEvent) {
                    const nextIndex = carouselEvent.to;
                    variationList.querySelectorAll('.list-group-item').forEach(el => el.classList.remove('active'));
                    // Pastikan elemen anak ada sebelum mencoba mengaksesnya
                    if (variationList.children[nextIndex]) {
                         variationList.children[nextIndex].classList.add('active');
                    }
                    // Update price based on current slide
                    modalPrice.textContent = `Harga: ${item.variations[nextIndex].price}`;
                });


            } else {
                // Fallback jika tidak ada variasi yang didefinisikan (walaupun seharusnya selalu ada)
                modalProductCarousel.classList.add('d-none'); // Sembunyikan carousel
                modalPrice.textContent = 'Harga: Informasi tidak tersedia';
                variationList.innerHTML = `<p class="text-muted">Tidak ada variasi produk yang tersedia.</p>`;
            }

        } else {
            console.error('Item tidak ditemukan untuk kategori:', category, 'dan ID:', itemId);
            alert('Terjadi kesalahan saat memuat detail item.');
        }
    });

    // Panggil fungsi untuk mengambil data saat seluruh DOM halaman dimuat
    document.addEventListener('DOMContentLoaded', fetchgaleridata);

    // --- GALERI POTENSI DESA SCRIPTS END ---

})(jQuery);


(function ($) {
    "use strict";

    // Spinner (tetap sama)
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs (tetap sama)
    new WOW().init();


    // Sticky Navbar (tetap sama)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
        }
    });


    // Back to top button (tetap sama)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video (tetap sama)
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Product carousel (tetap sama)
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel (tetap sama)
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: true,
        nav: false,
    });

    // Active class for dropdown parent on current page (tetap sama)
    $(document).ready(function() {
        $('.dropdown-menu .dropdown-item').each(function() {
            if ($(this).hasClass('active')) {
                $(this).closest('.nav-item.dropdown').find('.nav-link.dropdown-toggle').addClass('active');
            }
        });
    });


// --- GALERI DESA SCRIPTS START ---

    const JSON_DATA_URL = 'data/galeri_desa.json';
    let galleryItemsData = {};
    let currentImageCarouselInstance = null; // Instance untuk carousel gambar di modal
    let currentlyPlayingVideoId = null; // Melacak video yang sedang diputar

    async function fetchGalleryData() {
        try {
            const response = await fetch(JSON_DATA_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            galleryItemsData = await response.json();
            console.log('Data galeri desa berhasil dimuat:', galleryItemsData);
            renderGalleryCards();
        } catch (error) {
            console.error('Gagal memuat data galeri desa:', error);
            const galleryContent = document.getElementById('galleryTabsContent');
            if (galleryContent) {
                galleryContent.innerHTML = `
                    <div class="alert alert-danger text-center" role="alert">
                        Oops! Maaf, kami tidak dapat memuat data galeri desa saat ini. <br>
                        Silakan coba refresh halaman atau hubungi administrator.
                    </div>
                `;
            }
        }
    }

    function renderGalleryCards() {
        const categories = {
            'acara_kebudayaan': 'acara_kebudayaan-gallery-row',
            'wisata_alam': 'wisata_alam-gallery-row',
            'pembangunan_desa': 'pembangunan_desa-gallery-row',
            'video_desa': 'video_desa-gallery-row', // Kategori baru untuk video
            'lain_lain': 'lain_lain-gallery-row'
        };

        for (const categoryKey in categories) {
            const rowElementId = categories[categoryKey];
            const rowElement = document.getElementById(rowElementId);

            if (rowElement) {
                rowElement.innerHTML = '';
                const items = galleryItemsData[categoryKey];

                if (items && items.length > 0) {
                    items.forEach((item, index) => {
                        const delay = (index * 0.1) + 0.1;
                        let cardHtml = '';

                        if (item.type === 'image') {
                            const mainImage = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/600x400?text=Gambar+Tidak+Tersedia';
                            cardHtml = `
                                <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="${delay}s">
                                    <div class="card gallery-card h-100 shadow-sm border-0" data-bs-toggle="modal" data-bs-target="#imageDetailModal" data-category="${categoryKey}" data-item-id="${item.id}" data-type="${item.type}">
                                        <img src="${mainImage}" class="card-img-top" alt="${item.title}">
                                        <div class="card-body text-center">
                                            <h5 class="card-title text-primary mb-1">${item.title}</h5>
                                            <p class="card-text text-muted small">${item.category}</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (item.type === 'video') {
                            const thumbnailUrl = item.thumbnail || `https://img.youtube.com/vi/${item.video_url.split('/').pop()}/mqdefault.jpg`; // Ambil thumbnail YouTube default
                            cardHtml = `
                                <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="${delay}s">
                                    <div class="card gallery-card video-card h-100 shadow-sm border-0" data-bs-toggle="modal" data-bs-target="#videoDetailModal" data-category="${categoryKey}" data-item-id="${item.id}" data-type="${item.type}">
                                        <div class="card-img-top-wrapper">
                                            <img src="${thumbnailUrl}" class="card-img-top" alt="${item.title} Thumbnail">
                                            <div class="play-icon-overlay">
                                                <i class="fas fa-play-circle"></i>
                                            </div>
                                            ${item.duration ? `<span class="duration-overlay">${item.duration}</span>` : ''}
                                        </div>
                                        <div class="card-body text-center">
                                            <h5 class="card-title text-primary mb-1">${item.title}</h5>
                                            <p class="card-text text-muted small">${item.category}</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                        rowElement.insertAdjacentHTML('beforeend', cardHtml);
                    });
                } else {
                    rowElement.innerHTML = `
                        <div class="col-12 text-center py-5">
                            <p class="text-muted">Belum ada item untuk kategori ini.</p>
                        </div>
                    `;
                }
            }
        }
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
    }

    // Event listener untuk modal gambar
    const imageDetailModal = document.getElementById('imageDetailModal');
    imageDetailModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const category = button.getAttribute('data-category');
        const itemId = parseInt(button.getAttribute('data-item-id'));
        const type = button.getAttribute('data-type');

        if (type !== 'image') return; // Pastikan hanya untuk tipe gambar

        const item = galleryItemsData[category].find(dataItem => dataItem.id === itemId);

        if (item) {
            const modalTitle = imageDetailModal.querySelector('#imageModalTitle');
            const modalCategorySub = imageDetailModal.querySelector('#imageModalCategorySub');
            const modalDescription = imageDetailModal.querySelector('#imageModalDescription');
            const modalDate = imageDetailModal.querySelector('#imageModalDate');
            const modalTime = imageDetailModal.querySelector('#imageModalTime');
            const modalLocation = imageDetailModal.querySelector('#imageModalLocation');
            const modalContactPerson = imageDetailModal.querySelector('#imageModalContactPerson');
            const modalWhatsapp = imageDetailModal.querySelector('#imageModalWhatsapp');
            const modalImageCarousel = imageDetailModal.querySelector('#modalImageCarousel');
            const modalImageCarouselInner = imageDetailModal.querySelector('#modalImageCarouselInner');
            const modalImageCarouselIndicators = imageDetailModal.querySelector('#modalImageCarouselIndicators');

            // Reset modal content
            modalTitle.textContent = '';
            modalCategorySub.textContent = '';
            modalDescription.textContent = '';
            modalDate.textContent = '';
            modalTime.textContent = '';
            modalLocation.textContent = '';
            modalContactPerson.textContent = '';
            modalImageCarouselInner.innerHTML = '';
            modalImageCarouselIndicators.innerHTML = '';

            // Destroy existing carousel instance if any
            if (currentImageCarouselInstance) {
                currentImageCarouselInstance.dispose();
                currentImageCarouselInstance = null;
            }

            // Isi konten modal
            modalTitle.textContent = item.title;
            modalCategorySub.textContent = item.category;
            modalDescription.textContent = item.description;
            modalDate.textContent = item.date || 'Tidak tersedia';
            modalTime.textContent = item.time || 'Tidak tersedia';
            modalLocation.textContent = item.location || 'Tidak tersedia';
            modalContactPerson.textContent = item.contact_person || 'Tidak tersedia';
            if (item.whatsapp) {
                modalWhatsapp.href = `https://wa.me/${item.whatsapp}`;
                modalWhatsapp.style.display = 'inline-block';
            } else {
                modalWhatsapp.style.display = 'none';
            }


            // Populate carousel
            if (item.images && item.images.length > 0) {
                let carouselHTML = '';
                let indicatorsHTML = '';
                item.images.forEach((imgSrc, idx) => {
                    carouselHTML += `
                        <div class="carousel-item ${idx === 0 ? 'active' : ''}">
                            <img src="${imgSrc}" class="d-block w-100 rounded" alt="${item.title} Gambar ${idx + 1}">
                        </div>
                    `;
                    indicatorsHTML += `
                        <button type="button" data-bs-target="#modalImageCarousel" data-bs-slide-to="${idx}" class="${idx === 0 ? 'active' : ''}" aria-current="${idx === 0 ? 'true' : 'false'}" aria-label="Slide ${idx + 1}"></button>
                    `;
                });
                modalImageCarouselInner.innerHTML = carouselHTML;
                modalImageCarouselIndicators.innerHTML = indicatorsHTML;

                // Initialize Bootstrap Carousel
                currentImageCarouselInstance = new bootstrap.Carousel(modalImageCarousel, {
                    interval: 5000
                });

            } else {
                modalImageCarouselInner.innerHTML = `
                    <div class="carousel-item active">
                        <img src="https://via.placeholder.com/600x400?text=Tidak+Ada+Gambar" class="d-block w-100 rounded" alt="Tidak Ada Gambar">
                    </div>
                `;
                // Sembunyikan tombol navigasi dan indikator jika hanya 1 gambar atau tidak ada gambar
                modalImageCarousel.querySelector('.carousel-control-prev').style.display = 'none';
                modalImageCarousel.querySelector('.carousel-control-next').style.display = 'none';
                modalImageCarouselIndicators.style.display = 'none';
            }

        } else {
            console.error('Item gambar tidak ditemukan untuk kategori:', category, 'dan ID:', itemId);
            alert('Terjadi kesalahan saat memuat detail gambar.');
        }
    });

    // Event listener untuk modal video
    const videoDetailModal = document.getElementById('videoDetailModal');
    videoDetailModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const category = button.getAttribute('data-category');
        const itemId = parseInt(button.getAttribute('data-item-id'));
        const type = button.getAttribute('data-type');

        if (type !== 'video') return; // Pastikan hanya untuk tipe video

        const item = galleryItemsData[category].find(dataItem => dataItem.id === itemId);

        if (item) {
            const videoPlayer = videoDetailModal.querySelector('#videoPlayer');
            const videoModalTitle = videoDetailModal.querySelector('#videoModalTitle');
            const videoModalChannel = videoDetailModal.querySelector('#videoModalChannel');
            const videoModalDate = videoDetailModal.querySelector('#videoModalDate');
            const videoModalDuration = videoDetailModal.querySelector('#videoModalDuration');
            const videoModalDescription = videoDetailModal.querySelector('#videoModalDescription');
            const relatedVideosContainer = videoDetailModal.querySelector('#relatedVideosContainer');
            const noRelatedVideosMsg = videoDetailModal.querySelector('#noRelatedVideosMsg');

            // Reset modal content
            videoPlayer.src = ''; // Hentikan video sebelumnya
            videoModalTitle.textContent = '';
            videoModalChannel.textContent = '';
            videoModalDate.textContent = '';
            videoModalDuration.textContent = '';
            videoModalDescription.textContent = '';
            relatedVideosContainer.innerHTML = '';
            noRelatedVideosMsg.style.display = 'none';

            // Isi konten modal video
            videoPlayer.src = item.video_url + "?autoplay=1&rel=0"; // Autoplay dan sembunyikan video terkait YT
            currentlyPlayingVideoId = item.id; // Simpan ID video yang sedang diputar

            videoModalTitle.textContent = item.title;
            videoModalChannel.textContent = item.channel || 'Tidak Diketahui';
            videoModalDate.textContent = item.date || 'Tidak Tersedia';
            videoModalDuration.textContent = item.duration || 'Tidak Tersedia';
            videoModalDescription.textContent = item.description;

            // Memuat video terkait (dari kategori 'video_desa')
            const relatedVideos = galleryItemsData['video_desa'].filter(
                video => video.id !== item.id && video.type === 'video'
            );

            if (relatedVideos.length > 0) {
                relatedVideos.forEach(relatedVideo => {
                    const relatedThumbnail = relatedVideo.thumbnail || `https://img.youtube.com/vi/${relatedVideo.video_url.split('/').pop()}/mqdefault.jpg`;
                    const relatedVideoHtml = `
                        <a href="#" class="list-group-item list-group-item-action" data-category="video_desa" data-item-id="${relatedVideo.id}" data-type="video">
                            <img src="${relatedThumbnail}" alt="${relatedVideo.title}">
                            <div class="video-info">
                                <div class="title">${relatedVideo.title}</div>
                                <div class="channel-date">${relatedVideo.channel || 'Tidak Diketahui'} • ${relatedVideo.date || ''}</div>
                            </div>
                        </a>
                    `;
                    relatedVideosContainer.insertAdjacentHTML('beforeend', relatedVideoHtml);
                });

                // Tambahkan event listener untuk video terkait yang baru dimuat
                relatedVideosContainer.querySelectorAll('.list-group-item').forEach(relatedItem => {
                    relatedItem.addEventListener('click', function(e) {
                        e.preventDefault();
                        const relatedCategory = this.getAttribute('data-category');
                        const relatedItemId = parseInt(this.getAttribute('data-item-id'));
                        const relatedItemData = galleryItemsData[relatedCategory].find(data => data.id === relatedItemId);

                        if (relatedItemData && relatedItemData.type === 'video') {
                            // Muat ulang konten modal video dengan video baru
                            videoPlayer.src = relatedItemData.video_url + "?autoplay=1&rel=0";
                            currentlyPlayingVideoId = relatedItemData.id;
                            videoModalTitle.textContent = relatedItemData.title;
                            videoModalChannel.textContent = relatedItemData.channel || 'Tidak Diketahui';
                            videoModalDate.textContent = relatedItemData.date || 'Tidak Tersedia';
                            videoModalDuration.textContent = relatedItemData.duration || 'Tidak Tersedia';
                            videoModalDescription.textContent = relatedItemData.description;

                            // Scroll ke atas agar player terlihat
                            videoDetailModal.querySelector('.modal-body').scrollTop = 0;
                            
                            // Re-render related videos untuk menghindari video yang sama tampil lagi
                            loadRelatedVideos(relatedItemData.id);
                        }
                    });
                });

            } else {
                noRelatedVideosMsg.style.display = 'block';
            }
        } else {
            console.error('Item video tidak ditemukan untuk kategori:', category, 'dan ID:', itemId);
            alert('Terjadi kesalahan saat memuat detail video.');
        }
    });

    // Fungsi pembantu untuk memuat video terkait (agar bisa dipanggil ulang)
    function loadRelatedVideos(excludeId) {
        const relatedVideosContainer = videoDetailModal.querySelector('#relatedVideosContainer');
        const noRelatedVideosMsg = videoDetailModal.querySelector('#noRelatedVideosMsg');
        relatedVideosContainer.innerHTML = ''; // Bersihkan kontainer
        noRelatedVideosMsg.style.display = 'none';

        const relatedVideos = galleryItemsData['video_desa'].filter(
            video => video.id !== excludeId && video.type === 'video'
        );

        if (relatedVideos.length > 0) {
            relatedVideos.forEach(relatedVideo => {
                const relatedThumbnail = relatedVideo.thumbnail || `https://img.youtube.com/vi/${relatedVideo.video_url.split('/').pop()}/mqdefault.jpg`;
                const relatedVideoHtml = `
                    <a href="#" class="list-group-item list-group-item-action" data-category="video_desa" data-item-id="${relatedVideo.id}" data-type="video">
                        <img src="${relatedThumbnail}" alt="${relatedVideo.title}">
                        <div class="video-info">
                            <div class="title">${relatedVideo.title}</div>
                            <div class="channel-date">${relatedVideo.channel || 'Tidak Diketahui'} • ${relatedVideo.date || ''}</div>
                        </div>
                    </a>
                `;
                relatedVideosContainer.insertAdjacentHTML('beforeend', relatedVideoHtml);
            });

            // Re-attach event listeners
            relatedVideosContainer.querySelectorAll('.list-group-item').forEach(relatedItem => {
                relatedItem.addEventListener('click', function(e) {
                    e.preventDefault();
                    const relatedCategory = this.getAttribute('data-category');
                    const relatedItemId = parseInt(this.getAttribute('data-item-id'));
                    const relatedItemData = galleryItemsData[relatedCategory].find(data => data.id === relatedItemId);

                    if (relatedItemData && relatedItemData.type === 'video') {
                        videoDetailModal.querySelector('#videoPlayer').src = relatedItemData.video_url + "?autoplay=1&rel=0";
                        currentlyPlayingVideoId = relatedItemData.id;
                        videoDetailModal.querySelector('#videoModalTitle').textContent = relatedItemData.title;
                        videoDetailModal.querySelector('#videoModalChannel').textContent = relatedItemData.channel || 'Tidak Diketahui';
                        videoDetailModal.querySelector('#videoModalDate').textContent = relatedItemData.date || 'Tidak Tersedia';
                        videoDetailModal.querySelector('#videoModalDuration').textContent = relatedItemData.duration || 'Tidak Tersedia';
                        videoDetailModal.querySelector('#videoModalDescription').textContent = relatedItemData.description;
                        videoDetailModal.querySelector('.modal-body').scrollTop = 0;
                        loadRelatedVideos(relatedItemData.id); // Reload related videos
                    }
                });
            });
        } else {
            noRelatedVideosMsg.style.display = 'block';
        }
    }


    // Menghentikan video saat modal ditutup
    videoDetailModal.addEventListener('hidden.bs.modal', function () {
        const videoPlayer = videoDetailModal.querySelector('#videoPlayer');
        videoPlayer.src = ''; // Menghentikan pemutaran video
        currentlyPlayingVideoId = null; // Reset ID video yang sedang diputar
    });


    // Panggil fungsi untuk mengambil data saat seluruh DOM halaman dimuat
    document.addEventListener('DOMContentLoaded', fetchGalleryData);

    // --- GALERI DESA SCRIPTS END ---

})(jQuery);


