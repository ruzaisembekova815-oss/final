const handleLogin = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include Authorization if sending a token already retrieved or needed by your specific lab config:
                // 'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.authtoken) {
            sessionStorage.setItem('auth-token', data.authtoken);
            sessionStorage.setItem('name', data.userName);
            sessionStorage.setItem('email', data.userEmail);
        }
    } catch (error) {
        console.error('Login error:', error);
    }
};