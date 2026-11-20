// Newsletter Signup Handler
// Client-side validation + localStorage persistence.
// Wire up a real endpoint by setting NEWSLETTER_ENDPOINT.

const NEWSLETTER_ENDPOINT = null; // e.g. 'https://formspree.io/f/xxxxxxx'
const NEWSLETTER_STORAGE_KEY = 'aiwf_newsletter_email';

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getTranslation(key, fallback) {
    if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang][key]) {
        return translations[currentLang][key];
    }
    if (typeof translations !== 'undefined' && translations.en && translations.en[key]) {
        return translations.en[key];
    }
    return fallback;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const input = document.getElementById('newsletter-email');
    const status = document.getElementById('newsletter-status');
    const submitBtn = form.querySelector('.newsletter-btn');

    function setStatus(message, type) {
        if (!status) return;
        status.textContent = message;
        status.className = 'newsletter-status' + (type ? ' is-' + type : '');
    }

    function clearError() {
        if (input) input.classList.remove('input-error');
    }

    // Already subscribed? show a soft notice
    try {
        const saved = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
        if (saved && input) {
            input.placeholder = getTranslation('newsletter-placeholder', 'Enter your email address');
        }
    } catch (e) {
        /* storage unavailable - ignore */
    }

    input?.addEventListener('input', clearError);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = (input?.value || '').trim();

        if (!email || !isValidEmail(email)) {
            input?.classList.add('input-error');
            setStatus(getTranslation('newsletter-error', 'Please enter a valid email address.'), 'error');
            input?.focus();
            return;
        }

        clearError();
        const originalText = submitBtn?.textContent || 'Subscribe';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '...';
        }

        try {
            if (NEWSLETTER_ENDPOINT) {
                const response = await fetch(NEWSLETTER_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                if (!response.ok) throw new Error('Newsletter request failed');
            }

            try {
                localStorage.setItem(NEWSLETTER_STORAGE_KEY, email);
            } catch (e) {
                /* storage unavailable - ignore */
            }

            setStatus(getTranslation('newsletter-success', 'Thanks for subscribing!'), 'success');
            if (input) input.value = '';
        } catch (error) {
            console.error('Newsletter error:', error);
            setStatus(getTranslation('newsletter-error', 'Please enter a valid email address.'), 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
});
