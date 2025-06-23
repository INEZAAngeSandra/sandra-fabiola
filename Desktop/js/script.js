document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formSuccess = document.getElementById('formSuccess');

    // Function to clear all error messages
    function clearErrors() {
        emailError.textContent = '';
        passwordError.textContent = '';
        formSuccess.textContent = '';
    }

    // Function to display an error message
    function showError(element, message) {
        element.textContent = message;
    }

    // Function to validate email format
    function isValidEmail(email) {
        // Simple regex for email validation (can be more complex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate password strength
    function isValidPassword(password) {
        // Password must be at least 6 characters long
        // Contain at least one uppercase letter
        // Contain at least one lowercase letter
        // Contain at least one number
        // Contain at least one special character
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

        return password.length >= minLength &&
               hasUppercase &&
               hasLowercase &&
               hasNumber &&
               hasSpecialChar;
    }

    // Event listener for form submission
    loginForm.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();

        clearErrors(); // Clear previous errors

        let isValid = true; // Flag to track overall form validity

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validate Email
        if (email === '') {
            showError(emailError, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailError, 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate Password
        if (password === '') {
            showError(passwordError, 'Password is required.');
            isValid = false;
        } else if (password.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters long.');
            isValid = false;
        } else if (!isValidPassword(password)) {
            showError(passwordError, 'Password must include uppercase, lowercase, number, and special character.');
            isValid = false;
        }

        // If all validations pass
        if (isValid) {
            formSuccess.textContent = 'Login successful!';
            formSuccess.style.color = '#28a745'; // Green color for success
            // In a real application, you would send this data to a server:
            // console.log('Email:', email);
            // console.log('Password:', password);
            // alert('Form submitted successfully!');
            loginForm.reset(); // Optionally clear the form fields
        } else {
            formSuccess.textContent = 'Please correct the errors above.';
            formSuccess.style.color = '#dc3545'; // Red color for general error
        }
    });

    // Optional: Real-time validation as user types (can be added for better UX)
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address.');
        } else {
            emailError.textContent = ''; // Clear error if valid or empty
        }
    });

    passwordInput.addEventListener('input', function() {
        if (passwordInput.value.trim() !== '' && !isValidPassword(passwordInput.value.trim())) {
             showError(passwordError, 'Password must include uppercase, lowercase, number, and special character.');
        } else {
            passwordError.textContent = ''; // Clear error if valid or empty
        }
    });
});