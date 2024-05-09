const listaPokemon = document.querySelector("#listaPokemon")
const botonesHeader = document.querySelectorAll(".boton")
let URL = "https://pokeapi.co/api/v2/pokemon/"
for (let i = 1; i <= 151; i++){
    fetch (URL + i)
    .then((response) => response.json())
    .then(data => mostrarPokemon(data))
}
function mostrarPokemon(poke){
    let pokeID = poke.id.toString();
    if (pokeID.length === 1){
        pokeID = "00" + pokeID;
    }
    else if (pokeID === 2){
        pokeID = "0" + pokeID;
    }
    let tipos = poke.types.map(type => `
    <p class="boton__header__${type.type.name} tipo">${type.type.name}</p>`)
    tipos = tipos.join()
    const div =document.createElement("div");
    div.classList.add("pokemon")
    div.innerHTML = `
    <div class="pokemon">
                    <p class="pokemon-id-back">#${pokeID}</p>
                    <div class="pokemon-imagen">
                        <img src="${poke.sprites.front_default}" alt="${poke.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="pokemon-contenedor">
                            <p class="pokemon-id">#${pokeID}</p>
                            <h1 class="pokemon-nombre">${poke.name}</h1>
                        </div>
                        <div class="pokemon-tipos">
                            ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${poke.height}M</p>
                            <p class="stat">${poke.weight}KG</p>
                        </div>
                    </div>
                </div>
    `;
    listaPokemon.append(div);
}
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonID = event.currentTarget.id;
    listaPokemon.innerHTML = ""
    for (let i = 1; i <= 151; i++){
        fetch (URL + i)
        .then((response) => response.json())
        .then(data => {
            const tipos = data.types.map(type => type.type.name);
            if (tipos.some(tipo => tipo.includes(botonID))){
                mostrarPokemon(data)
            }
        })
    }
}))