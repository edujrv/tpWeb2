const table_header = `<div class="row">
<div class="col-md-2">
</div>
<div class="col-md-1 tittleRow">
  <h1 class="tableH1" >Posicion</h1>
</div>
<div class="col-md-3 tittleRow">
  <h1 class="tableH1">Equipo</h1>
</div>
<div class="col-md-1 tittleRow">
  <h1 class="tableH1" >Puntos</h1>
</div>
<div class="col-md-1 tittleRow">
  <h1 class="tableH1" >GAF</h1>
</div>
<div class="col-md-1 tittleRow">
  <h1 class="tableH1" >GEC</h1>
</div>
</div>`;


function enviar() {


    let localess = document.getElementsByName("local");
    let golesLocales = document.getElementsByName("golesL");
    let golesVisitantes = document.getElementsByName("golesV");
    let visitantess = document.getElementsByName("visitante");
    let fecha = document.getElementById("fecha").value;
    let fechaElement = document.getElementById("fecha");

    let equipos = [];
    let golesL = [];
    let golesV = [];
    let visitantes = [];
    let locales = [];

    localess.forEach(local => {
        equipos.push(local.value);
        locales.push(local.value);
    })
    visitantess.forEach(visitante => {
        equipos.push(visitante.value);
        visitantes.push(visitante.value);
    })

    golesLocales.forEach(gol => {
        golesL.push(gol.value);
    })

    golesVisitantes.forEach(gol => {
        golesV.push(gol.value);
    })

    if (!camposVacios(localess, golesLocales, golesVisitantes, visitantess, fechaElement)) {
        if (!duplicates(equipos)) {
            cargarFecha(fecha, locales, golesL, golesV, visitantes);
        } else {
            alert("Se repiten equipos!");
        }
    }else{
        alert("Hay campos incompletos o mal ingresados");
    }
}

async function cargarFecha(fecha, locales, golesL, golesV, visitantes) {

    let fechas = [];

    for (let i = 0; i < 3; i++) {
        let fechaNueva = {
            fecha: fecha,
            local: locales[i],
            visitante: visitantes[i],
            golesLocal: golesL[i],
            golesVisitante: golesV[i]
        }
        fechas.push(fechaNueva);
    }

    console.log(JSON.stringify(fechas));

    const response = await fetch("http://127.0.0.1:8866/save", {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fechas),
    });

    alert("Fecha cargada exitosamente!");
}

async function editarFecha() {
    let fecha = document.getElementById("fecha");

    const partidos = await fetch("http://127.0.0.1:8866/get/"+fecha.value)
        .then(partidos => partidos.json())
        .catch((e) => { });

    console.log(partidos);


    let locales = document.getElementsByName("local");
    let golesLocales = document.getElementsByName("golesL");
    let golesVisitantes = document.getElementsByName("golesV");
    let visitantes = document.getElementsByName("visitante");
    let fechaElement = document.getElementById("fecha");

    let registrar = document.getElementById("registrar");
    registrar.hidden = true;

    let guardar = document.getElementById("guardar");
    guardar.hidden = false;

    let cancelar = document.getElementById("cancelar");
    cancelar.hidden = false;
   

    for (let i = 0; i < 3; i++){
        locales[i].value = partidos[i].local;
        visitantes[i].value = partidos[i].visitante;
        golesLocales[i].value = partidos[i].golesLocal;
        golesVisitantes[i].value = partidos[i].golesVisitante;
    }


    // Borrar los datos para esa fecha 
    borrarFecha();
    console.log("datos borrados");

    // Cargar los datos nuevos

}

async function borrarFecha(){
    let fecha = document.getElementById("fecha");

    await fetch("http://127.0.0.1:8866/delete/"+fecha.value, {
        method: 'DELETE' })
    .catch((e) => { });
}


function hola(){
    alert(hola);
}


function duplicates(equipos) {
    let s = new Set(equipos);
    if (s.size == equipos.length) {
        return false;
    } else {
        return true;
    }
}

function camposVacios(local, golesL, golesV, visitante, fecha) {
    // camposVacios valida si que los campos no sena nulos,
    //  si los equipos son validos
    // y si los goles son mayores que cero.

    if (estaVacio(local) || /*equipoValido(local) || */
        estaVacio(golesL) || validGoles(golesL) ||
        estaVacio(golesV) || validGoles(golesV) ||
        estaVacio(visitante) /*|| equipoValido(visitante)*/||
        fechaNoNull(fecha)) {
        return true;
    } else {
        return false;
    }
}

function estaVacio(campo) {
    let valido = false;

    campo.forEach(element => {
        if (element.value == "" || (element.value.localeCompare("Equipo Local") == 0 || element.value.localeCompare("Equipo Visitante") == 0)) {
            element.setAttribute("style", "border-color:red; border-width:3px;");
            valido = true;
        } else {
            element.setAttribute("style", "border-color:green; border-width:3px;");
        }
    });
    return valido;
}

function fechaNoNull(fecha){
    let valido = false;
    if (fecha.value == "") {
        fecha.setAttribute("style", "border-color:red; border-width:3px;");
        valido = true;
    } else {
        fecha.setAttribute("style", "border-color:green; border-width:3px;");
    }
    return valido;
}

function validGoles(campo) {

    campo.forEach(element => {
        if (parseInt(element.value) < 0) {
            element.setAttribute("style", "border-color:red; border-width:3px;");
            return false;
        } else {
            element.setAttribute("style", "border-color:green; border-width:3px;");
            return true;
        }
    });
}

function actualizarTabla(partidos) {

    crearScoreboard();
    let tabla = JSON.parse(localStorage.getItem("tabla"));

    tabla.forEach(equipo => {
        partidos.forEach(partido => {
            if (equipo.equipo === partido.local) {
                equipo.gaf += parseInt(partido.golesLocal);
                equipo.gec += parseInt(partido.golesVisitante);
                if ((parseInt(partido.golesLocal) - parseInt(partido.golesVisitante)) > 0) {
                    equipo.puntos += 3;
                } else if ((parseInt(partido.golesLocal) - parseInt(partido.golesVisitante)) == 0) {
                    equipo.puntos += 1;
                }
                return;
            }
            else if (equipo.equipo === partido.visitante) {
                equipo.gaf += parseInt(partido.golesVisitante);
                equipo.gec += parseInt(partido.golesLocal);
                if ((parseInt(partido.golesVisitante) - parseInt(partido.golesLocal)) > 0) {
                    equipo.puntos += 3;
                } else if (parseInt((partido.golesVisitante) - parseInt(partido.golesLocal)) == 0) {
                    equipo.puntos += 1;
                }
                return;
            }
        })
    });

    localStorage.setItem("tabla", JSON.stringify(tabla));
}



function ordenarTabla(equipos) {
    if (equipos.length <= 1) {
        return equipos;
    }

    var pivot = equipos[0];

    var left = [];
    var right = [];

    for (var i = 1; i < equipos.length; i++) {
        if (equipos[i].puntos > pivot.puntos) {
            left.push(equipos[i]);
        } else if (equipos[i].puntos == pivot.puntos && (equipos[i].gaf - equipos[i].gec) > (pivot.gaf - pivot.gec)) {
            left.push(equipos[i]);
        } else {
            right.push(equipos[i]);
        }
    }

    return ordenarTabla(left).concat(pivot, ordenarTabla(right));
};

function crearTabla() {
    let tabla = document.getElementById("divTable");
    tabla.innerHTML = table_header;
    let data = JSON.parse(localStorage.getItem("tabla"));
    let pos = 1;
    let flag = true


    data.forEach(element => {
        tabla.innerHTML += createRow(element.equipo, element.puntos, element.gaf, element.gec, pos, flag);
        pos++;
        flag = !flag;
    });
}

function createRow(nombre, puntos, gaf, gec, pos, flag) {
    if (flag) {
        return `
        <div class="row">
        <div class="col-md-2">
        </div>
        <div class="col-md-1 row1">
          <h1 class="tableH1" >`+ pos + `</h1>
        </div>
        <div class="col-md-3 row1">
          <h1 class="tableH1">`+ nombre + `</h1>
        </div>
        <div class="col-md-1 row1">
          <h1 class="tableH1" >`+ puntos + `</h1>
        </div>
        <div class="col-md-1 row1">
          <h1 class="tableH1" >`+ gaf + `</h1>
        </div>
        <div class="col-md-1 row1">
          <h1 class="tableH1" >`+ gec + `</h1>
        </div>
        </div>
    `;
    } else {
        return `
        <div class="row">
        <div class="col-md-2">
        </div>
        <div class="col-md-1 row2">
          <h1 class="tableH1" >`+ pos + `</h1>
        </div>
        <div class="col-md-3 row2">
          <h1 class="tableH1">`+ nombre + `</h1>
        </div>
        <div class="col-md-1 row2">
          <h1 class="tableH1" >`+ puntos + `</h1>
        </div>
        <div class="col-md-1 row2">
          <h1 class="tableH1" >`+ gaf + `</h1>
        </div>
        <div class="col-md-1 row2">
          <h1 class="tableH1" >`+ gec + `</h1>
        </div>
        </div>
    `;
    }
}

async function actualizarScoreboard() {
    const partidos = await fetch("http://127.0.0.1:8866/getAll")
        .then(partidos => partidos.json())
        .catch((e) => { });

    console.log(partidos);
    actualizarTabla(partidos);
    let tabla = JSON.parse(localStorage.getItem("tabla"));
    tabla = ordenarTabla(tabla);
    console.log(tabla);
    localStorage.setItem("tabla", JSON.stringify(tabla));
    crearTabla();
}

function crearScoreboard() {
    let tabla = [
        {
            equipo: "Boca",
            gaf: 0,
            gec: 0,
            puntos: 0
        },
        {
            equipo: "Belgrano",
            gaf: 0,
            gec: 0,
            puntos: 0
        },
        {
            equipo: "Sacachispas",
            gaf: 0,
            gec: 0,
            puntos: 0
        },
        {
            equipo: "Newells",
            gaf: 0,
            gec: 0,
            puntos: 0
        },
        {
            equipo: "Talleres",
            gaf: 0,
            gec: 0,
            puntos: 0
        },
        {
            equipo: "River",
            gaf: 0,
            gec: 0,
            puntos: 0
        },

    ];

    localStorage.setItem("tabla", JSON.stringify(tabla));
}