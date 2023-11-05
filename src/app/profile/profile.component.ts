import { Component, OnInit,Type } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { MesinfosComponent } from '../mesinfos/mesinfos.component';
import { MesannoncesComponent } from '../mesannonces/mesannonces.component';
import { MesfavoriesComponent } from '../mesfavories/mesfavories.component';
import { SecuriteComponent } from '../securite/securite.component';
import { UserdataService } from '../services/userdata.service'; 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
user!:User;
selectedComponent!: Type<any>;
constructor(private userServ:UserService,private userDataService: UserdataService ,private router: Router){}
  
ngOnInit(): void {
  this.userServ.getUserById(this.userServ.getUserId()).subscribe((res)=>{
this.user=res
this.selectedComponent =MesinfosComponent;
  });
  this.userDataService.userName$.subscribe((newName) => {
    this.user.name = newName;
  });

}
logout():void {
  this.userServ.logout();
  this.router.navigate(['home']);

}
afficherInfos() {
  this.selectedComponent =MesinfosComponent ;
  
}
afficherAnnonces() {
  this.selectedComponent =MesannoncesComponent ;
}
afficherSecurite() {
  this.selectedComponent =SecuriteComponent ;
}
afficherFavories() {
  this.selectedComponent =MesfavoriesComponent ;
}
}
