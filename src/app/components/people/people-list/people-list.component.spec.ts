import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleService } from '../people.service';

import { PeopleListComponent } from './people-list.component';

describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ PeopleListComponent ],
      providers: [PeopleService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleListComponent);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get list of []', () => {
    return expect(component.getList()).toEqual();
  });
  it('should search list of []', () => {
    return expect(component.search('test')).toEqual();
  });
  it('should paginate', () => {
    return expect(component.pagination('https://swapi.dev/api/people/?page=2')).toEqual();
  });
  it('should go to details page', () => {
    return expect(component.gotToDetails('https://swapi.dev/api/people/1')).toEqual();
  });
});
