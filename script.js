// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== PRODUCT MODAL =====
const productData = {
    'blok-haus': {
        title: 'Блок хаус',
        description: 'Металлический сайдинг с имитацией бревна. Создает эффект натурального деревянного дома, сочетая эстетику дерева с долговечностью металла.',
        specs: {
            'Вид': 'Блок хаус',
            'Направление': 'Горизонтальное',
            'Материал': 'Оцинкованная сталь',
            'Поверхность': 'Текстурированная',
            'Рисунок': 'Имитация бревна',
            'Длина': 'До 6000 мм',
            'Ширина': '240 мм',
            'Толщина': '0.4-0.5 мм',
            'Покрытие': 'Полимерное',
            'Гарантия': '25 лет'
        },
        features: [
            'Реалистичная имитация натурального дерева',
            'Устойчивость к коррозии и выцветанию',
            'Простота монтажа',
            'Не требует покраски и специального ухода',
            'Пожаробезопасность',
            'Экологичность'
        ]
    },
    'l-brus': {
        title: 'Сайдинг «L-брус»',
        description: 'Современный профиль металлосайдинга, универсальное решение для облицовки любого фасада. Подходит для вертикального и горизонтального монтажа.',
        specs: {
            'Вид': 'L-брус',
            'Направление': 'Вертикальное, горизонтальное',
            'Материал': 'Оцинкованная сталь',
            'Поверхность': 'Матовая',
            'Рисунок': 'Однотонный',
            'Длина': 'До 6000 мм',
            'Ширина': '240 мм',
            'Толщина': '0.4 мм',
            'Покрытие': 'Полимерное',
            'Гарантия': '25 лет'
        },
        features: [
            'Универсальность применения',
            'Широкая цветовая гамма',
            'Высокая прочность',
            'Устойчивость к температурным перепадам',
            'Легкий вес',
            'Долговечность'
        ]
    },
    'ral-7004': {
        title: 'RAL-7004 Светло-серый',
        description: 'Классический светло-серый цвет, идеально подходит для современных зданий. Нейтральный оттенок гармонично сочетается с любой архитектурой.',
        specs: {
            'Вид': 'L-брус',
            'Направление': 'Вертикальное, горизонтальное',
            'Материал': 'Металл',
            'Поверхность': 'Гладкая',
            'Рисунок': 'Однотонный',
            'Длина': 'До 6000 мм',
            'Ширина': '240 мм',
            'Толщина': '0.4 мм',
            'Цвет': 'RAL-7004 Светло-серый',
            'Гарантия': '25 лет'
        },
        features: [
            'Универсальный цвет',
            'Не выгорает на солнце',
            'Легко комбинируется с другими цветами',
            'Подходит для любого стиля',
            'Визуально увеличивает пространство'
        ]
    },
    'ral-8019': {
        title: 'RAL-8019 Шоколад',
        description: 'Элегантный темно-коричневый оттенок премиум класса. Создает респектабельный и солидный внешний вид здания.',
        specs: {
            'Вид': 'L-брус',
            'Направление': 'Вертикальное, горизонтальное',
            'Материал': 'Металл',
            'Поверхность': 'Матовая',
            'Рисунок': 'Однотонный',
            'Длина': 'До 6000 мм',
            'Ширина': '240 мм',
            'Толщина': '0.4 мм',
            'Цвет': 'RAL-8019 Темно-коричневый (шоколад)',
            'Гарантия': '25 лет'
        },
        features: [
            'Премиум внешний вид',
            'Отлично сочетается с натуральными материалами',
            'Скрывает небольшие загрязнения',
            'Создает уютную атмосферу',
            'Популярный выбор для частных домов'
        ]
    },
    'ral-1015': {
        title: 'RAL-1015 Светло-бежевый',
        description: 'Теплый бежевый оттенок для создания уютного внешнего вида. Идеален для классических и традиционных архитектурных стилей.',
        specs: {
            'Вид': 'L-брус',
            'Направление': 'Вертикальное, горизонтальное',
            'Материал': 'Металл',
            'Поверхность': 'Матовая',
            'Рисунок': 'Однотонный',
            'Длина': 'До 6000 мм',
            'Ширина': '240 мм',
            'Толщина': '0.4 мм',
            'Цвет': 'RAL-1015 Светло-бежевый',
            'Гарантия': '25 лет'
        },
        features: [
            'Теплый и уютный оттенок',
            'Визуально смягчает архитектуру',
            'Хорошо отражает свет',
            'Подходит для южных регионов',
            'Классический выбор'
        ]
    },
    'ral-9003': {
        title: 'RAL-9003 Белый',
        description: 'Чистый белый цвет для минималистичного дизайна. Создает ощущение чистоты, простора и современности.',
        specs: {
            'Вид': 'L-брус',
            'Направление': 'Вертикальное, горизонтальное',
            'Материал': 'Металл',
            'Поверхность': 'Матовая',
            'Рисунок': 'Однотонный',
            'Длина': 'До 6000 мм',
            'Ширина': '240 мм',
            'Толщина': '0.4 мм',
            'Цвет': 'RAL-9003 Белый',
            'Гарантия': '25 лет'
        },
        features: [
            'Визуально увеличивает здание',
            'Отражает солнечные лучи',
            'Современный и стильный',
            'Универсальность применения',
            'Подходит для минимализма'
        ]
    },
    'wood-3d': {
        title: '3D Дерево',
        description: 'Реалистичная имитация натурального дерева с 3D эффектом. Передает текстуру и рельеф настоящего дерева.',
        specs: {
            'Вид': 'L-брус',
            'Направление': 'Вертикальное, горизонтальное',
            'Материал': 'Металл',
            'Поверхность': 'Текстурированная 3D',
            'Рисунок': 'Имитация дерева',
            'Длина': 'До 6000 мм',
            'Ширина': '240 мм',
            'Толщина': '0.4 мм',
            'Цвет': 'Деревянный (натуральный)',
            'Гарантия': '25 лет'
        },
        features: [
            'Реалистичная 3D текстура',
            'Эффект натурального дерева',
            'Не требует обработки как дерево',
            'Устойчивость к влаге и насекомым',
            'Долговечность металла',
            'Эстетика дерева'
        ]
    },
    'mahogany': {
        title: 'Дерево Махагон',
        description: 'Премиальная текстура красного дерева. Роскошный внешний вид для эксклюзивных проектов.',
        specs: {
            'Вид': 'L-брус',
            'Направление': 'Вертикальное, горизонтальное',
            'Материал': 'Металл',
            'Поверхность': 'Текстурированная',
            'Рисунок': 'Имитация красного дерева',
            'Длина': 'До 6000 мм',
            'Ширина': '240 мм',
            'Толщина': '0.4 мм',
            'Цвет': 'Красное дерево (махагон)',
            'Гарантия': '25 лет'
        },
        features: [
            'Премиум класс',
            'Роскошный внешний вид',
            'Имитация ценных пород дерева',
            'Эксклюзивность',
            'Статусность',
            'Долговечность'
        ]
    }
};

function openProductModal(productId) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    const product = productData[productId];

    if (!product) return;

    let specsHTML = '';
    for (const [key, value] of Object.entries(product.specs)) {
        specsHTML += `
            <div class="spec-row">
                <span class="spec-key">${key}:</span>
                <span class="spec-value">${value}</span>
            </div>
        `;
    }

    let featuresHTML = '';
    product.features.forEach(feature => {
        featuresHTML += `
            <li class="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                ${feature}
            </li>
        `;
    });

    modalBody.innerHTML = `
        <h2 class="modal-title">${product.title}</h2>
        <p class="modal-description">${product.description}</p>
        
        <div class="modal-section">
            <h3 class="modal-section-title">Технические характеристики</h3>
            <div class="specs-list">
                ${specsHTML}
            </div>
        </div>
        
        <div class="modal-section">
            <h3 class="modal-section-title">Преимущества</h3>
            <ul class="features-list">
                ${featuresHTML}
            </ul>
        </div>
        
        <div class="modal-actions">
            <a href="https://wa.me/77717373783?text=Здравствуйте! Интересует ${product.title}" class="btn btn-primary btn-large" target="_blank">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Заказать в WhatsApp
            </a>
            <a href="tel:+77717373783" class="btn btn-secondary btn-large">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Позвонить
            </a>
        </div>
    `;

    // Add modal styles
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-title {
                font-family: var(--font-heading);
                font-size: 2rem;
                font-weight: 800;
                margin-bottom: var(--spacing-md);
                color: var(--text-primary);
            }
            
            .modal-description {
                font-size: 1.125rem;
                color: var(--text-secondary);
                line-height: 1.8;
                margin-bottom: var(--spacing-xl);
            }
            
            .modal-section {
                margin-bottom: var(--spacing-xl);
            }
            
            .modal-section-title {
                font-family: var(--font-heading);
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: var(--spacing-md);
                color: var(--text-primary);
            }
            
            .specs-list {
                background: var(--bg-secondary);
                border-radius: var(--radius-md);
                padding: var(--spacing-lg);
            }
            
            .spec-row {
                display: flex;
                justify-content: space-between;
                padding: var(--spacing-sm) 0;
                border-bottom: 1px solid var(--border-color);
            }
            
            .spec-row:last-child {
                border-bottom: none;
            }
            
            .spec-key {
                font-weight: 600;
                color: var(--text-secondary);
            }
            
            .spec-value {
                color: var(--text-primary);
                font-weight: 500;
            }
            
            .features-list {
                list-style: none;
                display: grid;
                gap: var(--spacing-md);
            }
            
            .feature-item {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                font-size: 1rem;
                color: var(--text-secondary);
            }
            
            .feature-item svg {
                color: var(--primary-color);
                flex-shrink: 0;
            }
            
            .modal-actions {
                display: flex;
                gap: var(--spacing-md);
                margin-top: var(--spacing-xl);
                flex-wrap: wrap;
            }
            
            .modal-actions .btn {
                flex: 1;
                min-width: 200px;
            }
            
            @media (max-width: 768px) {
                .modal-actions {
                    flex-direction: column;
                }
                
                .modal-actions .btn {
                    width: 100%;
                }
                
                .spec-row {
                    flex-direction: column;
                    gap: var(--spacing-xs);
                }
            }
        `;
        document.head.appendChild(style);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message
    let whatsappMessage = `Здравствуйте! Меня зовут ${name}.%0A`;
    whatsappMessage += `Город/Село: ${city}%0A`;
    whatsappMessage += `Мой телефон: ${phone}%0A`;
    if (message) {
        whatsappMessage += `Сообщение: ${message}`;
    }

    // Open WhatsApp
    window.open(`https://wa.me/77717373783?text=${whatsappMessage}`, '_blank');

    // Reset form
    contactForm.reset();

    // Show success message
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.product-card, .advantage-card, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===== PHONE NUMBER FORMATTING =====
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 0) {
        if (value[0] === '8') {
            value = '7' + value.slice(1);
        }
        if (value[0] !== '7') {
            value = '7' + value;
        }
    }

    let formatted = '+';
    if (value.length > 0) {
        formatted += value.substring(0, 1);
    }
    if (value.length > 1) {
        formatted += ' (' + value.substring(1, 4);
    }
    if (value.length > 4) {
        formatted += ') ' + value.substring(4, 7);
    }
    if (value.length > 7) {
        formatted += '-' + value.substring(7, 9);
    }
    if (value.length > 9) {
        formatted += '-' + value.substring(9, 11);
    }

    e.target.value = formatted;
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('🚀 Baqstroy.kz - Металлический сайдинг премиум качества');
