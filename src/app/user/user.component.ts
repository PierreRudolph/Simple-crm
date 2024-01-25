import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, getDocs, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { __param } from 'tslib';
import { doc, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  tooltipPositionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  tooltipPosition = new FormControl(this.tooltipPositionOptions[2]);
  firestore: Firestore = inject(Firestore);
  allUsers: Array<any> = [];
  // i: any;
  // snapUserId: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSavedUsers();

  }


  openDialog() {
    let dialog = this.dialog.open(DialogAddUserComponent);
    dialog.afterClosed().subscribe(() => {
      this.getSavedUsers();
    })
  }

  async getSavedUsers() {
    let i = 0;
    this.allUsers = [];
    const querySnapshot = await getDocs(collection(this.firestore, "users"));
    querySnapshot.forEach((doc) => {
      this.allUsers.push(doc.data());
      this.allUsers[i].userId = doc.id;
      i++
    });
  }
}

