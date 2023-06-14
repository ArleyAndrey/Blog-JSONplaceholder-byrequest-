let tagFieldset = document.querySelector('fieldset')
let tagInput = document.querySelector('input')
let tagTextarea = document.querySelector('textarea')
let tagButton = document.querySelector('input[type = submit]')
//Função que carrega os posts por requisição
async function carregar(){
    let response = await fetch('https://jsonplaceholder.typicode.com/posts')
    let posts = await response.json()
    for(let post of posts){
        let tagNewDiv = document.createElement('div')
        tagNewDiv.classList.add('post')
        tagNewDiv.innerHTML = `
        <h2>${post.title}</h2>
            <p>
            ${post.body} 
            </p>
            <b>User Id: ${post.userId}</b>

        `
        tagFieldset.after(tagNewDiv)
    }
}


carregar()
//Função que adiciona um novo post
async function adicionar(){
    if(tagInput.value == '' || tagTextarea.value == ''){
        alert('Preencha todos os campos')
        return
    }
    console.log('Requisição tipo post:')
    let response = await fetch('https://jsonplaceholder.typicode.com/posts',
    {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                title: tagInput.value,
                body: tagTextarea.value,
                userId: 11
            }
        )
    } 
    )
    let json = await response.json()
    console.log(json)
    //carregar() -> Caso a API fosse modificada, seria necessário limpar os posts existentes na tela e recarregalos
    //INSERÇÃO DO POST MANUALMENTE, POIS A REQUISÇÃO DO TIPO POST, NESSA URL, NÃO TEM EFEITO NO SERVIDOR DA API
    let tagNewDiv = document.createElement('div')
    tagNewDiv.innerHTML = `
    <h2>${tagInput.value}</h2>
    <p>
    ${tagTextarea.value}
    </p>
    <b>User Id: ${11}</b>
    `
    tagNewDiv.classList.add('post')
    tagFieldset.after(tagNewDiv)
    tagInput.value = ''
    tagTextarea.value = ''

}


tagButton.addEventListener('click', adicionar)
