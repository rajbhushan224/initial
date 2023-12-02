// Fetch user data from the server using AJAX
async function getUsers() {
    try {
        // Make a GET request to the server endpoint
        const response = await fetch('http://3.111.36.30:3001/get_users');

        // Check if the response status is OK (200)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Parse the JSON response
        const users = await response.json();

        // Display user data in the HTML container
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Display user data in the HTML container
function displayUsers(users) {
    var userContainer = document.getElementById("userContainer");

    // Clear existing user blocks
    while (userContainer.firstChild) {
        userContainer.removeChild(userContainer.firstChild);
    }

    // Populate the container with user blocks
    users.forEach(function(user) {
        var userBlock = document.createElement("div");
        userBlock.className = "user-block";

        // Create an image element (placeholder image URL used)
        var userImage = document.createElement("img");
        userImage.src = "img.jpg"; // Placeholder image URL
        userImage.alt = "User Image";
        userImage.className = "user-image";

        // Append image to the user block
        userBlock.appendChild(userImage);

        var table = document.createElement("table");
        for (var key in user) {
            var row = document.createElement("tr");

            var headerCell = document.createElement("th");
            headerCell.appendChild(document.createTextNode(key));
            row.appendChild(headerCell);

            var dataCell = document.createElement("td");
            dataCell.appendChild(document.createTextNode(user[key]));
            row.appendChild(dataCell);

            table.appendChild(row);
        }

        // Append table to the user block
        userBlock.appendChild(table);

        // Append the user block to the container
        userContainer.appendChild(userBlock);
    });
}

function goToRegistrationPage() {
    window.location.href = 'index1.html';
}
// Call the function to fetch and display user data
getUsers();


function submitForm() {
    const form = document.getElementById('userForm');
    form.submit();
    window.location.href = 'index.html';
}
