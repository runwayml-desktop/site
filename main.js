// Cookie consent management
const CookieManager = {
    categories: {
        necessary: {
            name: 'Necessary',
            description: 'Essential for the website to function properly. Cannot be disabled.',
            required: true
        },
        functional: {
            name: 'Functional',
            description: 'Enhance website functionality and personalization.',
            required: false
        },
        analytics: {
            name: 'Analytics',
            description: 'Help us understand how visitors interact with our website.',
            required: false
        },
        marketing: {
            name: 'Marketing',
            description: 'Used for marketing and retargeting purposes.',
            required: false
        }
    },

    getConsent() {
        const consent = localStorage.getItem('cookieConsent');
        return consent ? JSON.parse(consent) : null;
    },

    setConsent(categories) {
        localStorage.setItem('cookieConsent', JSON.stringify({
            timestamp: new Date().toISOString(),
            categories: categories
        }));
    },

    hasConsent(category) {
        const consent = this.getConsent();
        return consent?.categories?.[category] === true;
    },

    clearCookies() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
    }
};

function setupCookieConsent() {
    const consent = CookieManager.getConsent();
    
    if (!consent) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-header">
                    <h3>Privacy Preferences</h3>
                    <p>We value your privacy</p>
                </div>
                <div class="cookie-body">
                    <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Click "Customize" to manage your preferences.</p>
                    
                    <div class="cookie-settings">
                        <div class="cookie-category">
                            <div class="category-header">
                                <label>
                                    <input type="checkbox" checked disabled>
                                    <span>${CookieManager.categories.necessary.name}</span>
                                </label>
                                <span class="required-badge">Required</span>
                            </div>
                            <p>${CookieManager.categories.necessary.description}</p>
                        </div>
                        
                        <div class="cookie-category">
                            <div class="category-header">
                                <label>
                                    <input type="checkbox" name="functional" checked>
                                    <span>${CookieManager.categories.functional.name}</span>
                                </label>
                            </div>
                            <p>${CookieManager.categories.functional.description}</p>
                        </div>
                        
                        <div class="cookie-category">
                            <div class="category-header">
                                <label>
                                    <input type="checkbox" name="analytics" checked>
                                    <span>${CookieManager.categories.analytics.name}</span>
                                </label>
                            </div>
                            <p>${CookieManager.categories.analytics.description}</p>
                        </div>
                        
                        <div class="cookie-category">
                            <div class="category-header">
                                <label>
                                    <input type="checkbox" name="marketing">
                                    <span>${CookieManager.categories.marketing.name}</span>
                                </label>
                            </div>
                            <p>${CookieManager.categories.marketing.description}</p>
                        </div>
                    </div>
                </div>
                
                <div class="cookie-footer">
                    <button class="cookie-button secondary" id="customizeBtn">Customize</button>
                    <div class="cookie-actions">
                        <button class="cookie-button reject" id="rejectAllBtn">Reject All</button>
                        <button class="cookie-button accept" id="acceptAllBtn">Accept All</button>
                    </div>
                    <div class="cookie-links">
                        <a href="/cookie-policy.html">Cookie Policy</a>
                        <a href="/privacy-policy.html">Privacy Policy</a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);

        const settings = banner.querySelector('.cookie-settings');
        const customizeBtn = banner.querySelector('#customizeBtn');
        settings.style.display = 'none';

        customizeBtn.addEventListener('click', () => {
            settings.style.display = settings.style.display === 'none' ? 'block' : 'none';
            customizeBtn.textContent = settings.style.display === 'none' ? 'Customize' : 'Hide';
        });

        banner.querySelector('#acceptAllBtn').addEventListener('click', () => {
            const categories = {
                necessary: true,
                functional: true,
                analytics: true,
                marketing: true
            };
            CookieManager.setConsent(categories);
            banner.remove();
        });

        banner.querySelector('#rejectAllBtn').addEventListener('click', () => {
            const categories = {
                necessary: true,
                functional: false,
                analytics: false,
                marketing: false
            };
            CookieManager.setConsent(categories);
            CookieManager.clearCookies();
            banner.remove();
        });

        const savePreferences = () => {
            const categories = {
                necessary: true,
                functional: banner.querySelector('input[name="functional"]').checked,
                analytics: banner.querySelector('input[name="analytics"]').checked,
                marketing: banner.querySelector('input[name="marketing"]').checked
            };
            CookieManager.setConsent(categories);
            if (!categories.functional || !categories.analytics || !categories.marketing) {
                CookieManager.clearCookies();
            }
            banner.remove();
        };

        settings.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                savePreferences();
            }
        });
    }
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', setupCookieConsent);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'white';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});