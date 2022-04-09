import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormatHeightPipe } from './pipes/format-height.pipe';
import { FormatLengthPipe } from './pipes/format-length.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FormatHeightPipe,
    FormatLengthPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent,
    FormatHeightPipe,
    FormatLengthPipe
  ]
})
export class SharedModule { }
