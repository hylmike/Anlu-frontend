import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { BookService } from '../book.service';
import { RegisterBook } from '../../common/book-dto';
import { HttpEventType } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { AlertDialog } from '../../common/message-dialog/message-dialog.component';

@Component({
  selector: 'app-book-register',
  templateUrl: './book-register.component.html',
  styleUrls: ['./book-register.component.css']
})
export class BookRegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private dialog: MatDialog,
  ) { }

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
    style: [''],
    publisher: [''],
    publishDate: [new Date()],
    purchaseDate: [new Date()],
    price: [''],
    coverPic: [''],
    bookFile: [''],
    desc: [''],
    keyword: [''],
  })

  ngOnInit(): void {
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
      console.log(coverFile);
      this.bookService.fileUpload(coverFile).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadCoverProgress = Math.round(100 * (event.loaded / event.total));
        }
        if (event.type === HttpEventType.Response && event.status === 201) {
          console.log("Book cover uploaded successfully");
          this.coverUploadUrl = event.body['fileUrl'];
          console.log(this.coverUploadUrl);
          const coverFileInput = document.querySelector("#floatingCover");
          coverFileInput.className = 'form-control is-valid';
        }
      })
    }
  }

  //After select the book file, upload file to server and show uploading progress
  onBookSelect(event) {
    const bookFile = event.target.files[0];
    if (bookFile) {
      console.log(bookFile);
      this.bookService.fileUpload(bookFile).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadBookProgress = Math.round(100 * (event.loaded / event.total));
        }
        if (event.type === HttpEventType.Response && event.status === 201) {
          console.log("Book file uploaded successfully");
          this.bookUploadUrl = event.body['fileUrl'];
          const coverFileInput = document.querySelector("#floatingBook");
          coverFileInput.className = 'form-control is-valid';
        }
      })
    }
  }

  bookRegister() {
    //Check if both cover and book already uploaded
    if (this.bookUploadUrl === '' || this.bookUploadUrl === '') {
      window.alert('Please upload book cover picture and book file first.');
      /*
      const dialogRef = this.dialog.open(AlertDialog, {
        width: '30%',
        height: '20%',
        data: {
          title: 'Notice',
          message: 'Please upload book cover picture and book file first.',
        }
      });
      dialogRef.afterClosed().subscribe(() => console.log('Notice dialog closed'))
      */
      return null;
    }
    const bookInfo: RegisterBook = this.bookRegisterForm.value;
    bookInfo.bookFile = this.bookUploadUrl;
    bookInfo.coverPic = this.coverUploadUrl;
    this.bookService.register(bookInfo).subscribe((data) => {
      //Check if book already exist in database, return null means existed
      if (!data) {
        const dialogRef = this.dialog.open(AlertDialog, {
          width: '30%',
          height: '20%',
          data: {
            title: 'Notice',
            message: 'The book already exist, please register new one.',
          }
        });
        dialogRef.afterClosed().subscribe(() => console.log('Notice dialog window closed'))
        return null;
      }
      console.log(`Book ${data.bookTitle} already successfully registered in system.`);
      const dialogRef = this.dialog.open(AlertDialog, {
        width: '30%',
        height: '20%',
        data: {
          title: 'Notice',
          message: `Book ${data.bookTitle} already successfully registered in system.`,
        }
      });
      dialogRef.afterClosed().subscribe(() =>
        console.log('Notice dialog window closed')
      );
      window.location.reload();
    })
  }
}