const registerGroup = document.querySelector('.registerGroup');
    if(registerGroup) {
        addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const number = document.getElementById('number').value;            
            const genre = document.getElementById('genre').value;
            const photo = document.getElementById('photo').value;
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