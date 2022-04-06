import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-star-wars-details',
  templateUrl: './star-wars-details.component.html',
  styleUrls: ['./star-wars-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarWarsDetailsComponent implements OnInit {
  type: any;
  details: any;
  homeworld: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private starWarsService: StarWarsService,
  ) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    const id = this.route.snapshot.params['id'];
    this.getDetails(environment.baseUrl + `${this.type}/${id}`);
  }

  heightType(value: any) {
    switch (value) {
      case value > 200:
        return 'High';

      case (value > 100 && value < 200):
        return 'Normal';

      case (value < 100):
        return 'Low';
    
      default:
        return 'High';
    }
  }

  lengthType(value: any) {
    switch (value) {
      case value > 1000:
        return 'Large';

      case (value > 100 && value < 1000):
        return 'Normal';

      case (value < 100):
        return 'Small';
    
      default:
        return 'Large';
    }
  }

  getDetails(url: string) {
    this.starWarsService.get(url)
      .subscribe(res => {
        console.log(res);
        this.details = res;
        if (this.details.homeworld) {
          this.getHomeworld(this.details.homeworld);
        }
        this.cdr.detectChanges();
      }, err => {
        console.log(err);
      });
  }

  getHomeworld(url: string) {
    this.starWarsService.get(url)
      .subscribe((res: any) => {
        console.log(res);
        this.homeworld = res['name'];
        this.cdr.detectChanges();
      }, err => {
        console.log(err);
      });
  }

  back() {
    this.location.back();
  }
}
