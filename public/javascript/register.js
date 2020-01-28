const registerForm = document.querySelector('.registerForm');
    if(registerForm) {
        addEventListener('submit', e => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const password2 = document.getElementById('password2').value;

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
            password,
            password2
        }

    });

} catch (err) {
        alert(err.response.data.message);
    }
};