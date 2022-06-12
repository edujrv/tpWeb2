const signupH = `<div class="row pad">
<h1 style="text-align: center;">
    Registro de Usuarios
</h1>
</div>
<form id="formu">
<div class="row pad">
<div class="col-md-1"></div>
<div class="col-md-2">
<label for="user" class="form-label">Usuario</label>
</div>
<div class="col-md-7">
<input
  type="text"
  class="form-control"
  id="user"
  placeholder="Ingrese su Usuario"
/>
</div>
</div>

<div class="row pad">
<div class="col-md-1"></div>
<div class="col-md-2">
<label for="mail" class="form-label">Email</label>
</div>
<div class="col-md-7">
<input
  type="email"
  class="form-control"
  id="mail"
  placeholder="Ingrese su Email"
/>
</div>
</div>
<div class="row pad">
<div class="col-md-1"></div>
<div class="col-md-2">
<label for="password" class="form-label">Constrasenia</label>
</div>
<div class="col-md-7">
<input
  type="password"
  class="form-control"
  id="password"
  placeholder="Ingrese su Contrasenia"
/>
</div>
</div>
<div class="row pad" id="perfilClass">
<!-- <div class="col-md-1"></div>
<div class="col-md-2">
  <label for="perfil" class="form-label">Perfil</label>
</div>
<div class="col-md-7">
    <select class="form-select" id="perfil" disabled>
        <option selected>Estandar</option>
        <option value="avanzado">Avanzado</option>
        <option value="admin">Administrador</option>
      </select>
</div> -->
</div>


<div class="row pad">
<div class="col-md-3"></div>
<div class="col-md-7" style="padding-bottom: 10px">
<input type="submit" class="btn btn-primary pad" onclick="validarSignUp()" value="Registrar">
</div>
</div>
</form>`;

const perfil_admin = `
<div class="col-md-1"></div>
<div class="col-md-2">
  <label for="perfil" class="form-label">Perfil</label>
</div>
<div class="col-md-7">
    <select class="form-select" id="perfil">
        <option selected>Estandar</option>
        <option value="avanzado">Avanzado</option>
        <option value="admin">Administrador</option>
      </select>
</div>`;


const perfil_user = `
<div class="col-md-1"></div>
<div class="col-md-2">
  <label for="perfil" class="form-label">Perfil</label>
</div>
<div class="col-md-7">
    <select class="form-select" id="perfil" disabled>
        <option selected>Estandar</option>
        <option value="avanzado">Avanzado</option>
        <option value="admin">Administrador</option>
      </select>
</div>`;

const table_header = `<div class="row">
<div class="col-md-3">
  <h1 class="tableH1">Equipo</h1>
</div>
<div class="col-md-3">
  <h1 class="tableH1" >Puntos</h1>
</div>
<div class="col-md-3">
  <h1 class="tableH1" >GAF</h1>
</div>
<div class="col-md-3">
  <h1 class="tableH1" >GEC</h1>
</div>
</div>`;




function enviar() {


    let localess = document.getElementsByName("local");
    let golesLocales = document.getElementsByName("golesL");
    let golesVisitantes = document.getElementsByName("golesV");
    let visitantess = document.getElementsByName("visitante");
    let fecha = document.getElementById("fecha").value;


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








    localStorage
    if (!camposVacios(localess, golesL, golesV, visitantess)) {
        if (!duplicates(equipos)) {
            cargarFecha(fecha, locales, golesL, golesV, visitantes);
        } else {
            alert("Se repiten equipos!"); //VER COMO HACER PARA QUE SE TERMINE EL PROGRAMA ACA
        }
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

    //         let xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://127.0.0.1:8866/save", true);
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader("Content-Type", "application/json");

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4) {
    //     console.log(xhr.status);
    //     console.log(xhr.responseText);
    //   }};

    // xhr.send(JSON.stringify(fechaNueva));

    // if(localStorage.getItem("fechas") === null){
    //     localStorage.setItem("fechas", JSON.stringify(fechaNueva));
    // }else{
    //     fechas = JSON.parse(localStorage.getItem("fechas"));
    //     fechas.push(fechaNueva);
    //     localStorage.setItem("fechas", JSON.stringify(fechas));
    // }


    // if (!(document.getElementById("divTable").innerHTML == "")) {
    //     crearTabla();
    // }


}

// function exists(local, visitante) {
//     // let equipos = JSON.parse(localStorage.getItem("equipos"));
//     let exist = false;
//     let cont = 6;

//     const equipos = [local, visitante];

//     equipos.forEach(element => {
//         let aux = element.value;
//         equipos.forEach(i => {
//             if (i.value == aux) {
//                 cont--;
//             }
//         });
//     });

//     if (cont != 0) {
//         // se repiten equipos
//         exist = true;
//     }

//     return exist;
// }

function duplicates(equipos) {
    let s = new Set(equipos);
    alert("set" + s);
    alert("equipos " + equipos);
    if (s.size == equipos.length) {
        return false;
    } else {
        return true;
    }
}

//ESTO SE PUEDE REDUCIR A VALIDAR LA FECHA CREO
function camposVacios(local, golesL, golesV, visitante) {
    // camposVacios valida si que los campos no sena nulos,
    //  si los equipos tienen al menos tres letras
    // y si los goles son mayores que cero.

    if (estaVacio(local) || letrasEquipo(local) ||
        estaVacio(golesL) || validGoles(golesL) ||
        estaVacio(golesV) || validGoles(golesV) ||
        estaVacio(visitante) || letrasEquipo(visitante)) {
        return true;
    } else {
        return false;
    }
}

//IGUAL QUE ARRIBA
function estaVacio(campo) {

    campo.forEach(element => {
        if (element.value == "") {
            element.setAttribute("style", "border-color:red; border-width:3px;");
            return true;
        } else {
            // element.setAttribute("style", "border-color:green; border-width:3px;");
            return false;
        }
    });
}

//ESTA SE PUEDE BORRAR
function letrasEquipo(campo) {

    campo.forEach(element => {
        if (parseInt(element.value) <= 3) {
            element.setAttribute("style", "border-color:red; border-width:3px;");
            return true;
        } else {
            element.setAttribute("style", "border-color:green; border-width:3px;");
            return false;
        }
    });
}

function validGoles(campo) {

    campo.forEach(element => {
        if (parseInt(element.value) >= 0) {
            element.setAttribute("style", "border-color:red; border-width:3px;");
            return true;
        } else {
            // element.setAttribute("style", "border-color:green; border-width:3px;");
            return false;
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
                return; //VER SI ESTO FUNCA
            }
            else if (equipo.equipo === partido.visitante) {
                equipo.gaf += parseInt(partido.golesVisitante);
                equipo.gec += parseInt(partido.golesLocal);
                if ((parseInt(partido.golesVisitante) - parseInt(partido.golesLocal)) > 0) {
                    equipo.puntos += 3;
                } else if (parseInt((partido.golesVisitante) - parseInt(partido.golesLocal)) == 0) {
                    equipo.puntos += 1;
                }
                return; //VER SI ESTO FUNCA
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



function formReg() {
    document.getElementById("divForm").innerHTML = signupH;
    document.getElementById("divForm").classList.add("container-signup");
    document.getElementById("divForm").classList.remove("container-login");
    document.getElementById("perfilClass").innerHTML = perfil_user;
    localStorage.setItem("contador", 0);// reseteo el contador
}

function crearTabla() {
    let tabla = document.getElementById("divTable");
    tabla.classList.add("container-table");
    tabla.innerHTML = table_header; // cambiar esto y agregar que fecha es
    let data = JSON.parse(localStorage.getItem("users")); // esto es equipo creo
    let id = 0;
    let flag = true


    data.forEach(element => {
        tabla.innerHTML += createRow(element.nombre, element.puntos, element.gaf, element.gec, id, flag);
        id++;
        flag = !flag;
    });

    // if (localStorage.getItem("perfil") == "admin") {
    //     data.forEach(element => {
    //         tabla.innerHTML += createRowAdmin(element.usuario, element.mail, element.perfil, id, flag);
    //         id++;
    //         flag = !flag;
    //     });
    // } else {
    //     data.forEach(element => {
    //         tabla.innerHTML += createRow(element.usuario, element.mail, element.perfil, id, flag);
    //         id++;
    //         flag = !flag;
    //     });
    // }

}

function createRow(nombre, puntos, gaf, gec, id, flag) {
    if (flag) {
        return `<div class="row row1">
    <div class="col-md-3">
      <h1 class="tableH1" name="nombre">`+ nombre + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" name="puntos">`+ puntos + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" name="gaf">`+ gaf + `</h1>
    </div>
    <div class="col-md-3">
      <h1 class="tableH1" name="gec">`+ gec + `</h1>
    </div>
    </div>`;
    } else {
        return `<div class="row row2">
    <div class="col-md-3">
        <h1 class="tableH1" name="nombre">`+ nombre + `</h1>
    </div>
    <div class="col-md-3">
        <h1 class="tableH1" name="puntos">`+ puntos + `</h1>
    </div>
    <div class="col-md-3">
        <h1 class="tableH1" name="gaf">`+ gaf + `</h1>
    </div>
    <div class="col-md-3">
        <h1 class="tableH1" name="gec">`+ gec + `</h1>
    </div>
    </div>`;
    }
}

// function createRowAdmin(user, mail, perfil, id, flag) {
//     if (flag) {
//         return `<div class="row row1">
//     <div class="col-md-3">
//       <h1 class="tableH1" id="user">`+ user + `</h1>
//     </div>
//     <div class="col-md-3">
//       <h1 class="tableH1" id="mail">`+ mail + `</h1>
//     </div>
//     <div class="col-md-3">
//       <h1 class="tableH1" id="perfil">`+ perfil + `</h1>
//     </div>
//     <div class="col-md-3">
//     <button onclick="Borrar(`+ id + `)" class="btn btn-outline-danger"> Eliminar </button>
//     </div>
//     </div>`;
//     } else {
//         return `<div class="row row2">
//     <div class="col-md-3">
//       <h1 class="tableH1" id="user">`+ user + `</h1>
//     </div>
//     <div class="col-md-3">
//       <h1 class="tableH1" id="mail">`+ mail + `</h1>
//     </div>
//     <div class="col-md-3">
//       <h1 class="tableH1" id="perfil">`+ perfil + `</h1>
//     </div>
//     <div class="col-md-3">
//     <button onclick="Borrar(`+ id + `)" class="btn btn-outline-danger"> Eliminar </button>
//     </div>
//     </div>`;
//     }
// }

function Borrar(id) {
    let data = JSON.parse(localStorage.getItem("users"));
    data.splice(id, 1);
    localStorage.setItem("users", JSON.stringify(data));
    crearTabla();
}



async function xd() {
    const partidos = await fetch("http://127.0.0.1:8866/getAll")
        .then(partidos => partidos.json())
        .catch((e) => { });

    console.log(partidos);
    actualizarTabla(partidos);
    let tabla = JSON.parse(localStorage.getItem("tabla"));
    let tablaOrdenada = ordenarTabla(tabla);
    console.log(tablaOrdenada);

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

// function parsearPartidos(partidosString){
//     let partidosParsead = [];

//     partidosString.forEach(partido =>{
//         let partidoP = [
//             local = partido.local,
//             visitante = partido.visitante,
//             golesLocal = parseInt(partido.golesLocal),
//             golesVisitante = parseInt(partido.golesVisitantes)
//         ]
//         partidosParsead.push(partidoP);
//     })
//     return partidosParsead;

// }