import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmList, Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmListComponent implements OnInit {

  currentObj: FilmList;
  currentList: Film[];
  endpoint: string;
  isLoaded: boolean = false;

  constructor (
    private router: Router,
    private cdr: ChangeDetectorRef,
    private filmService: FilmService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.filmService.endpoint;
    this.getList();
  }

  search(value: string): void {
    this.isLoaded = false;
    this.filmService.getFilmBySearch(value)
      .subscribe((res: FilmList) => {
        
        this.currentObj = res;
        this.currentList = res['results'];
        this.isLoaded = true;
        this.cdr.detectChanges();
      }, (err: Error) => {
        
      });
  }

  getList(): void {
    this.isLoaded = false;
    this.filmService.getFilm()
     .subscribe((res: FilmList): void => {
       
       this.currentObj = res;
       this.currentList = res['results'];
       this.isLoaded = true;
       this.cdr.detectChanges();
     }, err => {
       
     })
  }

  pagination(url: string): void {
    this.isLoaded = false;
    const pageQ = url.split(this.endpoint)[1];
    this.filmService.getFilmByPage(pageQ)
     .subscribe((res: FilmList) => {
       
       this.currentObj = res;
       this.currentList = res['results'];
       this.isLoaded = true;
       this.cdr.detectChanges();
     }, err => {
       
       
     })
  }

  gotToDetails(url: any): void {
    const params = url.split(this.endpoint)[1];
    const id = params.split('/')[0];
    this.router.navigate(['/films', id]);
  } 


}
