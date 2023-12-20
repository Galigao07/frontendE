class OnlineTestApp {
    constructor() {
        this.generateReceipt = async (cartItems) => {
            if (!cartItems || cartItems.length === 0) {
                console.error('Cart items data is empty or invalid');
                return ''; // Return an empty string if data is empty or invalid
            }

            // Create a receipt string based on cartItems
            let receiptContent = 'Receipt\n\n';
            let testLogo = "../assets/logo.png";
            // Embed an image using the <img> tag
            receiptContent += `<img src="${testLogo}"  alt="Your Image" style="width: 100px;height:100px;" />`;

            cartItems.forEach((item) => {
                receiptContent += `${item.quantity}  ${item.description} - $${item.totalAmount}\n`;
            });

            receiptContent += `\nTotal: $${cartItems.total}`;

            return receiptContent;
        };

        this.printReceipt = async (cartItems) => {
            console.log(cartItems);
            const receiptContent = await this.generateReceipt(cartItems);

            // Create a hidden iframe to prepare for printing
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            // Write the receipt content to the iframe document
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.write('<pre>' + receiptContent + '</pre>');
            doc.close();

            // Print the receipt
            iframe.contentWindow.print();

            // Remove the iframe after printing
            // setTimeout(() => {
            //     document.body.removeChild(iframe);
            // }, 1000); // Adjust timeout as needed for printing to complete
        };
    }
}

export default OnlineTestApp;
