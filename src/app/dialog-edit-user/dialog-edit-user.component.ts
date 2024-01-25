import { Component, ViewChild, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user!: User;
  userId!: any;
  loading: boolean = false;
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);

  @ViewChild(UserDetailComponent)
  UserDetailComponent!: UserDetailComponent;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  saveUser() {

    this.loading = true;
    const docRef = doc(this.firestore, 'users', this.userId)
    setDoc(docRef, this.user.toJSON(), { merge: false })
      .then(() => {
        if (this.birthDate) {
          this.user.birthDate = this.birthDate.toLocaleDateString();
        }
        console.log(this.UserDetailComponent)

        this.loading = false;
        this.dialogRef.close();
      });
  }
}
