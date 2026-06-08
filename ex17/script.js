// ============================================================
// EXERCISE: Fetching data from an API
// ============================================================
//
// GOAL
// ----
// Build a book search using the Open Library API.
// When the user searches for a title, display the results
// (book title + author) as a list on the page.
//
// API endpoint:
// https://openlibrary.org/search.json?q=YOUR_SEARCH_TERM
// e.g.: https://openlibrary.org/search.json?q=the+lord+of+the+rings
//
// Try it in your browser first to see what the response looks like.
// The data you need is inside: response.docs[]
// Each book has: .title and .author_name[]
//
//
// ============================================================

console.log("script loaded");

const input = document.getElementById('search-input');
const btn   = document.getElementById('search-btn');
const list = document.getElementById('results');

async function searchBooks() {
  const query = input.value.trim();
  if (!query) return;

  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();

  displayResults(data.docs);
}

function displayResults(books) {
  list.innerHTML = '';

  // for(i = 0, i > books.length, i++)
  //   console.log ("books[i]", books[i])

  books.slice(0, 10).forEach(book => {
    const author = book.author_name?.[0] ?? 'Unknown author';
    const li = document.createElement('li');
    li.textContent = `${book.title} — ${author}`;
    list.appendChild(li);
  });
}

btn.addEventListener('click', searchBooks);

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') searchBooks();
});
