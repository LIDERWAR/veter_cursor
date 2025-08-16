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

// Навигация по секциям и активное состояние ссылок
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.header__nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Плавная прокрутка к секциям
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Убираем активный класс со всех ссылок
                navLinks.forEach(link => link.classList.remove('header__nav-link--active'));
                
                // Добавляем активный класс к текущей ссылке
                this.classList.add('header__nav-link--active');
                
                // Плавная прокрутка к секции
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Отслеживание активной секции при прокрутке
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100; // Небольшой отступ
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Убираем активный класс со всех ссылок
                navLinks.forEach(link => link.classList.remove('header__nav-link--active'));
                
                // Добавляем активный класс к соответствующей ссылке
                const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('header__nav-link--active');
                }
            }
        });
    }
    
    // Обновляем активную ссылку при прокрутке
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Устанавливаем активную ссылку при загрузке страницы
    updateActiveNavLink();
    
    // Эффект скролла для фиксированного меню
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }
    
    // Обрабатываем скролл для меню
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Устанавливаем начальное состояние
    handleHeaderScroll();
    
    // Обработка кнопок "Подробнее" в каталоге
    const catalogButtons = document.querySelectorAll('.catalog__btn');
    catalogButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.catalog__card');
            const title = card.querySelector('.catalog__card-title').textContent;
            alert(`Подробная информация о ${title} будет загружена в ближайшее время.`);
        });
    });
    
    // Обработка кнопки "Запросить расчет" в hero секции
    const heroButton = document.querySelector('.hero__cta-btn');
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            // Прокрутка к форме контактов
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Обработка кнопки "Подробнее о компании"
    const aboutButton = document.querySelector('.about__cta-btn');
    if (aboutButton) {
        aboutButton.addEventListener('click', function() {
            alert('Подробная информация о компании будет загружена в ближайшее время.');
        });
    }
    
    // Обработка кнопки "Подробнее" в новостях
    const newsLinks = document.querySelectorAll('.news__read-more');
    newsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Полная статья будет загружена в ближайшее время.');
        });
    });
    
    // Обработка формы контактов
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const company = formData.get('company');
            const message = formData.get('message');
            
            // Простая валидация
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все обязательные поля (имя, email, сообщение).');
                return;
            }
            
            // Имитация отправки формы
            alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.`);
            
            // Очищаем форму
            this.reset();
        });
    }
    
    // Обработка ссылок в футере
    const footerLinks = document.querySelectorAll('.footer__link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Убираем активный класс со всех ссылок в навигации
                const navLinks = document.querySelectorAll('.header__nav-link');
                navLinks.forEach(navLink => navLink.classList.remove('header__nav-link--active'));
                
                // Добавляем активный класс к соответствующей ссылке в навигации
                const activeNavLink = document.querySelector(`[href="#${targetId}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('header__nav-link--active');
                }
                
                // Плавная прокрутка к секции
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 