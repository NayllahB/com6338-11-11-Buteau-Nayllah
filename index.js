const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = ([{title, author, lines}]) => {
  // creates title of poem with h2
  const makeTitle = makeTag('h2')(title)

  // creates author line with h3 + em
  const makeH3 = makeTag('h3')
  const makeEm = makeTag('em')
  const makeAuthor = pipe(makeEm, makeH3)( `by ${author}`)

  // function that creates p tag around each stanza and includes line break after each line
  const makeStanza = (lines) => {
    const stanza = [] // This array will hold newly formatted poem lines 
    let currentStanza = [] // This array will focus on one stanza at a time and will push to "stanza" and rest once formatting is complete

    for (let i = 0; i< lines.length; i++) {
      // indicates end of stanza
      if(lines[i] === ""){
        // if there are items in stanza wrap a p tag around stanza add line break at the end of each line
        if(currentStanza.length > 0){
          const stanzaHTML = makeTag('p')(currentStanza.join('<br>'))
          stanza.push(stanzaHTML)
          currentStanza = [] // reset
        }
      } else {
        currentStanza.push(lines[i]) // continue to push lines for current stanza until "" is reached
      }
    }
    // if there is no "" at the end of the last stanza still wrap p tag
    if(currentStanza.length > 0){
      const stanzaHTML = makeTag('p')(currentStanza.join('<br>'))
      stanza.push(stanzaHTML)
    }

    return stanza.join('')
    
  }
  
  return`${makeTitle}${makeAuthor}${makeStanza(lines)}`
  
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
