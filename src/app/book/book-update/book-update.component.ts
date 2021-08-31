import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { NGXLogger } from 'ngx-logger';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BookService } from '../book.service';
import { Book, BookDto } from 'src/app/common/book-dto';
import { ThemePalette } from '@angular/material/core';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

  bookFileInfo = {
    coverPic: '',
    bookFile: '',
  }
  uploadCoverProgress: number;
  uploadBookProgress: number;
  color: ThemePalette = 'accent';
  coverUploadUrl = '';
  bookUploadUrl = '';

  portalUrl = '/lib/lib-portal';

  constructor(
    private fb: FormBuilder,
    private logger: NGXLogger,
    private bookService: BookService,
    private tokenService: TokenStorageService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
  ) { }

  bookUpdateForm = this.fb.group({
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
    creator: [''],
    isActive: [''],
  });

  ngOnInit(): void {
    if (this.tokenService.getUsername().slice(0, 3) === '$A_') {
      this.portalUrl = '/lib/admin-portal';
    }
    const bookID = this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(bookID).subscribe((book: Book) => {
      const publishDate = this.datePipe.transform(book.publishDate, 'y-MM-dd');
      const purchaseDate = this.datePipe.transform(book.purchaseDate, 'y-MM-dd');
      if (book && book.bookTitle) {
        this.bookUpdateForm.setValue({
          bookTitle: book.bookTitle,
          isbnCode: book.isbnCode,
          category: book.category,
          author: book.author,
          language: book.language,
          format: book.format,
          publisher: book.publisher,
          publishDate: publishDate,
          purchaseDate: purchaseDate,
          price: book.price.toLocaleString(),
          coverPic: '',
          bookFile: '',
          desc: book.desc,
          keywords: book.keywords,
          initialScore: book.initialScore,
          creator: book.creator,
          isActive: book.isActive === true ? 'Active' : 'Inactive',
        });
        this.bookFileInfo.coverPic = book.coverPic.slice(13,);
        this.bookFileInfo.bookFile = book.bookFile.slice(13,);
        this.logger.info(`Success load book ${book.bookTitle} info from server`);
      } else {
        this.logger.warn(`Failed to load book ${bookID} info from server`);
      }
    });

    // Disable form submissions if there are invalid fields
    (function () {
      // Fetch all forms we want to apply custom validation styles to
      var forms = document.querySelectorAll('.needs-validation')
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
            form.classList.add('was-validated')
          }, false)
        })
    })()
  }

  //After select the cover picture file, upload file to server and show uploading progress
  onCoverSelect(event) {
    const coverFile = event.target.files[0];
    if (coverFile) {
      this.bookService.fileUpload(coverFile).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadCoverProgress = Math.round(100 * (event.loaded / event.total));
        }
        if (event.type === HttpEventType.Response && event.status === 201) {
          this.logger.info("Book cover uploaded successfully");
          this.coverUploadUrl = event.body['fileUrl'];
          const coverFileInput = document.querySelector("#cover");
          coverFileInput.className = 'form-control is-valid';
        }
      })
    }
  }

  //After select the book file, upload file to server and show uploading progress
  onBookSelect(event) {
    const bookFile = event.target.files[0];
    if (bookFile) {
      this.bookService.fileUpload(bookFile).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadBookProgress = Math.round(100 * (event.loaded / event.total));
        }
        if (event.type === HttpEventType.Response && event.status === 201) {
          this.logger.info("Book file uploaded successfully");
          this.bookUploadUrl = event.body['fileUrl'];
          const coverFileInput = document.querySelector("#bookFile");
          coverFileInput.className = 'form-control is-valid';
        }
      })
    }
  }

  updateBook() {
    const updateInfo: BookDto = this.bookUpdateForm.value;
    if (this.bookUpdateForm.dirty) {
      if (this.coverUploadUrl !== '') updateInfo.coverPic = this.coverUploadUrl;
      if (this.bookUploadUrl !== '') updateInfo.bookFile = this.bookUploadUrl;
      //Call bookService to update bookinfo in database
      this.bookService.updateBookInfo(updateInfo).subscribe((book: Book) => {
        if (book && book.bookTitle) {
          this.logger.info(`Success update book ${book.bookTitle}`)
          //window.alert(`Success update book ${book.bookTitle}`);
          this.router.navigateByUrl(`/book/reviewinfo/${book._id}`);
        } else {
          this.logger.info(`Update book ${book.bookTitle} failed`)
          window.alert(`Update book ${book.bookTitle} failed, please check and try again`);
        }
      })
    } else {
      window.alert('You have not update anything yet!');
    }

  }
}
