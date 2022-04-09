import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleService } from '../people.service';

import { PeopleDetailsComponent } from './people-details.component';

describe('PeopleDetailsComponent', () => {
  let component: PeopleDetailsComponent;
  let fixture: ComponentFixture<PeopleDetailsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ PeopleDetailsComponent ],
      providers: [PeopleService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleDetailsComponent);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get details', () => {
    return expect(component.getDetails()).toEqual();
  });
  it('should get homeworld name', () => {
    return expect(component.getHomeworld('https://swapi.dev/api/planets/10/')).toEqual();
  });
});
