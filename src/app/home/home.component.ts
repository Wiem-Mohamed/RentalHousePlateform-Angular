import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../models/annonce';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  annonces: Annonce[] = [];
  annoncesToShow: Annonce[] = [];
  afficherBouton: boolean = true;

  constructor(private annonceServ: AnnonceService,private router: Router) {
    this.annonceServ.getAll().subscribe((annonces) => {
      this.annonces = annonces;
      this.annonces.sort((a, b) => new Date(b.dateDepot).getTime() - new Date(a.dateDepot).getTime());
      this.annoncesToShow = this.annonces.slice(0, 8);
    });
  }
  
    ngOnInit() {
      
    }


  calculerPeriode(dateDepot: any): string {
    const date = new Date(dateDepot);
    if (!isNaN(date.getTime())) {
      return formatDistanceToNow(date, { addSuffix: false,locale: fr });
    } else {
      return ''; 
    }
  }
  
  afficherDetails(id: number) {
    this.router.navigate(['annonce', id]);
  }
  afficherPlusAnnonces() {
    const annoncesRestantes = this.annonces.slice(this.annoncesToShow.length);
    const prochainesAnnonces = annoncesRestantes.slice(0, 8); // Afficher 10 annonces de plus

    this.annoncesToShow = this.annoncesToShow.concat(prochainesAnnonces);
    if (annoncesRestantes.length <= 8) {
      this.afficherBouton = false; 
    }
  }
  
  

}
