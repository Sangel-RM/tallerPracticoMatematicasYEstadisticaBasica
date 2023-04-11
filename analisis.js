console.log(salarios);

// Análisis personal de Juanita 


function encontrarPersonas(personaEnBusqueda){
  return salarios.find(persona => persona.name == personaEnBusqueda)
  // const persona = salarios.find((persona)=>{
  //   return persona.name == personaEnBusqueda;
  // });
}
function mediandaPorPersona(nombrePersona){
  const trabajos = encontrarPersonas(nombrePersona).trabajos;
  const salarios = trabajos.map(function(elemento){
    return elemento.salario;
  });
  const medianaSalarios = PlatziMath.calcularMediana(salarios);
  return medianaSalarios;
}
function proyeccionPorPersona(nombrePersona){
  const trabajos = encontrarPersonas(nombrePersona).trabajos;
  let porcentajesDeCrecimiento = [];
  for (let i = 1; i < trabajos.length; i++) {
    const salarioActual = trabajos[i].salario;
    const SalarioPasado = trabajos[i - 1].salario;
    const crecimiento = salarioActual - SalarioPasado;
    const porcentajeCrecimiento = crecimiento / SalarioPasado;
    console.log(porcentajeCrecimiento);
    porcentajesDeCrecimiento.push(porcentajeCrecimiento);
  }
  const medianaPorcentajeCrecimiento = PlatziMath.calcularMediana(porcentajesDeCrecimiento);
  console.log(porcentajesDeCrecimiento, medianaPorcentajeCrecimiento);
  const ultimoSalario = trabajos[trabajos.length - 1].salario;
  const aumento = ultimoSalario * medianaPorcentajeCrecimiento;
  const nuevoSalario = ultimoSalario + aumento;
  return nuevoSalario;
}
// analisis empresarial

/* {
  industrias Mokepon
  2018: [salarios, salarios, salarios]
  2019: []
  2020: []
  2025: []
  2026: []
},
  Industrias Mokepon: {},
  Industrias Mokepon: {},
  Industrias Mokepon: {},
*/
const empresas = {};
for(persona of salarios){
  for(trabajo of persona.trabajos){
    if(!empresas[trabajo.empresa]){
      empresas[trabajo.empresa] = {};
    }
    if(!empresas[trabajo.empresa][trabajo.year]){
      empresas[trabajo.empresa][trabajo.year] = [];
    }
    empresas[trabajo.empresa][trabajo.year].push(trabajo.salario);
  }
}
console.log({empresas});

function medianaEmpresaYear(nombre, year){
  if(!empresas[nombre]){
    console.warn('la empresa no existe');
  }else if(!empresas[nombre][year]){
    console.warn('en ese año no a dada salarios ese año');
  }else{
    return PlatziMath.calcularMediana(empresas[nombre][year]);
  }
}
function ProyeccionPorEmpresa (nombre){
  if(!empresas[nombre]){
    console.warn("la empresa no existe");
  } else {
    const empresaYears = Object.keys(empresas[nombre]);
    const listaMedianaYears = empresaYears.map((year)=>{
      return medianaEmpresaYear(nombre, year);
    });
    console.log({listaMedianaYears});
    let porcentajesDeCrecimiento = [];
      for (let i = 1; i < listaMedianaYears.length; i++) {
        const salarioActual = listaMedianaYears[i];
        const SalarioPasado = listaMedianaYears[i - 1];
        const crecimiento = salarioActual - SalarioPasado;
        const porcentajeCrecimiento = crecimiento / SalarioPasado;
        console.log(porcentajeCrecimiento);
        porcentajesDeCrecimiento.push(porcentajeCrecimiento);
      }
        const medianaPorcentajeCrecimiento = PlatziMath.calcularMediana(porcentajesDeCrecimiento);
        console.log(porcentajesDeCrecimiento, medianaPorcentajeCrecimiento);
        
        const ultimaMediana = listaMedianaYears[listaMedianaYears.length - 1];
        const aumento = ultimaMediana * medianaPorcentajeCrecimiento;
        const nuevaMediana = ultimaMediana + aumento;
        return nuevaMediana;
      }
};
// Análisis general 
function medianaGeneral(){
  const listaMedianas = salarios.map(persona => mediandaPorPersona(persona.name));
  const mediana = PlatziMath.calcularMediana(listaMedianas);
  return mediana;
}
function medianaTop10 (){
  const listaMedianas = salarios.map(persona => mediandaPorPersona(persona.name));
  const medianasOrdenadas = PlatziMath.ordenarLista(listaMedianas);

  const cantidad = listaMedianas.length / 10;

  const limite = listaMedianas.length - cantidad;

  const top10 = medianasOrdenadas.slice(limite,medianasOrdenadas.length);
  const medianaTop10 = PlatziMath.calcularMediana(top10);
  return medianaTop10;
}
