import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { StarWarsService } from '../star-wars.service';

import { StarWarsDetailsComponent } from './star-wars-details.component';

describe('StarWarsDetailsComponent', () => {
  let component: StarWarsDetailsComponent;
  let fixture: ComponentFixture<StarWarsDetailsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ StarWarsDetailsComponent ],
      providers: [StarWarsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarWarsDetailsComponent);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get details', () => {
    return expect(component.getDetails('https://swapi.dev/api/vehicles/8/')).toEqual();
  });
  it('heightType should', () => {
    expect(component.heightType('250')).toBe('High')
  });
  it('lengthType should', () => {
    expect(component.lengthType('500')).toBe('Large')
  });
});
