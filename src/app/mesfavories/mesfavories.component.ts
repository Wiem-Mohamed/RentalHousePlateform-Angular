import { Component,OnInit  } from '@angular/core';
import { AnnonceFavorie } from '../models/annoncefavorie';
import { UserService } from '../services/user.service';
import { AnnoncefavorieService } from '../services/annoncefavorie.service';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../models/annonce';
import { Router } from '@angular/router';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
@Component({
  selector: 'app-mesfavories',
  templateUrl: './mesfavories.component.html',
  styleUrls: ['./mesfavories.component.css']
})
export class MesfavoriesComponent implements OnInit{
  favorId!:number;
   annonceFavId!:number;
  annoncesfav: AnnonceFavorie[] = [];
 annonces:Annonce[]=[];
  constructor(private userServ:UserService,private AnnonceFavServ:AnnoncefavorieService,private annonceService: AnnonceService,private router: Router){

  }
  ngOnInit(): void {
    this.favorId=this.userServ.getUserId();
    this.getAnnoncesfavByUser();
  }

  getAnnoncesfavByUser(): void {
    this.AnnonceFavServ.getAnnoncesByUserId(this.favorId)
      .subscribe(annoncesFav => {
        // Parcourez les annonces favorites pour récupérer les annonces correspondantes
        annoncesFav.forEach(annonceFav => {
          // Récupérez l'ID de l'annonce correspondante depuis l'annonce favorite
          const annonceId = annonceFav.annonceId;
  
          // Utilisez cet ID pour récupérer l'annonce correspondante
          this.annonceService.getAnnonceById(annonceId)
            .subscribe(annonce => {
              this.annonces.push(annonce);
            });
        });
      });
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

  supprimerAnnonce(annonceId: number): void {
    this.getIdFavorie(annonceId, this.favorId).subscribe((value: number) => {
      this.annonceFavId = value; // Stockez la valeur dans this.annonceFavId
      this.AnnonceFavServ.supprimerAnnonce(this.annonceFavId).subscribe(
        () => {
          // Supprimez l'annonce correspondante de la liste des annonces
          this.annonces = this.annonces.filter(annonce => annonce.id !== annonceId);
          console.log('Annonce  favorie supprimée avec succès');
        },
        (erreur) => {
          console.error('Une erreur s\'est produite lors de la suppression de l\'annonce  favorie :', erreur);
        }
      );
    });
  }
  
  //retourne l'id de l'annonce favorite pour la supprimer
  getIdFavorie(annonceId: number,favorId:number){
    return this.AnnonceFavServ.annonceDejaFavorite(annonceId,favorId);
  }

}
