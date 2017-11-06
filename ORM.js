export class ORM {
  findAll(model, modelName, property, completion) {
    model.find({}, (err, models) => {
      console.log(`\nListing all: `);

      models.forEach((currentModel) => {
        this.printModelDoc(currentModel);
      })

      completion(models);
    })
  }

  findRecord(model, id, completion) {
    model.findById(id, function(err, selectedModel) {
      console.log(`\nShowing model with id: ${id}:`);
      this.printModelDoc(selectedModel);
      completion(selectedModel);
    });
  }

  queryRecord(model, params, completion) {
    model.find(this.prepareParams(params), (err, models) => {
      console.log(`\nListing all ${models.length} finded records with params: ${params}`);

      models.forEach(function(currentModel) {
        let doc = currentModel._doc

        console.log('**********************');
        for (var key in doc) {
          if (doc.hasOwnProperty(key)) {
            console.log(key + ": " + doc[key]);
          }
        }
        console.log('**********************');
      })

      completion(models);
    })
  }

  updateRecord(model, params, completion) {
    let normalizedParams = this.prepareParams(params);

    for (var key in normalizedParams) {
      if (normalizedParams.hasOwnProperty(key)) {
        model[key] = normalizedParams[key]
      }
    }

    model.save(function(err) {
      if (err) {

      } else {
        console.log('Model updated succesfully.');
        completion(model);
      }
    });

  }

  deleteRecord(model, id, completion) {
    model.findByIdAndRemove(id, (err, record) => {
      console.log('Object was succesfully deleted.');
      completion();
    });
  }

  prepareParams(params) {
    var parsedParams = params.split(',');
    var result = {};

    parsedParams.forEach((currentParam) => {
      let paramsComponents = currentParam.split(':');

      result[paramsComponents[0]] = paramsComponents[1];
    });

    return result;
  }

  printModelDoc(model) {
    let doc = model._doc

    console.log('**********************');
    for (var key in doc) {
      if (doc.hasOwnProperty(key)) {
        console.log(key + ": " + doc[key]);
      }
    }
    console.log('**********************');
  }
}
