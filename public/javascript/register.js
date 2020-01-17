const registerForm = document.querySelector('.registerForm');
    if(registerForm) {
        addEventListener('submit', e => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            registerUser(name, email, password);
        }); 
}

const registerUser = async (name, email, password) => {
    try {
        const res = await axios({
        method:'POST',
        url: 'http://localhost:5000/auth/register',
        data: {
            name,
            email,
            password
        }
    });

    if (res.data.status === 'success') {
        alert('Registered success');
        window.setTimeout(() => {
            location.assign('/');
        }, 1500);
    }
} catch (err) {
        alert(err.response.data.message);
    }
};