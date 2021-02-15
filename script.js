function cargarRubrosDescri() {
  let rubroDetalle = [
    "JORNALES (BONIFICACIONES Y GRATIFICACIONES)",
    "JORNALES (SUBSIDIO FAMILIAR)",
    "JORNALES (HORAS EXTRAS)",
    "HONORARIOS PROFESIONALES",
    "SUELDOS",
  ];
  let comboRubroDetalle = document.getElementById("rubro_detalle");

  if (comboRubroDetalle.length > 1) {
    let lista = document.querySelector("#rubroDetalle");
    lista.forEach((element) => {
      element.remove();
    });
  }
  // CREO CADA ITEM DE LA LISTA DE RUBROS Y LE AGREGO UNA CLASE
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
  let tipo = document.getElementById("tipo").value;
  let programa = document.getElementById("programa").value;
  let programaDescri = document.getElementById("programa_detalle").value;
  let rubro = document.getElementById("rubro_nro").value;
  let rubroDescri = document.getElementById("rubro_detalle").value;
  let mes = document.getElementById("mes").value;
  let year = document.getElementById("year").value;
  let beneficiario = document.getElementById("beneficiarios").value;
  let unir = "";

  if ((boton === 0)) {
    unir =
      "TIPO " +
      tipo +
      " - PROGRAMA " +
      programa +
      " - " +
      programaDescri +
      " - RUBRO " +
      rubro +
      " " +
      rubroDescri +
      " DE " +
      mes +
      "/" +
      year +
      " - " +
      beneficiario;
  }else{
    unir="EN CONCEPTO DE CAJA CHICA SEGÚN DECRETO REGLAMENTARIO 3264/2020 – CAPÍTULO 06-09 ART. 225"
  }

  let final = document.getElementById("resultado");
  final.value = unir;
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

const rubroNro = document.getElementById("rubro_nro");
const rubroDetalle = document.getElementById("rubro_detalle");

rubroNro.addEventListener("focusout", cargarRubrosDescri);
rubroNro.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    rubroDetalle.focus();
  }
});

let boton = 0;
const btnCopiar = document.getElementById("boton1");
const btnCaja = document.getElementById("boton2");

btnCopiar.addEventListener("click", () => {
  boton = 0;
  copiar();
});
btnCaja.addEventListener("click", () => {
  boton = 1;
  copiar();
});

document.addEventListener(
  "DOMContentLoaded",
  function () {
    year();
  },
  false
);
