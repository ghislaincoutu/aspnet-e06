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
  private reset = inject(ArticlesService);
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

  delete(id: number): void {
    const confirmation = window.confirm(
      'Voulez-vous vraiment supprimer cet enregistrement?'
    );
    if (!confirmation) {
      return;
    }
    this.service.delete(id).subscribe({
      next: () => {
        this.load();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        window.alert('Une erreur est survenue lors de la suppression.');
      }
    });
  }

  resetDatabase(): void {
    const confirmation = window.confirm(
      'Attention : tous les enregistrements seront supprimés. Voulez-vous continuer?'
    );
    if (!confirmation) {
      return;
    }
    this.reset.resetDatabase().subscribe({
      next: (response) => {
        window.alert(response.message);
        this.load();
      },
      error: (err) => {
        console.error('Erreur lors de la réinitialisation', err);
        window.alert('Une erreur est survenue lors de la réinitialisation.');
      }
    });
  }
}
