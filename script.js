'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// DOWNLOAD BUTTON ANIMATION - VERSION CORRIGÉE
document.getElementById('downloadBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    const button = this;
    const progressBar = button.querySelector('.progress-bar');
    const buttonText = button.querySelector('.button-text');
    const successMessage = document.getElementById('successMessage');
    const originalHref = button.href; // Récupérer l'URL du fichier
    
    // Réinitialiser l'état
    button.classList.remove('completed');
    button.classList.add('downloading');
    if (successMessage) {
        successMessage.classList.remove('show');
    }
    
    let progress = 0;
    const duration = 2000; // 2 secondes pour l'animation
    const steps = 100;
    const stepDuration = duration / steps;
    
    // Démarrer le téléchargement réel immédiatement
    startRealDownload(originalHref);
    
    // Animation de progression
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        buttonText.innerHTML = `Téléchargement... <span class="percentage">${progress}%</span>`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Animation de fin
            setTimeout(() => {
                button.classList.remove('downloading');
                button.classList.add('completed');
                buttonText.innerHTML = '<span class="download-icon">✓</span> Téléchargement terminé';
                
                // Afficher le message de succès
                setTimeout(() => {
                    if (successMessage) {
                        successMessage.classList.add('show');
                    }
                }, 500);
                
                // Réinitialiser après 3 secondes
                setTimeout(() => {
                    resetButton();
                }, 3000);
                
            }, 500);
        }
    }, stepDuration);
});
function startRealDownload(fileUrl) {
  fetch(fileUrl)
    .then(response => {
      if (!response.ok) throw new Error('Erreur réseau');
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'my-resume.pdf'; // ou utilise le vrai nom si besoin
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Échec du téléchargement', error);
    });
}

function resetButton() {
    const button = document.getElementById('downloadBtn');
    const progressBar = button.querySelector('.progress-bar');
    const buttonText = button.querySelector('.button-text');
    const successMessage = document.getElementById('successMessage');
    
    if (button) {
        button.classList.remove('downloading', 'completed');
    }
    if (progressBar) {
        progressBar.style.width = '0%';
    }
    if (buttonText) {
        buttonText.innerHTML = 'Download CV (PDF)';
    }
    if (successMessage) {
        successMessage.classList.remove('show');
    }
}