import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Articles {
  title: string;
  content: string;
  pubdate: string;
}

@Injectable({
  providedIn: 'root',
})

export class ArticlesService {
  private api = "/api/articles";
  constructor(private http: HttpClient) { }

  getAll(): Observable<Articles[]> {
    return this.http.get<Articles[]>(this.api);
  }

}
