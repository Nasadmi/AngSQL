import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './connectionRoute/homeComponent/home.component';
import { IndexComponent } from './index-component/index-component.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: IndexComponent
  },
  {
    path: 'connection',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
