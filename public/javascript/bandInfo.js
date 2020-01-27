

/*
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

    //res.redirect('/');
    if (res.data.status === 'success') {
        window.location.href = '/login';
    }
} catch (err) {
        alert(err.response.data.message);
    }
};

*/