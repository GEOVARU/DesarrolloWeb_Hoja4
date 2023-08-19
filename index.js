// GEOVANNI RAMIREZ - 9490-20-427
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const students = {};

function addStudent() {
  rl.question('Ingrese el carnet del estudiante: ', carnet => {
    rl.question('Ingrese el nombre del estudiante: ', nombre => {
      students[carnet] = { nombre, notas: {} };
      addNota(carnet);
    });
  });
}

function addNota(carnet) {
  rl.question('Ingrese el nombre de la tarea: ', tarea => {
    rl.question(`Ingrese la nota de ${tarea} para el estudiante ${students[carnet].nombre}: `, nota => {
      students[carnet].notas[tarea] = parseFloat(nota);
      rl.question('¿Desea agregar otra nota para este estudiante? (si/no): ', respuesta => {
        if (respuesta.toLowerCase() === 'si') {
          addNota(carnet);
        } else {
          rl.question('¿Desea agregar notas para otro estudiante? (si/no): ', respuesta => {
            if (respuesta.toLowerCase() === 'si') {
              addStudent();
            } else {
              generateResumen();
              rl.close();
            }
          });
        }
      });
    });
  });
}

function searchByCarnet() {
  rl.question('Ingrese el carnet del estudiante que desea buscar: ', carnet => {
    const student = students[carnet];
    if (student) {
      console.log(`Carnet: ${carnet}`);
      console.log(`Nombre: ${student.nombre}`);
      console.log('Notas:');
      for (const tarea in student.notas) {
        console.log(`- Tarea: ${tarea}, Nota: ${student.notas[tarea]}`);
      }
    } else {
      console.log('Estudiante no encontrado.');
    }
    rl.close();
  });
}

function generateResumen() {
  console.log('Resumen de Notas:');
  for (const carnet in students) {
    console.log(`Carnet: ${carnet}`);
    console.log(`Nombre: ${students[carnet].nombre}`);
    console.log('Notas:');
    for (const tarea in students[carnet].notas) {
      console.log(`- Tarea: ${tarea}, Nota: ${students[carnet].notas[tarea]}`);
    }
    console.log('-----------------------------------');
  }
}

rl.question('¿Qué acción desea realizar? (agregar/buscar/resumen/salir): ', respuesta => {
  if (respuesta === 'agregar') {
    addStudent();
  } else if (respuesta === 'buscar') {
    searchByCarnet();
  } else if (respuesta === 'resumen') {
    generateResumen();
    rl.close();
  } else if (respuesta === 'salir') {
    rl.close();
  }
});
