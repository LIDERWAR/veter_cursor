// ИРВЕЗТЕХ - Основной JavaScript файл

// DOM элементы
const header = document.querySelector('.header');
const mobileBtn = document.querySelector('.header__mobile-btn');
const mobileMenu = document.querySelector('.header__mobile-menu');
const navLinks = document.querySelectorAll('.header__nav-link, .header__mobile-menu-link');
const sections = document.querySelectorAll('section[id]');

// Состояние
let isMobileMenuOpen = false;
let lastScrollTop = 0;

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    if (header) initScrollEffects();
    if (mobileBtn && mobileMenu) initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initParallaxEffect();
    initFormValidation();
    initAboutSlider();
});

// Мобильное меню
const initMobileMenu = () => {
    if (!mobileBtn || !mobileMenu) return;

    mobileBtn.addEventListener('click', toggleMobileMenu);
    
    // Закрытие меню при клике на ссылку
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                }
            });
        });
    }

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (isMobileMenuOpen && !mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });

    // Закрытие меню при изменении ориентации экрана
    window.addEventListener('orientationchange', () => {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        }
    });

    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', () => {
        if (isMobileMenuOpen && window.innerWidth > 1260) {
            closeMobileMenu();
        }
    });
};

const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
};

const openMobileMenu = () => {
    if (!mobileBtn || !mobileMenu) return;
    
    isMobileMenuOpen = true;
    mobileBtn.classList.add('header__mobile-btn--active');
    mobileMenu.classList.add('header__mobile-menu--active');
    document.body.style.overflow = 'hidden';
    
    // Добавляем класс для body
    document.body.classList.add('mobile-menu-open');
    
    // Анимация появления пунктов меню с задержкой
    const menuItems = mobileMenu.querySelectorAll('.header__mobile-menu-link');
    if (menuItems && menuItems.length > 0) {
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'none';
            
            // Используем requestAnimationFrame для плавной анимации
            requestAnimationFrame(() => {
                setTimeout(() => {
                    item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 80); // Уменьшаем задержку для более быстрого появления
            });
        });
    }

    // Добавляем анимацию для кнопки
    if (mobileBtn) {
        mobileBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            mobileBtn.style.transform = 'scale(1)';
        }, 150);
    }
};

const closeMobileMenu = () => {
    if (!mobileBtn || !mobileMenu) return;
    
    isMobileMenuOpen = false;
    mobileBtn.classList.remove('header__mobile-btn--active');
    mobileMenu.classList.remove('header__mobile-menu--active');
    document.body.style.overflow = '';
    document.body.classList.remove('mobile-menu-open');
    
    // Анимация исчезновения пунктов меню
    const menuItems = mobileMenu.querySelectorAll('.header__mobile-menu-link');
    if (menuItems && menuItems.length > 0) {
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
            }, index * 30); // Быстрое исчезновение
        });
    }

    // Сброс анимации через некоторое время
    setTimeout(() => {
        if (menuItems && menuItems.length > 0) {
            menuItems.forEach(item => {
                item.style.opacity = '';
                item.style.transform = '';
                item.style.transition = '';
            });
        }
    }, 500);

    // Анимация для кнопки
    if (mobileBtn) {
        mobileBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            mobileBtn.style.transform = 'scale(1)';
        }, 150);
    }
};

// Эффекты при скролле
const initScrollEffects = () => {
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Компактное меню при скролле
        if (scrollTop > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        // Параллакс эффект для hero секции
        if (scrollTop <= window.innerHeight) {
            const hero = document.querySelector('.hero');
            if (hero) {
                const scrolled = scrollTop * 0.5;
                hero.style.transform = `translateY(${scrolled}px)`;
            }
        }
        
        lastScrollTop = scrollTop;
    });
};

// Плавная прокрутка
const initSmoothScrolling = () => {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Анимации при скролле
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Добавление анимаций для разных элементов
                if (entry.target.classList.contains('catalog__card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
            }
        });
    }, observerOptions);

    // Наблюдение за элементами
    const animatedElements = document.querySelectorAll('.scroll-animate, .catalog__card, .advantages__card, .reviews__card, .news__card');
    animatedElements.forEach(el => observer.observe(el));
};

// Параллакс эффект
const initParallaxEffect = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled <= window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
};

// Валидация форм
const initFormValidation = () => {
    const contactForm = document.querySelector('.contact__form');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Добавление стилей при фокусе
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            validateField(input);
        });
        
        // Валидация в реальном времени
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Обработка отправки формы
    contactForm.addEventListener('submit', handleFormSubmit);
};

const validateField = (field) => {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Удаление предыдущих ошибок
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Валидация по типу поля
    switch (field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Введите корректный email';
            }
            break;
            
        case 'tel':
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (value && !phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Введите корректный номер телефона';
            }
            break;
            
        default:
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'Это поле обязательно для заполнения';
            }
    }

    // Отображение ошибки
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = 'var(--color-error)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = 'var(--spacing-xs)';
        field.parentElement.appendChild(errorDiv);
    }

    return isValid;
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isFormValid = true;

    // Валидация всех полей
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        // Показ успешного сообщения
        showSuccessMessage(form);
        
        // Сброс формы
        form.reset();
        
        // Удаление классов фокуса
        inputs.forEach(input => {
            input.parentElement.classList.remove('focused');
        });
    }
};

const showSuccessMessage = (form) => {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: var(--color-success);
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            margin-top: var(--spacing-md);
            text-align: center;
            font-weight: var(--font-weight-medium);
        ">
            ✅ Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
        </div>
    `;
    
    form.appendChild(successDiv);
    
    // Удаление сообщения через 5 секунд
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
};

// Дополнительные утилиты
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Оптимизация производительности
const throttledScrollHandler = debounce(() => {
    // Обработка скролла с ограничением частоты
}, 16);

// Инициализация слайдера "О компании"
const initAboutSlider = () => {
    const aboutSlider = document.querySelector('.about__slider');
    if (!aboutSlider) return;

    const slides = aboutSlider.querySelectorAll('.about__slide');
    const dots = aboutSlider.querySelectorAll('.about__slider-dot');
    const prevBtn = aboutSlider.querySelector('.about__slider-btn--prev');
    const nextBtn = aboutSlider.querySelector('.about__slider-btn--next');
    
    if (!slides.length || !dots.length || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    let autoplayInterval;

    // Функция показа слайда
    const showSlide = (index) => {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.classList.remove('about__slide--active');
        });
        
        // Убираем активный класс со всех точек
        dots.forEach(dot => {
            dot.classList.remove('about__slider-dot--active');
        });
        
        // Показываем нужный слайд
        if (slides[index]) {
            slides[index].classList.add('about__slide--active');
        }
        
        // Активируем нужную точку
        if (dots[index]) {
            dots[index].classList.add('about__slider-dot--active');
        }
        
        currentSlide = index;
    };

    // Функция следующего слайда
    const nextSlide = () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    };

    // Функция предыдущего слайда
    const prevSlide = () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    };

    // Обработчики для кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Автопрокрутка
    const startAutoplay = () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoplay = () => {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    };

    // Пауза при наведении
    aboutSlider.addEventListener('mouseenter', stopAutoplay);
    aboutSlider.addEventListener('mouseleave', startAutoplay);

    // Запускаем автопрокрутку
    startAutoplay();

    // Обработка клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    console.log('About slider initialized');
};

// Экспорт функций для использования в других модулях
window.IRVEZTECH = {
    toggleMobileMenu,
    openMobileMenu,
    closeMobileMenu,
    validateField,
    handleFormSubmit,
    initAboutSlider
}; 