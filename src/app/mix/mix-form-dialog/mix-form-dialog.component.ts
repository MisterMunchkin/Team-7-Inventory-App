import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Chemical, ChemicalGroup } from 'src/app/shared/models/chemical';
import { Observable } from 'rxjs';
import { Mix, ChemicalMix } from 'src/app/shared/models/mix';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-mix-form-dialog',
  templateUrl: './mix-form-dialog.component.html',
  styleUrls: ['./mix-form-dialog.component.scss']
})
export class MixFormDialogComponent implements OnInit, AfterViewInit {
  $chemicals: Observable<Array<Chemical>>;
  chemicalGroups: Array<ChemicalGroup> = [];

  selectedChemical: Chemical = {
    name: '',
    type: ''
  };
  selectedPercentage: number = 0;

  mixData: Mix = {
    name: '',
    chemicals: Array<ChemicalMix>()
  };

  constructor(
    public dialogRef: MatDialogRef<MixFormDialogComponent>,
    private fireStore: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: Mix
  ) {
    var ref: AngularFirestoreCollection<Chemical> = this.fireStore.collection<Chemical>('chemicals', ref => ref.orderBy('type'));
    this.$chemicals = ref.valueChanges({idField: 'id'});

    if (data) {
      this.mixData = cloneDeep(data);
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.$chemicals.subscribe(data => {
      console.log(JSON.stringify(data));
      const chemicalType = [... new Set(data.map(d => d.type))];

      chemicalType.forEach(c => {
        const chemicalGroup: ChemicalGroup = {
          name: c,
          chemicals: data.filter(d => d.type === c)
        }

        this.chemicalGroups.push(chemicalGroup);
      })
    });
  }

  addChemical(selectedChemical: Chemical, selectedPercentage: number) {
    if (selectedChemical.name && selectedPercentage && selectedPercentage > 0) {
      const chemicalMix: ChemicalMix = {
        name: selectedChemical.name,
        type: selectedChemical.type,
        percentage: selectedPercentage
      };

      this.mixData.chemicals.push(chemicalMix);

      this.selectedChemical = {
        name: '',
        type: ''
      };

      this.selectedPercentage = 0;
    } else {
      alert("Bruh");
    }
  }

  removeChemical(index: number) {
    this.mixData.chemicals.splice(index, 1);
  }

  save() {
    if (this.mixData.name && this.mixData.chemicals.length > 0) {
      this.dialogRef.close(this.mixData);
    } else {
      alert("Bruh");
    }
  }
}
