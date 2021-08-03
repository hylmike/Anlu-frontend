import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-librarian-header',
  templateUrl: './librarian-header.component.html',
  styleUrls: ['./librarian-header.component.css']
})
export class LibrarianHeaderComponent implements OnInit {

  titleName: string = 'Anlu Library';

  libName: string = 'Librarian';

  constructor() { }

  ngOnInit(): void {
  }

}
