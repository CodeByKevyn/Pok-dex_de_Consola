async function buscarPokemons(){
    const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    const datos = await pokemon.json();
    console.log(datos);

    for(const tipos of datos.types){
        console.log(tipos)
    }
    
}
buscarPokemons();