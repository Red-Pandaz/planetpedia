document.addEventListener('DOMContentLoaded', loadPlanets);

const planetForm = document.getElementById('add-planet-form');
const planetsUl = document.getElementById('planets-ul');
const submitButton = document.getElementById('submit-button');

let planets = []; // Array to store planet objects
let editingIndex = -1; // Variable to store the index of the planet being edited

// Function to create a planet object
function createPlanet(name, type, diameter, distance, mass, position, numberofMoons, orbitalPeriod, dayLength, confirmedLife, yearDiscovered) {
  return {
    name,
    type,
    diameter,
    distance,
    mass,
    position,
    numberofMoons,
    orbitalPeriod,
    dayLength,
    confirmedLife,
    yearDiscovered
  };
}


// Function to load planets from local storage
function loadPlanets() {
    const storedPlanets = localStorage.getItem('planets');
    if (storedPlanets) {
      planets = JSON.parse(storedPlanets);
    }
  
    // If no planets are loaded, add the preloaded planet
    if (planets.length === 0) {
      planets.push(createPlanet(
        "Thing", "Gas", "2", "5E20", "0", "8", "1E100", "5E25", "55000", "yes", "1"
      ));
      savePlanets();
    }
  
    renderPlanets();
  }

// Function to save planets to local storage
function savePlanets() {
  localStorage.setItem('planets', JSON.stringify(planets));
}

function renderPlanets() {
  planetsUl.innerHTML = ''; // Clear existing list items

  planets.forEach((planet, index) => {
    const planetLi = document.createElement('ul');
    planetLi.classList.add('planet'); // Add a class for styling

    const planetNameLi = document.createElement('li');
    planetNameLi.classList.add('planet-name'); // Add a class for styling
    planetNameLi.textContent = `Planet: ${planet.name}`; // Set planet name

    planetLi.appendChild(planetNameLi);

    // Loop through planet properties and create li elements
    for (const key in planet) {
      if (key !== 'name') {
        const propertyLi = document.createElement('li');
        const propertyNameSpan = document.createElement('span');
        propertyNameSpan.classList.add('property-name'); // Add a class for styling
        propertyNameSpan.textContent = `${key}: `;

        const propertyValueSpan = document.createElement('span');
        propertyValueSpan.classList.add('property-value'); // Add a class for styling
        propertyValueSpan.textContent = planet[key];

        propertyLi.appendChild(propertyNameSpan);
        propertyLi.appendChild(propertyValueSpan);

        planetLi.appendChild(propertyLi);
      }
    }

    // Add edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.dataset.planetIndex = index;
    editButton.addEventListener('click', handleEditPlanet);
    planetLi.appendChild(editButton);

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.planetIndex = index;
    deleteButton.addEventListener('click', handleDeletePlanet);
    planetLi.appendChild(deleteButton);

    planetsUl.appendChild(planetLi);
  });
}

// Function to handle form submission (adding/updating a planet)
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const name = document.getElementById('name').value;
  const type = document.getElementById('type').value;
  const diameter = parseFloat(document.getElementById('diameter').value);
  const distance = parseFloat(document.getElementById('distance').value);
  const mass = parseFloat(document.getElementById('mass').value);
  const position = parseFloat(document.getElementById('position').value);
  const numberofMoons = parseInt(document.getElementById('numberofMoons').value);
  const orbitalPeriod = parseFloat(document.getElementById('orbitalPeriod').value);
  const dayLength = parseFloat(document.getElementById('dayLength').value);
  const confirmedLife = document.getElementById('confirmedLife').checked;
  const yearDiscovered = parseInt(document.getElementById('yearDiscovered').value);

  if (editingIndex === -1) {
    // Add new planet
    const newPlanet = createPlanet(name, type, diameter, distance, mass, position, numberofMoons, orbitalPeriod, dayLength, confirmedLife, yearDiscovered);
    planets.push(newPlanet); // Add the new planet object to the planets array
  } else {
    // Update existing planet
    planets[editingIndex] = createPlanet(name, type, diameter, distance, mass, position, numberofMoons, orbitalPeriod, dayLength, confirmedLife, yearDiscovered);
    editingIndex = -1; // Reset editing index
    submitButton.textContent = 'Add Planet'; // Reset button text
  }

  savePlanets(); // Save the updated planets array to localStorage
  renderPlanets(); // Render the updated list of planets

  // Clear form after adding/updating a planet
  planetForm.reset();
}

// Function to handle editing a planet
function handleEditPlanet(event) {
  const editButton = event.target;
  const planetIndex = parseInt(editButton.dataset.planetIndex);
  const planetToEdit = planets[planetIndex];
  editingIndex = planetIndex;

  // Pre-populate the form with the planet's data
  document.getElementById('name').value = planetToEdit.name;
  document.getElementById('type').value = planetToEdit.type;
  document.getElementById('diameter').value = planetToEdit.diameter;
  document.getElementById('distance').value = planetToEdit.distance;
  document.getElementById('mass').value = planetToEdit.mass;
  document.getElementById('position').value = planetToEdit.position;
  document.getElementById('numberofMoons').value = planetToEdit.numberofMoons;
  document.getElementById('orbitalPeriod').value = planetToEdit.orbitalPeriod;
  document.getElementById('dayLength').value = planetToEdit.dayLength;
  document.getElementById('confirmedLife').checked = planetToEdit.confirmedLife;
  document.getElementById('yearDiscovered').value = planetToEdit.yearDiscovered;

  // Change form submission behavior to update the planet
  planetForm.removeEventListener('submit', handleFormSubmission);
  planetForm.addEventListener('submit', handleFormSubmission);

  // Change button text to "Update Planet"
  submitButton.textContent = 'Update Planet';
}

// Function to handle deleting a planet
function handleDeletePlanet(event) {
  const deleteButton = event.target;
  const planetIndex = parseInt(deleteButton.dataset.planetIndex);
  planets.splice(planetIndex, 1); // Remove the planet from the array

  savePlanets(); // Save the updated planets array to localStorage
  renderPlanets(); // Render the updated list of planets
}

// Attach the form submission handler
planetForm.addEventListener('submit', handleFormSubmission);
