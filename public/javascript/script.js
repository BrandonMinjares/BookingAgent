const filterForm = document.querySelector('.filterForm');
    if(filterForm) {
        addEventListener('submit', e => {
            const name = document.getElementById('bandname').value;
            findBand(name);
        }); 
}
 
const findBand = async (name) => {
    try {
        const res = await axios({
        method:'POST',
        url: 'http://localhost:5000/bands/search',
        data: {
            name
        }
    });

} catch (err) {
        alert(err.response.data.message);
    }
};