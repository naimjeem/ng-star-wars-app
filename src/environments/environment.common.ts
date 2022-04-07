export function getConfig() {
    const baseUrl = 'https://swapi.dev/api/';
    return {
        baseUrl,
        api: {
            people: baseUrl + 'people/',
            films: baseUrl + 'films/',
            planets: baseUrl + 'planets/',
            species: baseUrl + 'species/',
            starships: baseUrl + 'starships/',
            vehicles: baseUrl + 'vehicles/',
        }
    }
}

