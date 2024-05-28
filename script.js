document.addEventListener('DOMContentLoaded', () => {
    const planetForm = document.getElementById('planet-form');
    const planetsList = document.getElementById('planets-list');

    const savePlanet = (planet) => {
        let planets = JSON.parse(localStorage.getItem('planets')) || [];
        planets.push(planet);
        localStorage.setItem('planets', JSON.stringify(planets));
    };

    const loadPlanets = () => {
        let planets = JSON.parse(localStorage.getItem('planets')) || [];
        planetsList.innerHTML = '';
        planets.forEach((planet, index) => {
            const planetElement = document.createElement('div');
            planetElement.classList.add('planet');
            planetElement.innerHTML = `
                <h3>${planet.name}</h3>
                <p>Type: ${planet.type}</p>
                <p>Diameter: ${planet.diameter}</p>
                <p>Distance: ${planet.distance}</p>
                <p>Mass: ${planet.mass}</p>
                <p>Position: ${planet.position}</p>
                <p>Number of Moons: ${planet.numberofMoons}</p>
                <p>Orbital Period: ${planet.orbitalPeriod}</p>
                <p>Day Length: ${planet.dayLength}</p>
                <p>Confirmed Life: ${planet.confirmedLife}</p>
                <p>Year Discovered: ${planet.yearDiscovered}</p>
                <img src="${planet.url}" alt="${planet.name}">
                <button onclick="deletePlanet(${index})">Delete</button>
            `;
            planetsList.appendChild(planetElement);
        });
    };

    const deletePlanet = (index) => {
        let planets = JSON.parse(localStorage.getItem('planets')) || [];
        planets.splice(index, 1);
        localStorage.setItem('planets', JSON.stringify(planets));
        loadPlanets();
    };

    planetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPlanet = {
            name: document.getElementById('name').value,
            type: document.getElementById('type').value,
            diameter: document.getElementById('diameter').value,
            distance: document.getElementById('distance').value,
            mass: document.getElementById('mass').value,
            position: document.getElementById('position').value,
            numberofMoons: document.getElementById('numberofMoons').value,
            orbitalPeriod: document.getElementById('orbitalPeriod').value,
            dayLength: document.getElementById('dayLength').value,
            confirmedLife: document.getElementById('confirmedLife').value,
            yearDiscovered: document.getElementById('yearDiscovered').value,
            url: document.getElementById('url').value
        };
        savePlanet(newPlanet);
        loadPlanets();
        planetForm.reset();
    });

    loadPlanets();
});
