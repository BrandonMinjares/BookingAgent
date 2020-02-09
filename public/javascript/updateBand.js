function updateBand() {

    document.getElementById('band-name').innerHTML = " ";
}


const updateBand = document.querySelector('.updateBand');
    if(filterForm) {
        addEventListener('submit', e => {
            const name = document.getElementById('bandname').innerHTML = " ";

            //update(name);
        }); 
}
 
const update = async (name) => {
    try {
        const res = await axios({
        method:'POST',
        url: `http://localhost:5000/bands/${name}`,
        data: {
            name
        }
    });

} catch (err) {
        alert(err.response.data.message);
    }
};