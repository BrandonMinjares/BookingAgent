const registerGroup = document.getElementById('registerGroup');
    if(registerGroup) {
        addEventListener('submit', e => {
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            //const address = document.getElementById('address').value;
            registerBand(name, description);
        }); 
}

const registerBand = async (name, description) => {
    try {
        const res = await axios({
        method:'POST',
        url: 'http://localhost:5000/bands',
        data: {
            name,
            description        
        }
    });

} catch (err) {
        alert(err.response.data.message);
    }
};
