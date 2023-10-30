const students = [
    { name: "Anna", results: [4.5, 4.8, 4.6] },
    { name: "Mart", results: [5.2, 5.1, 5.4] },
    { name: "Kati", results: [4.9, 5.0, 4.7] },
    { name: "Jaan", results: [4.3, 4.6, 4.4] },
    { name: "Liis", results: [5.0, 5.2, 5.1] },
    { name: "Peeter", results: [5.5, 5.3, 5.4] },
    { name: "Eva", results: [4.8, 4.9, 4.7] },
    { name: "Marten", results: [4.7, 4.6, 4.8] },
    { name: "Kairi", results: [5.1, 5.3, 5.0] },
    { name: "Rasmus", results: [4.4, 4.5, 4.3] },
    ];

function calculateBest(resultArray) {
    return Math.max(...resultArray);
}

function calculateAverage(resultArray) {
    const sum = resultArray.reduce((acc, result) => acc + result, 0);
    return (sum / resultArray.length).toFixed(2);
}

function addStudentToTable(name, results) {
    const bestResult = calculateBest(results);
    const averageResult = calculateAverage(results);

    const table = document.getElementById("studentsTable");
    const row = table.insertRow(-1);
    const nameCell = row.insertCell(0);
    const resultsCell = row.insertCell(1);
    const bestCell = row.insertCell(2);
    const averageCell = row.insertCell(3);

    nameCell.innerHTML = name;
    resultsCell.innerHTML = results.join(', ');
    bestCell.innerHTML = bestResult;
    averageCell.innerHTML = averageResult;
}

function handleAddStudent() {
    const name = document.getElementById("studentName").value;
    const resultsInput = document.getElementById("studentResults").value;
    const results = resultsInput.split(',').map(result => parseFloat(result.trim()));

    if (name && results.length > 0) {
        addStudentToTable(name, results);
    } else {
        alert("Palun sisestada nii nimi kui ka tulemus.");
    }
}

document.getElementById("addStudent").addEventListener("click", handleAddStudent);

students.forEach(student => {
    addStudentToTable(student.name, student.results);
});

function handleAddStudent() {
    const nameInput = document.getElementById("studentName");
    const resultsInput = document.getElementById("studentResults");

    const name = nameInput.value;
    const resultsInputValue = resultsInput.value;
    const results = resultsInputValue.split(',').map(result => parseFloat(result.trim()));

    if (name && results.length > 0) {
        addStudentToTable(name, results);
        nameInput.value = "";
        resultsInput.value = "";
    } else {
        alert("Palun sisesta nii nimi kui ka tulemus.");
    }
}
