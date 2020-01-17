// Login FORM
const loginForm = document.querySelector('.loginForm');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    loginUser(email, password);
    alert(email + password);
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

    /*

    if(res.data.status === 'success') {
        alert('logged in successfully');
        window.setTimeout(() => {
            location.assign('/dashboard');
        }, 1500);
    }
    */
    } catch (err) {
        alert(err.response.data.message);
    }
};