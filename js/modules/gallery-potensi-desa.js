/**
 * Gallery Potensi Desa Module
 * Handles UMKM gallery functionality
 */

const GalleryPotensiDesa = (function ($) {
    "use strict";

    // Configuration
    const CONFIG = {
        DATA_URL: 'data/galeridata.json',
        MODAL_ID: 'detailModal'
    };

    // Private variables
    let _umkmData = {};
    let _currentCarouselInstance = null;

    // Private methods
    const _fetchData = async function() {
        try {
            const response = await fetch(CONFIG.DATA_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            _umkmData = await response.json();
            console.log('Data galeri potensi desa berhasil dimuat:', _umkmData);
            _renderGalleryCards();
        } catch (error) {
            console.error('Gagal memuat data galeri:', error);
            _showErrorMessage();
        }
    };

    const _showErrorMessage = function() {
        const galleryContent = document.getElementById('galleryTabsContent');
        if (galleryContent) {
            galleryContent.innerHTML = `
                <div class="alert alert-danger text-center" role="alert">
                    Oops! Maaf, kami tidak dapat memuat data potensi desa saat ini. <br>
                    Silakan coba refresh halaman atau hubungi administrator.
                </div>
            `;
        }
    };

    const _renderGalleryCards = function() {
        // Handle the "umkm" tab (now "Semua Hasil UMKM")
        const umkmRowElement = document.getElementById('umkm-gallery-row');
        if (umkmRowElement) {
            umkmRowElement.innerHTML = '';
            
            // Combine all categories and sort by title
            const allItems = [];
            for (const category in _umkmData) {
                _umkmData[category].forEach(item => {
                    allItems.push({
                        ...item,
                        originalCategory: category
                    });
                });
            }
            
            // Sort by title alphabetically
            allItems.sort((a, b) => a.title.localeCompare(b.title, 'id'));
            
            // Render sorted items
            allItems.forEach((item, index) => {
                const cardHtml = _createCardHTML(item, index, item.originalCategory);
                umkmRowElement.insertAdjacentHTML('beforeend', cardHtml);
            });
        }

        // Handle other categories normally
        for (const category in _umkmData) {
            if (category !== 'umkm') { // Skip umkm since we handled it above
                const rowElement = document.getElementById(`${category}-gallery-row`);
                if (rowElement) {
                    rowElement.innerHTML = '';
                    _umkmData[category].forEach((item, index) => {
                        const cardHtml = _createCardHTML(item, index, category);
                        rowElement.insertAdjacentHTML('beforeend', cardHtml);
                    });
                }
            }
        }
        
        // Reinitialize WOW animations
        if (typeof UIComponents !== 'undefined') {
            UIComponents.reinitWOW();
        }
    };

    const _createCardHTML = function(item, index, category) {
        const mainImage = item.variations && item.variations.length > 0 
            ? item.variations[0].image 
            : 'https://via.placeholder.com/600x400?text=No+Image';
        
        const displayPrice = _getDisplayPrice(item);
        const delay = (index * 0.1) + 0.1;
        
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="${delay}s">
                <div class="card gallery-card h-100 shadow-sm border-0" 
                     data-bs-toggle="modal" 
                     data-bs-target="#${CONFIG.MODAL_ID}" 
                     data-category="${category}" 
                     data-item="${item.id}">
                    <img src="${mainImage}" class="card-img-top" alt="${item.title}">
                    <div class="card-body text-center">
                        <h5 class="card-title text-primary mb-1">${item.title}</h5>
                        <p class="card-text text-muted small">${item.category}</p>
                        <p class="card-text fw-bold text-success mt-2">${displayPrice}</p>
                    </div>
                </div>
            </div>
        `;
    };

const _getDisplayPrice = function(item) {
    if (!item.variations || item.variations.length === 0) {
        return 'Harga Negosiasi';
    }
    if (item.variations.length === 1) {
        return item.variations[0].price;
    }
    const validPrices = item.variations
        .map(v => {
            // Remove all non-numeric characters except dots and commas
            let cleanPrice = v.price.replace(/[^0-9,.]/g, '');
            
            // Handle Indonesian number format: remove dots (thousand separators) and replace comma with dot for decimal
            // Check if there's a comma (decimal separator)
            if (cleanPrice.includes(',')) {
                // Split by comma to separate integer and decimal parts
                const parts = cleanPrice.split(',');
                if (parts.length === 2) {
                    // Remove dots from integer part, keep decimal part
                    cleanPrice = parts[0].replace(/\./g, '') + '.' + parts[1];
                }
            } else {
                // No comma, so dots are thousand separators - remove them all
                cleanPrice = cleanPrice.replace(/\./g, '');
            }
            
            return parseFloat(cleanPrice);
        })
        .filter(p => !isNaN(p));
        
    if (validPrices.length === 0) {
        return 'Harga Negosiasi';
    }
    const minPrice = Math.min(...validPrices);
    const maxPrice = Math.max(...validPrices);
    if (minPrice === maxPrice) {
        return item.variations[0].price;
    }
    const formattedMin = `Rp ${minPrice.toLocaleString('id-ID', {
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    })},-`;
    
    return `Mulai dari ${formattedMin}`;
};

    const _initModalEvents = function() {
        const detailModal = document.getElementById(CONFIG.MODAL_ID);
        if (!detailModal) return;

        detailModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const category = button.getAttribute('data-category');
            const itemId = parseInt(button.getAttribute('data-item'));
            
            _populateModal(category, itemId);
        });
    };

    const _populateModal = function(category, itemId) {
        const item = _umkmData[category]?.find(dataItem => dataItem.id === itemId);
        if (!item) {
            console.error('Item tidak ditemukan untuk kategori:', category, 'dan ID:', itemId);
            alert('Terjadi kesalahan saat memuat detail item.');
            return;
        }

        const modal = document.getElementById(CONFIG.MODAL_ID);
        const elements = {
            title: modal.querySelector('#modalTitle'),
            category: modal.querySelector('#modalCategorySub'),
            description: modal.querySelector('#modalDescription'),
            price: modal.querySelector('#modalPrice'),
            whatsapp: modal.querySelector('#modalWhatsapp'),
            carousel: modal.querySelector('#modalProductCarousel'),
            carouselInner: modal.querySelector('#modalCarouselInner'),
            variationList: modal.querySelector('#variationList')
        };

        _resetModal(elements);
        _fillBasicInfo(elements, item);
        _setupCarousel(elements, item);
    };

    const _resetModal = function(elements) {
        elements.title.textContent = '';
        elements.category.textContent = '';
        elements.description.textContent = '';
        elements.price.textContent = '';
        elements.variationList.innerHTML = '';
        elements.carouselInner.innerHTML = '';

        if (_currentCarouselInstance) {
            _currentCarouselInstance.dispose();
            _currentCarouselInstance = null;
        }
    };

    const _fillBasicInfo = function(elements, item) {
        elements.title.textContent = item.title;
        elements.category.textContent = item.category;
        elements.description.textContent = item.description;
        elements.whatsapp.href = `https://wa.me/${item.whatsapp}`;
    };

    const _setupCarousel = function(elements, item) {
        if (!item.variations || item.variations.length === 0) {
            elements.carousel.classList.add('d-none');
            elements.price.textContent = 'Harga: Informasi tidak tersedia';
            elements.variationList.innerHTML = `<p class="text-muted">Tidak ada variasi produk yang tersedia.</p>`;
            return;
        }

        elements.carousel.classList.remove('d-none');
        
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

            _addVariationToList(elements, variation, idx, item);
        });

        elements.carouselInner.innerHTML = carouselHTML;
        elements.price.textContent = `Harga: ${item.variations[0].price}`;

        _currentCarouselInstance = new bootstrap.Carousel(elements.carousel, {
            interval: false
        });

        _setupCarouselEvents(elements, item);
    };

    const _addVariationToList = function(elements, variation, idx, item) {
        const listItem = document.createElement('a');
        listItem.href = '#';
        listItem.classList.add('list-group-item', 'list-group-item-action');
        
        if (idx === 0) {
            listItem.classList.add('active');
        }

        listItem.innerHTML = `
            <div class="d-flex w-100 justify-content-between align-items-center">
                <h6 class="mb-1">${variation.name}</h6>
                <small class="text-success fw-bold">${variation.price}</small>
            </div>
        `;

        listItem.addEventListener('click', (e) => {
            e.preventDefault();
            elements.variationList.querySelectorAll('.list-group-item').forEach(el => el.classList.remove('active'));
            listItem.classList.add('active');
            elements.price.textContent = `Harga: ${variation.price}`;
            
            if (_currentCarouselInstance) {
                _currentCarouselInstance.to(idx);
            }
        });

        elements.variationList.appendChild(listItem);
    };

    const _setupCarouselEvents = function(elements, item) {
        elements.carousel.addEventListener('slide.bs.carousel', function (carouselEvent) {
            const nextIndex = carouselEvent.to;
            elements.variationList.querySelectorAll('.list-group-item').forEach(el => el.classList.remove('active'));
            
            if (elements.variationList.children[nextIndex]) {
                elements.variationList.children[nextIndex].classList.add('active');
            }
            
            elements.price.textContent = `Harga: ${item.variations[nextIndex].price}`;
        });
    };

    // Public methods
    return {
        init: function() {
            console.log('Initializing Gallery Potensi Desa...');
            _initModalEvents();
            _fetchData();
        },

        // Method to refresh data
        refresh: function() {
            _fetchData();
        },

        // Method to get current data
        getData: function() {
            return _umkmData;
        }
    };

})(jQuery);