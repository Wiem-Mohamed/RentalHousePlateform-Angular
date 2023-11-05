import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isConnectionPopupVisible: boolean = false;
  constructor(private userServ:UserService){}
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
  toggleConnectionPopup() {
    this.isConnectionPopupVisible = !this.isConnectionPopupVisible;
  }
 toggleSidebar(): void {
    const nav = document.querySelector("nav");
    if (nav) {
      nav.classList.add("active");
    }
  }

  closeSidebar(): void {
    const nav = document.querySelector("nav");
    if (nav) {
      nav.classList.remove("active");
    }
  }

  toggleSearch(): void {
    const searchToggle: HTMLElement | null = document.querySelector(".searchToggle");
    if (searchToggle) {
      searchToggle.classList.toggle("active");
    }
  }
  logout():void {
    this.userServ.logout()

  }
  ngOnInit(): void {
  
  }
  isConnected() {
    return this.userServ.isConnected();
  }

}
