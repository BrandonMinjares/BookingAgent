const userRequest = document.querySelector('.userRequest');
    if(userRequest) {
        addEventListener('submit', e => {
            e.preventDefault();
            const band = document.getElementById('band').value;
            findBand(band);
        }); 
}

/*
const findBand = async (band) => {
    try {
        const res = await axios({
        method:'GET',
        url: 'http://localhost:5000/auth/requestband',
        data: {
            band
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

*/