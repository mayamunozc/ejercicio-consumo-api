
const apiUrl = "https://breakingbadapi.com/api/"
const fakeQuotes =[
{
    quote:"Laboris laborum Lorem cupidatat ipsum aute.",
    author: "Nombre de autor 1",
    id:1
},
{
    quote:"Excepteur quis ad minim commodo enim quis officia incididunt cupidatat et irure consectetur excepteur.",
    author: "Nombre de autor 2",
    id:2
},{
    quote:"Laborum nostrud excepteur dolore mollit minim est eiusmod do labore cillum culpa.",
    author: "Nombre de autor 3",
    id:3
},{
    quote:"Cillum consequat sint proident exercitation excepteur esse reprehenderit ad pariatur irure mollit ad sunt.",
    author: "Nombre de autor 4",
    id:4
},{
    quote:"Esse aliquip ut est commodo pariatur id eiusmod nostrud.",
    author: "Nombre de autor 5",
    id:5
},
]
 
function doQuery(url, displayFunction){
   
    //Mandamos una solicitud y obtenemos una promesa
   const request = fetch( apiUrl + url)
   
   //Esperar a que se resuelva esta promesa 
   request.then (function (response){
       console.log("response", response)
       response.json().then (function(data){ 
           console.log("data", data)

           if (typeof displayFunction == "function"){
            displayFunction (data)

           }
           

       })
    })
    console.log ("request", request)

}

function displayQuotes(data){

    console.log("display", data);
   
    data.forEach(createAppendQuote)
   
}
  
function createAppendQuote (quote){

    const body =document.querySelector("body")
    const quoteBox = createQuoteHTML (quote)

    body.append(quoteBox)

}

function createQuoteHTML(quote){
    const quoteBox = document.createElement("blockquote")
    const textBox = document.createElement ("p")
    const authorBox = document.createElement("p")

    textBox.innerHTML = quote.quote
    authorBox.innerHTML = quote.author

    quoteBox.append (textBox)
    quoteBox.append (authorBox)

    quoteBox.classList.add ("quote")

    return quoteBox

}



doQuery("quotes", displayQuotes)
doQuery("characters")
doQuery("episodes")



console.log("Consulta API")