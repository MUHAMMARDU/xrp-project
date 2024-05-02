async function sendTransactionToXRP(destinationAddress, amount) {
    const transaction = {
        "TransactionType": "Payment",
        "Account": "rLYG5hfj7FxdXeERrnSQBtoDSPGMk2WQMv",
        "Destination": destinationAddress,
        "Amount": amount
    };

    try {
        const response = await fetch('https://s.altnet.rippletest.net:51233', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
        const data = await response.json();
        console.log('Transaction sent successfully:', data);
    } catch (error) {
        console.error('Error sending transaction to XRP Ledger:', error);
    }
}


const destinationAddress = "rPCoEq3Mf2iSTNmNaimAYa1YnYZzqohVLq";
const amount = {
    "currency": "XRP",
    "value": "10" 
};

sendTransactionToXRP(destinationAddress, amount);
