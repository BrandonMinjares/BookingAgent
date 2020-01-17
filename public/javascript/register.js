const register = async (name, email, password) => {
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
} catch(err) {
    console.log(err);
}};


const registerForm = document.querySelector('.registerForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    register(name, email, password);
    alert(name + email + password);
});

/*
const registerForm = document.querySelector('.registerForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    register(name, email, password);
    alert(name + email + password);
}); 


const register = async (name, email, password) => {
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
} catch(err) {
    console.log(err);
}};

*/