
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
      }),
      app.post("/api/web/incrementinvoice", function (req, res){
        let collectionName = req.body.collectionName;
        mongodb.query(collectionName,{}).then(async (result) => {
          if(result.length > 0)
          {
            let invoiceNo = {
              no:Number(result[0].no)+1
            };
            mongodb.update(collectionName, result[0]._id, invoiceNo).then(async (result1) => {
              res.send({
                status: 200,
                invoiceNumber:Number(result[0].no)+1,
                data:
                  "Invoice Number incremented successfully",
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
          }
        }, async (error) => {
          res
          .status(500)
          .send(error);
        });
      }),
      app.post("/api/web/resetinvoice", function (req, res){
        let collectionName = req.body.collectionName;
        let data = {no:req.body.data};
        mongodb.updateInvoice(collectionName,data).then(async (result) => {
          res.status(200).send(result);
          return;
        }, async (error) => {
          res
          .status(500)
          .send(error);
        });
      }),
      app.post("/api/web/addinvoice", function (req, res){
        let collectionName = req.body.collectionName;
        let reqdata = req.body.reqdata;
        mongodb.insert(collectionName,reqdata).then(async (result) => {
          mongodb.query('totalamount',{}).then(async (ress) => {
            var totalamount = Math.round(Number(ress[0].amount) + Number(reqdata.finalTotal));
            mongodb.update('totalamount','616fdf4ae0a8b6677ab90b70',{amount:totalamount}).then(async (ress1) => {
              res.send({
                status: 200,
                data:
                  "new data is addded successfully for " + collectionName,
              });
              return;
            }, async (error) => {
              res
              .status(500)
              .send(error);
            });
          }, async (error) => {
            res
            .status(500)
            .send(error);
          });
        }, async (error) => {
          res
          .status(500)
          .send({
            data: error.msg,
            error: error.err,
          });
        });

       
      

      }),
      app.post("/api/web/addcustomer", function (req, res){
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
      }),
      app.post("/api/web/getcustomers", function (req, res){
        let collectionName = req.body.collectionName;
        let reqdata = req.body.query;
        mongodb.query(collectionName,reqdata).then(async (result) => {
          res.status(200).send(result);
          return;
        }, async (error) => {
          res
          .status(500)
          .send(error);
        });
      }),
      app.post("/api/web/editcustomer", function (req, res){
        let collectionName = req.body.collectionName;
        let data = req.body.data;
        let query = req.body.query;
        mongodb.update(collectionName,query,data).then(async (result) => {
          res.status(200).send(result);
          return;
        }, async (error) => {
          res
          .status(500)
          .send(error);
        });
      }),
      app.post("/api/web/deletecustomer", function (req, res){
        let collectionName = req.body.collectionName;
        let reqdata = req.body.query;
        mongodb.deleteItem(collectionName,reqdata).then(async (result) => {
          res.status(200).send({result:result, status:200});
          return;
        }, async (error) => {
          res
          .status(500)
          .send(error);
        });
      })
}




