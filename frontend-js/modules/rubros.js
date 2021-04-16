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
let btnNivel = document.querySelector("#btn__nivel");
let deleteForm = document.querySelector("#deleteForm");
let updateForm = document.querySelector("#updateForm");
let btnMenu = document.querySelector("#menu");
let btnAdd = document.querySelector(".btn_add");
let btnUpdate = document.querySelector(".btn_update");
let btnDelete = document.querySelector(".btn_delete");
let btnCancelAdd = document.querySelector("#btnCancelar");
let btnCancelUpdate = document.querySelector("#btnCancelar2");
let btnCancelDelete = document.querySelector("#btnCancelar3");

let rubroAnterior = "";
let buttonFlag = 0;

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
    // prevent from sending form data when pressing Enter key
    document.querySelector("#addRubroNro").addEventListener("keydown", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault()
        // Trigger the button element with a click
        document.getElementById("addRubroDescri").focus()
      }
    })
    document.querySelector("#addRubroDescri").addEventListener("keydown", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault()
        // Trigger the button element with a click
        document.getElementById("addRubroNivel").focus()
      }
    })


    // mostrar ventana de eliminar datos
    
    
    
    // mostrar u ocultar add rubros
    btnAdd.addEventListener("click", () => {
      document.querySelector("#addForm").style.display = "flex";
      btnMenu.click()
    });
    btnCancelAdd.addEventListener("click", () => {
      document.querySelector("#addForm").style.display = "none";
    });
    
    // mostrar u ocultar update rubros
    btnUpdate.addEventListener("click", () => {
      this.exportData("update")
      document.querySelector("#updateForm").style.display = "flex";
      btnMenu.click()
    });
    btnCancelUpdate.addEventListener("click", () => {
      document.querySelector("#updateForm").style.display = "none";
    });
    
    // mostrar u ocultar delete rubros
    btnDelete.addEventListener("click", () => {
      this.exportData("del")
      document.querySelector("#deleteForm").style.display = "flex";
      btnMenu.click()
    });
    btnCancelDelete.addEventListener("click", () => {
      document.querySelector("#deleteForm").style.display = "none";
    });



    // actions after focus out from rubros
    rubroNro.addEventListener("focusout", () => {
      if (rubroNro.value != rubroAnterior) {
        rubroAnterior = rubroNro.value;
        // console.log("rubro cambió");
        this.removeRubros();
        this.injectHTML();
      } else {
        // console.log("rubro es el mismo");
      }
    });

    // actions after focus out from rubros
    document.querySelector("#rubro_detalle").addEventListener("change",() => {
      this.selectChanged()
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
    // document
    //   .querySelector("#btnCancelar")
    //   .addEventListener("click", function (event) {
    //     event.preventDefault();
    //     axios
    //       .post(`/logout`)
    //       .then((response) => {})
    //       .catch(() => {});
    //   });

  // 
  document
  .querySelector("#btnCancelar")
  .addEventListener("click", function (event) {
    event.preventDefault();    
  });
  document
  .querySelector("#btnCancelar2")
  .addEventListener("click", function (event) {
    event.preventDefault();    
  });
  document
  .querySelector("#btnCancelar3")
  .addEventListener("click", function (event) {
    event.preventDefault();    
  });

// menu buttons action
document.querySelector("#menu").addEventListener("click", ()=> {
  this.expandMenu()  
});

// end of events
}




// methods
expandMenu(){
  
  if (buttonFlag == 0) {
    document.querySelector("#btn_add").style.display = "flex";
    document.querySelector("#btn_update").style.display = "flex";
    document.querySelector("#btn_delete").style.display = "flex"
    
    setTimeout(() => {
      document.querySelector("#btn_add").style.transform = "translate(-40px , -30px)"
      document.querySelector("#btn_update").style.transform = "translateX(-80px)"
      document.querySelector("#btn_delete").style.transform = "translate(-40px , 30px)"
    }, 50);
      buttonFlag = 1
    }else{
      document.querySelector("#btn_add").style.transform = "translate(0)"
      document.querySelector("#btn_update").style.transform = "translate(0)"
      document.querySelector("#btn_delete").style.transform = "translate(0)"
      setTimeout(() => {
      document.querySelector("#btn_add").style.display = "none";
      document.querySelector("#btn_update").style.display = "none";
      document.querySelector("#btn_delete").style.display = "none"
      }, 200);
      buttonFlag = 0      
    }
  }

  exportData(action){

    let rubro = document.getElementById("rubro_nro")    
    let rubroDescri = document.getElementById("rubro_detalle")
    let nivel = document.getElementById("nivel")

    let exRubro = document.getElementById(`${action}RubroNro`)
    let exRubroDescri = document.getElementById(`${action}RubroDescri`)
    let exNivel = ""
    let cod = ""
    let cod2 = ""
    
    exRubro.value = rubro.value
    exRubroDescri.value = rubroDescri.value
    
    cod = rubro.value
    cod2 = rubroDescri.options[rubroDescri.selectedIndex].getAttribute("id2")
    
    if (action == "update") {
      exNivel = document.getElementById(`${action}NivelRubro`)
      exNivel.value = nivel.value
      updateForm.setAttribute("action",`/updateRubro/${cod}/${cod2}`)
    }
    if (action == "del") {
      deleteForm.setAttribute("action",`/deleteRubro/${cod}/${cod2}`)
    }

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

  selectChanged(){
    let oldNivel = document.getElementById("nivel")
    let rubroDescri = document.getElementById("rubro_detalle");
    let nivel = rubroDescri.options[rubroDescri.selectedIndex].getAttribute("nivel")
    if (oldNivel.value != nivel) {
      // console.log("nivel cambió");
      oldNivel.value = nivel
      this.nivel()
    } else {
      // console.log("nivel es el mismo");
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
          option.setAttribute("nivel", response.data[i].nivel_cod);
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
