function soloNumeros(e) {
  var key = e.keyCode || e.which;
  var tecla = String.fromCharCode(key).toLocaleLowerCase();
  var numeros = "0123456789";

  if (numeros.indexOf(tecla) == -1) {
    return false;
  }
}

function soloLetras(e) {
  var key = e.keyCode || e.which;
  var tecla = String.fromCharCode(key).toLocaleLowerCase();
  var letras = " áéíóúabcdefghijklmnopqrstuvwxyz";

  if (letras.indexOf(tecla) == -1) {
    return false;
  }
}

var edad1 = 0;
var edad2 = 0;
var masculino = 0;
var femenino = 0;

var contTotal = 0;

function agregar() {
  var id = document.getElementById("id").value;
  var nombre = document.getElementById("nombre").value;
  var edad = document.getElementById("edad").value;
  var sexo = document.getElementById("sexo").value;

  var registro =
  "<tr><td>" +
    id +
    "<tr><td>" +
    nombre +
    "</td><td>" +
    edad +
    "</td><td>" +
    sexo +
    "</td><td><button class='btnDel' onclick='eliminar(event);'>Eliminar</button></td></tr>";

  var add = document.createElement("tr");
  add.innerHTML = registro;

  document.getElementById("grilla").appendChild(add);
  contTotal++;
  console.log(contTotal);

  valTotal();  
  validaciones();
  valmayores();
  valmenores();
  generarGrafico();
}

function validaciones() {
  var edad = Number(document.getElementById("edad").value);
  var sexo = document.getElementById("sexo").value;
  if (edad > 0 && edad <= 17) {
    edad1++;
  }else if (edad > 17){
    edad2++;
  }
  //
  if (sexo == "femenino") femenino++;
  else if (sexo == "masculino") masculino++;
}


function valmenores(){
  document.getElementById("menores").innerHTML = edad1;
}

function valmayores(){
  document.getElementById("mayores").innerHTML = edad2;
}

function valTotal() {
  document.getElementById("totalreg").innerHTML = contTotal;
}

function cancelar() {
  document.getElementById("nombre").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("sexo").value = "";
}

function eliminar(evento) {
  if (confirm("Estas seguro que deseas eliminar este registro?")) {
    var fila = evento.target.parentNode.parentNode;

    contTotal--;

    var edad = document.getElementById("edad").value;
    if (edad > 0 && edad <= 17) edad1--;
    else if (edad > 17) edad2--;

    var sexo = document.getElementById("sexo").value;
  if (sexo == "femenino") femenino--;
  else if (sexo == "masculino") masculino--;

    fila.remove();
    valTotal();
    valmayores();
    valmenores();
  }
}

function validateDecimal(valor) {
    var RE = "^((0(\.\d{1,2})?)|([1-9]\d*(\.\d{1,2})?))$";
    if (RE.test(valor)) {
        return true;
    } else {
        return false;
    }
}

function generarGrafico() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(grafico);

  function grafico() {
    var data = google.visualization.arrayToDataTable([
      ["Sexo", "Personas segun su sexo"],
      ["femenino", femenino],
      ["masculino", masculino]
    ]);

    var options = {
      title: "Personas por Edades",
      pieHole: 0.4,
      slices: {
        0: { color: "red" },
        1: { color: "blue" }
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("pieChart")
    );
    chart.draw(data, options);
  }
}
