let pageNum = 0;
let pageCont =6;

const apiUrl = "https://breakingbadapi.com/api/"


 
function doQuery({
    endpoint,
    displayFunction,
    pageNum, 
    pageCont
    }){
   const offset= pageNum * pageCont
   const queryString =  `?limit=${pageCont}&offset=${offset}`
    //Mandamos una solicitud y obtenemos una promesa
   const request = fetch( apiUrl + endpoint+ queryString)
   
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
function formatCharacter (character){
return {
    id:character.char_id,
    name:character.name,
    nickname:character.nickname,
    image:character.img
   

}

}

function displayCharacters(data){

    console.log("display", data);
   
    const formattedCharacters =data.map (formatCharacter)
    formattedCharacters.forEach (createAppendCharacter)
   
}
function openElement (event){
    const el = event.target
    console.log("id", el.getAttribute("data-id"))
}

function setupInteraction( element) {
    element.addEventListener("click", openElement)
}
  
function createAppendCharacter (character){

    const container =document.querySelector("#characters")
    const characterBox = createCharacterHTML (character)

    setupInteraction(characterBox)

    container.append(characterBox)

}

function createCharacterHTML(character){

    const model= document.querySelector(".character.model")
    const characterBox = model.cloneNode(true)
    characterBox.classList.remove("model")

    const nameBox = characterBox.querySelector (".name")
    const nicknameBox = characterBox.querySelector(".nickname")

    const img = characterBox.querySelector (".image img")

   // const characterBox = document.createElement("article")
   // const textBox = document.createElement ("p")
   // const nicknameBox = document.createElement("p")

    //textBox.classList.add("text")
    //nicknameBox.classList.add("nickname")

    nameBox.innerHTML = character.name
    nicknameBox.innerHTML = character.nickname

    img.setAttribute("src", character.image)
    characterBox.setAttribute("data-id", character.id)

    //characterBox.append (textBox)
    //characterBox.append (nicknameBox)

    characterBox.classList.add ("character")

    return characterBox

}

function loadMore(){
    //console.log("load more")
    doQuery({
       endpoint: "characters",
       pageNum,
       pageCont,
        displayFunction: displayCharacters
})
    pageNum ++
    
     

}

function setupPagination(){
const btn= document.querySelector("#load-more")
btn.addEventListener("click", loadMore) 




}

function windowScroll(){
    console.log("scroll y", window.scrollY,window.innerHeight)
    const container =document.querySelector("#characters")
    console.log ("container height", container.clientHeight)
}

function setupInfiniteScroll(){
    window.addEventListener("scroll", windowScroll)

}

setupPagination()
setupInfiniteScroll()


//doQuery("characters?limit=6&offset="+pageNum, displayCharacters)
     loadMore()






//doQuery("characters", displayCharacters)
//doQuery("characters")
//doQuery("episodes")



console.log("Consulta API")