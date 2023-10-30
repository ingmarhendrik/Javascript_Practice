const names = [
    "mari maasikas",
    "jaan jõesaar",
    "kristiina kukk",
    "margus mustikas",
    "jaak järve",
    "kadi kask",
    "Toomas Tamm",
    "Kadi Meri",
    "Leena Laas",
    "Madis Mets",
    "Hannes Hõbe",
    "Anu Allikas",
    "Kristjan Käär",
    "Eva Esimene",
    "Jüri Jõgi",
    "Liis Lepik",
    "Kalle Kask",
    "Tiina Teder",
    "Kaidi Koppel",
    "tiina Toom"
];

// Function to capitalize the first letter of each name
function capitalizeName(name) {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Capitalize all names
const capitalizedNames = names.map(capitalizeName);

function searchNames() {
    const searchInput = document.getElementById("searchName");
    const searchValue = searchInput.value.toLowerCase();

    const filteredNames = capitalizedNames.filter(name =>
        name.toLowerCase().includes(searchValue)
    );

    displayNames(filteredNames);
}

function generateEmail(name) {
    // Split the capitalized name into words
    const words = name.split(' ');
    
    // Extract the last word as the surname
    const surname = words[words.length - 1];
    
    // Combine the surname with the email domain
    const email = surname.toLowerCase() + '@tthk.ee';
    
    return email;
}


function displayNames(namesToDisplay = capitalizedNames) {
    const nameList = document.getElementById("nameList");
    nameList.innerHTML = "";
    namesToDisplay.forEach((name, index) => {
        const email = generateEmail(name);
        const row = nameList.insertRow(-1);
        row.innerHTML = `
            <td><input type="text" id="name-${index}" value="${name}"></td>
            <td><input type="text" id="email-${index}" value="${email}" readonly></td>
            <td><button class="btn btn-primary" onclick="editName(${index})">Muuda</button></td>
            <td><input type="checkbox" name="delete-name" value="${index}"></td>
        `;
    });
}


function editName(index) {
    const nameInput = document.getElementById(`name-${index}`);
    const newName = nameInput.value;

    if (newName.trim() !== "") {
        capitalizedNames[index] = newName;
        displayNames();
    } else {
        alert("Please enter a valid name.");
    }
}

function deleteSelectedNames() {
    const nameList = document.getElementById("nameList");
    const rows = nameList.querySelectorAll("tr");
    const indicesToDelete = [];

    rows.forEach((row, index) => {
        const checkbox = row.querySelector("input[type='checkbox']");
        if (checkbox && checkbox.checked) {
            indicesToDelete.push(index);
        }
    });

    // Sort the indices in descending order to delete from the end of the list
    indicesToDelete.sort((a, b) => b - a);

    indicesToDelete.forEach((index) => {
        capitalizedNames.splice(index, 1);
    });

    displayNames();
}

function addNewName() {
    const nameInput = document.getElementById("name");
    const newName = nameInput.value;

    if (newName.trim() !== "") {
        const capitalizedNewName = capitalizeName(newName);
        capitalizedNames.push(capitalizedNewName);
        nameInput.value = "";
        displayNames();
    } else {
        alert("Please enter a valid name.");
    }
}


// Initial display
displayNames();

// Add name, delete, and search input event listeners
document.getElementById("addName").addEventListener("click", addNewName);
document.getElementById("deleteNames").addEventListener("click", deleteSelectedNames);
document.getElementById("searchName").addEventListener("input", searchNames);

