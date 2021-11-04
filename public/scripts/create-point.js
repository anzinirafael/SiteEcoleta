function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value
    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

const itensColet = document.querySelectorAll(".itens-grid li")

for (const item of itensColet) {
    item.addEventListener("click", handleSelectItem)
}
const collect =  document.querySelector("input[name=itemColeta]")
 
var selectedItens = []

function handleSelectItem(event) {
    const itenLi = event.target
    itenLi.classList.toggle("selected")
    const itenId = itenLi.dataset.id
    const itenReady = selectedItens.findIndex(itemColeta => {
        const itenFound = itemColeta == itenId
        return itenFound
    })

    if (itenReady >= 0) {
        const filterItens = selectedItens.filter(itemColeta => {
            const itensDiferent = itemColeta != itenId
            return itensDiferent
        })
        selectedItens = filterItens
    }
    else {
        selectedItens.push(itenId)
    }
    collect.value = selectedItens
}


