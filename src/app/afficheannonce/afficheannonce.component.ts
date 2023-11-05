import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../models/annonce';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import 'bootstrap/dist/js/bootstrap.bundle';
import { AnnonceFavorie } from '../models/annoncefavorie';
import { AnnoncefavorieService } from '../services/annoncefavorie.service';

@Component({
  selector: 'app-afficheannonce',
  templateUrl: './afficheannonce.component.html',
  styleUrls: ['./afficheannonce.component.css']
})
export class AfficheannonceComponent implements OnInit{

  annonce!: Annonce;
  user!:User;
  favorId!:number;
  favorie!:AnnonceFavorie;
  estFavori: boolean = false;
  

  constructor(private route: ActivatedRoute, private annonceService: AnnonceService,private userServ:UserService,private AnnonceFavServ:AnnoncefavorieService) {
  
    
  }

  ngOnInit() {
  
    
  this.favorId=this.userServ.getUserId();
    const idString = this.route.snapshot.paramMap.get('id'); // Get the ID from the URL
    if (idString !== null) {
      const id = Number(idString);
      this.annonceService.getAnnonceById(id).subscribe(annonce => {
        this.annonce = annonce;
        this.userServ.getUserById(this.annonce.userId).subscribe(user => {
          this.user = user;
        
  
        });
      });
    }

  }

  calculerPeriode(dateDepot: any): string {
    const date = new Date(dateDepot);
    if (!isNaN(date.getTime())) {
      return formatDistanceToNow(date, { addSuffix: false,locale: fr });
    } else {
      return ''; 
    }
  }

AjouterFavorie() {
  let annonce = new AnnonceFavorie();
  annonce.annonceId = this.annonce.id;
  annonce.favorId = this.favorId;

  this.AnnonceFavServ.annonceDejaFavorite(this.annonce.id, this.favorId).subscribe((existingAnnonceId: number) => {
    if (existingAnnonceId > 0) {
      console.log("annonce déjà marquée comme favorite avec l'ID : " + existingAnnonceId);
    
    } else {
      this.AnnonceFavServ.add(annonce).subscribe(
        (a) => {
          this.favorie = a;
          this.estFavori = !this.estFavori;
        },
        (error) => {
          console.error("Erreur lors de l'ajout de l'annonce aux favoris : ", error);
        }
      );
    }
  });
}

isConnected() {
  return this.userServ.isConnected();
}

}
