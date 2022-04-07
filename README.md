# StarWars App

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## App struncture

Initily the App will navigate to `/people` route and load the list of Star Wars People from `https://swapi.dev/api/`

Header component has the nav link to navigate between routes

To search from the list enter keyword in the search input, then it will fetch the updated list with search query from the API.

On top left corner the recent search key history is available and it can be clicked to put the search keyword on the search input.
search history count can be configured from config in `environment.common.ts` file.

every list has pagination on bottom of the page.


## Running unit tests

Currently the unit tests are implemented only for `People` module.
To run the test run `ng test` or `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.