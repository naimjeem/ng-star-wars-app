import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarWarsService } from '../star-wars.service';

import { StarWarsDetailsComponent } from './star-wars-details.component';

describe('StarWarsDetailsComponent', () => {
  let component: StarWarsDetailsComponent;
  let fixture: ComponentFixture<StarWarsDetailsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ StarWarsDetailsComponent ],
      providers: [StarWarsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarWarsDetailsComponent);
    httpTestingController = TestBed.get(HttpTestingController)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get details', () => {
    expect(component.details).toBe({})
  });
  it('heightType should', () => {
    expect(component.heightType).toBeLessThanOrEqual
  });
});
