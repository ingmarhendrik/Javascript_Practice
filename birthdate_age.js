const peopleData = [
    { name: "Mari Maasikas", personalCode: "38705123568" },
    { name: "Jaan Jõesaar", personalCode: "49811234567" },
    { name: "Kristiina Kukk", personalCode: "39203029876" },
    { name: "Margus Mustikas", personalCode: "49807010346" },
    { name: "Jaak Järve", personalCode: "39504234985" },
    { name: "Kadi Kask", personalCode: "39811136789" }
];

function calculateBirthdateAndAge(personalCode) {
    const year = (personalCode[0] === '3' || personalCode[0] === '4') ? '19' : '20';
    const birthYear = year + personalCode.substr(1, 2);
    const birthMonth = personalCode.substr(3, 2);
    const birthDay = personalCode.substr(5, 2);

    const birthdate = new Date(`${birthYear}-${birthMonth}-${birthDay}`);
    const age = new Date().getFullYear() - birthdate.getFullYear();

    return { birthdate, age };
}

function addPersonToTable(name, personalCode) {
    const { birthdate, age } = calculateBirthdateAndAge(personalCode);

    const table = document.getElementById("peopleTable");
    const row = table.insertRow(-1);
    const nameCell = row.insertCell(0);
    const personalCodeCell = row.insertCell(1);
    const birthdateCell = row.insertCell(2);
    const ageCell = row.insertCell(3);

    nameCell.innerHTML = name;
    personalCodeCell.innerHTML = personalCode;
    birthdateCell.innerHTML = birthdate.toLocaleDateString();
    ageCell.innerHTML = age;
}

function handleAddPerson() {
    const name = document.getElementById("name").value;
    const personalCode = document.getElementById("personalCode").value;

    if (name && personalCode) {
        addPersonToTable(name, personalCode);
        // You can also push this data to the peopleData array if needed.
    } else {
        alert("Please enter both name and personal code.");
    }
}

document.getElementById("addPerson").addEventListener("click", handleAddPerson);

// Initialize the table with existing data
peopleData.forEach(({ name, personalCode }) => {
    addPersonToTable(name, personalCode);
});
