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

let rubroAnterior = "";
let buttonFlag = 0;
let timeOutRed = [];

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
  focusInput: "#addRubroNro",
};
let nivelCrud = {
  menu: "#menu_nivel",
  addForm: "#addFormNivel",
  updateForm: "#updateFormNivel",
  deleteForm: "#deleteFormNivel",
  btnAdd: "#btn_nivel_add",
  btnUpdate: "#btn_nivel_update",
  btnDelete: "#btn_nivel_delete",
  btnAddSave: "#btnSaveNivel",
  btnAddCancel: "#btnCancelNivel",
  btnUpdateSave: "#btnSaveNivelUpdate",
  btnUpdateCancel: "#btnCancelNivelUpdate",
  btnDelSave: "#btnSaveNivelDelete",
  btnDelCancel: "#btnCancelNivelDelete",
  focusInput: "#addNivelNro"
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
  focusInput: "#addBenefDescri"
};
let tipoCrud = {
  menu: "#menu_tipo",
  addForm: "#addFormTipoPrograma",
  updateForm: "#updateFormTipoPrograma",
  deleteForm: "#deleteFormTipoPrograma",
  btnAdd: "#btn_tipo_add",
  btnUpdate: "#btn_tipo_update",
  btnDelete: "#btn_tipo_delete",
  btnAddSave: "#btnSaveTipoPrograma",
  btnAddCancel: "#btnCancelTipoPrograma",
  btnUpdateSave: "#btnSaveTipoProgramaUpdate",
  btnUpdateCancel: "#btnCancelTipoProgramaUpdate",
  btnDelSave: "#btnSaveTipoProgramaDelete",
  btnDelCancel: "#btnCancelTipoProgramaDelete",
  focusInput: "#addTipoNro"
};

document.querySelector("#rubro_nro").value = "";
document.querySelector("#rubro_detalle").value = 0;
benefSelect.value = 0;
timeOutRed[4] = setTimeout(() => {
  rubroNro.focus();
}, 1000);

// flash messages fading out and then removed
timeOutRed[5] = setTimeout(() => {
  let flash = document.querySelectorAll(".flashContainer");
  flash.forEach((o) => o.classList.remove("animate__bounceInRight"));
  flash.forEach((o) => o.classList.add("animate__fadeOutRight"));
timeOutRed[6] =  setTimeout(() => {
    flash.forEach((o) => o.remove());
  }, 2000);
}, 5000);

export default class rubros {
  constructor() {
    this._csrf = document.querySelector("[name='_csrf']").value
    this.events();
    this.preventEnterSend([rubroCrud, benefCrud, nivelCrud, tipoCrud]);
    this.openCrudForm("rubro", rubroCrud);
    this.openCrudForm("beneficiario", benefCrud);
    this.openCrudForm("nivel", nivelCrud);
    this.openCrudForm("tipo", tipoCrud);
    this.exportNivel();
    this.exportTipoPrograma()
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
    rubroNro.addEventListener("blur", () => {
      if (rubroNro.value != rubroAnterior) {
        rubroAnterior = rubroNro.value;
        this.removeRubros();
        this.injectHTML();
      }
    });

    // actions after focus out from rubros_detalle
    document.querySelector("#rubro_detalle").addEventListener("change", () => {
      this.selectChanged();
    });

    // auto relleno de tipo programa
    tipo.addEventListener("blur", ()=> {
      if (tipo.value.trim() != "" && programa.value.trim() != "") {
        axios
        .post(`/tipoPrograma`, {_csrf: this._csrf, tipo: document.querySelector("#tipo").value,
        programa: document.querySelector("#programa").value})
      .then((response) => {
        programa_detalle.value = response.data[0].prog_descri;
          })
          .catch(() => {
            programa_detalle.value = "";
          });
      }
    });
    programa.addEventListener("blur", ()=> {
      if (tipo.value.trim() != "" && programa.value.trim() != "") {
        axios
        .post(`/tipoPrograma`, {_csrf: this._csrf, tipo: document.querySelector("#tipo").value,
        programa: document.querySelector("#programa").value})
      .then((response) => {
        programa_detalle.value = response.data[0].prog_descri;
          })
          .catch(() => {
            programa_detalle.value = "";
          });
      }
    });

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

    btnCaja.addEventListener("click", ()=> {
      rubroNro.focus();
      rubroNro.value = 0;
      nivel.value = 0;
      axios
        .post(`/rubrosByNro`, {_csrf: this._csrf, nro: 0 })
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
    });

    btnCaja.addEventListener("click", ()=> {
      if (nivel.value != "") {
        axios
          .post(`/nivelById`, {_csrf: this._csrf, id: document.querySelector("#nivel").value})
          .then((response) => {
            nivelDescri.value = response.data[0].nivel_descri;
          })
          .catch(() => {
            final.value = "No recibió parámetro...";
          });
      } else {
        console.log("nivel está vacío");
      }
    });

    // enter para tipo programa
    tipo.addEventListener("keyup", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        if(tipo.value.trim()!=""){
          programa.focus();
          programa.select();
        }
      }
    });

    programa.addEventListener("keyup", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        if(programa.value.trim()!=""){
          // Trigger the button element with a click
          document.getElementById("boton1").focus();
        }
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

    // menu hover options
    rubroLabel.addEventListener("mouseover", () => {
      this.closeAllMenu(rubroCrud);
      this.showMenu(rubroCrud);
    });

    nivelLabel.addEventListener("mouseover", () => {
      this.closeAllMenu(nivelCrud);
      this.showMenu(nivelCrud);
    });

    descuentoLabel.addEventListener("mouseover", () => {
      this.closeAllMenu(benefCrud);
      this.showMenu(benefCrud);
    });

    tipoLabel.addEventListener("mouseover", () => {
      this.closeAllMenu(tipoCrud);
      this.showMenu(tipoCrud);
    });

    // end of events
  }

  // methods
  exportNivel() {

    let table = document.querySelector("#updateNivelTable")
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        if (table.rows[i].cells[1].innerText.length > 39) {
          document.querySelector("#updateNivelDescri").style.width = "100%";
        } else {
          document.querySelector("#updateNivelDescri").style.width = "auto";
        }
        document.querySelector("#updateNivelNro").value = table.rows[i].cells[0].innerText
        document.querySelector("#updateNivelDescri").value = table.rows[i].cells[1].innerText
      }
    }

    let table2 = document.querySelector("#deleteNivelTable")
    for (let j = 1; j < table2.rows.length; j++) {
      table2.rows[j].onclick = function () {
        if (table2.rows[j].cells[1].innerText.length > 39) {
          document.querySelector("#delNivelDescri").style.width = "100%";
        } else {
          document.querySelector("#delNivelDescri").style.width = "auto";
        }
        document.querySelector("#delNivelNro").value = table2.rows[j].cells[0].innerText
        document.querySelector("#delNivelDescri").value = table2.rows[j].cells[1].innerText
        document.querySelector(nivelCrud.deleteForm).setAttribute("action", `/deleteNivel/${table2.rows[j].cells[0].innerText}`);
      }
    }
  }

  exportTipoPrograma() {
    let table = document.querySelector("#updateTipoTable")
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        if (table.rows[i].cells[1].innerText.length > 39) {
          document.querySelector("#updateTipoProgramaNroDescri").style.width = "100%";
        } else {
          document.querySelector("#updateTipoProgramaNroDescri").style.width = "auto";
        }
        document.querySelector("#updateTipoNro").value = table.rows[i].cells[0].innerText
        document.querySelector("#updateProgramaNro").value = table.rows[i].cells[1].innerText
        document.querySelector("#updateTipoProgramaNroDescri").value = table.rows[i].cells[2].innerText
      }
    }

    table = document.querySelector("#deleteTipoTable")
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        if (table.rows[i].cells[1].innerText.length > 39) {
          document.querySelector("#delTipoProgramaNroDescri").style.width = "100%";
        } else {
          document.querySelector("#delTipoProgramaNroDescri").style.width = "auto";
        }
        document.querySelector("#delTipoNro").value = table.rows[i].cells[0].innerText
        document.querySelector("#delProgramaNro").value = table.rows[i].cells[1].innerText
        document.querySelector("#delTipoProgramaNroDescri").value = table.rows[i].cells[2].innerText
        document.querySelector(tipoCrud.deleteForm).setAttribute("action",
          `/deleteTipoPrograma/${table.rows[i].cells[0].innerText}/${table.rows[i].cells[1].innerText}`);
      }
    }

  }

  openCrudForm(type, form) {
    let emptyCheck

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
        // rubro
        if (type == "rubro") {
          emptyCheck = rubroNro
          if (emptyCheck.value.trim() != "") {
            this.exportData(type, "update", form.updateForm);
            document.querySelector(form.updateForm).style.display = "flex";
            document.querySelector(form.menu).click();
          } else {
            emptyCheck.classList.add("errorShadow");
            emptyCheck.focus();
            timeOutRed[0] = setTimeout(() => {        
              emptyCheck.classList.remove("errorShadow");
            }, 3000);
          }
          // beneficiario
        } else if (type == "beneficiario") {
          emptyCheck = benefSelect
          if (emptyCheck.value != "0") {
            this.exportData(type, "update", form.updateForm);
            document.querySelector(form.updateForm).style.display = "flex";
            document.querySelector(form.menu).click();
          } else {
            emptyCheck.classList.add("errorShadow");
            emptyCheck.focus();
            timeOutRed[1] = setTimeout(() => {
              emptyCheck.classList.remove("errorShadow");
            }, 3000);
          }
        } else {
          document.querySelector(form.updateForm).style.display = "flex";
          document.querySelector(form.menu).click();
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
        if (type == "rubro") {
          emptyCheck = rubroNro
          if (emptyCheck.value.trim() != "") {
            this.exportData(type, "del", form.deleteForm);
            document.querySelector(form.deleteForm).style.display = "flex";
            document.querySelector(form.menu).click();
          } else {
            emptyCheck.classList.add("errorShadow");
            emptyCheck.focus();
            timeOutRed[2] = setTimeout(() => {
              emptyCheck.classList.remove("errorShadow");
            }, 3000);
          }
        } else if (type == "beneficiario") {
          emptyCheck = benefSelect
          if (emptyCheck.value != "0") {
            this.exportData(type, "del", form.deleteForm);
            document.querySelector(form.deleteForm).style.display = "flex";
            document.querySelector(form.menu).click();
          } else {
            emptyCheck.classList.add("errorShadow");
            emptyCheck.focus();
            timeOutRed[3] = setTimeout(() => {
              emptyCheck.classList.remove("errorShadow");
            }, 3000);
          }
        } else {
          document.querySelector(form.deleteForm).style.display = "flex";
          document.querySelector(form.menu).click();
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
  
  clearTimeOuts(){
    let id = window.setTimeout(function () { }, 0);
    while (id--) {
      // clear all timeOuts that are not in the exceptions array
      if(!timeOutRed.includes(id)){
        window.clearTimeout(id); // will do nothing if no timeout with id is present
      } 
    }
  }

  closeAllMenu(menu) {
    this.clearTimeOuts()
    if (document.querySelector(menu.btnAdd).style.display != "flex") {
      buttonFlag = 0;
      for (let i = 0; i < document.querySelectorAll(".menu").length; i++) {
        document.querySelectorAll(".menu")[i].style.display = "none";
      }
    }
  }

  showMenu(menu) {
    if (document.querySelector(menu.menu).style.display != "flex") {
      document.querySelector(menu.menu).style.display = "flex";
      setTimeout(() => {
       if (document.querySelector(menu.btnAdd).style.display != "flex") {
        document.querySelector(menu.menu).style.display = "none";
       }
      }, 3000);
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
          "translate(-2.5rem , -1.875rem)";
        document.querySelector(menu.btnUpdate).style.transform =
          "translateX(-5rem)";
        document.querySelector(menu.btnDelete).style.transform =
          "translate(-2.5rem , 1.875rem)";
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
      }, 50);
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
        .post(`/nivelById`, {_csrf: this._csrf, id: document.querySelector("#nivel").value})
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
      .post(`/rubrosByNro`, {_csrf: this._csrf, nro: document.querySelector("#rubro_nro").value })
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
        benefSelect.value = 0;
        rubroNro.select();
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
