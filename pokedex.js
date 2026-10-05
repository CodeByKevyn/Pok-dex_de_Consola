
async function buscarPokemon(nombre) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + nombre.toLowerCase();
 
  const respuesta = await fetch(url);


  if (!respuesta.ok) {
    console.log("Error: No se encontró a " + nombre + " (Status: " + respuesta.status + ")");
    return null;
  }

 
  const datos = await respuesta.json();
  return datos;
}


function mostrarFicha(datos) {
  
  if (!datos) {
    console.log("No hay datos para mostrar.");
    return;
  }

 
  console.log("==========================================");
  console.log(datos.name.toUpperCase() + " (#" + datos.id + ")");
  console.log("==========================================");

 
  const tipos = [];
  for (const t of datos.types) {
    tipos.push(t.type.name);
  }
  console.log("Tipos: " + tipos.join(" / "));

  
  const alturaCm = datos.height * 10;
  const pesoKg = datos.weight / 10;
  console.log("Altura: " + alturaCm + " cm | Peso: " + pesoKg + " kg");

  console.log("-- STATS --");
  for (const s of datos.stats) {
    console.log(s.stat.name + ": " + s.base_stat);
  }


  console.log("-- HABILIDADES --");
  for (const a of datos.abilities) {
    if (a.is_hidden) {
      console.log("- " + a.ability.name + " (oculta)");
    } else {
      console.log("- " + a.ability.name);
    }
  }
  console.log("==========================================\n");
}


function obtenerStat(datos, nombreStat) {
  for (const item of datos.stats) {
    if (item.stat.name === nombreStat) {
      return item.base_stat;
    }
  }
  return null;
}

// 4.2 Función compararPokemon
async function compararPokemon(nombre1, nombre2, stat) {
  const p1 = await buscarPokemon(nombre1);
  const p2 = await buscarPokemon(nombre2);

  if (!p1 || !p2) {
    console.log("No se puede comparar porque uno o ambos Pokémon no existen.");
    return;
  }

  const v1 = obtenerStat(p1, stat);
  const v2 = obtenerStat(p2, stat);

  if (v1 === null || v2 === null) {
    console.log("La stat '" + stat + "' no existe.");
    console.log("Stats válidas: hp, attack, defense, special-attack, special-defense, speed.");
    return;
  }

  console.log("Comparando " + p1.name + " vs " + p2.name + " en " + stat + ":");
  console.log(p1.name + ": " + v1 + " | " + p2.name + ": " + v2);

  if (v1 > v2) {
    console.log("Gana " + p1.name.toUpperCase());
  } else if (v2 > v1) {
    console.log("Gana " + p2.name.toUpperCase());
  } else {
    console.log("Empate");
  }
  console.log("------------------------------------------");
}


async function pokemonMasFuerte(listaNombres, stat) {
  let mejorNombre = "";
  let mejorValor = -1;

  for (const nombre of listaNombres) {
    const datos = await buscarPokemon(nombre);
    if (!datos) continue;

    const valor = obtenerStat(datos, stat);
    if (valor === null) continue;

    if (valor > mejorValor) {
      mejorValor = valor;
      mejorNombre = datos.name;
    }
  }

  console.log("El más fuerte en " + stat + " es: " + mejorNombre.toUpperCase() + " con " + mejorValor + " puntos.");
  return mejorNombre;
}

async function probarTaller() {
 
  console.log("--- PRUEBAS EJERCICIO 2 ---");
  const poke1 = await buscarPokemon("pikachu");
  if (poke1) console.log(poke1.name + " - ID: " + poke1.id);

  const poke2 = await buscarPokemon("charizard");
  if (poke2) console.log(poke2.name + " - ID: " + poke2.id);

  const poke3 = await buscarPokemon("bulbasaur");
  if (poke3) console.log(poke3.name + " - ID: " + poke3.id);


  await buscarPokemon("nombrequenoexiste");


  console.log("\n--- PRUEBAS EJERCICIO 3 ---");
  const ficha1 = await buscarPokemon("gengar");
  mostrarFicha(ficha1);

  const ficha2 = await buscarPokemon("lucario");
  mostrarFicha(ficha2);


  console.log("\n--- PRUEBAS EJERCICIO 4 ---");
  
  await compararPokemon("snorlax", "machamp", "hp");

  
  await compararPokemon("blastoise", "onix", "defense");

  
  await compararPokemon("pikachu", "eevee", "fuerza");

  
  console.log("\n--- PRUEBAS EJERCICIO 5 ---");

  const miEquipo = ["mewtwo", "dragonite", "gyarados", "arcanine", "scizor", "snorlax"];

 
  const ganadorAtaque = await pokemonMasFuerte(miEquipo, "attack");

  await pokemonMasFuerte(miEquipo, "defense");


  const datosGanador = await buscarPokemon(ganadorAtaque);
  mostrarFicha(datosGanador);
}

probarTaller();