import { Component, OnDestroy, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Librarian } from '../../common/lib.dto';

@Component({
  selector: 'app-account-manage',
  templateUrl: './account-manage.component.html',
  styleUrls: ['./account-manage.component.css']
})
export class AccountManageComponent implements OnInit, OnDestroy {

  constructor(
    private libAuthService: LibrarianAuthService,
    private logger: NGXLogger,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit() {
    //Get the admin list from database, otherwise set with empty array
    let adminList: Librarian[];
    let libList: Librarian[];
    let adminName = this.tokenService.getUsername().slice(3,);
    this.libAuthService.getAllAdmin().subscribe((data: []) => {
      if (data && data.length > 0) {
        adminList = [].concat(data);

        const adminBlock = document.querySelector('div.admin-block');
        if (adminBlock) {
          for (const item of adminList) {
            //Add new line for this admin user
            let rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            adminBlock.appendChild(rowDiv);

            //Add admin user id field
            let colDiv1 = document.createElement('div');
            colDiv1.className = 'col-md-2';
            let p1 = document.createElement('p');
            p1.className = 'col-content';
            p1.innerHTML = item._id;
            colDiv1.appendChild(p1);
            rowDiv.appendChild(colDiv1);

            //Add admin username field
            let colDiv2 = document.createElement('div');
            colDiv2.className = 'col-md-2';
            let p2 = document.createElement('p');
            p2.className = 'col-content';
            p2.innerHTML = item.username;
            colDiv2.appendChild(p2);
            rowDiv.appendChild(colDiv2);

            //Add admin user create date field
            let colDiv3 = document.createElement('div');
            colDiv3.className = 'col-md-2';
            let p3 = document.createElement('p');
            p3.className = 'col-content';
            p3.innerHTML = item.registerDate.toLocaleString().slice(0, 10);
            colDiv3.appendChild(p3);
            rowDiv.appendChild(colDiv3);

            //Add active status field
            let colDiv4 = document.createElement('div');
            colDiv4.className = 'col-md-1';
            let p4 = document.createElement('p');
            p4.className = 'col-content';
            p4.innerHTML = item.isActive ? 'True' : 'False';
            colDiv4.appendChild(p4);
            rowDiv.appendChild(colDiv4);

            //Add profile review link
            let colDiv5 = document.createElement('div');
            colDiv5.className = 'col-md-2';
            let a1 = document.createElement('a');
            a1.className = 'col-content';
            a1.href = `/lib/profile/${item._id}`;
            a1.innerHTML = 'Review Profile';
            colDiv5.appendChild(a1);
            rowDiv.appendChild(colDiv5);

            //Add profile update link
            let colDiv6 = document.createElement('div');
            colDiv6.className = 'col-md-2';
            let a2 = document.createElement('a');
            a2.className = 'col-content';
            a2.href = `/lib/update/${item._id}`;
            a2.innerHTML = 'Update Profile';
            colDiv6.appendChild(a2);
            rowDiv.appendChild(colDiv6);

            //Add account delete link for non-self or non-rootuser (Admin)
            if (item.username !== adminName && item.username !== 'Admin') {
              let colDiv7 = document.createElement('div');
              colDiv7.className = 'col-md-1';
              let a3 = document.createElement('a');
              a3.className = 'col-content delete-link';
              a3.addEventListener('click', this.libDelete.bind(item._id));
              a3.innerHTML = 'Delete';
              colDiv7.appendChild(a3);
              rowDiv.appendChild(colDiv7);
            }
          }
          this.logger.info('Success generate admin account management block')
        } else {
          this.logger.warn('Can not find div.admin-block object in webpage');
        }
      }
    });
    //Get the librarian list from database, otherwise set with empty array
    this.libAuthService.getAllLib().subscribe((data: []) => {
      if (data && data.length > 0) {
        libList = [].concat(data);

        const libBlock = document.querySelector('div.lib-block');
        if (libBlock) {
          for (const item of libList) {
            //Add new line for this librarian user
            let rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            libBlock.appendChild(rowDiv);

            //Add librarian user id field
            let colDiv1 = document.createElement('div');
            colDiv1.className = 'col-md-2';
            let p1 = document.createElement('p');
            p1.className = 'col-content id';
            p1.innerHTML = item._id;
            colDiv1.appendChild(p1);
            rowDiv.appendChild(colDiv1);

            //Add librarian username field
            let colDiv2 = document.createElement('div');
            colDiv2.className = 'col-md-2';
            let p2 = document.createElement('p');
            p2.className = 'col-content';
            p2.innerHTML = item.username;
            colDiv2.appendChild(p2);
            rowDiv.appendChild(colDiv2);

            //Add librarian user create date field
            let colDiv3 = document.createElement('div');
            colDiv3.className = 'col-md-2';
            let p3 = document.createElement('p');
            p3.className = 'col-content';
            p3.innerHTML = item.registerDate.toLocaleString().slice(0, 10);
            colDiv3.appendChild(p3);
            rowDiv.appendChild(colDiv3);

            //Add librarian user active status field
            let colDiv4 = document.createElement('div');
            colDiv4.className = 'col-md-1';
            let p4 = document.createElement('p');
            p4.className = 'col-content status';
            p4.innerHTML = item.isActive ? 'Active' : 'Inactive';
            colDiv4.appendChild(p4);
            rowDiv.appendChild(colDiv4);

            //Add librarian profile review link 
            let colDiv5 = document.createElement('div');
            colDiv5.className = 'col-md-2';
            let a1 = document.createElement('a');
            a1.className = 'col-content';
            a1.href = `/lib/profile/${item._id}`;
            a1.innerHTML = 'Review Profile';
            colDiv5.appendChild(a1);
            rowDiv.appendChild(colDiv5);

            //Add librarian profile update link 
            let colDiv6 = document.createElement('div');
            colDiv6.className = 'col-md-2';
            let a2 = document.createElement('a');
            a2.className = 'col-content';
            a2.href = `/lib/update/${item._id}`;
            a2.innerHTML = 'Update Profile';
            colDiv6.appendChild(a2);
            rowDiv.appendChild(colDiv6);

            //Add librarian account delete link 
            let colDiv7 = document.createElement('div');
            colDiv7.className = 'col-md-1';
            let a3 = document.createElement('a');
            a3.className = 'col-content delete-link';
            a3.addEventListener("click", this.libDelete);
            a3.innerHTML = 'Delete';
            colDiv7.appendChild(a3);
            rowDiv.appendChild(colDiv7);

          }
          this.logger.info('Success generate librarian account management block')
        } else {
          this.logger.warn('Can not find div.lib-block object in webpage');
        }
      }
    });
  }

  libDelete = () => {
    if (window.confirm('Do you relly want to delete this account?')) {
      const deleteLink = window.event.target as HTMLElement;
      const libID = deleteLink.parentElement.parentElement.querySelector('p.id').innerHTML
      //Invoke backend api to delete user from database, then update account status
      this.libAuthService.deleteLib(libID).subscribe((data) => {
        console.log(data);
        if (data) {
          deleteLink.parentElement.parentElement.querySelector('p.status').innerHTML = 'Deleted'
          deleteLink.style.visibility = 'hidden';
          this.logger.info(`Success delete the lib ${libID}`);
        } else {
          this.logger.warn('Server delete lib failed');
        }
      });
    }
  }

ngOnDestroy() {
  const deleteLinks = document.querySelectorAll('a.delete-link');
  if (deleteLinks && deleteLinks.length > 0) {
    for (let i = 0; i < deleteLinks.length; i++) {
      deleteLinks[i].replaceWith(deleteLinks[i].cloneNode(true));
    }
  }
  this.logger.info('Success cleaned all eventListeners added by account-manage component');
}


}
