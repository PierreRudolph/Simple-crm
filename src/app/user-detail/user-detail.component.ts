import { Component, OnInit, inject } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore, collection, collectionData, deleteDoc, doc, docData, getDoc, getDocs } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId!: any;
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  userRef!: any;

  constructor(private route: ActivatedRoute
    , public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      this.getUser();
    })
  }

  async getUser() {
    let docSnapshot = await getDoc(doc(this.firestore, 'users', this.userId));
    this.user = new User(docSnapshot.data())
    // const usersRef = await getDocs(collection(this.firestore, 'users'))
    // usersRef.forEach(doc => {
    // if (doc.id == this.userId) {
    // this.user = new User(doc.data());
    // return;
    // }
    // });

  }

  async deleteUser() {
    await deleteDoc(doc(this.firestore, 'users', this.userId));
    this.router.navigateByUrl('/user');
  }

  editUserDetail() {
    let dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
    dialog.afterClosed().subscribe(() => {
      this.getUser();
    })

  }

  editUserAddress() {
    let dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
    dialog.afterClosed().subscribe(() => {
      this.getUser();
    })
  }
}
