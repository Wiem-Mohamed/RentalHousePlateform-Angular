import { Component, OnInit,Type} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../models/annonce';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Router } from '@angular/router';
@Component({
  selector: 'app-generalhome',
  templateUrl: './generalhome.component.html',
  styleUrls: ['./generalhome.component.css']
})
export class GeneralhomeComponent implements OnInit{
  selectedComponent!: Type<any>;
  annonces: Annonce[] = [];
  searchForm!: FormGroup;
  rechercheEffectuee: boolean = false; 
  gouvernorats = [
    'Toutes régions',
    'Ariana','Beja',
'Ben Arous','Bizerte','Gabes','Gafsa','Jendouba','Kairouan',  'Kasserine','Kebili','Kef',  'Mahdia',  'Manouba',  'Medenine','Monastir','Nabeul','Sfax',  'Sidi Bouzid','Siliana',  'Sousse','Tataouine','Tozeur','Tunis',  'Zaghouan'
  ];
  categories = [
    'Toutes catégories',
    'Appartement',
    'Maison de ville',
    'Maison de vacances',
    'Studio',
    'Maison pour événements',
    'Maison pour étudiants'
  ];
  constructor(private fb: FormBuilder,private annonceServ:AnnonceService,private router: Router){
    this.searchForm = this.fb.group({
      categorie: [''],
      gouvernorat: [''],
      prix: [''],
    });
  }
  ngOnInit(): void {
    
  }
  
  research()  {
    const categorie = this.searchForm.get('categorie')?.value;
    const gouvernorat = this.searchForm.get('gouvernorat')?.value;
    const prix = this.searchForm.get('prix')?.value;
    
   if ((categorie== 'Toutes catégories' && gouvernorat== 'Toutes régions' && prix=='') || (categorie== 'Toutes catégories' && gouvernorat== '' && prix=='') || (categorie== '' && gouvernorat== 'Toutes régions' && prix=='')){
      this.annonceServ.getAll().subscribe((annonces)=>
      this.annonces=annonces)
    }
    else if((categorie== 'Toutes catégories' && gouvernorat== 'Toutes régions' && prix!='') || (categorie== '' && gouvernorat== '' && prix!='')){
      this.annonceServ.getAnnoncesByPrix(prix).subscribe((annonces)=>
      this.annonces=annonces)
    }
    else if((categorie== 'Toutes catégories' && gouvernorat!= '' && prix=='') || (categorie== '' && gouvernorat!= '' && prix=='')) {
      this.annonceServ.getAnnoncesByGouvernorat(gouvernorat).subscribe((annonces)=>
      this.annonces=annonces)
    
    
    }
    else if((categorie!= '' && gouvernorat== '' && prix=='') || (categorie!= '' && gouvernorat== 'Toutes régions' && prix=='')) {
      this.annonceServ.getAnnoncesByCategorie(gouvernorat).subscribe((annonces)=>
      this.annonces=annonces)
    
    
    }
    else if(categorie== 'Toutes catégories' && gouvernorat!= '' && prix!='')  {
      this.annonceServ.getAnnoncesByFiltresGp(gouvernorat,prix).subscribe((annonces)=>
      this.annonces=annonces)
    
    
    }
    else if(gouvernorat== 'Toutes régions' && categorie!= '' && prix!='')  {
      this.annonceServ.getAnnoncesByFiltrescp(categorie,prix).subscribe((annonces)=>
      this.annonces=annonces)
    
    
    }

    else if(categorie!= '' && gouvernorat!= '' && prix!=''){
      this.annonceServ.getAnnoncesByFiltres(prix, categorie ,gouvernorat).subscribe((annonces)=>
      this.annonces=annonces)
    }
  
    
    this.rechercheEffectuee = true;
    
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
}

