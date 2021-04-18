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
let deleteForm = document.querySelector("#deleteForm");
let updateForm = document.querySelector("#updateForm");
let btnAdd = document.querySelector("#btn_add");
let btnUpdate = document.querySelector("#btn_update");
let btnDelete = document.querySelector("#btn_delete");
let btnCancelAdd = document.querySelector("#btnCancelar");
let btnCancelUpdate = document.querySelector("#btnCancelar2");
let btnCancelDelete = document.querySelector("#btnCancelar3");
// btn menu
let btnRubro = document.querySelector("#menu_rubro");
let btnNivel = document.querySelector("#menu_nivel");
let btnDesc = document.querySelector("#menu_descuento");
let btnTipo = document.querySelector("#menu_tipo");
let btnMes = document.querySelector("#menu_mes");
// btn labels
let rubroLabel = document.querySelector("#rubro_btn");
let nivelLabel = document.querySelector("#nivel_btn");
let descuentoLabel = document.querySelector("#descuento_btn");
let tipoLabel = document.querySelector("#tipo_btn");
let mesLabel = document.querySelector("#mes_btn");
// btn flags
let a = 0
let b = 0
let c = 0
let d = 0
let e = 0

let rubroAnterior = "";
let buttonFlag = 0;
let menu = "";
let menuItem = "";

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
  let flash = document.querySelectorAll(".flashContainer");
  flash.forEach((o) => o.classList.remove("animate__bounceInRight"));
  flash.forEach((o) => o.classList.add("animate__fadeOutRight"));
  setTimeout(() => {
    flash.forEach((o) => o.remove());
  }, 2000);
}, 5000);

export default class rubros {
  constructor() {
    this.events();
  }

  // events
  events() {
    // prevent from sending form data when pressing Enter key
    document
      .querySelector("#addRubroNro")
      .addEventListener("keydown", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("addRubroDescri").focus();
        }
      });
    document
      .querySelector("#addRubroDescri")
      .addEventListener("keydown", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("addRubroNivel").focus();
        }
      });

    // actions after focus out from rubros
    rubroNro.addEventListener("focusout", () => {
      if (rubroNro.value != rubroAnterior) {
        rubroAnterior = rubroNro.value;
        this.removeRubros();
        this.injectHTML();
      } else {
      }
    });

    // actions after focus out from rubros_detalle
    document.querySelector("#rubro_detalle").addEventListener("change", () => {
      this.selectChanged();
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
    btnRubro.addEventListener("click", () => {
      menu = "#menu_rubro";
      menuItem = "#btn_rubro_";
      this.expandMenu(menu, menuItem);
    });
    btnNivel.addEventListener("click", () => {
      menu = "#menu_nivel";
      menuItem = "#btn_nivel_";
      this.expandMenu(menu, menuItem);
    });
    btnDesc.addEventListener("click", () => {
      menu = "#menu_descuento";
      menuItem = "#btn_desc_";
      this.expandMenu(menu, menuItem);
    });
    btnTipo.addEventListener("click", () => {
      menu = "#menu_tipo";
      menuItem = "#btn_tipo_";
      this.expandMenu(menu, menuItem);
    });
    btnMes.addEventListener("click", () => {
      menu = "#menu_mes";
      menuItem = "#btn_mes_";
      this.expandMenu(menu, menuItem);
    });

    // menu hover options
    rubroLabel.addEventListener("mouseover", () => {
      this.closeAllMenu()
      this.showMenu("rubro");
    });
    
    nivelLabel.addEventListener("mouseover", () => {
      this.closeAllMenu()
      this.showMenu("nivel");
    });
    
    descuentoLabel.addEventListener("mouseover", () => {
      this.closeAllMenu()
      this.showMenu("descuento");
    });
    
    tipoLabel.addEventListener("mouseover", () => {
      this.closeAllMenu()
      this.showMenu("tipo");
    });
    
    mesLabel.addEventListener("mouseover", () => {
      this.closeAllMenu()
      this.showMenu("mes");
    });

    // mostrar u ocultar add rubros
    // btnAdd.addEventListener("click", () => {
    //   document.querySelector("#addForm").style.display = "flex";
    //   btnMenu.click()
    //   document.querySelector("#addRubroNro").focus()

    // });
    // btnCancelAdd.addEventListener("click", () => {
    //   document.querySelector("#addForm").style.display = "none";
    // });

    // // mostrar u ocultar update rubros
    // btnUpdate.addEventListener("click", () => {
    //   if (rubroNro.value.trim() != "") {
    //     this.exportData("update")
    //   document.querySelector("#updateForm").style.display = "flex";
    //   btnMenu.click()
    //   }else{
    //     rubroNro.classList.add("errorShadow")
    //     rubroNro.focus()
    //     setTimeout(() => {
    //       rubroNro.classList.remove("errorShadow")
    //     }, 3000);
    //   }
    // });
    // btnCancelUpdate.addEventListener("click", () => {
    //   document.querySelector("#updateForm").style.display = "none";
    // });

    // // mostrar u ocultar delete rubros
    // btnDelete.addEventListener("click", () => {
    //   if (rubroNro.value.trim() != "") {
    //   this.exportData("del")
    //   document.querySelector("#deleteForm").style.display = "flex";
    //   btnMenu.click()
    //   }else{
    //     rubroNro.classList.add("errorShadow")
    //     rubroNro.focus()
    //     setTimeout(() => {
    //       rubroNro.classList.remove("errorShadow")
    //     }, 3000);
    //   }
    // });
    // btnCancelDelete.addEventListener("click", () => {
    //   document.querySelector("#deleteForm").style.display = "none";
    // });

    // end of events
  }

  // methods
  closeAllMenu() {
    buttonFlag = 0
    for (let i = 0; i < document.querySelectorAll(".menu").length; i++) {
      document.querySelectorAll(".menu")[i].style.display = "none";
    }
  }
  
  showMenu(type) {
    switch (type) {
      case "rubro":
        menu = "#menu_rubro";
        menuItem = "#btn_rubro_";                
        break;

      case "nivel":
        menu = "#menu_nivel";
        menuItem = "#btn_nivel_";
        break;

      case "descuento":
        menu = "#menu_descuento";
        menuItem = "#btn_desc_";
        break;

      case "tipo":
        menu = "#menu_tipo";
        menuItem = "#btn_tipo_";
        break;

      case "mes":
        menu = "#menu_mes";
        menuItem = "#btn_mes_";
        break;
    }

    if (document.querySelector(menu).style.display != "flex") {
      document.querySelector(menu).style.display = "flex";
      // setTimeout(() => {
      //  if (document.querySelector(menuItem+"update").style.display != "flex"
      //  && document.querySelector(menu).style.display == "flex") {
      //   document.querySelector(menu).style.display = "none";
      //  }
      // }, 3000);
    }
  }

  expandMenu(menu, btn) {
    if (buttonFlag == 0) {
      document.querySelector(btn + "add").style.display = "flex";
      document.querySelector(btn + "update").style.display = "flex";
      document.querySelector(btn + "delete").style.display = "flex";
      
      document.querySelector(btn + "add").style.transform = "translate(0)";
      document.querySelector(btn + "update").style.transform = "translate(0)";
      document.querySelector(btn + "delete").style.transform = "translate(0)";

      setTimeout(() => {
        document.querySelector(btn + "add").style.transform =
          "translate(-40px , -30px)";
        document.querySelector(btn + "update").style.transform =
          "translateX(-80px)";
        document.querySelector(btn + "delete").style.transform =
          "translate(-40px , 30px)";
      }, 50);
      buttonFlag = 1;
    } else {
      document.querySelector(btn + "add").style.transform = "translate(0)";
      document.querySelector(btn + "update").style.transform = "translate(0)";
      document.querySelector(btn + "delete").style.transform = "translate(0)";
      setTimeout(() => {
        document.querySelector(btn + "add").style.display = "none";
        document.querySelector(btn + "update").style.display = "none";
        document.querySelector(btn + "delete").style.display = "none";
      }, 200);
      setTimeout(() => {
        if (document.querySelector(btn + "update").style.display == "none" 
        &&  document.querySelector(menu).style.display != "none") {
          document.querySelector(menu).style.display = "none";
        }
      }, 2000);
      buttonFlag = 0;
    }
  }

  exportData(action) {
    let rubro = document.getElementById("rubro_nro");
    let rubroDescri = document.getElementById("rubro_detalle");
    let nivel = document.getElementById("nivel");

    let exRubro = document.getElementById(`${action}RubroNro`);
    let exRubroDescri = document.getElementById(`${action}RubroDescri`);
    let exNivel = "";
    let cod = "";
    let cod2 = "";

    exRubro.value = rubro.value;
    exRubroDescri.value = rubroDescri.value;

    cod = rubro.value;
    cod2 = rubroDescri.options[rubroDescri.selectedIndex].getAttribute("id2");

    if (exRubroDescri.value.length > 39) {
      exRubroDescri.style.width = "100%";
    } else {
      exRubroDescri.style.width = "auto";
    }

    if (action == "update") {
      exNivel = document.getElementById(`${action}NivelRubro`);
      exNivel.value = nivel.value;
      updateForm.setAttribute("action", `/updateRubro/${cod}/${cod2}`);
    }
    if (action == "del") {
      deleteForm.setAttribute("action", `/deleteRubro/${cod}/${cod2}`);
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

  selectChanged() {
    let oldNivel = document.getElementById("nivel");
    let rubroDescri = document.getElementById("rubro_detalle");
    let nivel = rubroDescri.options[rubroDescri.selectedIndex].getAttribute(
      "nivel"
    );
    if (oldNivel.value != nivel) {
      oldNivel.value = nivel;
      this.nivel();
    } else {
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
          option.setAttribute("id2", response.data[i].rub_cod2);
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
    rubroNro.focus()
    rubroNro.value = 0
    nivel.value = 0
    axios
      .post(`/rubrosByNro`, { nro: 0 })
      .then((response) => {
        final.value = response.data[0].rub_descri;
        /* Select the text field */
        final.select();
        /* Copy the text inside the text field */
        document.execCommand("copy");

        rubroNro.select();
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

    if (rubro.trim() != 0) {
      if (
        rubro.trim() != "" &&
        rubroDescri.trim() != "" &&
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
        document.getElementById("tipo").select();
      } else {
        final.value = `¡Te faltó cargar rubro!`;
        rubroNro.select();
      }
    }else{
      final.value = `¡Te faltó cargar rubro!`;
      rubroNro.select();
    }
  }
}
