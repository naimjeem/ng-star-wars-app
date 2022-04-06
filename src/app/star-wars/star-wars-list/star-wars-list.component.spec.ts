import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StarWarsService } from '../star-wars.service';

import { StarWarsListComponent } from './star-wars-list.component';

describe('StarWarsListComponent', () => {
  let component: StarWarsListComponent;
  let fixture: ComponentFixture<StarWarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ StarWarsListComponent ],
      providers: [StarWarsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarWarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get get', () => {
    expect(component).toBeTruthy();
  });
});
