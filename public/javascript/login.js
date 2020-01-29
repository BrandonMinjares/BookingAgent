const loginForm = document.querySelector('.loginForm');
    if(loginForm) {
        addEventListener('submit', e => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            loginUser(email, password);
        }); 
}

const loginUser = async (email, password) => {
    try {
        const res = await axios({
        method:'POST',
        url: 'http://localhost:5000/auth/login',
        data: {
            email,
            password
        }
    });
    if (res.data.status === 'success') {
        alert('Login success');
        window.setTimeout(() => {
            location.assign('/');
        }, 1500);
    }
} catch (err) {
        alert(err.response.data.message);
    }
};