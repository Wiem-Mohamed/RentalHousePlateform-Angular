import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  isConnectionPopupVisible: boolean = false;
  constructor(private userServ:UserService){

  }
  ngOnInit(): void {
    
  }
  toggleConnectionPopup() {
    this.isConnectionPopupVisible = !this.isConnectionPopupVisible;
  }
  preventPopupClose(event: Event) {
    const clickedElement = event.target as HTMLElement;
    
    // Vérifiez si l'élément cliqué est à l'intérieur du formulaire
    if (!clickedElement.closest('.container')) {
      this.hideConnectionPopup();
    }
  }
  hideConnectionPopup() {
    this.isConnectionPopupVisible = false;
  }
  isConnected() {
    return this.userServ.isConnected();
  }

}
