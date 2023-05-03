module.exports = ({ medicineDeliveryRequests }) => {
    const today = new Date();

    let tableRows = '';

    medicineDeliveryRequests.forEach((request, index) => {
      tableRows += `
        <tr>
          <td scope="row"><b>${index + 1}</b></td>
          <td>${request._id}</td>
          <td style="min-width: 200px">${request.name}</td>
          <td></td>
          <td style="min-width: 175px">${request.deliveryAddress}</td>
          <td style="min-width: 175px">${request.orderCost}</td>
          <td style="min-width: 175px">${request.prescriptionDetails}</td>
          <td style="min-width: 175px">${request.deliveryPerson}</td>
          <td style="min-width: 150px"><center>${request.status}</center></td>
        </tr>
      `;
    });

return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
          <table class="table table-success table-hover table-bordered" style={{ width: 'auto', align: 'center', margin: 'auto' }}>
          <thead>
              <tr>
                  <th scope="col"></th>
                  <th scope="col">Order ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Address</th>
                  <th scope="col">Cost (Rs.)</th>
                  <th scope="col">Prescription Details</th>
                  <th scope="col">Deliverer</th>
                  <th scope="col"><center>Status</center></th>
              </tr>
          </thead>
          <tbody>
               ${tableRows}
          </tbody>
      </table>
             <br />
             <h1 class="justify-center">Total price: </h1>
          </div>
       </body>
    </html>
    `;
};