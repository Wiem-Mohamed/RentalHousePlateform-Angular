import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AnnonceService } from '../services/annonce.service';
import { User } from '../models/user.model';
import { UserdataService } from '../services/userdata.service'; 
import { AnnoncefavorieService} from '../services/annoncefavorie.service';

@Component({
  selector: 'app-mesinfos',
  templateUrl: './mesinfos.component.html',
  styleUrls: ['./mesinfos.component.css']
})
export class MesinfosComponent implements OnInit{
  formoutput!: FormGroup;
  user!:User;
  constructor(private fb:FormBuilder,private userServ:UserService,private annonceServ:AnnonceService,private userDataService: UserdataService ,private route:Router,private annonceFavServ:AnnoncefavorieService){
    this.formoutput = this.fb.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      name: ['', [Validators.required]]
    })
  }
ngOnInit(): void {
  this.userServ.getUserById(this.userServ.getUserId()).subscribe((res)=>{
    this.user=res
});
}
modifier(){
  if (this.formoutput.valid) {
    const email = this.formoutput.controls['email'].value;
    const name = this.formoutput.controls['name'].value;
    const password=this.user.password;
    const idUser = this.user.id;
    const updatedUser = {id:idUser, name,email,password}; 
    this.userServ.updateUser(idUser, updatedUser).subscribe(
      (response) => {
        this.userDataService.updateUserName(name);
        console.log('Utilisateur modifié avec succès', response);
        
      },
      (error) => {
        console.error('Erreur lors de la modification de l\'utilisateur', error);
      }
    );
  
}
}

deleteAccount(): void {
  const userId = this.user.id;

    
  this.userServ.deleteUserById(userId).subscribe(
    () => {
      this.route.navigate(["home"]) 
      this.userServ.logout();
      console.log('Utilisateur supprimé avec succès.');
      this.annonceServ.deleteAnnounceByUserId(userId).subscribe(
        () => {
          console.log('Annonces de l\'utilisateur supprimées avec succès.');
          
        },
        (error) => {
          console.error('Erreur lors de la suppression des annonces de l\'utilisateur :', error);
        }
      );
    
    },
    (error) => {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  );
}



}
