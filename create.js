var mongoose = require('mongoose');
var readlineSync = require('readline-sync');
import { Schemas } from './schemas'

// Connect to DB
mongoose.connect('mongodb://localhost:27017/labdb', { useMongoClient: true });
mongoose.Promise = global.Promise;

const schemas = new Schemas()

export class Factory {
  createAuthor(completion) {
    var name = readlineSync.question('Name: ');
    var email = readlineSync.question('Email: ');
    var cpf = readlineSync.question("cpf: ");
    var rg = readlineSync.question("rg: ");
    var filiation = readlineSync.question("filiation: ");
    var sex = readlineSync.question("sex: ");
    var civilState = readlineSync.question("civilState: ");
    var nationality = readlineSync.question("nationality: ");
    var emails = readlineSync.question("emails: ");
    var address = readlineSync.question("Address id: ");

    var author = schemas.author({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      emails: email,
      cpf: cpf,
      rg: rg,
      filiation: filiation,
      sex: sex,
      civilState: civilState,
      nationality: nationality,
      emails: emails
    })

    author.save((err) => {
      if (err) {
        console.log('Erro ao tentar salver autor. Tente novamente');
        completion();
      }  else {
        let authorTypes = ['Pesquisador', 'Profissional', 'Os dois'];
        var index = readlineSync.keyInSelect(authorTypes, 'Selecione tipo de autor');

        switch (authorTypes[index]) {
          case 'Pesquisador':
            this.saveResearcher(author, completion);
            break;
          case 'Profissional':
            this.saveProfessional(author, completion);
              break;
          case 'Os dois':
            this.saveResearcher(author, completion);
            this.saveProfessional(author, completion);
              break;
        }
      }
    });
  }

  saveResearcher(author, completion) {
    var title = readlineSync.question('Titulo: ');
    var project = readlineSync.question('Projeto: ');

    var researcher = schemas.researcher({
      _id: new mongoose.Types.ObjectId(),
      author: author,
      title: title,
      project: project
    })

    researcher.save((err) => {
      if (err) {
        console.log('Erro ao tentar salver autor. Tente novamente');
        completion(author);
      } else {
        console.log('Pesquisador Salvo...');
        completion(author);
      }
    })
  }

  saveProfessional(author, completion) {
    var area = readlineSync.question('Area: ');

    var profissional = schemas.profissional({
      _id: new mongoose.Types.ObjectId(),
      author: author,
      area: area
    })

    profissional.save((err) => {
      if (err) {
        console.log('Erro ao tentar salver autor. Tente novamente');
        completion(author);
      } else {
        console.log('Profissional Salvo...');
        completion(author);
      }
    })
  }

  saveInstitution(completion) {
    var name = readlineSync.question('Nome: ');
    var url = readlineSync.question('url: ');
    var emails = readlineSync.question('Emails(email1,email2): ');


    var institution = schemas.institution({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      emails: emails.split(','),
      url: url
    })

    institution.save((err) => {
      if (err) {
        console.log('Erro ao salvar instiruiçao');
      } else {
        completion(institution);
      }
    });
  }

  saveDocument(completion) {
    var title = readlineSync.question('Titulo: ');
    var abstract = readlineSync.question('Resumo: ');
    var keywords = readlineSync.question('Palasvras-chaves(p1,p2): ');
    var subjectNumber = readlineSync.question('Numero do assunto: ');
    var description = readlineSync.question('Descrição: ');
    var release_date = readlineSync.question('Data (YYYY-MM-DD): ');
    var authorID = readlineSync.question('Author ID:  ');

    var documentModel = schemas.documentObject({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      abstract: abstract,
      keywords: keywords,
      subject: {
        id: subjectNumber,
        description: description
      },
      release_date: new Date(release_date),
      author: authorID
    })

    documentModel.save(() => {
      this.saveDocumentType(documentModel, completion)
    });
  }

  saveDocumentType(doc, completion) {
    let docTypes = ['Livro', 'Artigo', 'Revista', 'Dissertação'];
    var index = readlineSync.keyInSelect(docTypes, 'Selecione tipo de documento');

    switch (docTypes[index]) {
      case 'Artigo':
        this.saveArticle(doc, completion);
        break;
      default:

    }
  }

  saveArticle(doc, completion) {
    var url = readlineSync.question('url: ');
    var date_access = readlineSync.question('Data (YYYY-MM-DD): ');
    var eventID = readlineSync.question('Evento ID: ');

    var article = schemas.documentObject({
      _id: new mongoose.Types.ObjectId(),
      documentObject: doc,
      url: url,
      date_access: new Date(date_access),
      eventObejct: eventID
    })

    article.save(() => {
      completion();
    })
  }
}
