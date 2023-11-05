
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  private apiUrl = 'http://localhost:3000/annonces';
  an!: Annonce; 
  constructor(private http: HttpClient) {}

  getAll(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiUrl);
  }

  add(annonce: Annonce): Observable<Annonce> {
    return this.http.post<Annonce>(this.apiUrl, annonce);
  }
  
  getAnnonceById(id: number): Observable<Annonce> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Annonce>(url);
  }
  getAnnoncesByUserId(userId: number): Observable<Annonce[]> {
    const url = this.apiUrl + '?userId=' + userId;
    return this.http.get<Annonce[]>(url);
  }
  supprimerAnnonce(annonceId: number): Observable<any> {
    const url = this.apiUrl + '/' + annonceId;
    return this.http.delete(url);
  }
  deleteAnnounceByUserId(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url);
  }  
  updateAnnonce(annonceId: number, updatedann: any): Observable<any> {
    const url = `${this.apiUrl}/${annonceId}`;
    return this.http.put(url, updatedann);
  }
  
  getAnnoncesByPrix(prix: number): Observable<Annonce[]> {
    const url = `${this.apiUrl}?prix=${prix}`;
    return this.http.get<Annonce[]>(url);
  }
  getAnnoncesByGouvernorat(gouvernorat: string): Observable<Annonce[]> {
    const url = `${this.apiUrl}?gouvernorat=${gouvernorat}`;
    return this.http.get<Annonce[]>(url);
  }
  getAnnoncesByCategorie(gouvernorat: string): Observable<Annonce[]> {
    const url = `${this.apiUrl}?gouvernorat=${gouvernorat}`;
    return this.http.get<Annonce[]>(url);
  }
  getAnnoncesByFiltres(prix: string, categorie: string, gouvernorat: string): Observable<Annonce[]> {
    
    let params = new HttpParams();
    if (prix) {
      params = params.set('prix', prix);
    }
    if (categorie) {
      params = params.set('categorie', categorie);
    }
    if (gouvernorat) {
      params = params.set('gouvernorat', gouvernorat);
    }

    
    return this.http.get<Annonce[]>(this.apiUrl, { params: params });
  }
  
  getAnnoncesByFiltresGp(gouvernorat: string, prix: string): Observable<Annonce[]> {
    // Créez un objet HttpParams pour ajouter les paramètres de requête
    let params = new HttpParams();
    if (prix) {
      params = params.set('prix', prix);
    }
    if (gouvernorat) {
      params = params.set('gouvernorat', gouvernorat);
    }
    return this.http.get<Annonce[]>(this.apiUrl, { params: params });
  }
  getAnnoncesByFiltrescp(categorie: string, prix: string): Observable<Annonce[]> {
  
    let params = new HttpParams();
    if (prix) {
      params = params.set('prix', prix);
    }
    if (categorie) {
      params = params.set('categorie',categorie);
    }
    return this.http.get<Annonce[]>(this.apiUrl, { params: params });
  }
  }




