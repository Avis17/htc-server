const Mongo = require("mongodb");
const { MongoClient, ObjectId } = Mongo;
// var uri = "mongodb://localhost:27017";
var db;
const uri = "mongodb+srv://hitechcity:hitechcitymembers@cluster0.plfcxyz.mongodb.net/?retryWrites=true&w=majority";

let connect = () => {
  return new Promise((resolve, reject) => {
    try{
      MongoClient.connect(
        uri,
        { useUnifiedTopology: true, useNewUrlParser: true },
        function (err, dbInstance) {
          if (err) return reject(err);
          db = dbInstance.db("hitech-city");
          return resolve("hitech-city");
        }
      );
    }catch (error) {
      return reject("Internal Server error");
    }

  });
};

let query = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.find(query).toArray((err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let insert = (collectionName, data) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.insertOne(data, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let update = (collectionName, query, udpateData) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    // console.log("coming");
    collection.updateOne({"_id":new ObjectId(query)}, {$set:udpateData}, (err, result) => {
      // console.log(err, result);
      if (err) return reject(err);
      return resolve(result);
    });
  });
};


let deleteItem = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.deleteOne({"_id":new ObjectId(query)}, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let login = (collectionName, data) => {
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(uri, function (dberr, db) {
        if (dberr) throw dberr;
        var dbo = db.db("hitech-city");
        console.log(data)
        let collection = dbo.collection(collectionName);
        collection.findOne(data)
        .then(result => {
          if(result) {
            return resolve({status:200, login:true, user:result});
          } else {
            return reject({status:"failure", login:false});            }
        })
        .catch(err => console.error(`Failed to find document: ${err}`));
      });
    } catch (error) {
      return reject({msg:"Internal Server error"+collectionName,err:error});
    }
  });
};

module.exports = {
  connect,
  query,
  insert,
  update,
  deleteItem,
  login,
  ObjectId,
};
