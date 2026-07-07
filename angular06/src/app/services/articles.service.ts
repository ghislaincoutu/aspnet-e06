import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Articles {
  id: number;
  title: string;
  content: string;
  pubdate: string;
}

@Injectable({
  providedIn: 'root',
})

export class ArticlesService {
  private api = "/api/articles";
  private reset = '/api/articles/reset';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Articles[]> {
    return this.http.get<Articles[]>(this.api);
  }

  create(articles: Articles) {
    return this.http.post(this.api, articles);
  }

  update(articles: Articles) {
    return this.http.put(`${this.api}/${articles.id}`, articles);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  resetArticles(): Observable<any> {
    return this.http.post<any>(this.reset, {});
  }
}
