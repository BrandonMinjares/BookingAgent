const registerGroup = document.getElementById('registerGroup');
    if(registerGroup) {
        addEventListener('submit', e => {
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const address = document.getElementById('address').value;
            registerBand(name, description, address);
        }); 
}

const registerBand = async (name, description, address) => {
    try {
        const res = await axios({
        method:'POST',
        url: 'http://localhost:5000/bands',
        data: {
            name,
            description,
            address       
        }
    });

} catch (err) {
        alert(err.response.data.message);
    }
};
