
import { Factory } from './create.js';
import { Util } from './util.js';
import { ORM } from './ORM';
import { Schemas } from './schemas';
var readlineSync = require('readline-sync');

export class Main {
  constructor() {
    this.mainMenuOptions = ['Create', 'Delete', 'Update', 'Query', 'List'];
    this.modelsMenu = ["Author", "Pesquisador", "Profissional", "Instituição", "Documento"];
    this.factory = new Factory();
    this.util = new Util();
    this.orm = new ORM();
    this.schemas = new Schemas();
  }

  showMenu() {
    var index = readlineSync.keyInSelect(this.mainMenuOptions, 'Select Action');

    switch (this.mainMenuOptions[index]) {
      case 'Create':
        this.createMenu();
        break;
      case 'Query':
        this.queryMenu();
        break;
      case 'List':
        this.listMenu();
          break;
      case 'Update':
        this.updateMenu();
          break;
      case 'Delete':
        this.deleteMenu();
        break;
      default:
    }
  }


  createMenu() {
    switch (this.modelMenu()) {
      case 'Author':
        this.factory.createAuthor((author) => {
          console.log(`Autor ${author.name} salvo.`);
          this.showMenu();
        });
        break;
      case 'Instituição':
        this.factory.saveInstitution((instituition) => {
          console.log(`Instituição ${instituition.name} salvo.`);
          this.showMenu();
        });
        break;
      case 'Documento':
        this.factory.saveDocument(() => {
          console.log('Doc salvo');
          this.showMenu();
        });
    }
  }

  listMenu() {
    this.orm.findAll(this.modelForOption(), 'authors', 'name', (authors) => {
      this.showMenu();
    });
  }

  queryMenu() {
    var index = readlineSync.keyInSelect(['By ID', 'Custom Query'], 'Select Action');

    switch (index) {
      case 0:
        this.queryById();
        break;
      case 1:
        this.queryByCustom();
        break;
    }
  }

  queryById() {
    var id = readlineSync.question('Enter id: ');
    this.orm.findRecord(this.modelForOption(), id, (model) => {
      this.showMenu();
    });
  }

  queryByCustom() {
    var params = readlineSync.question(`Enter query params as key:value,key:value: `);
    this.orm.queryRecord(this.modelForOption(), params, (models) => {
      this.showMenu();
    });
  }

  updateMenu() {
    var id = readlineSync.question('Enter id: ');
    this.orm.findRecord(this.modelForOption(), id, (model) => {
      var params = readlineSync.question(`Enter update params as key:value,key:value: `);
      this.orm.updateRecord(model, params, () => {
        this.showMenu();
      })
    });
  }

  deleteMenu() {
    var id = readlineSync.question('Enter id: ');
    this.orm.deleteRecord(this.modelForOption(), id, () => {
      this.showMenu();
    });
  }

  modelForOption() {
    var index = readlineSync.keyInSelect(this.modelsMenu, 'Select Model: ');

    switch (this.modelsMenu[index]) {
      case 'Author':
        return this.schemas.author;
        break;
      case 'Pesquisador':
        return this.schemas.researcher;
        break;
      case 'Profissional':
        return this.schemas.profissional;
        break;
      case 'Instituição':
        return this.schemas.institution;
        break;
      case 'Documento':
        return this.schemas.documentObject;
        break;
    }
  }

  modelMenu() {
    var index = readlineSync.keyInSelect(this.modelsMenu, 'Select Model: ');
    return this.modelsMenu[index];
  }
}

var main = new Main()
main.showMenu()
