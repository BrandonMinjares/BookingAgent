// Login FORM
const loginForm = document.querySelector('.loginForm');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email2').value;
    const password = document.getElementById('password2').value;
    loginUser(email, password);
});


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
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};