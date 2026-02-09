// ===========================
// Smooth Scroll & Navigation
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // ===========================
    // Contact Form Handling
    // ===========================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            // Show success message
            showNotification('Хабарламаңыз үшін рахмет! Біз сізбен жақын арада байланысамыз.', 'success');

            // Reset form
            contactForm.reset();

            // In production, you would send this data to your backend
            console.log('Form submitted:', formData);
        });
    }

    // ===========================
    // Intersection Observer for Animations
    // ===========================
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

    // Observe all cards and sections
    document.querySelectorAll('.expertise-card, .project-card, .trust-feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===========================
    // Dynamic Stats Counter
    // ===========================
    const stats = document.querySelectorAll('.stat-item h3');
    let statsAnimated = false;

    const animateStats = () => {
        if (statsAnimated) return;

        stats.forEach(stat => {
            const target = stat.textContent;
            const number = parseInt(target.replace(/\D/g, ''));
            const suffix = target.replace(/[0-9]/g, '');
            const duration = 2000;
            const increment = number / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < number) {
                    stat.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });

        statsAnimated = true;
    };

    // Trigger stats animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // ===========================
    // Image Fade-in Animation
    // ===========================
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.8s ease';
            img.onload = () => img.style.opacity = '1';
        }
    });

    // ===========================
    // Project Card Hover Effects
    // ===========================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '1';
        });
    });

    // ===========================
    // CTA Button Actions
    // ===========================
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary, .btn-primary-large');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            if (!this.type || this.type !== 'submit') {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ===========================
    // Video Modal Logic
    // ===========================
    const videoButton = document.querySelector('.btn-secondary');
    const videoModal = document.getElementById('videoModal');
    const closeVideo = document.getElementById('closeVideo');
    const videoPlayer = document.getElementById('videoPlayer');

    if (videoButton && videoModal && closeVideo) {
        videoButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Premium Video Content (Using a high-quality architectural video as a placeholder)
            // In production, replace this with your own video URL (YouTube, Vimeo, or direct link)
            videoPlayer.innerHTML = `
                <iframe width="100%" height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                    title="BAQSTROY Video Presentation" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;

            videoModal.style.display = 'flex';
            setTimeout(() => videoModal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        const closeModal = () => {
            videoModal.classList.remove('active');
            setTimeout(() => {
                videoModal.style.display = 'none';
                videoPlayer.innerHTML = ''; // Stop video
            }, 400);
            document.body.style.overflow = '';
        };

        closeVideo.addEventListener('click', closeModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ===========================
    // Image Modal Logic (Catalog & Projects)
    // ===========================
    const previewBtns = document.querySelectorAll('.catalog-btn, .view-project-btn');
    const imageModal = document.getElementById('imageModal');
    const closeImageModal = document.getElementById('closeImageModal');
    const fullImage = document.getElementById('fullImage');

    if (previewBtns.length > 0 && imageModal && closeImageModal && fullImage) {
        previewBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const imageSrc = this.getAttribute('data-image');

                if (imageSrc) {
                    fullImage.src = imageSrc;
                    imageModal.style.display = 'flex';
                    setTimeout(() => imageModal.classList.add('active'), 10);
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeImgModal = () => {
            imageModal.classList.remove('active');
            setTimeout(() => {
                imageModal.style.display = 'none';
                fullImage.src = '';
            }, 400);
            document.body.style.overflow = '';
        };

        closeImageModal.addEventListener('click', closeImgModal);
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) closeImgModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                closeImgModal();
            }
        });
    }

    // ===========================
    // Notification System
    // ===========================
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: ${type === 'success' ? '#10B981' : '#3B82F6'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Add notification animations to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .notification-icon {
            font-size: 20px;
            font-weight: bold;
        }

        .notification-message {
            font-size: 15px;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);

    // ===========================
    // Phone Number Formatting
    // ===========================
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                if (value[0] === '8' || value[0] === '7') {
                    value = '7' + value.substring(1);
                }

                let formatted = '+7';
                if (value.length > 1) {
                    formatted += ' (' + value.substring(1, 4);
                }
                if (value.length >= 5) {
                    formatted += ') ' + value.substring(4, 7);
                }
                if (value.length >= 8) {
                    formatted += '-' + value.substring(7, 9);
                }
                if (value.length >= 10) {
                    formatted += '-' + value.substring(9, 11);
                }

                e.target.value = formatted;
            }
        });
    }

    // ===========================
    // Parallax Effect for Hero
    // ===========================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');

        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // ===========================
    // Loading Animation
    // ===========================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===========================
    // Project Modal Logic
    // ===========================
    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = document.getElementById('closeProjectModal');
    const projectForm = document.getElementById('projectForm');
    const projectButtons = document.querySelectorAll('.btn-primary');
    const projectPhoneInput = document.getElementById('projectPhone');

    // Open project modal when "Узнать подробнее" buttons are clicked
    projectButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            projectModal.style.display = 'flex';
            setTimeout(() => projectModal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        });
    });

    // Close project modal
    const closeProjectModalFunc = () => {
        projectModal.classList.remove('active');
        setTimeout(() => {
            projectModal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    };

    if (closeProjectModal) {
        closeProjectModal.addEventListener('click', closeProjectModalFunc);
    }

    // Close on background click
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeProjectModalFunc();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModalFunc();
        }
    });

    // Phone number formatting for project form
    if (projectPhoneInput) {
        projectPhoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                if (value[0] === '8' || value[0] === '7') {
                    value = '7' + value.substring(1);
                }

                let formatted = '+7';
                if (value.length > 1) {
                    formatted += ' (' + value.substring(1, 4);
                }
                if (value.length >= 5) {
                    formatted += ') ' + value.substring(4, 7);
                }
                if (value.length >= 8) {
                    formatted += '-' + value.substring(7, 9);
                }
                if (value.length >= 10) {
                    formatted += '-' + value.substring(9, 11);
                }

                e.target.value = formatted;
            }
        });
    }

    // Handle project form submission
    if (projectForm) {
        projectForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('projectName').value,
                surname: document.getElementById('projectSurname').value,
                phone: document.getElementById('projectPhone').value,
                city: document.getElementById('projectCity').value,
                timestamp: new Date().toISOString()
            };

            // Save to localStorage (database simulation)
            saveToDatabase(formData);

            // Send to WhatsApp
            sendToWhatsApp(formData);

            // Show success notification
            showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');

            // Reset form and close modal
            projectForm.reset();
            closeProjectModalFunc();
        });
    }

    // Save data to localStorage (database simulation)
    function saveToDatabase(data) {
        try {
            // Get existing data
            let projectRequests = JSON.parse(localStorage.getItem('projectRequests')) || [];

            // Add new request
            projectRequests.push(data);

            // Save back to localStorage
            localStorage.setItem('projectRequests', JSON.stringify(projectRequests));

            console.log('✅ Данные сохранены в базу:', data);
            console.log('📊 Всего заявок в базе:', projectRequests.length);
        } catch (error) {
            console.error('❌ Ошибка сохранения в базу:', error);
        }
    }

    // Send data to WhatsApp
    function sendToWhatsApp(data) {
        // Format message for WhatsApp
        const message = `🏗️ *Новая заявка BAQSTROY*\n\n` +
            `👤 Имя: ${data.name}\n` +
            `👤 Фамилия: ${data.surname}\n` +
            `📱 Телефон: ${data.phone}\n` +
            `🏙️ Город: ${data.city}\n` +
            `📅 Дата: ${new Date(data.timestamp).toLocaleString('ru-RU')}`;

        // WhatsApp phone number (replace with your actual WhatsApp number)
        // Format: country code + number without + or spaces
        const whatsappNumber = '77086144299'; // Baqstroy WhatsApp number

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');

        console.log('📱 Отправка в WhatsApp:', whatsappURL);
    }

    // Function to view all saved requests (for admin/debugging)
    window.viewAllRequests = function () {
        const requests = JSON.parse(localStorage.getItem('projectRequests')) || [];
        console.log('📊 Все заявки в базе данных:', requests);
        console.table(requests);
        return requests;
    };

    // Function to clear all requests (for admin/debugging)
    window.clearAllRequests = function () {
        localStorage.removeItem('projectRequests');
        console.log('🗑️ База данных очищена');
    };

    // ===========================
    // Gallery Carousel Logic
    // ===========================
    const galleryModal = document.getElementById('galleryModal');
    const closeGallery = document.getElementById('closeGallery');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryImage = document.getElementById('galleryImage');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryDescription = document.getElementById('galleryDescription');
    const currentSlide = document.getElementById('currentSlide');
    const totalSlides = document.getElementById('totalSlides');
    const galleryThumbnails = document.getElementById('galleryThumbnails');

    // Gallery data for different categories
    const galleryData = {
        facade: {
            title: 'Фасадные панели',
            description: 'Алюминиевые сэндвич-панели для облицовки фасадов зданий. Прочность, долговечность и современный дизайн.',
            images: [
                'images/facade-panel1.png',
                'images/facade-panel2.png',
                'images/facade-panel3.png',
                'images/facade-panel4.png',
                'images/facade-panel5.png'
            ]
        },
        roof: {
            title: 'Кровельные панели',
            description: 'Прочные панели для кровли с повышенной несущей способностью. Влагостойкие и долговечные.',
            images: [
                'images/roof-panel1.png',
                'images/roof-panel2.png',
                'images/roof-panel3.png',
                'images/roof-panel4.png'
            ]
        },
        wall: {
            title: 'Стеновые панели',
            description: 'Универсальные панели для внутренних и наружных стен. Легкий монтаж и отличная теплоизоляция.',
            images: [
                'images/wall-panel1.png',
                'images/wall-panel2.png',
                'images/wall-panel3.png',
                'images/wall-panel4.png'
            ]
        },
        decorative: {
            title: 'Декоративные панели',
            description: 'Панели с уникальными текстурами и покрытиями. Имитация камня, дерева, индивидуальный дизайн.',
            images: [
                'images/decorative-panel1.png',
                'images/decorative-panel2.png',
                'images/decorative-panel3.png',
                'images/decorative-panel4.png',
                'images/decorative-panel5.png'
            ]
        },
        cold: {
            title: 'Холодильные панели',
            description: 'Специальные панели для холодильных камер и морозильников. Повышенная изоляция и гигиеничное покрытие.',
            images: [
                'images/cold-panel1.png',
                'images/cold-panel2.png',
                'images/cold-panel3.png'
            ]
        },
        fire: {
            title: 'Противопожарные панели',
            description: 'Огнестойкие панели для объектов с повышенными требованиями безопасности. Класс огнестойкости EI 45-120.',
            images: [
                'images/fire-panel1.png',
                'images/fire-panel2.png',
                'images/fire-panel3.png',
                'images/fire-panel4.png'
            ]
        }
    };

    let currentCategory = 'facade';
    let currentIndex = 0;

    // Open gallery when catalog buttons are clicked
    const catalogButtons = document.querySelectorAll('.catalog-btn');
    catalogButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            if (category && galleryData[category]) {
                openGallery(category);
            }
        });
    });

    function openGallery(category) {
        currentCategory = category;
        currentIndex = 0;
        updateGallery();
        generateThumbnails();
        galleryModal.style.display = 'flex';
        setTimeout(() => galleryModal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    }

    function closeGalleryFunc() {
        galleryModal.classList.remove('active');
        setTimeout(() => {
            galleryModal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }

    function updateGallery() {
        const data = galleryData[currentCategory];
        if (!data) return;

        galleryImage.src = data.images[currentIndex];
        galleryTitle.textContent = data.title;
        galleryDescription.textContent = data.description;
        currentSlide.textContent = currentIndex + 1;
        totalSlides.textContent = data.images.length;

        // Update active thumbnail
        const thumbnails = galleryThumbnails.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    function generateThumbnails() {
        const data = galleryData[currentCategory];
        if (!data) return;

        galleryThumbnails.innerHTML = '';
        data.images.forEach((img, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'gallery-thumbnail';
            if (index === 0) thumb.classList.add('active');

            const thumbImg = document.createElement('img');
            thumbImg.src = img;
            thumbImg.alt = `${data.title} ${index + 1}`;

            thumb.appendChild(thumbImg);
            thumb.addEventListener('click', () => {
                currentIndex = index;
                updateGallery();
            });

            galleryThumbnails.appendChild(thumb);
        });
    }

    function nextSlide() {
        const data = galleryData[currentCategory];
        if (!data) return;

        currentIndex = (currentIndex + 1) % data.images.length;
        updateGallery();
    }

    function prevSlide() {
        const data = galleryData[currentCategory];
        if (!data) return;

        currentIndex = (currentIndex - 1 + data.images.length) % data.images.length;
        updateGallery();
    }

    // Event listeners
    if (closeGallery) {
        closeGallery.addEventListener('click', closeGalleryFunc);
    }

    if (galleryPrev) {
        galleryPrev.addEventListener('click', prevSlide);
    }

    if (galleryNext) {
        galleryNext.addEventListener('click', nextSlide);
    }

    // Close on background click
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) closeGalleryFunc();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeGalleryFunc();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });

    console.log('🏗️ BAQSTROY сайты сәтті жүктелді!');
    console.log('💡 Для просмотра всех заявок введите: viewAllRequests()');
    console.log('💡 Для очистки базы данных введите: clearAllRequests()');
});
