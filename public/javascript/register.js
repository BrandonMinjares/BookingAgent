

document.getElementById('registerForm').addEventListener('click', registerUser());

function registerUser() {
    axios({
        method: 'post',
        url: 'http://localhost:5000/api/v1/users/',
        data: {
            name: 'name',
            email: 'email',
            password: 'password'
        }
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}