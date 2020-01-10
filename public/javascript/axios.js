

const registerForm = document.querySelector('.registerForm');

registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    registerUser(name, email, password);
});

const registerUser = async (name, email, password) => {
    try {
        const res = await axios({
        method:'POST',
        url: 'http://localhost:5000/api/v1/auth/register',
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

/*
const registerUser = () => {
    axios.post({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/auth/register',
        data: {
            name: 'name',
            email: 'email',
            password: 'password'
        }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
*/
