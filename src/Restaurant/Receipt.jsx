// /* eslint-disable react/prop-types */
// import React, { useEffect } from 'react';
// import Logo from '../assets/logo.png';

// const Receipt = () => {
//   useEffect(() => {
//     window.print();
//   }, []); // Trigger print on component mount



//   return (

//         <img src={Logo} alt="Card Image" style={{ maxWidth: '100px' }} />

//   );
// };

// export default Receipt;

import React, { useEffect } from 'react';
import Logo from '../assets/logo.png'; // Adjust the path accordingly

const Receipt = ({cartitems}) => {
  useEffect(() => {
    const printTimeout = setTimeout(() => {
      window.print();
      localStorage.setItem('PrintSO', 'false');
      window.close();
    }, 1000); // Delay of 1 second (1000 milliseconds)

    return () => clearTimeout(printTimeout); // Clean up the timeout on component unmount
  }, []); //

  const generateReceipt = () => {
    if (!cartitems || cartitems.length === 0) {
      console.error('Cart items data is empty or invalid');
      return ''; // Return an empty string if data is empty or invalid
    }

    // Create a receipt string based on cartItems
    let receiptContent = 'Receipt\n\n';

    cartitems.forEach((item) => {
      receiptContent += `${item.quantity}  ${item.description} - $${item.totalAmount}\n`;
    });

    receiptContent += `\nTotal: $${cartitems.reduce((total, item) => total + item.totalAmount, 0)}`;

    return receiptContent;
  };

  const receiptContent = generateReceipt(); // Call generateReceipt to get the receipt content

  return (
    <div>
      <img src={Logo} alt="Card Image" style={{ maxWidth: '100px' }} />

      <div>{receiptContent}</div>
    </div>
  );
};

export default Receipt;
