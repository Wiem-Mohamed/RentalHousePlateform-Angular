import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ConnectionComponent } from './connection/connection.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AfficheannonceComponent } from './afficheannonce/afficheannonce.component';
import { ProfileComponent } from './profile/profile.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MesinfosComponent } from './mesinfos/mesinfos.component';
import { MesannoncesComponent } from './mesannonces/mesannonces.component';
import { SecuriteComponent } from './securite/securite.component';
import { MesfavoriesComponent } from './mesfavories/mesfavories.component';
import { AnnonceupComponent } from './annonceup/annonceup.component';
import { GeneralhomeComponent } from './generalhome/generalhome.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ConnectionComponent,
    ContactFormComponent,
    AnnonceComponent,
    HomeComponent,
    AfficheannonceComponent,
    ProfileComponent,
    MesinfosComponent,
    MesannoncesComponent,
    SecuriteComponent,
    MesfavoriesComponent,
    AnnonceupComponent,
    GeneralhomeComponent,
    AlertComponent,
    
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
