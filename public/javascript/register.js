const registerForm = document.querySelector('.registerForm');

registerForm.addEventListener('submit', e => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    registerUser(name, email, password);
});

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
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};