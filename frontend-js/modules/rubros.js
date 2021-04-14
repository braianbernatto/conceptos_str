import axios from "axios";

let final = document.getElementById("resultado");
let nivel = document.getElementById("nivel");
let nivelDescri = document.getElementById("nivel_descri");
let programa_detalle = document.getElementById("programa_detalle");
let tipo = document.getElementById("tipo");
let programa = document.getElementById("programa");
let rubroNro = document.querySelector("#rubro_nro");
let btnOk = document.querySelector("#boton1");
let btnCaja = document.querySelector("#boton2");
let benefSelect = document.querySelector("#beneficiarios");
let btnRubro = document.querySelector("#btn__rubro");
let btnDescuentos = document.querySelector("#btn__descuentos");
let btnEliminar = document.querySelector("#btnEliminar");
let deleteForm = document.querySelector("#deleteForm");
let addForm = document.querySelector("#addForm");
let updateForm = document.querySelector("#updateForm");

let rubroAnterior = "";

final.value = "";
nivel.value = "";
nivelDescri.value = "";
document.querySelector("#rubro_nro").value = "";
document.querySelector("#rubro_detalle").value = 0;
benefSelect.value = 0;
setTimeout(() => {
  rubroNro.focus();
}, 1000);

// flash messages fading out and then removed
setTimeout(() => {
  let flash = document.querySelectorAll(".flashContainer")
  flash.forEach((o) => o.classList.remove("animate__bounceInRight"));
  flash.forEach((o) => o.classList.add("animate__fadeOutRight"));
  setTimeout(() => {
    flash.forEach((o) => o.remove())
  }, 2000);
}, 5000);

export default class rubros {
  constructor() {
    this.events();
  }

  // events
  events() {


    // mostrar ventana de eliminar datos
    btnDescuentos.addEventListener("click",()=>{
      this.exportData()
    })


    // mostrar u ocultar crud rubros
    btnRubro.addEventListener("click", () => {
      if (document.querySelector("#addForm").style.display != "flex") {
        document.querySelector("#addForm").style.display = "flex";
        document.querySelector("#updateForm").style.display = "flex";
      } else {
        document.querySelector("#addForm").style.display = "none";
        document.querySelector("#updateForm").style.display = "none";
      }
    });

    // actions after focus out from rubros
    rubroNro.addEventListener("focusout", () => {
      if (rubroNro.value != rubroAnterior) {
        rubroAnterior = rubroNro.value;
        console.log("rubro cambió");
        this.removeRubros();
        this.injectHTML();
      } else {
        console.log("rubro es el mismo");
      }
    });

    // auto relleno de tipo programa
    tipo.addEventListener("focusout", this.tipoPrograma);
    programa.addEventListener("focusout", this.tipoPrograma);

    rubroNro.addEventListener("keyup", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("rubro_detalle").focus();
      }
    });

    btnOk.addEventListener("click", this.copiar);

    btnCaja.addEventListener("click", this.cajaChica);

    btnCaja.addEventListener("click", this.nivel);

    // enter para tipo programa
    tipo.addEventListener("keyup", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        programa.focus();
        programa.select();
      }
    });

    programa.addEventListener("keyup", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("boton1").focus();
      }
    });

    programa_detalle.addEventListener("keyup", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("boton1").focus();
      }
    });

    // actions for cancel button
    document
      .querySelector("#btnCancelar")
      .addEventListener("click", function (event) {
        event.preventDefault();
        axios
          .post(`/logout`)
          .then((response) => {})
          .catch(() => {});
      });
  }



  // methods
  exportData(){
    let rubro = document.getElementById("rubro_nro")    
    let rubroDescri = document.getElementById("rubro_detalle")
    let delRubro = document.getElementById("delRubroNro")
    let delRubroDescri = document.getElementById("delRubroDescri")
    let cod = ""
    let cod2 = ""
    
    delRubro.value = rubro.value
    delRubroDescri.value = rubroDescri.value
    cod = rubro.value
    cod2 = rubroDescri.options[rubroDescri.selectedIndex].getAttribute("id2")
    deleteForm.setAttribute("action",`/deleteRubro/${cod}/${cod2}`)

  }

  removeRubros() {
    var options = document.querySelectorAll("#rubro_option");
    options.forEach((o) => o.remove());
  }

  nivel() {
    if (nivel.value != "") {
      axios
        .post(`/nivelById`, { id: document.querySelector("#nivel").value })
        .then((response) => {
          nivelDescri.value = response.data[0].nivel_descri;
        })
        .catch(() => {
          final.value = "No recibió parámetro...";
        });
    } else {
      console.log("nivel está vacío");
    }
  }

  injectHTML() {
    axios
      .post(`/rubrosByNro`, { nro: document.querySelector("#rubro_nro").value })
      .then((response) => {
        nivel.value = response.data[0].nivel_cod;
        for (let i = 0; i < response.data.length; i++) {
          let option = document.createElement("option");
          option.setAttribute("value", response.data[i].rub_descri);
          option.setAttribute("class", "rubroDetalle");
          option.setAttribute("id", "rubro_option");
          option.setAttribute("id2",response.data[i].rub_cod2);
          let optionText = document.createTextNode(response.data[i].rub_descri);
          option.appendChild(optionText);
          document.getElementById("rubro_detalle").appendChild(option);
        }
        this.nivel();
      })
      .catch(() => {
        final.value = "No existe este rubro";
      });
  }

  cajaChica() {
    axios
      .post(`/rubrosByNro`, { nro: 0 })
      .then((response) => {
        final.value = response.data[0].rub_descri;
        /* Select the text field */
        final.select();
        /* Copy the text inside the text field */
        document.execCommand("copy");
      })
      .catch(() => {
        final.value = "No hay datos de caja chica";
      });
  }

  tipoPrograma() {
    if (tipo.value.trim() != "" && programa.value.trim() != "") {
      axios
        .post(`/tipoPrograma`, {
          tipo: document.querySelector("#tipo").value,
          programa: document.querySelector("#programa").value,
        })
        .then((response) => {
          programa_detalle.value = response.data[0].prog_descri;
        })
        .catch(() => {
          programa_detalle.value = "";
        });
    }
  }

  copiar() {
    final.value = "";
    let tipo = document.getElementById("tipo").value;
    let programa = document.getElementById("programa").value;
    let programaDescri = document.getElementById("programa_detalle").value;
    let rubro = document.getElementById("rubro_nro").value;
    let rubroDescri = document.getElementById("rubro_detalle").value;
    let mes = document.getElementById("mes").value;
    let year = document.getElementById("year").value;
    let beneficiario = document.getElementById("beneficiarios").value;
    let unir = "";

    if (
      rubro.trim() != "" &&
      tipo.trim() != "" &&
      programa.trim() != "" &&
      programaDescri.trim() != ""
    ) {
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
        year;

      if (beneficiario != "0") {
        unir += " - " + beneficiario;
      }

      final = document.getElementById("resultado");
      final.value = unir;
      /* Select the text field */
      final.select();
      /* Copy the text inside the text field */
      document.execCommand("copy");
      rubroNro.select();
      benefSelect.value = 0;
    } else if (
      tipo.trim() == "" ||
      programa.trim() == "" ||
      programaDescri.trim() == ""
    ) {
      final.value = `¡Te faltó cargar tipo programa!`;
    } else {
      final.value = `¡Te faltó cargar rubro!`;
    }
  }
}
