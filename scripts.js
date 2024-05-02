async function addRecord(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const dateOfDeath = document.getElementById('date-of-death').value;
    const location = document.getElementById('location').value;

    const newRecord = {
        name: name,
        dateOfDeath: dateOfDeath,
        location: location
    };

    const response = await fetch('http://localhost:3000/records', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecord)
    });

    if (response.ok) {
        document.getElementById('add-record-form').reset();
        displayRecords();
    } else {
        console.error('Failed to add record');
    }
}


async function displayRecords() {
    const response = await fetch('http://localhost:3000/records');
    const records = await response.json();

    const recordsList = document.getElementById('records-list');
    recordsList.innerHTML = '';

    if (records.length === 0) {
        recordsList.innerHTML = 'No records found.';
    } else {
        records.forEach(record => {
            const recordElement = document.createElement('div');
            recordElement.classList.add('record');
            recordElement.innerHTML = `
                <span>${record.name}</span>
                <span>${record.dateOfDeath}</span>
                <span>${record.location}</span>
                <button class="delete-btn" data-id="${record.id}">Delete</button>
            `;
            recordsList.appendChild(recordElement);
        });
    }
}


document.getElementById('add-record-form').addEventListener('submit', addRecord);


document.addEventListener('click', async event => {
    if (event.target.classList.contains('delete-btn')) {
        const recordId = event.target.dataset.id;
        await fetch(`http://localhost:3000/records/${recordId}`, {
            method: 'DELETE'
        });
        displayRecords();
    }
});

displayRecords();
