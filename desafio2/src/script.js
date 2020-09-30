let infoSearch = document.querySelector('.info')
let itemsSearch = document.querySelector('.items')
let allPeople = []
let contagemPessoas = null
let buttonSearch = document.querySelector('#buttonSearch')
let inputSearch = document.querySelector('#search')

window.addEventListener('load', () => {
    Fetching()
})


async function Fetching() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    const json = await res.json(res)
    allPeople = json.results.map(people => {

        const {
            name: {
                first: nameFirst,
                last: nameLast
            },
            dob: {
                age: age
            },
            picture: {
                thumbnail: thumbnail
            }

        } = people

        return {
            thumbnail,
            nameFirst,
            nameLast,
            age
        }
    })

    renderPeople(allPeople)

}


const renderPeople = (peoples) => {
    itemsSearch.innerHTML = ''
    let output = ''
    peoples.forEach(people => {
        contagemPessoas++
        const { thumbnail, nameFirst, nameLast, age } = people
        output += `
        <tr>
        <td><img src="${thumbnail}"> ${nameFirst} ${nameLast}, ${age} anos</td>
        </tr>
        `
    })
    contagemPessoas = peoples.length
    itemsSearch.innerHTML = `<tr><th>${contagemPessoas} Usuário(s) foram encontrado(s)</th></tr>`
    itemsSearch.innerHTML += output
}



function renderInfo() {


}



inputSearch.addEventListener('input', (event) => {
    contagemPessoas--
    event.preventDefault()
    const element = event.target.value.toLowerCase()
    const novoUser = allPeople
        .filter(name => name.nameFirst
            .toLowerCase()
            .includes(element))

    renderPeople(novoUser)
})