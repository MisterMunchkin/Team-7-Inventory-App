import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Chemical } from '../shared/models/chemical';
import { ChemicalMix, Mix } from '../shared/models/mix';
import { MixFormDialogComponent } from './mix-form-dialog/mix-form-dialog.component';

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})
export class MixComponent implements OnInit {
  $mixes: Observable<Array<Mix>>;
  mixes: Array<Mix> = [];

  constructor(
    private dialog: MatDialog,
    private fireStore: AngularFirestore
  ) {
    const ref: AngularFirestoreCollection<Mix> = this.fireStore.collection('mix');
    this.$mixes = ref.valueChanges({idField: 'id'})
  }

  ngOnInit(): void {
    this.$mixes.subscribe(mixes => {
      this.mixes = mixes;
    });
  }

  addDialog() {
    const dialogRef = this.dialog.open(MixFormDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.fireStore.collection<Mix>('mix').add(result);
      }
    });
  }

  editMix(mix: Mix) {
    const dialogRef = this.dialog.open(MixFormDialogComponent, {
      width: '600px',
      data: mix
    });

    dialogRef.afterClosed().subscribe((result: Mix) => {
      if (result) {
        this.fireStore.collection<Mix>('mix').doc(result.id).update(result);
      }
    })
  }

  getTotalPercentage(chemicals: Array<ChemicalMix>) {
    let total = 0;
    chemicals.forEach(c => {
      total += c.percentage;
    });

    return total;
  }

  removeMix(mix: Mix) {
    this.fireStore.collection('mix').doc(mix.id).delete();
  }
}
