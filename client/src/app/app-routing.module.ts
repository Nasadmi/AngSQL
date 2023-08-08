import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './connectionRoute/homeComponent/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  {
    path: 'connection',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
