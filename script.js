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
var edad3 = 0;
var edad4 = 0;

var contTotal = 0;

function agregar() {
  var nombre = document.getElementById("nombre").value;
  var edad = document.getElementById("edad").value;
  var peso = document.getElementById("peso").value;

  var registro =
    "<tr><td>" +
    nombre +
    "</td><td>" +
    edad +
    "</td><td>" +
    peso +
    "</td><td><button class='btnDel' onclick='eliminar(event);'>Eliminar</button></td></tr>";

  var add = document.createElement("tr");
  add.innerHTML = registro;

  document.getElementById("grilla").appendChild(add);
  contTotal++;
  console.log(contTotal);

  valTotal();
  valEdad();
}

function valEdad() {
  var edad = document.getElementById("edad").value;
  if (edad > 0 && edad <= 10) edad1++;
  else if (edad > 10 && edad <= 20) edad2++;
  else if (edad > 20 && edad <= 30) edad3++;
  else if (edad > 30) edad4++;
}

function valTotal() {
  document.getElementById("totalreg").innerHTML = contTotal;
}

function cancelar() {
  document.getElementById("nombre").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("peso").value = "";
}

function eliminar(evento) {
  if (confirm("Estas seguro que deseas eliminar este registro?")) {
    var fila = evento.target.parentNode.parentNode;

    contTotal--;

    var edad = document.getElementById("edad").value;
    if (edad > 0 && edad <= 10) edad1--;
    else if (edad > 10 && edad <= 20) edad2--;
    else if (edad > 20 && edad <= 30) edad3--;
    else if (edad > 30) edad4--;

    fila.remove();
    valTotal();
    console.log(contTotal);
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
      ["Edades", "Personas por Edades"],
      ["0 a 10 años", edad1],
      ["11 a 20 años", edad2],
      ["21 a 30 años", edad3],
      ["de 31 años en adelante", edad4],
    ]);

    var options = {
      title: "Personas por Edades",
      pieHole: 0.4,
      slices: {
        0: { color: "red" },
        1: { color: "blue" },
        2: { color: "yellow" },
        3: { color: "green" },
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("pieChart")
    );
    chart.draw(data, options);
  }
}
