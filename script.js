function soloNumeros(e){
    var key = e.keyCode || e.which;
    var tecla = String.fromCharCode(key).toLocaleLowerCase();
    var numeros = "0123456789";

    if(numeros.indexOf(tecla) == -1)
    {
        return false;
    }
}

function soloLetras(e){
    var key = e.keyCode || e.which;
    var tecla = String.fromCharCode(key).toLocaleLowerCase();
    var letras = " áéíóúabcdefghijklmnopqrstuvwxyz";

    if(letras.indexOf(tecla) == -1)
    {
        return false;
    }
}


var contComp = 0;
var contInd = 0;
var contElec = 0;
var contNeg = 0;
var contTotal = 0;

function agregar(){
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var peso = document.getElementById("peso").value;

    var registro = "<tr><td>"+ nombre + "</td><td>" + edad + "</td><td>" + peso + "</td><td><button class='btnDel' onclick='eliminar(event);'>Eliminar</button></td></tr>";

    var add = document.createElement("tr");
    add.innerHTML = registro;

    document.getElementById("grilla").appendChild(add);
    contTotal++;

  

}

function cancelar(){
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("peso").value = "";
}

function eliminar(evento){

    if(confirm('Estas seguro que deseas eliminar este registro?'))
    {
        var fila = evento.target.parentNode.parentNode;

        contTotal--;

      
        fila.remove();
    }
}


function generarGrafico(){
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(grafico);


    function grafico(){
        var data = google.visualization.arrayToDataTable([
            ['Carrera', 'Matriculados por carrera'],
            ['Computacion', contComp],
            ['Industrial', contInd],
            ['Electronica', contElec],
            ['Negocios', contNeg]
        ]);  
        
        var options = {
            title: 'Matriculados por carrera',
            pieHole: 0.4,
            slices:{
                0: {color: 'red'},
                1: {color: 'blue'},
                2: {color: 'yellow'},
                3: {color: 'green'}
            }
        };

        var chart = new google.visualization.BarChart(document.getElementById('pieChart'));
        chart.draw(data, options);
    }
}