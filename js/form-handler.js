document.addEventListener('DOMContentLoaded', () => {
    // Handle both contact and support forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            try {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showMessage('Message sent successfully!', 'success');
                    form.reset();
                } else {
                    showMessage('Oops! There was a problem sending your message.', 'error');
                }
            } catch (error) {
                showMessage('Network error. Please try again later.', 'error');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    });
    
    function showMessage(text, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${text}
        `;
        
        document.querySelector('main').prepend(message);
        setTimeout(() => message.remove(), 5000);
    }
}); 