import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { __param } from 'tslib';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  tooltipPositionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  tooltipPosition = new FormControl(this.tooltipPositionOptions[2]);
  firestore: Firestore = inject(Firestore);
  users$!: Observable<any>;
  allUsers: Array<any> = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSavedUsers();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  async getSavedUsers() {
    //getDocs(collection(firestore, collection-Name)) --holt jedes document aus der gennanten collection.
    const usersRef = await getDocs(collection(this.firestore, 'users'));

    //mit einer forEach schleife wird durch die oben geholte document-sammlung durch iteriert.
    //danach wird der inhalt(doc.data()) jedes documents in das Array allUsers gepusht,
    //und das gerade gepushte document mit der id des jeweiligen documents versehen.
    let i = 0;
    usersRef.forEach(doc => {
      this.allUsers.push(doc.data());
      this.allUsers[i].userId = doc.id;
      console.log(this.allUsers[i]);
      i++;
    });
    console.log(this.allUsers)
  }
}
