function cargarRubrosDescri() {
  let rubroDetalle = [
    "JORNALES (BONIFICACIONES Y GRATIFICACIONES)",
    "JORNALES (SUBSIDIO FAMILIAR)",
    "JORNALES (HORAS EXTRAS)",
    "HONORARIOS PROFESIONALES",
    "SUELDOS",
  ];
  let comboRubroDetalle = document.getElementById("rubro_detalle");
  // let lista = document.querySelector("#rubroDetalle");
  // lista.forEach(element => {
  //     element.remove();
  // });

  for (let i = 0; i < rubroDetalle.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", rubroDetalle[i]);
    option.setAttribute("class", "rubroDetalle");
    let optionText = document.createTextNode(rubroDetalle[i]);
    option.appendChild(optionText);
    comboRubroDetalle.appendChild(option);
  }
}

// COPIAR FUNCION
function copiar(event) {
  let tipo = document.getElementById("tipo");
  let programa = document.getElementById("programa");
  let programaDescri = document.getElementById("programa_detalle");
  let rubro = document.getElementById("rubro_nro");
  let rubroDescri = document.getElementById("rubro_detalle");
  let mes = document.getElementById("mes");
  let year = document.getElementById("year");
  let beneficiario = document.getElementById("beneficiarios");

  let final = document.getElementById("resultado");
  /* Select the text field */
  final.select();
  /* Copy the text inside the text field */
  document.execCommand("copy");
}

// AÑO ACTUAL
function year() {
  let year = document.getElementById("year");
  year.setAttribute("value", new Date().getFullYear());
}

const rubroDetalle = document.getElementById("rubro_detalle");

rubroDetalle.addEventListener("focusout", cargarRubrosDescri);

const btnCopiar = document.getElementById("boton1");

btnCopiar.addEventListener("click", copiar);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    year();
  },
  false
);
