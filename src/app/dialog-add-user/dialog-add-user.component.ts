import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore'
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    const usersCollection = collection(this.firestore, 'users');
    setDoc(doc(usersCollection), this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });

  }
}
