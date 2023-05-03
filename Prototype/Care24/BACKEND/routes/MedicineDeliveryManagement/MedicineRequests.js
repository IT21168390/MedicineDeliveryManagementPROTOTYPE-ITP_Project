const express = require('express');
const newMedicineRequestsRoute = express.Router();
/*const jwtForSecureTransfers = require('jsonwebtoken');
process.env.SECRET_KEY = 'secret';*/

let newMedicineRequest = require('../../models/MedicineDeliveryManagement/MedicineRequests'); 

newMedicineRequestsRoute.post('/newmedicinerequest/create', async (request, response) => {
    try {
        let medicineRequest = new newMedicineRequest(request.body);
        await medicineRequest.save();
        return response.status(200).json({
            success: "New Medicine Delivery Request created successfully."
        });
    } catch (err) {
        return response.status(400).json({
            error: err
        });
    }    
});



newMedicineRequestsRoute.get('/medicinerequests/view/:id', async (request, response) => {
    try {
        let medicinerequestID = request.params.id;

        const medicineRequest = await newMedicineRequest.findById(medicinerequestID);

        if(!medicineRequest) {
            return response.status(404).json({success:false, message: 'Medicine request not found'});
        }

        return response.status(200).json({
            success:true,
            medicineRequest
        });

    } catch (error) {
        return response.status(400).json({success:false, error});
    }
});



newMedicineRequestsRoute.get('/medicinerequests', (req, res) => {
    newMedicineRequest.find()
      .then((availablerequests) => {
        return res.status(200).json({
          success: true,
          existingRequests: availablerequests
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err
        });
      });
  });
  


newMedicineRequestsRoute.put('/medicinerequests/edit/:id', (req,res)=>{
    newMedicineRequest.findByIdAndUpdate(req.params.id, {$set:req.body})
        .then(medicineRequest => {
            return res.status(200).json({ success: "Successfully Updated." });
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
});

newMedicineRequestsRoute.put('/medicinerequests/updateStatus/:id', (req,res)=>{
    newMedicineRequest.findByIdAndUpdate(req.params.id, {$set:{ status: req.body.status }}) //newMedicineRequest.findByIdAndUpdate(req.params.id, {$set:{ status: "In Review" }})
        .then(medicineRequest => {
            return res.status(200).json({ success: "Successfully Updated." });
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
});

newMedicineRequestsRoute.put('/medicinerequests/addBill/:id', (req,res)=>{
  newMedicineRequest.findByIdAndUpdate(req.params.id, {$set:{ status: req.body.status, orderCost: req.body.orderCost, paymentStatus: req.body.paymentStatus }})
      .then(medicineRequest => {
          return res.status(200).json({ success: true });
      })
      .catch(err => {
          return res.status(400).json({ error: err });
      });
});



newMedicineRequestsRoute.delete('/medicinerequests/remove/:id', (req,res)=>{
    newMedicineRequest.findByIdAndRemove(req.params.id)
        .then((deletedRequest) => {
            return res.json({
                message: "Successfully deleted",
                deletedRequest
            });
        })
        .catch((err) => {
            return res.status(400).json({
                message: "Deletion unsuccessful.",
                err
            });
        });
});



module.exports = newMedicineRequestsRoute;