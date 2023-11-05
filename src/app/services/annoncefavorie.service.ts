import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnnonceFavorie } from '../models/annoncefavorie';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AnnoncefavorieService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/favories';
  add(annonce: AnnonceFavorie): Observable<AnnonceFavorie> {
    return this.http.post<AnnonceFavorie>(this.apiUrl, annonce);
  }

  getAnnoncesByUserId(favorId: number): Observable<AnnonceFavorie[]> {
    const url = this.apiUrl + '?favorId=' + favorId;
    return this.http.get<AnnonceFavorie[]>(url);
  }
  supprimerAnnonce(annonceId: number): Observable<any> {
    const url = `${this.apiUrl}/${annonceId}`;
    return this.http.delete<void>(url);
  }
 
  annonceDejaFavorite(annonceId: number, favorId: number): Observable<number> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map((res: any[]) => {
          const annonceFavorite = res.find((a: any) => a.annonceId === annonceId && a.favorId === favorId);
  
          if (annonceFavorite) {
            return annonceFavorite.id; // Retourne l'ID de l'annonce si elle existe
          } else {
            return 0; // Retourne 0 si l'annonce n'existe pas
          }
        })
      );
  }
  
  

}
