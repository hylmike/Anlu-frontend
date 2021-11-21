import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Blog } from 'src/app/common/blog.dto';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private blogService: BlogService,
    private fb: FormBuilder,
    private tokenService: TokenStorageService,
    private router: Router,
    public translate: TranslateService,
  ) { }

  blogRegForm = this.fb.group({
    topic: [''],
    category: [''],
    creator: [''],
    content: [''],
    keywords: [''],
  })

  ngOnInit(): void {
    //preset the creator of blog
    const libName = this.tokenService.getUsername().slice(3,);
    this.blogRegForm.setValue({
      topic: '',
      category: '',
      creator: libName,
      content: '',
      keywords: '',
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

  createBlog() {
    const blogInfo = this.blogRegForm.value;
    this.blogService.create(blogInfo).subscribe((blog: Blog)=>{
      if (blog && blog.topic) {
        this.logger.info('Success create new blog');
        this.translate.stream('createBlog.notice-1', {topic: blogInfo.topic}).subscribe((res)=>{
          window.alert(res);
        })
        location.reload();
      } else {
        this.logger.warn('Failed to create blog in backend');
      }
    })
  }

  goPortal() {
    this.router.navigateByUrl('/lib/lib-portal');
  }

}
