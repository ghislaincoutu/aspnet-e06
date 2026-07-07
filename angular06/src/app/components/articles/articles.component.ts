import { Component, OnInit, inject } from '@angular/core';
import { ArticlesService, Articles } from '../../services/articles.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articles',
  imports: [CommonModule, FormsModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})

export class ArticlesComponent {
  articles: Articles[] = [];
  article12: Articles = { id: 0, title: '', content: '', pubdate: '' };
  private resetDatabase = inject(ArticlesService);
  constructor(private service: ArticlesService) { }

  ngOnInit() {
    this.load();
  }

  save() {
    if (this.article12.id === 0) {
      this.service.create(this.article12).subscribe(() => this.load());
    } else {
      this.service.update(this.article12).subscribe(() => this.load());
    }
    this.article12 = { id: 0, title: '', content: '', pubdate: '' };
  }

  load() {
    this.service.getAll().subscribe(data => this.articles = data);
  }

  edit(a: Articles) {
    this.article12 = { ...a };
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }

  reset(): void {
    this.resetDatabase.resetArticles().subscribe({
      next: (response) => {
        alert(response.message);
      },
      error: (err) => {
        console.error('Erreur lors de la réinitialisation', err);
        alert('Une erreur est survenue lors de la réinitialisation.');
      }
    });
  }
}
