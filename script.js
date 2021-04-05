let library = [];
let books = document.querySelectorAll('#book')
const form = document.querySelector('form');
const grid = document.querySelector('.grid-container');

function book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addToLibrary(arr){
    // added variables for better readability
    let title = arr[0].value;
    let author = arr[1].value;
    let pages = arr[2].value;
    let read = arr[3].checked;

    console.log(read)

    let addedBook = new book(title, author, pages, read);
    library.push(addedBook);
}

function removeBookFromLibrary(index){
    library = library.filter((item, i) => i != index)
    console.log(library);
}


// Previously was using innerHtml to do this, people said innerHtml is unsafe so I've switched to doing this
function createElements(elementName, content, parent){
    let element = document.createElement(elementName);
    let text = document.createTextNode(content);
    element.appendChild(text)
    parent.appendChild(element)
    return element
}

function createGridElements(i, item){
    const div = document.createElement('div');
    div.setAttribute('data-index',i);
    div.setAttribute('id','book');
    div.classList = 'grid-container-item';

    createElements('h3',item.author, div)
    createElements('h3',item.title, div)
    createElements('h3', 'Pages :' + item.pages, div)
    createElements('h3','Book Read : ' + item.read,div)

    return div;

}

function updateGrid(){
    library.forEach((item, i) => {
        const div = createGridElements(i, item)
        let button = createElements('button','Delete',div)
        
        div.addEventListener('dblclick', function(){
            library[i].read = library[i].read == true ? library[i].read = false : library[i].read = true;
            grid.innerHTML = '';
            updateGrid();
            saveData();
        })

        button.addEventListener('click', function(){
            removeBookFromLibrary(i);
            grid.innerHTML = '';
            updateGrid();
            saveData();
        })

        grid.appendChild(div);
    })
}

function updateToGrid(){
    if(library.length <= 16){
        console.log(library.length)
        grid.innerHTML = '';
        updateGrid();
    }
}

function initFromSubmission(event, form){
    let arr = [...form.elements];
    event.preventDefault();
    addToLibrary(arr);
    updateToGrid();
}

function saveData(){
    localStorage.setItem('library',JSON.stringify(library));
}

function loadData(){
    if(localStorage.getItem('library') === null){
        return [];
    }
    else{
        return JSON.parse(localStorage.getItem('library'))
    }
}


form.addEventListener('submit', (e) => {
    initFromSubmission(e,form);
    saveData();
    console.log(localStorage.getItem('library'))
})

window.addEventListener('load', (e) =>{
    console.log('loaded')
    library = loadData();
    updateToGrid();
})
