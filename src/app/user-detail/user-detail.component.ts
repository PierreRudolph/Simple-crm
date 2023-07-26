import { Component, OnInit, inject } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, docData, getDoc, getDocs } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId!: string | null;
  firestore: Firestore = inject(Firestore);
  items$: any;
  user: User = new User();

  constructor(private route: ActivatedRoute
    , public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      this.getUser();
    })
  }

  async getUser() {
    const usersRef = await getDocs(collection(this.firestore, 'users'));

    usersRef.forEach(doc => {
      if (doc.id == this.userId) {
        this.user = new User(doc.data());
      }
    });
  }

  editUserDetail() {
    this.dialog.open(DialogEditUserComponent)
  }

  editUserAddress() {
    this.dialog.open(DialogEditAddressComponent)

  }
}
