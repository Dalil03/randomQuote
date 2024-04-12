const textZone = document.querySelector('.text')
const authorZone = document.querySelector('.author')
const refreshBtn = document.querySelector('.refresh') 
const saveBtn = document.querySelector('.save')
const showBtn = document.querySelector('.show')
const quoteList = document.querySelector('.quoteList')

// Ici on affiche une quote random dès le chargement du DOM
window.addEventListener('DOMContentLoaded', displayRandomQuote)

// Ici on refresh la quote quand on appuie sur le bouton de refresh
refreshBtn.addEventListener('click', displayRandomQuote)

// Ii on sauvegarde une quote en localStorage
saveBtn.addEventListener('click', () => {
    const author = authorZone.textContent
    const text = textZone.textContent
    const fullQuote = {text, author}

    const storageQuotes = JSON.parse(localStorage.getItem('quotes'))

    storageQuotes.push(fullQuote)

    localStorage.setItem('quotes', JSON.stringify(storageQuotes))
})

// Ici on affiche les quotes du localStorage
showBtn.addEventListener('click', () => {
    const storageQuotes = JSON.parse(localStorage.getItem('quotes'))
    console.log(storageQuotes)

    storageQuotes.forEach((quote) => {
        const card = document.createElement('div')
        const text = document.createElement('p')
        const author = document.createElement('p')

        text.textContent = quote.text
        author.textContent = quote.author
        card.append(text, author)

        quoteList.appendChild(card)
    })
})

// Fonction qui permet d'afficher la quote de manière random
function displayRandomQuote() {
    axios.get('https://type.fit/api/quotes')
    .then(res => res.data)
    .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length)
        const randomQuote = data[randomIndex]
        const text = randomQuote.text
        const author = randomQuote.author.replace(', type.fit', '')

        if (author === 'type.fit') {
            author = 'Unknown author'
        }
    
        textZone.textContent = text
        authorZone.textContent = author
    })
    .catch(e => console.log(e))
}

