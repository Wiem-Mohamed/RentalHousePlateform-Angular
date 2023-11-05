import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit{
  usernotfound!:boolean
  invalidpassword!:boolean
  emailexist!:boolean
  comptecree!:boolean
  us!:User
  formoutput!: FormGroup;
  forminput!: FormGroup;
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>()
 constructor( private fb:FormBuilder,private route:Router,private userServ:UserService){
  this.forminput = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
});

this.formoutput = this.fb.group({
  email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
  password: ['', [Validators.required, Validators.minLength(6)]]
})
}

 signup() {
  if(this.forminput.valid) {
    let usr=new User()
    usr.name=this.forminput.controls['name'].value
    usr.email=this.forminput.controls['email'].value
    usr.password=this.forminput.controls['password'].value
    this.emailexist=false
    this.comptecree=false
    this.userServ.userExists(usr.email).subscribe((exists: boolean) => {
      if (exists) {
        this.forminput.reset()
        this.emailexist=true
        
      } 
      else {
        this.userServ.registerUser(usr).subscribe(
          (u)=>{
            this.us=u
          }
          
        )
        this.comptecree=true
      }
    });
    
    }
    
 }


signin() {
  if (this.formoutput.valid) {
    const email = this.formoutput.controls['email'].value;
    const password = this.formoutput.controls['password'].value;
    this.invalidpassword = false;
       this.usernotfound = false;
    this.userServ.signin(email, password)
      .subscribe(response => {
        if (response !== null) {
          console.log(response)
          this.userServ.saveUser(response);

          this.closePopup.emit();
        this.route.navigate(['profile']);
        
        } else {
          this.userServ.userExists(email).subscribe((exists: boolean) => {
                       if (exists) {
                        this.invalidpassword = true;
                     } 
                      else {
                         this.usernotfound = true;
                      }
                       this.formoutput.reset();
                     });
          
        }
      });
  }
}

 ngOnInit(): void {

 } 
 
 
}
