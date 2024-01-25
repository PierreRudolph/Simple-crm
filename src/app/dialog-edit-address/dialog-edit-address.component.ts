import { Component, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: any;
  userId: any;
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  async saveUser() {

    this.loading = true;
    const docRef = doc(this.firestore, 'users', this.userId)
    setDoc(docRef, this.user.toJSON(), { merge: true })
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });


  }
}
