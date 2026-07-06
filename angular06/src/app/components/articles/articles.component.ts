import { Component, OnInit } from '@angular/core';
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

  constructor(private service: ArticlesService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => this.articles = data);
  }

}
