/**
 * Gallery Desa Module - FIXED VERSION
 * Handles village gallery functionality with images and videos
 */

const GalleryDesa = (function ($) {
  "use strict";

  // Configuration
  const CONFIG = {
    DATA_URL: "data/galeri_desa.json",
    IMAGE_MODAL_ID: "imageDetailModal",
    VIDEO_MODAL_ID: "videoDetailModal",
    PDF_MODAL_ID: "pdfDetailModal",
  };

  // Define categories mapping
  const CATEGORIES = {
    acara_kebudayaan: "acara_kebudayaan-gallery-row",
    wisata_alam: "wisata_alam-gallery-row",
    video_desa: "video_desa-gallery-row",
    lain_lain: "lain_lain-gallery-row",
    buku_desa: "buku_desa-gallery-row",
  };

  // Private variables
  let _galleryData = {};
  let _currentImageCarouselInstance = null;
  let _currentlyPlayingVideoId = null;

  // Private methods
  const _fetchData = async function () {
    try {
      const response = await fetch(CONFIG.DATA_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      _galleryData = await response.json();
      console.log("Data galeri desa berhasil dimuat:", _galleryData);
      _renderGalleryCards();
    } catch (error) {
      console.error("Gagal memuat data galeri desa:", error);
      _showErrorMessage();
    }
  };

  const _showErrorMessage = function () {
    const galleryContent = document.getElementById("galleryTabsContent");
    if (galleryContent) {
      galleryContent.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
          Oops! Maaf, kami tidak dapat memuat data galeri desa saat ini. <br>
          Silakan coba refresh halaman atau hubungi administrator.
        </div>
      `;
    }
  };

  const _renderGalleryCards = function () {
    for (const categoryKey in CATEGORIES) {
      const rowElementId = CATEGORIES[categoryKey];
      const rowElement = document.getElementById(rowElementId);

      if (rowElement) {
        rowElement.innerHTML = "";
        const items = _galleryData[categoryKey];

        if (items && items.length > 0) {
          items.forEach((item, index) => {
            const cardHtml = _createCardHTML(item, index, categoryKey);
            rowElement.insertAdjacentHTML("beforeend", cardHtml);
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

    // Reinitialize WOW animations
    if (typeof UIComponents !== "undefined") {
      UIComponents.reinitWOW();
    }
  };

  const _createCardHTML = function (item, index, categoryKey) {
    const delay = index * 0.1 + 0.1;

    if (item.type === "image") {
      return _createImageCardHTML(item, delay, categoryKey);
    } else if (item.type === "video") {
      return _createVideoCardHTML(item, delay, categoryKey);
    } else if (item.type === "pdf") {
      return _createPdfCardHTML(item, delay, categoryKey);
    }

    return "";
  };

  const _createImageCardHTML = function (item, delay, categoryKey) {
    const mainImage = item.images && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/600x400?text=Gambar+Tidak+Tersedia";

    return `
      <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="${delay}s">
        <div class="card gallery-card h-100 shadow-sm border-0" 
             data-bs-toggle="modal" 
             data-bs-target="#${CONFIG.IMAGE_MODAL_ID}" 
             data-category="${categoryKey}" 
             data-item-id="${item.id}" 
             data-type="${item.type}">
          <img src="${mainImage}" class="card-img-top" alt="${item.title}">
          <div class="card-body text-center">
            <h5 class="card-title text-primary mb-1">${item.title}</h5>
            <p class="card-text text-muted small">${item.category}</p>
          </div>
        </div>
      </div>
    `;
  };

  const _createVideoCardHTML = function (item, delay, categoryKey) {
    // Extract video ID from YouTube URL
    const videoId = _extractYoutubeId(item.video_url);
    // Get high quality thumbnail
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // Fetch video metadata
    fetch(`https://noembed.com/embed?url=${item.video_url}`)
      .then((response) => response.json())
      .then((data) => {
        // Update card with metadata
        const cardElement = document.querySelector(`[data-video-id="${videoId}"]`);
        if (cardElement) {
          const channelElement = cardElement.querySelector(".channel-text");
          if (data.author_name) channelElement.textContent = data.author_name;
        }
      })
      .catch((error) => console.log("Error fetching video metadata:", error));

    return `
      <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="${delay}s">
        <div class="card gallery-card video-card h-100 shadow-sm border-0" 
             data-bs-toggle="modal" 
             data-bs-target="#${CONFIG.VIDEO_MODAL_ID}" 
             data-category="${categoryKey}" 
             data-item-id="${item.id}"
             data-video-id="${videoId}" 
             data-type="video">
          <div class="card-img-top-wrapper position-relative">
            <img src="${thumbnailUrl}" class="card-img-top" alt="${item.title}" style="height: 200px; object-fit: cover;">
            <div class="play-icon-overlay position-absolute top-50 start-50 translate-middle text-white">
              <i class="fas fa-play-circle fa-3x"></i>
            </div>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title text-primary mb-1">${item.title}</h5>
            <p class="card-text text-muted small mb-0">
              <span class="channel-text">Loading...</span>
            </p>
          </div>
        </div>
      </div>
    `;
  };

  const _createPdfCardHTML = function (item, delay) {
    return `
      <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="${delay}s">
        <div class="card h-100 book-card shadow-sm">
          <div class="position-relative">
            <img src="${item.cover_image}" class="card-img-top" alt="${item.title}">
            <span class="badge bg-primary">
              <i class="fas fa-book me-1"></i> PDF
            </span>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title text-primary">${item.title}</h5>
            <p class="card-text text-muted mb-3">${item.description}</p>
            <div class="d-grid gap-2">
              <button class="btn btn-outline-primary btn-sm" 
                      onclick="GalleryDesa.previewPdf('${item.pdf_url}', ${JSON.stringify(item).replace(/"/g, "&quot;")})">
                <i class="fas fa-eye me-1"></i> Preview
              </button>
              <a href="${item.pdf_url}" class="btn btn-primary btn-sm" download>
                <i class="fas fa-download me-1"></i> Download
              </a>
            </div>
          </div>
          <div class="card-footer bg-white border-0">
            <div class="d-flex justify-content-between text-muted small">
              <span><i class="fas fa-file-pdf me-1"></i> ${item.file_size}</span>
              <span><i class="fas fa-book-open me-1"></i> ${item.pages} Halaman</span>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // FIXED: Single handler for image modal
  const _handleImageModalShow = function (event) {
    const button = event.relatedTarget;
    const category = button.getAttribute("data-category");
    const itemId = parseInt(button.getAttribute("data-item-id"));
    const type = button.getAttribute("data-type");

    console.log("Modal show triggered:", { category, itemId, type }); // Debug log

    if (type !== "image") return;

    const modal = this;
    const item = _galleryData[category]?.find((dataItem) => dataItem.id === itemId);
    
    if (!item) {
      console.error("Item not found:", { category, itemId });
      return;
    }

    console.log("Found item:", item); // Debug log

    const elements = {
      title: modal.querySelector("#imageModalTitle"),
      category: modal.querySelector("#imageModalCategorySub"),
      description: modal.querySelector("#imageModalDescription"),
      date: modal.querySelector("#imageModalDate"),
      time: modal.querySelector("#imageModalTime"),
      location: modal.querySelector("#imageModalLocation"),
      contactPerson: modal.querySelector("#imageModalContactPerson"),
      whatsapp: modal.querySelector("#imageModalWhatsapp"),
      carousel: modal.querySelector("#modalImageCarousel"),
      carouselInner: modal.querySelector("#modalImageCarouselInner"),
      indicators: modal.querySelector("#modalImageCarouselIndicators"),
    };

    _resetImageModal(elements);
    _fillImageModalInfo(elements, item);
    _setupImageCarousel(elements, item);
  };

  const _handleVideoModalShow = function (event) {
    const button = event.relatedTarget;
    const videoId = button.getAttribute("data-video-id");
    const category = button.getAttribute("data-category");
    const itemId = parseInt(button.getAttribute("data-item-id"));

    const modal = this;
    const elements = {
      title: modal.querySelector("#videoModalTitle"),
      player: modal.querySelector("#videoPlayer"),
      description: modal.querySelector("#videoModalDescription"),
      channel: modal.querySelector("#videoModalChannel"),
      date: modal.querySelector("#videoModalDate"),
    };

    const item = _galleryData[category]?.find((dataItem) => dataItem.id === itemId);

    if (item) {
      elements.title.textContent = item.title;
      elements.description.textContent = item.description;
      elements.player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

      // Fetch video metadata
      fetch(`https://noembed.com/embed?url=${item.video_url}`)
        .then((response) => response.json())
        .then((data) => {
          elements.channel.textContent = data.author_name || "Unknown Channel";
          elements.date.textContent = new Date(data.upload_date || Date.now()).toLocaleDateString("id-ID");
        })
        .catch(() => {
          elements.channel.textContent = "Unknown Channel";
          elements.date.textContent = "-";
        });
    }
  };

  const _handleVideoModalHide = function () {
    const videoPlayer = document.getElementById("videoPlayer");
    if (videoPlayer) {
      videoPlayer.src = "";
    }
    _currentlyPlayingVideoId = null;
  };

  const _setupImageCarousel = function (elements, item) {
    if (item.images && item.images.length > 0) {
      let carouselHTML = "";
      let indicatorsHTML = "";

      item.images.forEach((imgSrc, idx) => {
        carouselHTML += `
          <div class="carousel-item ${idx === 0 ? "active" : ""}">
            <img src="${imgSrc}" class="d-block w-100 rounded" alt="${item.title} Gambar ${idx + 1}">
          </div>
        `;
        indicatorsHTML += `
          <button type="button" data-bs-target="#modalImageCarousel" 
                  data-bs-slide-to="${idx}" 
                  class="${idx === 0 ? "active" : ""}" 
                  aria-current="${idx === 0 ? "true" : "false"}" 
                  aria-label="Slide ${idx + 1}"></button>
        `;
      });

      elements.carouselInner.innerHTML = carouselHTML;
      elements.indicators.innerHTML = indicatorsHTML;

      // Show/hide carousel controls based on image count
      const prevBtn = elements.carousel.querySelector(".carousel-control-prev");
      const nextBtn = elements.carousel.querySelector(".carousel-control-next");
      
      if (item.images.length > 1) {
        prevBtn.style.display = "flex";
        nextBtn.style.display = "flex";
        elements.indicators.style.display = "flex";
        
        // Initialize Bootstrap Carousel
        _currentImageCarouselInstance = new bootstrap.Carousel(elements.carousel, {
          interval: 5000,
        });
      } else {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        elements.indicators.style.display = "none";
      }
    } else {
      elements.carouselInner.innerHTML = `
        <div class="carousel-item active">
          <img src="https://via.placeholder.com/600x400?text=Tidak+Ada+Gambar" 
               class="d-block w-100 rounded" alt="Tidak Ada Gambar">
        </div>
      `;
      // Hide navigation buttons and indicators if no images
      elements.carousel.querySelector(".carousel-control-prev").style.display = "none";
      elements.carousel.querySelector(".carousel-control-next").style.display = "none";
      elements.indicators.style.display = "none";
    }
  };

  const _resetImageModal = function (elements) {
    // Reset text content
    if (elements.title) elements.title.textContent = "";
    if (elements.category) elements.category.textContent = "";
    if (elements.description) elements.description.textContent = "";
    if (elements.date) elements.date.textContent = "";
    if (elements.time) elements.time.textContent = "";
    if (elements.location) elements.location.textContent = "";
    if (elements.contactPerson) elements.contactPerson.textContent = "";

    // Reset carousel
    if (elements.carouselInner) elements.carouselInner.innerHTML = "";
    if (elements.indicators) elements.indicators.innerHTML = "";

    // Dispose previous carousel instance
    if (_currentImageCarouselInstance) {
      _currentImageCarouselInstance.dispose();
      _currentImageCarouselInstance = null;
    }
  };

  const _fillImageModalInfo = function (elements, item) {
    elements.title.textContent = item.title || "Tidak ada judul";
    elements.category.textContent = item.category || "Tidak ada kategori";
    elements.description.textContent = item.description || "Tidak ada deskripsi";
    elements.date.textContent = item.date || "Tidak tersedia";
    elements.time.textContent = item.time || "Tidak tersedia";
    elements.location.textContent = item.location || "Tidak tersedia";
    elements.contactPerson.textContent = item.contact_person || "Tidak tersedia";

    if (item.whatsapp) {
      elements.whatsapp.href = `https://wa.me/${item.whatsapp}`;
      elements.whatsapp.style.display = "inline-block";
    } else {
      elements.whatsapp.style.display = "none";
    }
  };

  // FIXED: Simplified modal initialization
  const _initModalEvents = function () {
    const imageModal = document.getElementById(CONFIG.IMAGE_MODAL_ID);
    const videoModal = document.getElementById(CONFIG.VIDEO_MODAL_ID);
    const pdfModal = document.getElementById(CONFIG.PDF_MODAL_ID);

    if (imageModal) {
      imageModal.addEventListener("show.bs.modal", _handleImageModalShow);
      imageModal.addEventListener("hidden.bs.modal", function () {
        if (_currentImageCarouselInstance) {
          _currentImageCarouselInstance.dispose();
          _currentImageCarouselInstance = null;
        }
      });
    }

    if (videoModal) {
      videoModal.addEventListener("show.bs.modal", _handleVideoModalShow);
      videoModal.addEventListener("hidden.bs.modal", _handleVideoModalHide);
    }

    if (pdfModal) {
      pdfModal.addEventListener("hidden.bs.modal", function () {
        const pdfViewer = pdfModal.querySelector("#pdfViewer");
        if (pdfViewer) {
          pdfViewer.src = "";
        }
      });
    }
  };

  // Add helper function to extract YouTube ID
  const _extractYoutubeId = function (url) {
    if (!url) return "";

    let videoId = "";
    try {
      // Handle different YouTube URL formats
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1];
      } else if (url.includes("youtube.com/embed/")) {
        videoId = url.split("embed/")[1];
      }

      // Remove any additional parameters
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }

      // Remove any query parameters
      const questionMarkPosition = videoId.indexOf("?");
      if (questionMarkPosition !== -1) {
        videoId = videoId.substring(0, questionMarkPosition);
      }

      return videoId;
    } catch (error) {
      console.error("Error extracting YouTube ID:", error);
      return "";
    }
  };

  const _init = function () {
    _fetchData();
    _initModalEvents();
  };

  // Public methods
  return {
    init: _init,
    previewPdf: function (pdfUrl, bookData) {
      const modal = document.getElementById(CONFIG.PDF_MODAL_ID);
      if (!modal) return;

      const pdfViewer = modal.querySelector("#pdfViewer");
      const modalTitle = modal.querySelector("#pdfModalTitle");

      if (pdfViewer && modalTitle) {
        pdfViewer.src = pdfUrl;
        modalTitle.textContent = bookData.title;

        // Show modal
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
      }
    },
  };
})(jQuery);

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  GalleryDesa.init();
});