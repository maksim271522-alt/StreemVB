document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('planModal');
    const modalPlanName = document.getElementById('modalPlanName');
    const modalPlanPrice = document.getElementById('modalPlanPrice');
    const modalPlanDesc = document.getElementById('modalPlanDesc');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const planForm = document.getElementById('planForm');
    const chooseButtons = document.querySelectorAll('.choose-plan-btn');

    if (!modal || !modalPlanName || !modalPlanPrice || !modalPlanDesc || !modalCloseBtn || !planForm || chooseButtons.length === 0) {
        return;
    }

    // Telegram settings — замените при необходимости
    const TELEGRAM_BOT_TOKEN = '8647061115:AAHS-aoD3hh_nAsgDlm99KkCXu-Z1iI_jkc';
    const TELEGRAM_CHAT_ID = '@tetrisgr';

    function openModal(planName, planPrice, planDesc) {
        modalPlanName.textContent = planName;
        modalPlanPrice.textContent = planPrice;
        modalPlanDesc.textContent = planDesc;
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        planForm.querySelector('input').focus();
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        planForm.reset();
    }

    chooseButtons.forEach(button => {
        button.addEventListener('click', () => {
            openModal(button.dataset.planName, button.dataset.planPrice, button.dataset.planDesc);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    planForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(planForm);
        const data = {
            planName: modalPlanName.textContent,
            planPrice: modalPlanPrice.textContent,
            fullName: formData.get('subscriberName'),
            email: formData.get('subscriberEmail'),
            phone: formData.get('subscriberPhone'),
        };

        console.log('Subscription order submitted:', data);

        const telegramMessage =
            `Новая покупка подписки:\n` +
            `План: ${data.planName} - ${data.planPrice}\n` +
            `Имя: ${data.fullName}\n` +
            `Email: ${data.email}\n` +
            `Телефон: ${data.phone}`;

        if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || !TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
            console.warn('Telegram bot token или chat id не настроены. Скопируйте ваш токен и chat_id в subscriptions.js.');
        } else {
            const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${encodeURIComponent(TELEGRAM_CHAT_ID)}&text=${encodeURIComponent(telegramMessage)}`;
            try {
                await fetch(telegramUrl, { method: 'GET', mode: 'no-cors' });
            } catch (error) {
                console.warn('Не удалось отправить Telegram уведомление:', error);
            }
        }

        alert(`Спасибо! Вы выбрали ${data.planName} за ${data.planPrice}. Мы свяжемся с вами по email: ${data.email}`);
        closeModal();
    });
});
