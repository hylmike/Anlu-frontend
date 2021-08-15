import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../common/book-dto';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  
  @Input() bookList: Book[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
