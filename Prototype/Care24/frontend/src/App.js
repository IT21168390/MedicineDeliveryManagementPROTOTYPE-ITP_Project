import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ViewMedicineDeliveryRequests from './components/MedicineDeliveryManagement/Patients/ViewMedicineDeliveryRequests';

import ViewSingleMedicineDeliveryRequest from './components/MedicineDeliveryManagement/Patients/ViewSingleMedicineDeliveryRequest';
import CreateMedicineDeliveryRequest from './components/MedicineDeliveryManagement/Patients/CreateMedicineDeliveryRequest';

import ViewNewMedicineDeliveryRequests from './components/MedicineDeliveryManagement/Pharmacist/ViewNewMedicineDeliveryRequests'
import AddBillToMedicineDeliveryRequests from './components/MedicineDeliveryManagement/Pharmacist/AddBillToMedicineDeliveryRequests'
import DeliveryAssignment from './components/MedicineDeliveryManagement/Pharmacist/AssignDeliveryForMDM'
import PharmacistOrderStatusUpdater from './components/MedicineDeliveryManagement/Pharmacist/UpdateOrderStatus'

import DeliveryDashboard from './components/MedicineDeliveryManagement/Deliverer/DeliveryOfMedicineRequests'


import NavBar from './components/MDMNavBar';
import NavBar2 from './components/MDMNavBar2';
import NavBarPharmacist from './components/NavBarPharmacist';

import Header from './components/Header';


export default class App extends Component {

  /* Render two components when the URL path is the same

  <Route path='/medicinerequests/view' element={
              <div>
                <ViewMedicineDeliveryRequests />
                <ViewMedicineDeliveryRequestStatus />
              </div>
  } />
  */

  render() {

    return (

      <BrowserRouter>
        
        <Header/>
        <NavBar2 />

        <div className="">
          <Routes>
            <Route path='/medicinerequests/dashboard' exact Component={CreateMedicineDeliveryRequest}></Route>
            <Route path='/medicinerequests/view' Component={ViewMedicineDeliveryRequests}></Route>
            <Route path='/medicinerequests/viewS/:id' Component={ViewSingleMedicineDeliveryRequest}></Route>
            

            <Route path='/medicinedelivery/pharmacist' Component={ViewNewMedicineDeliveryRequests}></Route>
            <Route path='/medicinedelivery/pharmacist/billing' Component={AddBillToMedicineDeliveryRequests}></Route>
            <Route path='/medicinedelivery/pharmacist/deliveryassignment' Component={DeliveryAssignment}></Route>
            <Route path='/medicinedelivery/pharmacist/orderSatuses' Component={PharmacistOrderStatusUpdater}></Route>

            <Route path='/medicinedelivery/deliveryPerson/' Component={DeliveryDashboard}></Route>

          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}
