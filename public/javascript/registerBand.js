const registerBand = document.querySelector('.registerBand');
    if(registerBand) {
        addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            alert(name);
            //registerBand(name, email, password);
        }); 
}
/*
const registerUser = async (name, email, password) => {
    try {
        const res = await axios({
        method:'POST',
        url: 'http://localhost:5000/auth/bands',
        data: {
            name,
            email,
            password
        }
    });

} catch (err) {
        alert(err.response.data.message);
    }
};*/