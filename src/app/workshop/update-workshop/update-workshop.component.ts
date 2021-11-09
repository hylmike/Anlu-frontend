import { DatePipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { UpdateWorkshopDto, Workshop } from 'src/app/common/workshop.dto';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-update-workshop',
  templateUrl: './update-workshop.component.html',
  styleUrls: ['./update-workshop.component.css']
})
export class UpdateWorkshopComponent implements OnInit {

  uploadPosterProgress: number;
  color: ThemePalette = 'accent';
  posterFileUrl = '';
  posterUploadUrl = '';
  workshopID = '';

  constructor(
    private logger: NGXLogger,
    private workshopService: WorkshopService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    public translate: TranslateService,
  ) { }

  wsUpdateForm = this.fb.group({
    topic: [''],
    place: [''],
    organizer: [''],
    startTime: [''],
    duration: [''],
    poster: [''],
    remark: [''],
  })

  ngOnInit(): void {
    this.workshopID = this.route.snapshot.paramMap.get('id');
    this.workshopService.getWorkshop(this.workshopID).subscribe((ws: Workshop) => {
      if (ws && ws.topic) {
        const sTime = this.datePipe.transform(ws.startTime, 'y-MM-ddTHH:mm');
        this.wsUpdateForm.setValue({
          topic: ws.topic,
          place: ws.place,
          organizer: ws.organizer,
          startTime: sTime,
          duration: ws.duration,
          poster: '',
          remark: ws.remark,
        })
        this.posterFileUrl = ws.poster.slice(14,);
        this.logger.info(`Success load workshop ${this.workshopID} from server`)
      } else {
        this.logger.warn(`Failed to get workshop ${this.workshopID} from server`)
      }
    })
  }

  //After select the poster picture file, upload file to server and show uploading progress
  onPosterSelect(event) {
    const posterFile = event.target.files[0];
    if (posterFile) {
      this.workshopService.fileUpload(posterFile).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadPosterProgress = Math.round(100 * (event.loaded / event.total));
        }
        if (event.type === HttpEventType.Response && event.status === 201) {
          this.logger.info("Book cover uploaded successfully");
          this.posterUploadUrl = event.body['fileUrl'];
          const coverFileInput = document.querySelector("#cover");
          coverFileInput.className = 'form-control is-valid';
        }
      })
    }

  }

  updateWorkshop() {
    if (this.workshopID) {
      const updateInfo: UpdateWorkshopDto = this.wsUpdateForm.value;
      if (this.wsUpdateForm.dirty) {
        if (this.posterUploadUrl !== '') updateInfo.poster = this.posterUploadUrl;
        this.workshopService.updateWorkshop(this.workshopID, updateInfo).subscribe((ws: Workshop)=>{
          if (ws && ws.topic) {
            this.logger.info(`Success update workshop ${this.workshopID}`);
            this.router.navigateByUrl(`/workshop/reviewinfo/${this.workshopID}`)
          } else {
            this.logger.warn(`Failed to update workshop ${this.workshopID} in server side`);
          }
        })
      } else {
        this.translate.stream("updateWs.notice-1").subscribe((res)=>{
          window.alert(res);
        })
      }
    }
  }

}
