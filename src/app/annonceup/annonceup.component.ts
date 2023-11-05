
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../models/annonce';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-annonceup',
  templateUrl: './annonceup.component.html',
  styleUrls: ['./annonceup.component.css']
})
export class AnnonceupComponent implements OnInit{
  AnnonceId !:number;
  currentIndex = 0;
  annonceForm!: FormGroup;
  annonce!:Annonce
  annonces: Annonce[] = [];
  images: string[] = [];
  nbpieces = ['S+1', 'S+2', 'S+3', 'S+4', 'S+5', 'S+6'];
  gouvernorats = [
    'Ariana','Beja',
'Ben Arous','Bizerte','Gabes','Gafsa','Jendouba','Kairouan',  'Kasserine','Kebili','Kef',  'Mahdia',  'Manouba',  'Medenine','Monastir','Nabeul','Sfax',  'Sidi Bouzid','Siliana',  'Sousse','Tataouine','Tozeur','Tunis',  'Zaghouan'
  ];
  categories = [
    'Appartement',
    'Maison de ville',
    'Maison de vacances',
    'Studio',
    'Maison pour événements',
    'Maison pour étudiants'
  ];

  

  constructor(private fb: FormBuilder,private route:Router,private annonceServ:AnnonceService,private userServ:UserService,private router: ActivatedRoute) {
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      disponible: ['', Validators.required],
      categorie: ['', Validators.required],
      pieces: ['', Validators.required],
      gouvernorat: ['', Validators.required],
      prix: ['', Validators.required],
      telephone: ['', Validators.required],
      
    });
   }

   modifierannonce(){
    
    if(this.annonceForm.valid) {
    
      const  titre=this.annonceForm.controls['titre'].value
      const   description=this.annonceForm.controls['description'].value
      const disponible=this.annonceForm.controls['disponible'].value
      const categorie=this.annonceForm.controls['categorie'].value
      const pieces=this.annonceForm.controls['pieces'].value
      const gouvernorat=this.annonceForm.controls['gouvernorat'].value
      const prix=this.annonceForm.controls['prix'].value
      const telephone=this.annonceForm.controls['telephone'].value
      const dateDepot = new Date()
      const images=this.images;
      const userId=this.userServ.getUserId()
      const Updatedannonce= {id:this.AnnonceId,titre,description,disponible,categorie,pieces,gouvernorat,prix,telephone,dateDepot,images,userId}; 
      this.annonceServ.updateAnnonce(  this.AnnonceId,Updatedannonce).subscribe(
        (response) => {
          console.log('l\'annonce  modifiée avec succès', response);
          
        },
        (error) => {
          console.error('Erreur lors de la modification de l\'annonce', error);
        })
        this.annonceServ.getAll().subscribe((annonces) => {
          this.annonces = annonces;
        });
        this.route.navigate(["home"])  
    }
           
}


onFileSelected(event: any): void {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.images.push(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
  }
}

removeImage(index: number): void {
  this.images.splice(index, 1);
}

  //concerne la navigation entre les fieldsets
  showStep(index: number): void {
  
    const fieldsets = document.querySelectorAll("fieldset");
    const progressbarItems = document.querySelectorAll("#progressbar li");

    if (index >= 0 && index < fieldsets.length) {
      fieldsets[this.currentIndex].style.display = "none";
      fieldsets[index].style.display = "block";
      progressbarItems[this.currentIndex].classList.remove("active");
      progressbarItems[index].classList.add("active");
      this.currentIndex = index;
    }
  }

  onNextClick(): void {
    this.showStep(this.currentIndex + 1);
  }

  onPreviousClick(): void {
    this.showStep(this.currentIndex - 1);
  }


ngOnInit(): void {
  const idString = this.router.snapshot.paramMap.get('id'); // Get the ID from the URL
  if (idString !== null) {
    this.AnnonceId = Number(idString);
}
this.annonceServ.getAnnonceById(this.AnnonceId).subscribe( (annonce:Annonce)=> {this.annonce=annonce})
}
}

