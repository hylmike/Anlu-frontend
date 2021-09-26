import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BookWish } from 'src/app/common/book-dto';
import { CommonService } from 'src/app/common/common.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-wishlist',
  templateUrl: './book-wishlist.component.html',
  styleUrls: ['./book-wishlist.component.css']
})
export class BookWishlistComponent implements OnInit, OnDestroy {

  constructor(
    private logger: NGXLogger,
    private tokenService: TokenStorageService,
    private bookService: BookService,
    private commonService: CommonService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    const libName = this.tokenService.getUsername().slice(3,);
    this.commonService.setSubject(libName);
    this.renderWishList();
    this.logger.info('Success load and render unfulfulled wishlist');
  }

  renderWishList() {
    const wishListDiv = document.querySelector('div.wish-list');
    while (wishListDiv.firstChild) {
      wishListDiv.removeChild(wishListDiv.firstChild);
    }
    //Add wishlist based on server data
    this.bookService.getUnfulfilWishList().subscribe((wishList: BookWish[]) => {
      if (wishList && wishList.length > 0) {
        for (const item of wishList) {
          const div1 = document.createElement('div');
          div1.className = 'col-md-2';
          wishListDiv.appendChild(div1);
          const p1 = document.createElement('p');
          const createTime = this.datePipe.transform(item.createTime, 'short');
          p1.innerHTML = createTime;
          div1.appendChild(p1);

          const div2 = document.createElement('div');
          div2.className = 'col-md-1';
          wishListDiv.appendChild(div2);
          const p2 = document.createElement('p');
          p2.innerHTML = item.creator;
          div2.appendChild(p2);

          const div3 = document.createElement('div');
          div3.className = 'col-md-2';
          wishListDiv.appendChild(div3);
          const p3 = document.createElement('p');
          p3.innerHTML = item.bookTitle;
          div3.appendChild(p3);

          const div4 = document.createElement('div');
          div4.className = 'col-md-1';
          wishListDiv.appendChild(div4);
          const p4 = document.createElement('p');
          p4.innerHTML = item.language;
          div4.appendChild(p4);

          const div5 = document.createElement('div');
          div5.className = 'col-md-1';
          wishListDiv.appendChild(div5);
          const p5 = document.createElement('p');
          p5.innerHTML = item.format;
          div5.appendChild(p5);

          const div6 = document.createElement('div');
          div6.className = 'col-md-2';
          wishListDiv.appendChild(div6);
          const p6 = document.createElement('p');
          p6.innerHTML = item.status;
          div6.appendChild(p6);

          const div7 = document.createElement('div');
          div7.className = 'col-md-1 text-center';
          wishListDiv.appendChild(div7);
          const approveLink = document.createElement('button');
          approveLink.className = 'approve-wish btn btn-link';
          approveLink.innerHTML = 'Approve';
          approveLink.style.marginTop = '-10px';
          approveLink.addEventListener('click', this.changeWishStatus.bind(this, item._id, 'Approved'));
          div7.appendChild(approveLink);

          const div8 = document.createElement('div');
          div8.className = 'col-md-1 text-center';
          wishListDiv.appendChild(div8);
          const fulfilLink = document.createElement('button');
          fulfilLink.className = 'fulfil-wish btn btn-link';
          fulfilLink.innerHTML = 'Fulfil';
          fulfilLink.style.marginTop = '-10px';
          fulfilLink.addEventListener('click', this.changeWishStatus.bind(this, item._id, 'Fulfilled'));
          div8.appendChild(fulfilLink);

          const div9 = document.createElement('div');
          div9.className = 'col-md-1 text-center';
          wishListDiv.appendChild(div9);
          const rejectLink = document.createElement('button');
          rejectLink.className = 'reject-wish btn btn-link';
          rejectLink.innerHTML = 'Reject';
          rejectLink.style.marginTop = '-10px';
          rejectLink.addEventListener('click', this.changeWishStatus.bind(this, item._id, 'Rejected'));
          div9.appendChild(rejectLink);

          if (item.status==='Under Review') {
            fulfilLink.disabled = true;
          } else {
            approveLink.disabled = true;
          }
        }
      } else if (wishList && wishList.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.innerHTML = "You haven't submitted any wish yet!";
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.fontSize = 'x-large';
        emptyMessage.style.color = 'gray';
        emptyMessage.style.marginTop = '50px';
        wishListDiv.appendChild(emptyMessage);
      }
    })
  }

  changeWishStatus(wishID: string, newStatus: string) {
    const updateStatusDto = {wishID: wishID, status: newStatus};
    this.bookService.updateWishStatus(updateStatusDto).subscribe((id)=>{
      if (id && id==wishID) {
        this.logger.info(`Success update wish ${wishID} status to ${newStatus}`);
        this.renderWishList();
      }
    })
  }

  ngOnDestroy() {
    const delLinks = document.querySelectorAll('button.approve-wish, fulfil-wish, reject-wish');
    if (delLinks && delLinks.length > 0) {
      for (let i = 0; i < delLinks.length; i++) {
        delLinks[i].replaceWith(delLinks[i].cloneNode(true));
      }
    }
    this.logger.info('Success cleaned all added eventListeners');
  }
}
