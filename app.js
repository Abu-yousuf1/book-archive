const getData = async () => {
    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value;
    displaySpinner('block')
    toggleSearchResult('none')
    totalBook('none')
    const url = `https://openlibrary.org/search.json?q=${searchValue}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.numFound)
    displayBooks(data.docs)
    searchField.value = '';
}

const displayBooks = (books) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent = '';
    displaySpinner('none')
    toggleSearchResult('block')
    totalBook('block')
    books.forEach(book => {
        console.log(book)

        const div = document.createElement('div')
        div.classList.add('col')
        const { cover_i, title, author_name, publisher, first_publish_year } = book
        if (author_name == undefined || publisher == undefined) {
            console.log(" null", book)
            return
        }

        div.innerHTML = `
        <div class="card">
        <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="img-fluid" alt="...">
        <div class="card-body">
            <h5 class="text-center">Book:<span >${title}</span></h5>
             <h6 class="tex-center">Author: <span> ${author_name[0]}</span></h6>
             <h6 class="text-center">Publisher: <span> ${publisher[0]}</span> </h6>
             <h6 class= "text-center">publish Date: <span> ${first_publish_year}</span> </h6>
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
