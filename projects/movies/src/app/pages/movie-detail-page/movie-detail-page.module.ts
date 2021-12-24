import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { LoaderComponentModule } from '../../ui/component/loader/loader.component';
import { MovieDetailPageComponent } from './movie-detail-page.component';
import { StarRatingModule } from '../../ui/component/star-rating/star-rating.module';
import { AspectRatioBoxModule } from '../../ui/component/aspect-ratio-box/aspect-ratio-box.module';
import { MovieListModule } from '../../ui/pattern/movie-list/movie-list.module';
import { DetailGridComponent } from '../../ui/component/detail-grid/detail-grid.component';

const ROUTES: Routes = [
  {
    path: '',
    component: MovieDetailPageComponent
  }
];

@NgModule({
  declarations: [MovieDetailPageComponent, DetailGridComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    StarRatingModule,
    MovieListModule,
    LetModule,
    LoaderComponentModule,
    AspectRatioBoxModule
  ],
  exports: [MovieDetailPageComponent]
})
export class MovieDetailPageModule {
}
