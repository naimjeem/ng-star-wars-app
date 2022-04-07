import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { People, PeopleList } from './people';

import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let httpTestingController: HttpTestingController;
  let peopleService: PeopleService;
  let people: People;
  let peopleList: PeopleList;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    TestBed.configureTestingModule({});
    peopleService = TestBed.inject(PeopleService);

    people = {
      'name': 'Obi-Wan Kenobi',
      'height': '182',
      'mass': '77',
      'hair_color': 'auburn, white',
      'skin_color': 'fair',
      'eye_color': 'blue-gray',
      'birth_year': '57BBY',
      'gender': 'male',
      'homeworld': 'https://swapi.dev/api/planets/20/',
      'films': [
        'https://swapi.dev/api/films/1/',
      ],
      'species': [],
      'vehicles': [
        'https://swapi.dev/api/vehicles/38/'
      ],
      'starships': [
        'https://swapi.dev/api/starships/48/',
      ],
      'created': new Date('2014-12-10T16:16:29.192000Z'),
      'edited': new Date('2014-12-20T21:17:50.325000Z'),
      'url': 'https://swapi.dev/api/people/10/'
    }

    beforeEach(inject([PeopleService], (service: PeopleService) => {
      peopleService = service;
    }));
  
    it("should be created", () => {
      expect(peopleService).toBeTruthy();
    });
  
    it("should return data", () => {
      let response: PeopleList | any;
      peopleService.getPeople().subscribe(t => {
        response = t;
      });
      const req = httpTestingController.expectOne({
        method: "GET",
        url: peopleService.endpoint
      });
  
      req.flush(peopleList);
  
      expect(response.results[0]).toEqual(people);
    });
    it("should return People by search", () => {
      let response: PeopleList | any;
      peopleService.getPeopleBySearch('search-value').subscribe(t => {
        response = t;
      });
      const req = httpTestingController.expectOne({
        method: "GET",
        url: peopleService.endpoint
      });
  
      req.flush(peopleList);
  
      expect(response.results[0]).toEqual(people);
    });
    it("should return People by page", () => {
      let response: PeopleList | any;
      peopleService.getPeopleByPage('?page=2').subscribe(t => {
        response = t;
      });
      const req = httpTestingController.expectOne({
        method: "GET",
        url: peopleService.endpoint
      });
  
      req.flush(peopleList);
  
      expect(response.results[0]).toEqual(people);
    });

    it("should return People by id", () => {
      let response: People | any;
      peopleService.getPeopleById('1').subscribe(t => {
        response = t;
      });
      const req = httpTestingController.expectOne({
        method: "GET",
        url: peopleService.endpoint
      });
  
      req.flush(peopleList);
  
      expect(response).toEqual(people);
    });

    afterEach(() => {
      httpTestingController.verify();
    });
  });
});
