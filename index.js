var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/labdb', { useMongoClient: true });
mongoose.Promise = global.Promise;
var Schemas = require('./schemas');

var author = new Schemas.Author({
  _id: new mongoose.Types.ObjectId(),
  name: 'José Felino',
  email: ['jose_felino213@bol.com', 'josefelino213@gmail.com']
})

author.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Object was insert successfully');
  }
})
