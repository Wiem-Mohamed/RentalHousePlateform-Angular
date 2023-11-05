import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ConnectionComponent } from './connection/connection.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { HomeComponent } from './home/home.component';
import { AfficheannonceComponent } from './afficheannonce/afficheannonce.component';
import { ProfileComponent } from './profile/profile.component';
import { MesinfosComponent } from './mesinfos/mesinfos.component';
import { AnnonceupComponent} from './annonceup/annonceup.component';
import {  GeneralhomeComponent } from './generalhome/generalhome.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{path:'contact',component:ContactFormComponent},
{path:'annonce',component:AnnonceComponent,canActivate:[AuthGuard]},
{path:'home',component: GeneralhomeComponent,},
{path: 'annonce/:id', component:  AfficheannonceComponent ,canActivate:[AuthGuard]},
{path: 'profile', component:  ProfileComponent ,canActivate:[AuthGuard]},
{path: 'annonceup/:id', component:  AnnonceupComponent ,canActivate:[AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
