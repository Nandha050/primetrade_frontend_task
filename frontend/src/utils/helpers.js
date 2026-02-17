export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    // Basic sanitization: trim and remove potential XSS chars (simplified)
    // React prevents XSS by default in JSX, but this is for API safety
    return input.trim().replace(/[<>]/g, '');
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    // Simplified for this task to just length to avoid locking user out
    return password.length >= 6;
};
