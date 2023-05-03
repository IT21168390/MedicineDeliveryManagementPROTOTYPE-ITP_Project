import React, { Component } from 'react';
import axios from 'axios';

export default class ViewMedicineDeliveryRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medicineDeliveryRequests: []
        };
    }

    /*
    RETRIEVE ALL ORDERS
    
        componentDidMount() {
            this.retrieveMedicineDeliveryRequests();
        }
    
        retrieveMedicineDeliveryRequests() {
            axios.get("http://localhost:4500/medicinerequests").then(res => {
                if (res.data.success) {
                    this.setState({
                        medicineDeliveryRequests: res.data.existingRequests
                    });
                    //console.log(this.setState.medicineDeliveryRequests);
                }
            });
        } */
    componentDidMount() {
        this.retrieveMedicineDeliveryRequests();
    }

    retrieveMedicineDeliveryRequests() {
        axios.get("http://localhost:4500/medicinerequests").then(res => {
            if (res.data.success) {
                const existingNewRequests = res.data.existingRequests.filter(request => request.status == "Pending");
                this.setState({
                    medicineDeliveryRequests: existingNewRequests
                });
                console.log(this.setState.medicineDeliveryRequests);
            }
        });
    }


    onAccept_or_Reject = (id, event) => {
        const statusInReviewORRejected = event;
        const data = {
            status: statusInReviewORRejected
        }

        axios.put('http://localhost:4500/medicinerequests/updateStatus/' + id, data).then((res) => {
            if (res.data.success) {
                this.setState({
                    status: ""
                })
            }
            alert("Order status updated.");
            this.retrieveMedicineDeliveryRequests();
        })
    }


    onDelete = (id) => {
        axios.delete('http://localhost:4500/medicinerequests/remove/' + id).then((res) => {
            alert("Deletion successful.");
            this.retrieveMedicineDeliveryRequests();
        })
    }




    render() {
        return (


            <div className='dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                        <div >

                            <br /><br /><br />
                            <center><h1>Medicine Delivery Requests</h1></center><br /><hr />
                            <table className="table table-hover table-bordered" >
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Age</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Prescription Details</th>
                                        <th style={{ textAlign: 'center' }}><i className="fa fa-download" aria-hidden="true"></i></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.medicineDeliveryRequests.map((medicineDeliveryRequests, index) => (

                                        <tr key={medicineDeliveryRequests._id}>

                                            <td scope="row"><b>{index + 1}</b></td>
                                            <td>{medicineDeliveryRequests._id}</td>
                                            <td>{medicineDeliveryRequests.name}</td>
                                            <td>{medicineDeliveryRequests.age}</td>
                                            <td>{medicineDeliveryRequests.gender}</td>
                                            <td>{medicineDeliveryRequests.deliveryAddress}</td>
                                            <td>{medicineDeliveryRequests.phone}</td>
                                            <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{medicineDeliveryRequests.prescriptionDetails}</td>
                                            <td style={{ textAlign: 'center' }}>{medicineDeliveryRequests.prescriptionFile ?
                                                <a href={medicineDeliveryRequests.prescriptionFile} download>Download</a> :
                                                <span>No file available.</span>
                                            }</td>

                                            <td><button type="button" name="statusInReviewORRejected" className="btn btn-success" onClick={() => this.onAccept_or_Reject(medicineDeliveryRequests._id, "In Review")}><i className="fa fa-check" aria-hidden="true">&nbsp;&nbsp;Approve</i></button></td>
                                            <td><button type="button" name="statusInReviewORRejected" className="btn btn-warning" onClick={() => this.onAccept_or_Reject(medicineDeliveryRequests._id, "Rejected")}><i className="fa fa-times" aria-hidden="true">&nbsp;&nbsp;Reject</i></button></td>
                                            <td><button type="button" className="btn btn-danger" onClick={() => this.onDelete(medicineDeliveryRequests._id)}><i className="fa fa-trash" aria-hidden="true">&nbsp;&nbsp;Delete</i></button></td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>








                    </div>
                </div>
            </div>


        )
    }
}
