// get Api data ............................
const errBookName = document.getElementById('err-book-name')
const getData = async () => {
    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value;
    displaySpinner('block')
    toggleSearchResult('none')
    copyRight('none')
    totalBook('none')
    errBookName.style.display = "none"
    const url = `https://openlibrary.org/search.json?q=${searchValue}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.numFound)
    displayBooks(data.docs)
    searchField.value = '';
}

// display books...............................................

const displayBooks = (books) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent = '';
    displaySpinner('none')
    toggleSearchResult('block')
    totalBook('block')
    copyRight('block')
    if (books.length === 0) {
        errBookName.style.display = "block"
        copyRight('none')
        totalBook('none')
    } else {
        errBookName.style.display = "none"
        books.forEach(book => {
            console.log(book)

            const div = document.createElement('div')
            div.classList.add('col')
            const emptyImage = "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
            const image = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            const author = book?.author_name ? book.author_name[0] : "Not Found"
            const published = book?.publisher ? book.publisher : "Not Found"
            const coverImage = book?.cover_i ? image : emptyImage
            div.innerHTML = `
        <div class="card">
        <img src="${coverImage}" class="card-img-top img-fluid"  style="width: 300px; height: 200px;" alt="...">
        <div class="card-body">
            <h5 class="text-primary">Book:<span >${book.title.slice(0, 15)}</span></h5>
             <h6 class="text-danger">Author: <span> ${author}</span></h6>
             <h6 class="">Publisher: <span> ${published}</span> </h6>
             <h6 class= "">publish Date: <span> ${book.first_publish_year}</span> </h6>
        </div>
    </div>
        `
            cardContainer.appendChild(div)

        })
        const size = Object.keys(books).length;
        const cardLength = document.getElementById('length-card')
        cardLength.innerText = size
        console.log(size)
    }
}

// search result ,spinner and total book toggling.....................................

const displaySpinner = (display) => {
    const spinner = document.getElementById('spinner')
    spinner.style.display = display
}
const toggleSearchResult = (display) => {
    document.getElementById('toggle').style.display = display
}
const totalBook = (display) => {
    document.getElementById('total-book').style.display = display
}
const copyRight = display => {
    document.getElementById('copy-right').style.display = display
}
