/* eslint-disable @typescript-eslint/no-unused-vars */
// extended.js

const BASE_URL = 'http://127.0.0.1:8000';
// const BASE_URL = 'http://192.168.68.114:8000';

// const socket = new WebSocket('ws://localhost:8000/ws/extended'); 
// let socketdata = null;

// socket.onopen = function(event) {
//     document.querySelector("#socket").innerHTML ="kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
//     console.log('WebSocket connection opened.');
// };

// socket.onmessage = function(event) {
//     const message = JSON.parse(event.data);
//     console.log('Received data from Django:', message.data);
//     document.querySelector("#socket").innerHTML ="kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
//     socketdata = message.data;
//     renderContent(); 
//     // Call any function to update your UI with the received data
// };

// socket.onclose = function(event) {
//     console.log('WebSocket connection closed.');
// };

// socket.onerror = function(event) {
//     console.error('WebSocket error:', event);
// };


let socket;
let socketdata = null
let data




const chatSocket = new WebSocket('ws://localhost:8001/ws/group_name/');
// const chatSocket1 = new WebSocket('ws://localhost:8001/ws/extended/group/');

chatSocket.onopen = function() {
  console.log('WebSocket connection established.');
//   document.querySelector("#connect").innerHTML = 'WebSocket connection established.';
  const message = {
    'message': 'Hello, world!'
  };
  chatSocket.send(JSON.stringify(message));

//   document.querySelector("#data").innerHTML = localStorage.getItem('FullName');
};

chatSocket.onmessage = async function(event) {
//   const message = JSON.parse(event.data);
//   console.log('Received message:', message);
  const data = JSON.parse(event.data);
  console.log('Received data:', data);

    await LoadTable(event.data)

    let totalqty = 0
    let totalamount = 0
    let x  = 0
    const tbody = document.getElementById('tbodyid');
    const existingRows = tbody.querySelectorAll('tr');

    existingRows.forEach(existingRow => {
            const qtyCell = existingRow.querySelector('td:nth-child(1)');
            const priceCell = existingRow.querySelector('td:nth-child(3)');
            const amountCell = existingRow.querySelector('td:nth-child(4)');
            const amountString = priceCell.innerText.replace(/,/g, '');
             x = parseFloat(amountString);
            if (!isNaN(qtyCell.innerText)) {
                totalqty += parseInt(qtyCell.innerText);
            }
            if (!isNaN(priceCell.innerText)) {

                totalamount = (parseInt(qtyCell.innerText) * x ) + totalamount;
            }
        })

        const items = document.getElementById('items');
        const amount = document.getElementById('amount');
        const tendered = document.getElementById('tendered');
        const change = document.getElementById('change');

        items.textContent = totalqty;
        amount.textContent = totalamount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
        tendered.textContent ='0.00' ;
        change.textContent =`0.00`

};

async function LoadTable(jsonString){
    const jsonArray = JSON.parse(jsonString);

    
        const items = document.getElementById('items');
        const amount = document.getElementById('amount');
        const tendered = document.getElementById('tendered');
        const change = document.getElementById('change');

        items.textContent = '0.00';
        amount.textContent = '0.00';
        tendered.textContent = '0.00';
        change.textContent = '0.00';
    const monitorHeight = window.innerHeight * 0.95;
    const tableContainer = document.getElementById('TableContainer');

//  document.querySelector("#socket").innerHTML = monitorHeight;
    tableContainer.style.height = monitorHeight + 'px';
    // Check if the parsed data is an array
    if (typeof jsonArray === 'object' && !Array.isArray(jsonArray)) {
      const dataq = jsonArray.data;
      const action = jsonArray.action;
      const count = jsonArray.count;
      if (count !==0){

        if (action === 'Save'){

   
        const row = document.createElement('tr');
        const qtycell = document.createElement('td');
        qtycell.innerText = dataq.qty;
        qtycell.style.textAlign = 'center'
        row.appendChild(qtycell);
        
        // Create and populate the second cell (Description)
        const desccell = document.createElement('td');
        desccell.innerText = dataq.description;
        row.appendChild(desccell);

        const pricecell = document.createElement('td');
        pricecell.innerText = dataq.price.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
        pricecell.style.marginLeft = '10%'
        pricecell.style.textAlign = 'end'
        row.appendChild(pricecell);

        const amountcell = document.createElement('td');
        amountcell.style.textAlign = 'end'
        amountcell.style.marginLeft = '10%'
        amountcell.innerText = dataq.amount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
        row.appendChild(amountcell);

        const barcodecell = document.createElement('td');
        barcodecell.style.display = 'none'
        barcodecell.innerText = dataq.barcode;
        row.appendChild(barcodecell);

        const tbody = document.getElementById('tbodyid');
        const firstRow = tbody.firstChild; // Get the first row in the table body

        // Insert the new row before the first row in the table body
        tbody.insertBefore(row, firstRow);
        // tbody.appendChild(row);

        } 
        
        else if (action === 'Update') {
            const tbody = document.getElementById('tbodyid');
            const existingRows = tbody.querySelectorAll('tr');
        
            existingRows.forEach(existingRow => {
               
                const barcodeCell = existingRow.querySelector('td:nth-child(5)');
                if (barcodeCell && barcodeCell.innerText === dataq.barcode) {
                    // Update the content if the barcode matches
                    const qtyCell = existingRow.querySelector('td:nth-child(1)');
                    const descCell = existingRow.querySelector('td:nth-child(2)');
                    const priceCell = existingRow.querySelector('td:nth-child(3)');
                    const amountCell = existingRow.querySelector('td:nth-child(4)');
        
                    // Add the new quantity to the existing quantity
                    const newQty =  parseInt(dataq.qty);
                    qtyCell.innerText = newQty;
                    const newAmount = newQty * parseFloat(dataq.price);
                    amountCell.innerText = newAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                }
            });
        }
        
        else if (action === 'Delete') {
            const tbody = document.getElementById('tbodyid');
            const rows = tbody.querySelectorAll('tr');
    
            // Loop through all rows and remove the ones with the same barcode
            rows.forEach(row => {
                const barcodeCell = row.querySelector('td:nth-child(5)');
                // const barcodeCell = row.querySelector('td:last-child:not([style="display: none;"]):not(:empty)');
            
                if (barcodeCell && barcodeCell.innerText.trim() === dataq.barcode) {
                    // Remove the row if the barcode matches
                    row.remove();
                }
            }); }
      else{
        const tbody = document.getElementById('tbodyid');
        const rowToRemove = tbody.querySelector('tr'); // Select the row to remove, you may need to adjust the selector
        tbody.removeChild(rowToRemove);
      }

  
} else{
    const tbody = document.getElementById('tbodyid');
    const rowToRemove = tbody.querySelector('tr'); // Select the row to remove, you may need to adjust the selector
    tbody.removeChild(rowToRemove);
  }



    }

}
// 

async function LoadDataBeforeBOut () {

    const data = await fetchData()

        data.forEach(rowData => {
            const row = document.createElement('tr');
            const qtycell = document.createElement('td');
            qtycell.innerText = parseInt(rowData.qty);
            qtycell.style.textAlign = 'center'
            row.appendChild(qtycell);
            
            // Create and populate the second cell (Description)
            const desccell = document.createElement('td');
            desccell.innerText = rowData.description;
            row.appendChild(desccell);
    
            const pricecell = document.createElement('td');
            pricecell.innerText = rowData.price.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
            pricecell.style.marginLeft = '10%'
            pricecell.style.textAlign = 'end'
            row.appendChild(pricecell);
    
            const amountcell = document.createElement('td');
            amountcell.style.textAlign = 'end'
            amountcell.style.marginLeft = '10%'
            amountcell.innerText = rowData.amount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
            row.appendChild(amountcell);
    
            const barcodecell = document.createElement('td');
            barcodecell.style.display = 'none'
            barcodecell.innerText = rowData.barcode;
            row.appendChild(barcodecell);
    
            const tbody = document.getElementById('tbodyid');
    
            tbody.appendChild(row);
        })
    

}

async function LoadTable1(jsonString){

    // const data = await fetchData()

    const tableDiv = document.createElement('div');
    tableDiv.style.display = 'flex';
    tableDiv.style.flexDirection = 'column';
    const tableDiv1 = document.createElement('div');
    tableDiv1.style.height = '80%';
    tableDiv1.style.margin = '2%';
    tableDiv1.style.border = 'solid 3px blue';
    tableDiv1.style.borderRadius = '10px';
    tableDiv1.style.overflow = 'auto';

    const tableDiv2 = document.createElement('div');
    tableDiv2.style.margin = '2%';
    tableDiv2.style.border = 'solid 3px blue';
    tableDiv2.style.borderRadius = '10px';

    const TotalQtyLabel = document.createElement('label');
    TotalQtyLabel.style.fontSize = '40px'
    TotalQtyLabel.style.fontWeight = 'bold'
    const TotalAmountLabel = document.createElement('label');
    TotalAmountLabel.style.fontSize = '40px'
    TotalAmountLabel.style.fontWeight = 'bold'

    const AmountTendered = document.createElement('label');
    AmountTendered.style.fontSize = '40px'
    AmountTendered.style.fontWeight = 'bold'
    const Change = document.createElement('label');
    Change.style.fontSize = '40px'
    Change.style.fontWeight = 'bold'



    tableDiv.style.backgroundColor = 'white';


    tableDiv.style.border = 'solid 3px blue';
    tableDiv.style.borderRadius = '10px';
    tableDiv.style.width = '100%';
    // tableDiv.style.margin = '2% 1%';
    const windowHeight = window.innerHeight;
    const newHeight = windowHeight * 0.95; // 95% of the window's inner height

    tableDiv.style.height = `${newHeight}px`;
    // tableDiv.style.height = `${window.innerHeight}px`;

    // Add an event listener to update the height if the window is resized
    window.addEventListener('resize', () => {
        tableDiv.style.height = `${window.innerHeight}px`;
    });
    const table = document.createElement('table');
    table.style.border = '1';
    table.style.width = '100%';
    const tableHead = document.createElement('thead');

    const tableBody = document.createElement('tbody');

    // Create table header
    const headerRow = document.createElement('tr');
    headerRow.style.width = '100%';
    
    ['Qty', 'Description', 'Price', 'Amount', 'Barcode'].forEach(headerText => {
        const th = document.createElement('th');
        th.style.fontSize = '40px';
    
        if (headerText === 'Barcode') {
            th.style.display = 'none'; // Hide the 'barcode' column
        }
    
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    tableHead.appendChild(headerRow);
    

    const jsonArray = JSON.parse(jsonString);

    // Check if the parsed data is an array
    if (typeof jsonArray === 'object' && !Array.isArray(jsonArray)) {
      const dataq = jsonArray.data;
      const action = jsonArray.action;
      const count = jsonArray.count;

      document.querySelector("#socket1").innerHTML = count;
      if (count !==0){
        document.querySelector("#socket").innerHTML = jsonString
        const row = document.createElement('tr');
        const qtycell = document.createElement('td');
        qtycell.innerText = dataq.qty;
        row.appendChild(qtycell);
        
        // Create and populate the second cell (Description)
        const desccell = document.createElement('td');
        desccell.innerText = dataq.description;
        row.appendChild(desccell);

        const pricecell = document.createElement('td');
        pricecell.innerText = dataq.price;
        row.appendChild(pricecell);

        const amountcell = document.createElement('td');
        amountcell.innerText = dataq.amount;
        row.appendChild(amountcell);

        const barcodecell = document.createElement('td');
        barcodecell.style.display = 'none'
        barcodecell.innerText = dataq.barcode;
        row.appendChild(barcodecell);

        const tbody = document.getElementById('tbodyid');

        // tbodyrow.appendChild(row);
        tableBody.appendChild(row);
        tbody.appendChild(row);
      }



    } else {
        console.log("The parsed JSON data is not an array.");
    }
       

    // Create table rows
    // data.forEach(rowData => {
    //     const row = document.createElement('tr');

    //     ['qty', 'description', 'price', 'amount'].forEach((key, index) => {
    //         const cell = document.createElement('td');
    //         cell.textContent = rowData[key];
            
    //         if (index !== 1) {
    //             cell.style.textAlign = 'center';
    //         }

    //         cell.style.fontSize = '25px';

    //         if (index === 2 || index === 3) {
    //             // Using toLocaleString on numeric values
    //             const numericValue = parseFloat(rowData[key]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    //             cell.textContent = numericValue;
    //         }

    //         row.appendChild(cell);
    //     });

    //     tableBody.appendChild(row);
    // });


    let Qty = 0;
    let Amount = 0;
    // data.forEach(rowData => {
    //     Qty += rowData.qty;
    //     Amount += parseFloat(rowData.amount);
    // });

    TotalQtyLabel.textContent = `Total Items: ${Qty}`;
    TotalAmountLabel.textContent = `Amount Due: ${Amount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
    AmountTendered.textContent = `Amount Tendered: ${socketdata}`;
    Change.textContent = `Change: 0.00`;
    table.appendChild(tableHead);
    table.appendChild(tableBody);

    tableDiv1.appendChild(table);
    tableDiv2.appendChild(TotalQtyLabel);
    tableDiv2.appendChild(document.createElement('br')); // Add a line break
    tableDiv2.appendChild(TotalAmountLabel);
    tableDiv2.appendChild(document.createElement('br')); // Add a line break
    tableDiv2.appendChild(AmountTendered);
    tableDiv2.appendChild(document.createElement('br')); // Add a line break
    tableDiv2.appendChild(Change);

    tableDiv.appendChild(tableDiv1);
    tableDiv.appendChild(tableDiv2);
    const tableContainer = document.getElementById('TableContainer')
    // document.querySelector("#TableContainer").innerHTML = tableDiv;
    // tableContainer.appendChild(tableDiv)
}



async function fetchData() {
    try {
        const response = await fetch(`${BASE_URL}/api/extended-data/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function fetchVideo() {
    const response = await fetch(`${BASE_URL}/api/video-upload/`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data.data)

    return data.data
}


// async function renderTable() {
//     try {

//         const data = await fetchData();
//         const tableDiv = document.createElement('div');
//         tableDiv.style.display = 'flex';
//         tableDiv.style.flexDirection = 'column';
//         const tableDiv1 = document.createElement('div');
//         tableDiv1.style.height = '80%';
//         tableDiv1.style.margin = '2%';
//         tableDiv1.style.border = 'solid 3px blue';
//         tableDiv1.style.borderRadius = '10px';
//         tableDiv1.style.overflow = 'auto';

//         const tableDiv2 = document.createElement('div');
//         tableDiv2.style.margin = '2%';
//         tableDiv2.style.border = 'solid 3px blue';
//         tableDiv2.style.borderRadius = '10px';

//         const TotalQtyLabel = document.createElement('label');
//         TotalQtyLabel.style.fontSize = '40px'
//         TotalQtyLabel.style.fontWeight = 'bold'
//         const TotalAmountLabel = document.createElement('label');
//         TotalAmountLabel.style.fontSize = '40px'
//         TotalAmountLabel.style.fontWeight = 'bold'

//         const AmountTendered = document.createElement('label');
//         AmountTendered.style.fontSize = '40px'
//         AmountTendered.style.fontWeight = 'bold'
//         const Change = document.createElement('label');
//         Change.style.fontSize = '40px'
//         Change.style.fontWeight = 'bold'



//         tableDiv.style.backgroundColor = 'white';


//         tableDiv.style.border = 'solid 3px blue';
//         tableDiv.style.borderRadius = '10px';
//         tableDiv.style.width = '100%';
//         tableDiv.style.margin = '2% 1%';

//         tableDiv.style.height = `${window.innerHeight}px`;

//         // Add an event listener to update the height if the window is resized
//         window.addEventListener('resize', () => {
//             tableDiv.style.height = `${window.innerHeight}px`;
//         });
//         const table = document.createElement('table');
//         table.style.border = '1';
//         table.style.width = '100%';
//         const tableHead = document.createElement('thead');

//         const tableBody = document.createElement('tbody');

//         // Create table header
//         const headerRow = document.createElement('tr');
//         headerRow.style.width = '100%';
//         ['Qty', 'Description', 'Price', 'Amount'].forEach(headerText => {
//             const th = document.createElement('th');
//             th.style.fontSize = '40px'
       
//             th.textContent = headerText;
//             headerRow.appendChild(th);
//         });
//         tableHead.appendChild(headerRow);

//         // Create table rows
//         data.forEach(rowData => {
//             const row = document.createElement('tr');
        
//             ['qty', 'description', 'price', 'amount'].forEach((key, index) => {
//                 const cell = document.createElement('td');
//                 cell.textContent = rowData[key];
                
//                 if (index !== 1) {
//                     cell.style.textAlign = 'center';
//                 }
        
//                 cell.style.fontSize = '25px';
        
//                 if (index === 2 || index === 3) {
//                     // Using toLocaleString on numeric values
//                     const numericValue = parseFloat(rowData[key]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
//                     cell.textContent = numericValue;
//                 }
        
//                 row.appendChild(cell);
//             });
        
//             tableBody.appendChild(row);
//         });
        

//         let Qty = 0;
//         let Amount = 0;
//         data.forEach(rowData => {
//             Qty += rowData.qty;
//             Amount += parseFloat(rowData.amount);
//         });

//         TotalQtyLabel.textContent = `Total Items: ${Qty}`;
//         TotalAmountLabel.textContent = `Amount Due: ${Amount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
//         AmountTendered.textContent = `Amount Tendered: ${socketdata}`;
//         Change.textContent = `Change: 0.00`;
//         table.appendChild(tableHead);
//         table.appendChild(tableBody);

//         tableDiv1.appendChild(table);
//         tableDiv2.appendChild(TotalQtyLabel);
//         tableDiv2.appendChild(document.createElement('br')); // Add a line break
//         tableDiv2.appendChild(TotalAmountLabel);
//         tableDiv2.appendChild(document.createElement('br')); // Add a line break
//         tableDiv2.appendChild(AmountTendered);
//         tableDiv2.appendChild(document.createElement('br')); // Add a line break
//         tableDiv2.appendChild(Change);

//         tableDiv.appendChild(tableDiv1);
//         tableDiv.appendChild(tableDiv2);

//         return tableDiv;
//     } catch (error) {
//         console.error('Error rendering table:', error);
//         return null;
//     }
// }

async function renderContent() {
    try {
        const rootElement = document.getElementById('Video');
        if (!rootElement) {
            console.error('Root element not found.');
            return;
        }

        const containerDiv = document.createElement('div');


//#region 
        const videoData = await fetchVideo();


        const videoDiv = document.createElement('div');
        videoDiv.style.width = '100%';
        videoDiv.style.height = '100%'
        videoDiv.style.border = 'solid 3px blue'
        videoDiv.style.borderRadius = '10px'
        videoDiv.style.objectFit = 'cover';
        const videoElement = document.createElement('video');
        videoElement.style.width = '100%'
        const windowHeight = window.innerHeight;
        const newHeight = windowHeight * 0.95; 
        videoElement.style.borderRadius = '10px' 
        videoElement.style.height = `${newHeight}px`;
        videoElement.style.objectFit = 'cover';
        const sourceElement = document.createElement('source');
        videoElement.style.height = '100%'
        videoElement.setAttribute('controls', 'true');
        videoElement.muted = true;
        videoElement.setAttribute('autoplay', 'autoplay'); // Add 'autoplay' attribute with value 'autoplay'
        videoElement.setAttribute('loop', 'loop'); // Add 'loop' attribute with value 'loop'
        sourceElement.setAttribute('src', videoData);
        sourceElement.setAttribute('type', 'video/mp4');
    
        
        videoElement.appendChild(sourceElement);
        videoDiv.appendChild(videoElement);
        
        containerDiv.appendChild(videoDiv);
//#endregion
       

        // Append the container div to the root element
        rootElement.appendChild(containerDiv);
    } catch (error) {
        console.error('Error rendering content:', error);
    }
}

// Call renderContent function when the page loads
// window.onload = renderContent;
window.onload = function() {
    renderContent();
    LoadDataBeforeBOut();
};
