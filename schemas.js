var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  emails: [String]
});

var researcherSchema = Schema({
  _id: Schema.Types.ObjectId,
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  title: String,
  project: String
});

var profissionalSchema = Schema({
  _id: Schema.Types.ObjectId,
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  area: String
});

var institutionSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  emails: [String],
  url: String
});

var keywordsSchemas = Schema({
  _id: Schema.Types.ObjectId,
  documets: [{ type: Schema.Types.ObjectId, ref: 'DocumentObject' }],
  word: String
});

var documentSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  abstract: String,
  keywords: [{ type: Schema.Types.ObjectId, ref: 'Keyword' }],
  subject: {
    id: Number,
    description: String
  },
  release_date: Date
});

var magazineSchema = Schema({
  _id: Schema.Types.ObjectId,
  documentObject: { type: Schema.Types.ObjectId, ref: 'DocumentObject' },
  name: String,
  page: String,
  section: Number,
  edition: Number,
  publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' }
})

var bookSchema = Schema({
  _id: Schema.Types.ObjectId,
  documentObject: { type: Schema.Types.ObjectId, ref: 'DocumentObject' },
  name: String,
  initialPage: Number,
  edition: Number,
  publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' }
})

var publisherSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String
  url: String
  email: [String]
})

var eventSchema = Schema({
  _id: Schema.Types.ObjectId,
  documentObject: { type: Schema.Types.ObjectId, ref: 'DocumentObject' },
  dateAccess: Date
  url: String
  event: {
    name: String,
    location: String,
    date: Date
  }
})

var dissertationSchema = Schema({
  _id: Schema.Types.ObjectId,
  documentObject: { type: Schema.Types.ObjectId, ref: 'DocumentObject' },
  name: String,
  session: Number
})

var Institution = mongoose.model('Institution', institutionSchema);
var Author = mongoose.model('Author', authorSchema);
var Researcher = mongoose.model('Reasearcher', researcherSchema);
var Profissional = mongoose.model('Profissional', profissionalSchema);
var Keyword = mongoose.model('Keyword', keywordsSchemas);
var DocumentObject = mongoose.model('DocumentObject', documentSchema);
var Magazine = mongoose.model('Magazine', magazineSchema);
var Book = mongoose.model('Book', bookSchema);
var Publisher = mongoose.model('Publisher', publisherSchema);
var EventObejct = mongoose.model('EventObejct', eventSchema);
var Dissertation = mongoose.model('Dissertation', dissertationSchema);

exports.Author = Author
exports.DocumentObject = DocumentObject
exports.Keyword = Keyword
exports.Institution = Institution
exports.Profissional = Profissional
exports.Researcher = Researcher
exports.Magazine = Magazine
exports.Book = Book
exports.Publisher = Publisher
exports.EventObejct = EventObejct
exports.Dissertation = Dissertation
