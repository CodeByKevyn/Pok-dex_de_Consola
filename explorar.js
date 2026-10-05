async function explorarAPI() {
  // Paso 1: Conexión y status
  const url = "https://pokeapi.co/api/v2/pokemon/pikachu";
  const respuesta = await fetch(url);
  
  console.log("Status de la respuesta:", respuesta.status);

  // Paso 2: Traducir a JSON e imprimir completo
  const datos = await respuesta.json();
  console.log(datos);

  // Ejercicio 1: Recorrer listas con bucles
  console.log("--- TIPOS ---");
  for (const t of datos.types) {
    console.log(t.type.name);
  }

  console.log("--- STATS ---");
  for (const s of datos.stats) {
    console.log(s.stat.name + ": " + s.base_stat);
  }

  console.log("--- HABILIDADES ---");
  for (const a of datos.abilities) {
    console.log(a.ability.name);
  }
}

explorarAPI();