import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';

@Component({
  selector: 'app-lib-update',
  templateUrl: './lib-update.component.html',
  styleUrls: ['./lib-update.component.css']
})
export class LibUpdateComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private router: Router,
    private libAuthService: LibrarianAuthService,
    private fb: FormBuilder,
  ) { }

  libUpdateForm = this.fb.group({
    
  })

  ngOnInit(): void {
  }

}
