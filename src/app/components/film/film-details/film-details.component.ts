import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FilmService } from '../film.service';
import { Film } from '../film';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit {
  endpoint: string;
  filmId: string;
  details: Film;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private filmService: FilmService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.filmService.endpoint;
    this.filmId = this.route.snapshot.params['id'];
    this.getDetails();
  }

  getDetails(): void {
    this.filmService.getFilmById(this.filmId)
      .subscribe((res: Film): void => {
        console.log(res);
        this.details = res;
        this.cdr.detectChanges();
      }, (err: Error): void => {
        console.log(err);
      });
  }

  back(): void {
    this.location.back();
  }

}
