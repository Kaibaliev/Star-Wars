export default class SwapiService {

    async getResource(url) {
        const res = await fetch(`https://swapi.co/api${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results.map(this.tranformPerson);
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}/`);
        return this.tranformPerson(person)
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);
        return res.results;
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}/`);
        return this.tranformPlanet(planet);
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this.tranformStarship);
    }

    async getStarship(id) {
        const starShip = await this.getResource(`/starships/${id}/`);
        return this.tranformStarship(starShip)
    }

    extractId=(item)=> {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    };

    tranformPlanet=(planet)=> {
        return {
            id: this.extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    };

    tranformPerson =(person) => {
        return {
            id: this.extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color

        }
    };

    tranformStarship=(starship)=> {
        return {
            id: this.extractId(starship),
            name: starship.name,
            created: starship.created,
            model: starship.model,
            manufacturer: starship.manufacturer,
            constInCredits: starship.constInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity

        }
    }
}
