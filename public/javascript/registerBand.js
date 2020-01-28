const registerGroup = document.querySelector('.registerGroup');
    if(registerGroup) {
        addEventListener('submit', e => {
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const number = document.getElementById('number').value;            
            const genre = document.getElementById('genre').value;
            const photo = document.getElementById('photo').value;
            const address = document.getElementById('address').value;

            registerBand(name, description, address, genre);
        }); 
}

const registerBand = async (name, description, address, genre) => {
    try {
        const res = await axios({
        method:'POST',
        url: 'http://localhost:5000/bands',
        data: {
            name,
            description,
            address,
            genre
        }
    });

} catch (err) {
        alert(err.response.data.message);
    }
};