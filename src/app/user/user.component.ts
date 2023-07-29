import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
//import { Firestore, collection, getDocs, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { __param } from 'tslib';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  tooltipPositionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  tooltipPosition = new FormControl(this.tooltipPositionOptions[2]);
  //firestore: Firestore = inject(Firestore);
  users$!: Observable<any>;
  allUsers: Array<any> = [];
  testFirestore!: AngularFirestoreDocument<any>;

  constructor(public dialog: MatDialog, private db: AngularFirestore) {
    this.testFirestore = this.db.doc('users');
    console.log(this.testFirestore)
  }

  ngOnInit(): void {
    this.getSavedUsers();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  async getSavedUsers() {
    let i = 0;

    // const querySnapshot = await getDocs(collection(this.firestore, "users"));
    // querySnapshot.forEach((doc) => {
    //   this.allUsers.push(doc.data());
    //   this.allUsers[i].userId = doc.id;
    //   i++
    // });

  }
}
