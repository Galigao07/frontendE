/* eslint-disable @typescript-eslint/no-unused-vars */
// extended.js

const BASE_URL = 'http://127.0.0.1:8000';


const socket = new WebSocket(`ws://127.0.0.1:8000/ws/your_frontend_group/`); // Replace 'your_frontend_group' with the actual group name
let socketdata = null;

socket.onopen = function(event) {
    console.log('WebSocket connection opened.');
};

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    console.log('Received data from Django:', message.data.fields);
    socketdata = message.data.fields;
    renderContent(); 
    // Call any function to update your UI with the received data
};

socket.onclose = function(event) {
    console.log('WebSocket connection closed.');
};

socket.onerror = function(event) {
    console.error('WebSocket error:', event);
};

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
    const data = await response.text();
    return data
}

// async function renderVideo() {
//     try {
//         const videoData = await fetchVideo();
//         if (videoData) {
//             const videoDiv = document.createElement('div');
//             const videoElement = document.createElement('video');
//             const sourceElement = document.createElement('source');

//             videoElement.setAttribute('controls');
//             videoElement.setAttribute('autoplay');
//             videoElement.setAttribute('loop');

//             sourceElement.setAttribute('src', videoData);
//             sourceElement.setAttribute('type', 'video/mp4');

//             videoElement.appendChild(sourceElement);
//             videoDiv.appendChild(videoElement);
//             return videoDiv;
//         } else {
//             console.error('No video data available.');
//             return null;
//         }
//     } catch (error) {
//         console.error('Error rendering video:', error);
//         return null;
//     }
// }
async function renderTable() {
    try {
        // const data = await fetchData();
        const data = socketdata

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
        tableDiv.style.margin = '2% 1%';

        tableDiv.style.height = `${window.innerHeight}px`;

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
        ['Qty', 'Description', 'Price', 'Amount'].forEach(headerText => {
            const th = document.createElement('th');
            th.style.fontSize = '40px'
       
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        tableHead.appendChild(headerRow);

        // Create table rows
        data.forEach(rowData => {
            const row = document.createElement('tr');
        
            ['qty', 'description', 'price', 'amount'].forEach((key, index) => {
                const cell = document.createElement('td');
                cell.textContent = rowData[key];
                
                if (index !== 1) {
                    cell.style.textAlign = 'center';
                }
        
                cell.style.fontSize = '25px';
        
                if (index === 2 || index === 3) {
                    // Using toLocaleString on numeric values
                    const numericValue = parseFloat(rowData[key]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    cell.textContent = numericValue;
                }
        
                row.appendChild(cell);
            });
        
            tableBody.appendChild(row);
        });
        

        let Qty = 0;
        let Amount = 0;
        data.forEach(rowData => {
            Qty += rowData.qty;
            Amount += parseFloat(rowData.amount);
        });

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

        return tableDiv;
    } catch (error) {
        console.error('Error rendering table:', error);
        return null;
    }
}

async function renderContent() {
    try {
        const rootElement = document.getElementById('root');
        if (!rootElement) {
            console.error('Root element not found.');
            return;
        }

        const containerDiv = document.createElement('div');
        containerDiv.style.display = 'flex';
        containerDiv.style.flexDirection = 'row';
        containerDiv.style.width = '100%'
        containerDiv.style.height = '100%'

        containerDiv.style.backgroundColor = '#007bff'
        

        // // Render video
        // const videoDiv = await renderVideo();
        // if (videoDiv) {
        //     containerDiv.appendChild(videoDiv);
        // }


        const videoData = await fetchVideo();

        const videoDiv = document.createElement('div');
        videoDiv.style.width = '100%'
        videoDiv.style.height = '100%'
        videoDiv.style.margin = '2% 1%'
        videoDiv.style.border = 'solid 3px blue'
        videoDiv.style.borderRadius = '10px'
        const videoElement = document.createElement('video');
        videoElement.style.width = '100%'
        videoElement.style.height = `${window.innerHeight}px`;

        // Add an event listener to update the height if the window is resized
        window.addEventListener('resize', () => {
            videoElement.style.height = `${window.innerHeight}px`;
        });
        videoElement.style.objectFit = 'cover';
        const sourceElement = document.createElement('source');
        
        videoElement.setAttribute('controls', 'true');
        videoElement.setAttribute('autoplay', 'autoplay'); // Add 'autoplay' attribute with value 'autoplay'
        videoElement.setAttribute('loop', 'loop'); // Add 'loop' attribute with value 'loop'
        
        sourceElement.setAttribute('src', videoData);
        sourceElement.setAttribute('type', 'video/mp4');
        
        videoElement.appendChild(sourceElement);
        videoDiv.appendChild(videoElement);
        
        containerDiv.appendChild(videoDiv);

        // Render table
        if (socketdata !== null ){
            const tableDiv = await renderTable();
            if (tableDiv) {
                containerDiv.appendChild(tableDiv);
            }
            socketdata = null;
        }


        // Append the container div to the root element
        rootElement.appendChild(containerDiv);
    } catch (error) {
        console.error('Error rendering content:', error);
    }
}

// Call renderContent function when the page loads
window.onload = renderContent;
