const BOOKS_API = 'http://localhost:3000/books';
const myUser = {
  id: 666,
  username: 'marcmajcher',
};

fetch(BOOKS_API)
  .then((res) => res.json())
  .then(renderBooks);

function renderBooks(books) {
  books.forEach(renderBook);
}

function renderBook(book) {
  const bookListElement = document.getElementById('book-list');
  const bookListItem = document.createElement('li');
  bookListItem.textContent = book.title;
  bookListItem.addEventListener('click', () => renderShowPanel(book));
  bookListElement.append(bookListItem);
}

function renderShowPanel(book) {
  const showPanel = document.getElementById('show-panel');

  showPanel.innerHTML = `
    <img src="${book.img_url}" alt="${book.title}"/>
    <div><b>${book.title}</b></div>
    <div><b>${book.subtitle}</b></div>
    <div><b>${book.author}</b></div>
    <div>${book.description}</div>
    <ul>
      ${book.users.map((user) => `<li>${user.username}</li>`).join('')}
    </ul>
    `;

  // const userList = document.createElement('ul');
  // book.users.forEach((user) => {
  //   const userLi = document.createElement('li');
  //   userLi.textContent = user.username;
  //   userList.append(userLi);
  // });
  // showPanel.append(userList);

  const likeButton = document.createElement('button');
  likeButton.textContent = 'LIKE';
  likeButton.addEventListener('click', () => {
    //patch would go here, when it comes back, do a get and render again OR do this:
    book.users.push(myUser);
    renderShowPanel(book);
  });

  showPanel.append(likeButton);
}
