document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formSuccess = document.getElementById('formSuccess');

    // Simple email regex for quick check
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop default form submission

        emailError.textContent = ''; // Clear previous errors
        passwordError.textContent = '';
        formSuccess.textContent = '';

        let isValid = true;
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Email validation
        if (email === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Enter a valid email.';
            isValid = false;
        }

        // Password validation (e.g., minimum 8 characters)
        if (password === '') {
            passwordError.textContent = 'Password is required.';
            isValid = false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters.';
            isValid = false;
        }

        // Final outcome
        if (isValid) {
            formSuccess.textContent = 'Login successful!';
            formSuccess.style.color = '#28a745'; // Green
            loginForm.reset(); // Clear form
            // Here you'd typically send data to a server
        } else {
            formSuccess.textContent = 'Please fix the errors.';
            formSuccess.style.color = '#dc3545'; // Red
        }
    });
});