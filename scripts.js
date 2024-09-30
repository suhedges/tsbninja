document.addEventListener("DOMContentLoaded", () => {
    // Default open Interchange tab
    document.getElementById('Interchange').style.display = 'block';
});

function openTab(evt, tabName) {
    let i, tabContent, tabLinks;

    // Hide all tab content
    tabContent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    // Remove active class from all tab links
    tabLinks = document.getElementsByClassName('tab-link');
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove('active');
    }

    // Show the clicked tab and add active class to the clicked link
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
}

// Simulated Data (You would fetch this from a backend)
let partData = {
    "123ABC": ["456DEF", "789GHI", "987XYZ"],
    "LMN456": ["OPQ123", "RST789"],
    "456DEF": ["123ABC", "789GHI"]
};

let taperedData = [
    { partNumber: "T123", bore: "25 mm", outside: "50 mm", width: "15 mm" },
    { partNumber: "T456", bore: "30 mm", outside: "60 mm", width: "20 mm" }
];

function sanitizePartNumber(partNumber) {
    return partNumber.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

function searchPartNumbers() {
    let query = sanitizePartNumber(document.getElementById("partNumber").value);
    let results = partData[query] || [];
    let closeMatches = Object.keys(partData).filter(key => key.includes(query));

    document.getElementById("interchangeResults").innerHTML = results.length
        ? `Interchanges: ${results.join(', ')}`
        : "No interchanges found.";
    
    document.getElementById("closeMatches").innerHTML = closeMatches.length
        ? `Close Matches: ${closeMatches.join(', ')}`
        : "No similar part numbers.";
}

function searchBearings() {
    let bore = document.getElementById("boreDiameter").value;
    let outside = document.getElementById("outsideDiameter").value;
    let width = document.getElementById("width").value;
    let unit = document.getElementById("unit").value;

    let filteredResults = taperedData.filter(bearing => {
        return (bearing.bore.includes(bore) || bore === "") &&
               (bearing.outside.includes(outside) || outside === "") &&
               (bearing.width.includes(width) || width === "");
    });

    let resultsBox = document.getElementById("taperedResults");
    resultsBox.innerHTML = filteredResults.length
        ? filteredResults.map(b => `${b.partNumber}: Bore: ${b.bore}, OD: ${b.outside}, Width: ${b.width}`).join('<br>')
        : "No results found.";
}
