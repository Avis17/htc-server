
const mongodb = require("./Utils/dao");


module.exports = function(app) { 
      app.post("/api/web/login", function (req, res){
        let collectionName = req.body.collectionName;
        let reqdata = req.body.reqdata
        // console.log(reqdata)
        mongodb.login(collectionName,reqdata).then(async (result) => {
          res.status(200).send(result);
          return;
        }, async (error) => {
          res
          .status(500)
          .send(error);
        });
      })  
      app.post("/api/web/register", function (req, res){
        let collectionName = req.body.collectionName;
        let reqdata = req.body.reqdata
        mongodb.insert(collectionName,reqdata).then(async (result) => {
          res.send({
            status: 200,
            data:
              "new data is addded successfully for " + collectionName,
          });
          return;
        }, async (error) => {
          res
          .status(500)
          .send({
            data: error.msg,
            error: error.err,
          });
        });
      })
}




