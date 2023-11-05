import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../models/annonce';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesannonces',
  templateUrl: './mesannonces.component.html',
  styleUrls: ['./mesannonces.component.css']
})
export class MesannoncesComponent implements OnInit{
  userId!:number;
  annonce!: Annonce;
  user!:User;
  annonces: Annonce[] = [];
  constructor( private annonceService: AnnonceService,private userServ:UserService,private router: Router){}
  calculerPeriode(dateDepot: any): string {
    const date = new Date(dateDepot);
    if (!isNaN(date.getTime())) {
      return formatDistanceToNow(date, { addSuffix: false,locale: fr });
    } else {
      return ''; 
    }
  }

  ngOnInit(): void {
    this.userId=this.userServ.getUserId();
    this.getAnnoncesByUser();
  }
  getAnnoncesByUser(): void {
    this.annonceService.getAnnoncesByUserId(this.userId)
      .subscribe(annonces => this.annonces = annonces);
  }
  supprimerAnnonce(annonceId: number) {
    this.annonceService.supprimerAnnonce(annonceId).subscribe(() => {
      this.getAnnoncesByUser();
    });
  }
  afficherDetails(id: number) {
    this.router.navigate(['annonce', id]);
  }
  modifierAnnonce(id:number){
    this.router.navigate(['annonceup',id]);
  }

}
