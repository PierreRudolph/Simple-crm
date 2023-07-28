import { Component, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user!: any;
  userId!: any;
  loading: boolean = false;
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    const docRef = doc(this.firestore, 'users', this.userId);

    setDoc(docRef, this.user.toJSON(), { merge: true })
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });
  }
}
