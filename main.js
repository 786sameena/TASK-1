// Array to store the entered items
let itemsArray = [];

// Function to add an item to the array and display the items
function addItem() {
    // Get the input element
    let inputElement = document.querySelector('.text-input');

    // Get the value of the input
    let inputValue = inputElement.value;

    // Check if the input is empty
    if (inputValue.trim() === '') {
        // Show an alert message
        alert("Please enter a non-empty value before adding.");

        // Stop the function execution
        return;
    }

    // Add the item to the array
    itemsArray.push({ content: inputValue, completed: false, editing: false });

    // Clear the input field
    inputElement.value = '';

    // Display the items
    displayItems();
}

// Function to handle the "Done" button click
function handleDone(index) {
    // Toggle the completed status for the item
    itemsArray[index].completed = !itemsArray[index].completed;

    // If the item is completed, show the delete button
    if (itemsArray[index].completed) {
        itemsArray[index].editing = true;
    } else {
        // If the item is not completed, hide the delete button
        itemsArray[index].editing = false;
    }

    // Update the displayed items
    displayItems();
}

// Function to handle the "Edit" button click
function handleEdit(index) {
    // Set the input value to the item's content
    let inputElement = document.querySelector('.text-input');
    inputElement.value = itemsArray[index].content;

    // Remove the item from the array
    itemsArray.splice(index, 1);

    // Update the displayed items
    displayItems();
}

// Function to handle the "Delete" button click
function handleDelete(index) {
    // Remove the item from the array
    itemsArray.splice(index, 1);

    // Update the displayed items
    displayItems();
}

// Function to display the items on the screen
function displayItems() {
    // Get the container element to display the items
    let itemsContainer = document.querySelector('.items-container');

    // Clear the container
    itemsContainer.innerHTML = '';

    // Loop through the items array and create a styled list with buttons
    for (let i = 0; i < itemsArray.length; i++) {
        // Create a list item
        let listItem = document.createElement('li');

        // Create a span for the text content to avoid strikethrough on buttons
        let textSpan = document.createElement('span');
        textSpan.textContent = itemsArray[i].content;

        // Check if the item is completed (marked as done)
        if (itemsArray[i].completed) {
            // Add a strikethrough style to the text content
            textSpan.style.textDecoration = 'line-through';
        }

        // Create a div for buttons to ensure consistent positioning
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        // Create "Done" button
        let doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.classList.add('done'); // Add a class for styling
        doneButton.addEventListener('click', () => handleDone(i));

        // Create "Edit" button
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit'); // Add a class for styling
        editButton.addEventListener('click', () => handleEdit(i));

        // Create "Delete" button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete'); // Add a class for styling
        deleteButton.addEventListener('click', () => handleDelete(i));

        // Apply styles for the "Delete" button
        deleteButton.setAttribute('style', `
            background-color: red;
            color: white;
            display: ${itemsArray[i].editing ? 'block' : 'none'}; /* Show only when editing is true */
        `);

        // Append the span to the list item
        listItem.appendChild(textSpan);

        // Append the buttons to the button container
        buttonContainer.appendChild(doneButton);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        // Append the button container to the list item
        listItem.appendChild(buttonContainer);

        // Append the list item to the container
        itemsContainer.appendChild(listItem);
    }
}
