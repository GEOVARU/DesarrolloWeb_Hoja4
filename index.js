const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const students = [];

function showMenu() {
  console.log('Menu:');
  console.log('1. Ingreso de Estudiante');
  console.log('2. Ingreso de Notas');
  console.log('3. Búsqueda por Carnet');
  console.log('4. Generación de Resumen');
  console.log('5. Listado de Estudiantes');
  console.log('6. Salir');
  rl.question('Seleccione una opción: ', handleMenu);
}

function handleMenu(option) {
  switch (option) {
    case '1':
      rl.question('Ingrese el carnet del estudiante: ', carnet => {
        rl.question('Ingrese el nombre del estudiante: ', nombre => {
          students.push({ carnet, nombre, notas: [] });
          console.log('Estudiante ingresado exitosamente.');
          showMenu();
        });
      });
      break;

    case '2':
      rl.question('Ingrese el carnet del estudiante: ', carnet => {
        const student = students.find(s => s.carnet === carnet);
        if (student) {
          rl.question('Ingrese el nombre de la tarea: ', tarea => {
            rl.question('Ingrese la nota obtenida: ', nota => {
              student.notas.push({ tarea, nota: parseFloat(nota) });
              console.log('Nota ingresada exitosamente.');
              showMenu();
            });
          });
        } else {
          console.log('Estudiante no encontrado.');
          showMenu();
        }
      });
      break;

    case '3':
      rl.question('Ingrese el carnet del estudiante: ', carnet => {
        const student = students.find(s => s.carnet === carnet);
        if (student) {
          console.log('Estudiante encontrado:');
          console.log('Carnet:', student.carnet);
          console.log('Nombre:', student.nombre);
        } else {
          console.log('Estudiante no encontrado.');
        }
        showMenu();
      });
      break;

    case '4':
      console.log('Resumen de notas:');
      students.forEach(student => {
        student.notas.forEach(nota => {
          console.log('Carnet:', student.carnet);
          console.log('Nombre:', student.nombre);
          console.log('Tarea:', nota.tarea);
          console.log('Nota:', nota.nota);
          console.log('-------------------------');
        });
      });
      showMenu();
      break;

    case '5':
      console.log('Listado de estudiantes:');
      students.forEach(student => {
        console.log('Carnet:', student.carnet);
        console.log('Nombre:', student.nombre);
        console.log('-------------------------');
      });
      showMenu();
      break;

    case '6':
      console.log('¡Hasta luego!');
      rl.close();
      break;

    default:
      console.log('Opción no válida. Seleccione una opción del menú.');
      showMenu();
      break;
  }
}

showMenu();
