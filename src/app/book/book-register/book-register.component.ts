import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

import { BookService } from '../book.service';
import { BookDto } from '../../common/book-dto';
import { HttpEventType } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-book-register',
  templateUrl: './book-register.component.html',
  styleUrls: ['./book-register.component.css'],
})
export class BookRegisterComponent implements OnInit {
  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private bookService: BookService,
    private tokenService: TokenStorageService,
    private router: Router,
    public translate: TranslateService
  ) {}

  uploadCoverProgress: number;
  uploadBookProgress: number;
  color: ThemePalette = 'accent';
  coverUploadUrl = '';
  bookUploadUrl = '';

  bookRegisterForm = this.fb.group({
    bookTitle: [''],
    isbnCode: [''],
    category: [''],
    author: [''],
    language: [''],
    format: [''],
    publisher: [''],
    publishDate: [''],
    purchaseDate: [''],
    price: [''],
    coverPic: [''],
    bookFile: [''],
    desc: [''],
    keywords: [''],
    initialScore: [''],
    creator: [this.tokenService.getUsername().slice(3)],
    isActive: ['Active'],
  });

  ngOnInit(): void {
    // Disable form submissions if there are invalid fields
    (function () {
      // Fetch all forms we want to apply custom validation styles to
      var forms = document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          'submit',
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          },
          false
        );
      });
    })();
  }

  //After select the cover picture file, upload file to server and show uploading progress
  onCoverSelect(event) {
    const coverFile = event.target.files[0];
    if (coverFile) {
      this.bookService.fileUpload(coverFile).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadCoverProgress = Math.round(
            100 * (event.loaded / event.total)
          );
        }
        if (event.type === HttpEventType.Response && event.status === 201) {
          this.logger.info('Book cover uploaded successfully');
          this.coverUploadUrl = event.body['fileUrl'];
          const coverFileInput = document.querySelector('#cover');
          coverFileInput.className = 'form-control is-valid';
        }
      });
    }
  }

  //After select the book file, upload file to server and show uploading progress
  onBookSelect(event) {
    const bookFile = event.target.files[0];
    if (bookFile) {
      this.bookService.fileUpload(bookFile).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadBookProgress = Math.round(
            100 * (event.loaded / event.total)
          );
        }
        if (event.type === HttpEventType.Response && event.status === 201) {
          this.logger.info('Book file uploaded successfully');
          this.bookUploadUrl = event.body['fileUrl'];
          const coverFileInput = document.querySelector('#bookFile');
          coverFileInput.className = 'form-control is-valid';
        }
      });
    }
  }

  bookRegister() {
    let notice1: string;
    this.translate.stream('bookReg.notice-1').subscribe((res) => {
      notice1 = res['bookReg.notice-1'];
    });
    //Check if both cover and book already uploaded
    if (this.bookUploadUrl === '' || this.bookUploadUrl === '') {
      window.alert(notice1);
      return null;
    }
    const bookInfo: BookDto = this.bookRegisterForm.value;
    bookInfo.bookFile = this.bookUploadUrl;
    bookInfo.coverPic = this.coverUploadUrl;
    let notice2: string, notice3: string;
    this.translate
      .stream(['bookReg.notice-2', 'bookReg.notice-3'], {
        bookTitle: bookInfo.bookTitle,
      })
      .subscribe((res) => {
        notice2 = res['bookReg.notice-2'];
        notice3 = res['bookReg.notice-3'];
      });
    this.bookService.register(bookInfo).subscribe((data) => {
      //Check if book already exist in database, return null means existed
      if (!data) {
        this.logger.warn(`The book ${bookInfo.bookTitle} already exist`);
        window.alert(notice2);
        return null;
      }
      this.logger.info(
        `Book ${data.bookTitle} already successfully registered in system.`
      );
      window.alert(notice3);
      window.location.reload();
    });
  }

  goPortal() {
    const role =
      this.tokenService.getUsername().slice(0, 3) === '$A_'
        ? 'Admin'
        : 'Librarian';
    if (role === 'Admin') {
      this.router.navigateByUrl('/lib/admin-portal');
    } else {
      this.router.navigateByUrl('/lib/lib-portal');
    }
  }
}
