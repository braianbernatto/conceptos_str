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
// btn menu
let btnRubro = document.querySelector("#menu_rubro");
let btnNivel = document.querySelector("#menu_nivel");
let btnDesc = document.querySelector("#menu_beneficiario");
let btnTipo = document.querySelector("#menu_tipo");
let btnMes = document.querySelector("#menu_mes");
// btn labels
let rubroLabel = document.querySelector("#rubro_btn");
let nivelLabel = document.querySelector("#nivel_btn");
let descuentoLabel = document.querySelector("#beneficiario_btn");
let tipoLabel = document.querySelector("#tipo_btn");
let mesLabel = document.querySelector("#mes_btn");

let rubroAnterior = "";
let buttonFlag = 0;

final.value = "";
nivel.value = "";
nivelDescri.value = "";

let rubroCrud = {
  menu: "#menu_rubro",
  addForm: "#addFormRubro",
  updateForm: "#updateFormRubro",
  deleteForm: "#deleteFormRubro",
  btnAdd: "#btn_rubro_add",
  btnUpdate: "#btn_rubro_update",
  btnDelete: "#btn_rubro_delete",
  btnAddSave: "#btnSaveRubro",
  btnAddCancel: "#btnCancelRubro",
  btnUpdateSave: "#btnSaveRubroUpdate",
  btnUpdateCancel: "#btnCancelRubroUpdate",
  btnDelSave: "#btnSaveRubroDelete",
  btnDelCancel: "#btnCancelRubroDelete",
  focusInput:"#addRubroNro",
};
let nivelCrud = {
  menu: "#menu_nivel",
  addForm: "#",
  updateForm: "#",
  deleteForm: "#",
  btnAdd: "#btn_nivel_add",
  btnUpdate: "#btn_nivel_update",
  btnDelete: "#btn_nivel_delete",
  btnAddSave: "#",
  btnAddCancel: "#",
  btnUpdateSave: "#",
  btnUpdateCancel: "#",
  btnDelSave: "#",
  btnDelCancel: "#",
  focusInput:"#"
};
let benefCrud = {
  menu: "#menu_beneficiario",
  addForm: "#addFormBeneficiario",
  updateForm: "#updateFormBeneficiario",
  deleteForm: "#deleteFormBeneficiario",
  btnAdd: "#btn_benef_add",
  btnUpdate: "#btn_benef_update",
  btnDelete: "#btn_benef_delete",
  btnAddSave: "#btnSaveBenef",
  btnAddCancel: "#btnCancelBenef",
  btnUpdateSave: "#btnSaveBenefUpdate",
  btnUpdateCancel: "#btnCancelBenefUpdate",
  btnDelSave: "#btnSaveBenefDelete",
  btnDelCancel: "#btnCancelBenefDelete",
  focusInput:"#addBenefDescri"
};
let tipoCrud = {
  menu: "#menu_tipo",
  addForm: "#",
  updateForm: "#",
  deleteForm: "#",
  btnAdd: "#btn_tipo_add",
  btnUpdate: "#btn_tipo_update",
  btnDelete: "#btn_tipo_delete",
  btnAddSave: "#",
  btnAddCancel: "#",
  btnUpdateSave: "#",
  btnUpdateCancel: "#",
  btnDelSave: "#",
  btnDelCancel: "#",
  focusInput:"#"
};
let mesCrud = {
  menu: "#menu_mes",
  addForm: "#",
  updateForm: "#",
  deleteForm: "#",
  btnAdd: "#btn_mes_add",
  btnUpdate: "#btn_mes_update",
  btnDelete: "#btn_mes_delete",
  btnAddSave: "#",
  btnAddCancel: "#",
  btnUpdateSave: "#",
  btnUpdateCancel: "#",
  btnDelSave: "#",
  btnDelCancel: "#",
  focusInput:"#"
};

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
    this.preventEnterSend([rubroCrud, benefCrud]);  
    this.openCrudForm("rubro", rubroCrud);
    this.openCrudForm("beneficiario", benefCrud);
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

    // menu buttons action
    btnRubro.addEventListener("click", () => {
      this.expandMenu(rubroCrud);
    });
    btnNivel.addEventListener("click", () => {
      this.expandMenu(nivelCrud);
    });
    btnDesc.addEventListener("click", () => {
      this.expandMenu(benefCrud);
    });
    btnTipo.addEventListener("click", () => {
      this.expandMenu(tipoCrud);
    });
    btnMes.addEventListener("click", () => {
      this.expandMenu(mesCrud);
    });

    // menu hover options
    rubroLabel.addEventListener("mouseover", () => {
      this.closeAllMenu();
      this.showMenu("rubro");
    });

    nivelLabel.addEventListener("mouseover", () => {
      this.closeAllMenu();
      this.showMenu("nivel");
    });

    descuentoLabel.addEventListener("mouseover", () => {
      this.closeAllMenu();
      this.showMenu("descuento");
    });

    tipoLabel.addEventListener("mouseover", () => {
      this.closeAllMenu();
      this.showMenu("tipo");
    });

    mesLabel.addEventListener("mouseover", () => {
      this.closeAllMenu();
      this.showMenu("mes");
    });
 

    // end of events
  }

  // methods
  openCrudForm(type, form){
    let emptyCheck
    switch (form) {
      case rubroCrud:
        emptyCheck = rubroNro      
        break
        
        case benefCrud:
          emptyCheck = benefSelect      
      break
    
    }
     // mostrar u ocultar add
     document.querySelector(form.btnAdd).addEventListener("click", () => {
      document.querySelector(form.addForm).style.display = "flex";
      document.querySelector(form.menu).click();
      document.querySelector(form.focusInput).focus();      
    });
    document.querySelector(form.btnAddCancel).addEventListener("click", () => {
        document.querySelector(form.addForm).style.display = "none";
      });

    // mostrar u ocultar update
    document
      .querySelector(form.btnUpdate)
      .addEventListener("click", () => {
        if (emptyCheck != "") {
          this.exportData(type,"update",form.updateForm);
          document.querySelector(form.updateForm).style.display = "flex";
          document.querySelector(form.menu).click();
        } else {
          emptyCheck.classList.add("errorShadow");
          emptyCheck.focus();
          setTimeout(() => {
            emptyCheck.classList.remove("errorShadow");
          }, 3000);
        }
      });
    document
      .querySelector(form.btnUpdateCancel)
      .addEventListener("click", () => {
        document.querySelector(form.updateForm).style.display = "none";
      });
  
    // mostrar u ocultar delete
    document
      .querySelector(form.btnDelete)
      .addEventListener("click", () => {
        if (emptyCheck != "") {
          this.exportData(type,"del", form.deleteForm);
          document.querySelector(form.deleteForm).style.display = "flex";
          document.querySelector(form.menu).click();
        } else {
          emptyCheck.classList.add("errorShadow");
          emptyCheck.focus();
          setTimeout(() => {
            emptyCheck.classList.remove("errorShadow");
          }, 3000);
        }
      });
    document
      .querySelector(form.btnDelCancel)
      .addEventListener("click", () => {
        document.querySelector(form.deleteForm).style.display = "none";
      });

  }

  preventEnterSend(buttons) {
    buttons.forEach((button) => {
      document
        .querySelector(button.btnAddCancel)
        .addEventListener("click", function (event) {
          event.preventDefault();
        });
      document
        .querySelector(button.btnUpdateCancel)
        .addEventListener("click", function (event) {
          event.preventDefault();
        });
      document
        .querySelector(button.btnDelCancel)
        .addEventListener("click", function (event) {
          event.preventDefault();
        });
    });
  }

  closeAllMenu() {
    buttonFlag = 0;
    for (let i = 0; i < document.querySelectorAll(".menu").length; i++) {
      document.querySelectorAll(".menu")[i].style.display = "none";
    }
  }

  showMenu(type) {
    let menu;
    switch (type) {
      case "rubro":
        menu = rubroCrud.menu;
        break;

      case "nivel":
        menu = nivelCrud.menu;
        break;

      case "descuento":
        menu = benefCrud.menu;
        break;

      case "tipo":
        menu = tipoCrud.menu;
        break;

      case "mes":
        menu = mesCrud.menu;
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

  expandMenu(menu) {
    if (buttonFlag == 0) {
      document.querySelector(menu.btnAdd).style.display = "flex";
      document.querySelector(menu.btnUpdate).style.display = "flex";
      document.querySelector(menu.btnDelete).style.display = "flex";

      document.querySelector(menu.btnAdd).style.transform = "translate(0)";
      document.querySelector(menu.btnUpdate).style.transform = "translate(0)";
      document.querySelector(menu.btnDelete).style.transform = "translate(0)";

      setTimeout(() => {
        document.querySelector(menu.btnAdd).style.transform =
          "translate(-40px , -30px)";
        document.querySelector(menu.btnUpdate).style.transform =
          "translateX(-80px)";
        document.querySelector(menu.btnDelete).style.transform =
          "translate(-40px , 30px)";
      }, 50);
      buttonFlag = 1;
    } else {
      document.querySelector(menu.btnAdd).style.transform = "translate(0)";
      document.querySelector(menu.btnUpdate).style.transform = "translate(0)";
      document.querySelector(menu.btnDelete).style.transform = "translate(0)";
      setTimeout(() => {
        document.querySelector(menu.btnAdd).style.display = "none";
        document.querySelector(menu.btnUpdate).style.display = "none";
        document.querySelector(menu.btnDelete).style.display = "none";
      }, 200);
      setTimeout(() => {
        if (
          document.querySelector(menu.btnUpdate).style.display == "none" &&
          document.querySelector(menu.menu).style.display != "none"
        ) {
          document.querySelector(menu.menu).style.display = "none";
        }
      }, 2000);
      buttonFlag = 0;
    }
  }

  exportData(type, action, form) {
    switch (type) {
      case "rubro":
              let rubro = document.getElementById("rubro_nro");
              let rubroDescri = document.getElementById("rubro_detalle");
              let nivel = document.getElementById("nivel");

              let exRubro = document.getElementById(`${action}RubroNro`);
              let exRubroDescri = document.getElementById(`${action}RubroDescri`);
              let exNivel = "";
              let id2 = "";
              
              exRubro.value = rubro.value;
              exRubroDescri.value = rubroDescri.value;

              id2 = rubroDescri.options[rubroDescri.selectedIndex].getAttribute("id2");

              if (exRubroDescri.value.length > 39) {
                exRubroDescri.style.width = "100%";
              } else {
                exRubroDescri.style.width = "auto";
              }

              if (action == "update") {
                // only when is update there's need for export nivel
                exNivel = document.getElementById(`${action}NivelRubro`);
                exNivel.value = nivel.value;
                // 
                document.querySelector(form).setAttribute("action", `/updateRubro/${id2}`);
              }
              if (action == "del") {
                document.querySelector(form).setAttribute("action", `/deleteRubro/${id2}`);
              }
        break;
    
      case "beneficiario":

              let exBenef = document.getElementById(`${action}BenefDescri`);
              let id = "";
              
              exBenef.value = benefSelect.value;
              id = benefSelect.options[benefSelect.selectedIndex].getAttribute("id");

              if (exBenef.value.length > 39) {
                exBenef.style.width = "100%";
              } else {
                exBenef.style.width = "auto";
              }

              if (action == "update") {
                document.querySelector(form).setAttribute("action", `/updateBeneficiario/${id}`);
              }
              if (action == "del") {
                document.querySelector(form).setAttribute("action", `/deleteBeneficiario/${id}`);
              }
        break;
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
    rubroNro.focus();
    rubroNro.value = 0;
    nivel.value = 0;
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
    } else {
      final.value = `¡Te faltó cargar rubro!`;
      rubroNro.select();
    }
  }
}
