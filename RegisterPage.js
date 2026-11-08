const handleRegister = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        });
        const data = await response.json();
        if (data.authtoken) {
            sessionStorage.setItem('auth-token', data.authtoken);
            // Handle redirect or success state
        }
    } catch (error) {
        console.error('Registration failed:', error);
    }
};