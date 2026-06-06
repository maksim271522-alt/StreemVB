document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.querySelector('.country-select');
    const countryDropdown = document.querySelector('.country-dropdown');
    const phoneInput = document.querySelector('.phone-input-wrapper input');
    const countryCodeSpan = document.querySelector('.country-code');

    if (!countrySelect || !countryDropdown || !phoneInput || !countryCodeSpan) {
        return;
    }

    const options = Array.from(countryDropdown.querySelectorAll('.country-option'));

    countrySelect.addEventListener('click', () => {
        countryDropdown.classList.toggle('hidden');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            const code = option.dataset.code;
            const placeholder = option.dataset.placeholder;
            const flag = option.dataset.flag;

            updateCountry(code, placeholder, flag, option.textContent.trim());
            countryDropdown.classList.add('hidden');
            phoneInput.focus();
        });
    });

    phoneInput.addEventListener('input', () => {
        const value = phoneInput.value.trim();
        if (!value.startsWith('+')) {
            return;
        }

        const matchedOption = options
            .slice()
            .sort((a, b) => b.dataset.code.length - a.dataset.code.length)
            .find(option => value.startsWith(option.dataset.code));

        if (matchedOption) {
            updateCountry(
                matchedOption.dataset.code,
                matchedOption.dataset.placeholder,
                matchedOption.dataset.flag,
                matchedOption.textContent.trim()
            );
        }
    });

    document.addEventListener('click', (event) => {
        if (!countrySelect.contains(event.target) && !countryDropdown.contains(event.target)) {
            countryDropdown.classList.add('hidden');
        }
    });

    function updateCountry(code, placeholder, flag, countryName) {
        countryCodeSpan.textContent = code;
        phoneInput.placeholder = placeholder;
        countrySelect.querySelector('img').src = flag;
        countrySelect.querySelector('img').alt = `${countryName} Flag`;
    }

    const supportForm = document.querySelector('.support-form');
    if (!supportForm) {
        return;
    }

    const TELEGRAM_BOT_TOKEN = '8647061115:AAHS-aoD3hh_nAsgDlm99KkCXu-Z1iI_jkc';
    const TELEGRAM_CHAT_ID = '@tetrisgr';

    supportForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const firstName = supportForm.querySelector('input[type="text"]').value.trim();
        const lastName = supportForm.querySelectorAll('input[type="text"]')[1].value.trim();
        const email = supportForm.querySelector('input[type="email"]').value.trim();
        const phone = supportForm.querySelector('input[type="tel"]').value.trim();
        const messageText = supportForm.querySelector('textarea').value.trim();

        const telegramMessage =
            `Новая регистрация:\n` +
            `Имя: ${firstName}\n` +
            `Фамилия: ${lastName}\n` +
            `Email: ${email}\n` +
            `Телефон: ${phone}\n` +
            `Сообщение: ${messageText}`;

        if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
            console.warn('Telegram bot token или chat id не настроены. Скопируйте ваш токен и chat_id в support.js.');
        } else {
            const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(telegramMessage)}`;
            try {
                await fetch(telegramUrl, {
                    method: 'GET',
                    mode: 'no-cors'
                });
            } catch (error) {
                console.warn('Не удалось отправить Telegram уведомление:', error);
            }
        }

        supportForm.reset();
        alert('Спасибо! Ваше сообщение отправлено.');
    });
});