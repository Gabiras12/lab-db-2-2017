var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  cpf: String,
  rg: String,
  filiation: [String],
  sex: String,
  civilState: String,
  nationality: String,
  emails: [String],
  address: { type: Schema.Types.ObjectId, ref: 'Address' }
});

var addressSchema = Schema({
  _id: Schema.Types.ObjectId,
  number: Number,
  complement: String,
  postcode: Number,
  address: String
  neighborhood: { type: Schema.Types.ObjectId, ref: 'Neighborhood' }
});

var neighborhoodSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  city: { type: Schema.Types.ObjectId, ref: 'City' },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }]
})

var citySchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  state: { type: Schema.Types.ObjectId, ref: 'State' },
  neighborhoods: [{ type: Schema.Types.ObjectId, ref: 'Neighborhood' }]
})

var stateSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  cities: [{ type: Schema.Types.ObjectId, ref: 'City' }]
})

var countrySchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  states: [{ type: Schema.Types.ObjectId, ref: 'State' }]
})

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
  // keywords: [{ type: Schema.Types.ObjectId, ref: 'Keyword' }],
  keywords: [String],
  subject: {
    id: Number,
    description: String
  },
  release_date: Date,
  author: { type: Schema.Types.ObjectId, ref: 'Author' }
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
  name: String,
  url: String,
  email: [String]
})

var eventSchema = Schema({
  _id: Schema.Types.ObjectId,
  documentObject: { type: Schema.Types.ObjectId, ref: 'DocumentObject' },
  dateAccess: Date,
  url: String,
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

var articleSchema = Schema({
  _id: Schema.Types.ObjectId,
  documentObject: { type: Schema.Types.ObjectId, ref: 'DocumentObject' },
  url: String,
  date_access: Date,
  eventObejct: { type: Schema.Types.ObjectId, ref: 'EventObejct' }
});


export class Schemas {
  constructor() {
    this.institution = mongoose.model('Institution', institutionSchema);
    this.author = mongoose.model('Author', authorSchema);
    this.researcher = mongoose.model('Reasearcher', researcherSchema);
    this.profissional = mongoose.model('Profissional', profissionalSchema);
    // this.keyword = mongoose.model('Keyword', keywordsSchemas);
    this.documentObject = mongoose.model('DocumentObject', documentSchema);
    this.magazine = mongoose.model('Magazine', magazineSchema);
    this.book = mongoose.model('Book', bookSchema);
    this.publisher = mongoose.model('Publisher', publisherSchema);
    this.eventObejct = mongoose.model('EventObejct', eventSchema);
    this.dissertation = mongoose.model('Dissertation', dissertationSchema);
    this.article = mongoose.model('Article', articleSchema);
  }
}
