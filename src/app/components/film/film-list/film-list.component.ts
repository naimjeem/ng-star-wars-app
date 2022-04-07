import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmList, Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  currentObj: FilmList;
  currentList: Film[];
  endpoint: string;

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
    console.log(value);
    this.filmService.getFilmBySearch(value)
      .subscribe((res: FilmList) => {
        console.log(res);
        this.currentObj = res;
        this.currentList = res['results'];
        this.cdr.detectChanges();
      }, (err: Error) => {
        console.log(err);
      });
  }

  getList(): void {    
    this.filmService.getFilm()
     .subscribe((res: FilmList): void => {
       console.log(res);
       this.currentObj = res;
       this.currentList = res['results'];
       this.cdr.detectChanges();
     }, err => {
       console.log(err);
       
     })
  }

  pagination(url: string): void {
    const pageQ = url.split(this.endpoint)[1];
    this.filmService.getFilmByPage(pageQ)
     .subscribe((res: FilmList) => {
       console.log(res);
       this.currentObj = res;
       this.currentList = res['results'];
       this.cdr.detectChanges();
     }, err => {
       console.log(err);
       
     })
  }

  gotToDetails(url: any): void {
    const params = url.split(this.endpoint)[1];
    const id = params.split('/')[0];
    this.router.navigate(['/films', id]);
  } 


}
