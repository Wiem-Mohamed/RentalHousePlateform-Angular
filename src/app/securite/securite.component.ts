import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AnnonceService } from '../services/annonce.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-securite',
  templateUrl: './securite.component.html',
  styleUrls: ['./securite.component.css']
})
export class SecuriteComponent implements OnInit{
  formoutput!: FormGroup;
  user!:User;
  actualpass!:boolean;
  confpass!:boolean;
  password!:string;
  constructor(private fb:FormBuilder,private userServ:UserService,private annonceServ:AnnonceService){
    
    this.formoutput = this.fb.group({
      actualpass:['', [Validators.required, Validators.minLength(6)]] ,
      newpass: ['', [Validators.required, Validators.minLength(6)]],
      confnewpass: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  newpassword(){
    this.actualpass=false;
  this.confpass=false;
    this.password = this.user.password; 
    console.log(this.password)
    const pass1 = this.formoutput.controls['actualpass'].value;
    const pass2 = this.formoutput.controls['newpass'].value;
    const pass3 = this.formoutput.controls['confnewpass'].value;
    if (pass1 !== this.password){
      this.actualpass=true;
    }
    if (pass3 !== pass2){
      this.confpass=true;
    }
    if (this.formoutput.valid && !this.actualpass && !this.confpass) {
      const password = this.formoutput.controls['newpass'].value;
      const idUser = this.user.id;
      const name = this.user.name;
      const email = this.user.email;
      const updatedUser = {id:idUser,name,email, password}; 
      this.userServ.updatePass(idUser, updatedUser).subscribe(
        (response) => {
          console.log('mot de passemodifié avec succès', response);
          this.userServ.getUserById(this.userServ.getUserId()).subscribe((res)=>{
            this.user=res
      
        });
        },
        (error) => {
          console.error('Erreur lors de la modification du mot de passe', error);
        }
      );
    
  }
  else{
    console.log("error");
  }
  }
  ngOnInit(): void {
    this.userServ.getUserById(this.userServ.getUserId()).subscribe((res)=>{
      this.user=res

  });
    
  }

}
