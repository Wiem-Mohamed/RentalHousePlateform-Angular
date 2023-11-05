import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../models/annonce';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit{
  currentIndex = 0;
  annonceForm!: FormGroup;
  an!:Annonce
  annonces: Annonce[] = [];
  images: string[] = [];
  nbpieces = [
    'S+0','S+1', 'S+2', 'S+3', 'S+4', 'S+5', 'S+6'];
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

  

  constructor(private fb: FormBuilder,private route:Router,private annonceServ:AnnonceService,private userServ:UserService) {
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

   deposerannonce(){
    
    if(this.annonceForm.valid) {
      let annonce=new Annonce()
      annonce.titre=this.annonceForm.controls['titre'].value
      annonce.description=this.annonceForm.controls['description'].value
      annonce.disponible=this.annonceForm.controls['disponible'].value
      annonce.categorie=this.annonceForm.controls['categorie'].value
      annonce.pieces=this.annonceForm.controls['pieces'].value
      annonce.gouvernorat=this.annonceForm.controls['gouvernorat'].value
      annonce.prix=this.annonceForm.controls['prix'].value
      annonce.telephone=this.annonceForm.controls['telephone'].value
      annonce.dateDepot = new Date()
      annonce.images=this.images;
      annonce.userId=this.userServ.getUserId()
      this.annonceServ.add(annonce).subscribe(
        (a)=>{
          this.an=a
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
  
}
}
