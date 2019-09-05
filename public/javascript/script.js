/**
 * 
 * 
class Book {
  constructor(author, bookTitle, isbn) {
    this.author = author;
    this.title = bookTitle;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){

    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</td>
    `;

    list.appendChild(row);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

}

document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value;
        author = document.getElementById('author').value;
        isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  console.log(book);

  const ui = new UI();

  // Check if form is blank
  if (title === '' | author === '' | isbn === '') {
    ui.alert('Add something');
  } else {
    ui.addBookToList(book);

    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
 */

/** 
const food = () => ('hello');

console.log(food);
*/



document.getElementById('food-form').addEventListener('submit', function(e){
  const storeName = document.getElementById('store').value;
  const allergy = document.getElementById('allergy').value;
  console.log(storeName + allergy);
  e.preventDefault()
});