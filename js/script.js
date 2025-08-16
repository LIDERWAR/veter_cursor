// Header functionality
document.addEventListener('DOMContentLoaded', () => {
    // Language switching
    const langItems = document.querySelectorAll('.header__lang-item');
    
    langItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            langItems.forEach(lang => lang.classList.remove('header__lang-item--active'));
            // Add active class to clicked item
            item.classList.add('header__lang-item--active');
        });
    });

    // Quote button functionality
    const quoteBtn = document.querySelector('.header__quote-btn');
    if (quoteBtn) {
        quoteBtn.addEventListener('click', () => {
            alert('Форма запроса предложения будет открыта здесь');
        });
    }

    // Phone link functionality
    const phoneLink = document.querySelector('.header__phone-link');
    if (phoneLink) {
        phoneLink.addEventListener('click', (e) => {
            e.preventDefault();
            const phoneNumber = phoneLink.textContent;
            if (confirm(`Позвонить по номеру ${phoneNumber}?`)) {
                window.location.href = `tel:+73952999999`;
            }
        });
    }

    // Main content buttons functionality
    const catalogBtn = document.querySelector('.main-content__catalog-btn');
    if (catalogBtn) {
        catalogBtn.addEventListener('click', () => {
            alert('Каталог вездеходов будет открыт здесь');
        });
    }

    const vehicleBtns = document.querySelectorAll('.main-content__vehicle-btn');
    vehicleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const btnText = btn.textContent;
            if (btnText.includes('ХАРАКТЕРИСТИКИ')) {
                alert('Характеристики вездехода ВЕТЕР будут показаны здесь');
            } else if (btnText.includes('КАЛЬКУЛЯТОР')) {
                alert('Калькулятор вездехода будет открыт здесь');
            }
        });
    });
}); 