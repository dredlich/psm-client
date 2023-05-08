import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import * as moment from 'moment';
import { Product } from '../../model/product';
import { ActivatedRoute } from '@angular/router';
import { PsmApiServiceClient } from '../../service/psm.api.service';
import { Items } from '../../model/items';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private psmServiceClient: PsmApiServiceClient
  ) { }

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  @ViewChild(MatTable) productTable: MatTable<Product>;
  startDate = new UntypedFormControl(moment([2017, 0, 1]));
  mittelListe: Array<Product> = [];
  topTenMittelGefahren: Array<Product> = [];
  topTenMittelAuflagen: Array<Product> = [];

  ngOnInit(): void {
    this.psmServiceClient.getProduct(this.startDate).subscribe((data: Items) => {
      if (null != data && null != data.items && 0 < data.items.length) {
        this.mittelListe = data.items;
      }
    });
    this.psmServiceClient.getTopTenHinweise().subscribe((data: Items) => {

      const itemCount = data.items.reduce((p, item) => {
        const idx = this.getIndexViaPropertyValueString(p, 'kennr', item.kennr, null);
        if (-1 === idx) {
          item.count = 0;
          p.push(item);
        }
        else{
          p[idx].count++;
        }
        return p;
      }, []);

      itemCount.sort((a, b) => (a.count < b.count) ? 1 : -1);
      let i = 10;
      const kennrList = [];
      while (i > 0){
        const nr = itemCount[i].kennr;
        kennrList.push(nr);
        i--;
      }

      // tslint:disable-next-line:no-shadowed-variable
      this.psmServiceClient.getMittelByKennrList(kennrList).subscribe((data: Items) => {
        this.topTenMittelGefahren = data.items;
      });
    });
    this.psmServiceClient.getTopTenAuflagen().subscribe((data: Items) => {
      const itemCount = data.items.reduce((p, item) => {
        const idx = this.getIndexViaPropertyValueString(p, 'ebene', item.ebene.substring(0, 9), [0, 9]);
        if (-1 === idx) {
          item.count = 0;
          p.push(item);
        }
        else{
          p[idx].count++;
        }
        return p;
      }, []);

      itemCount.sort((a, b) => (a.count < b.count) ? 1 : -1);

      let i = 10;
      const kennrList = [];
      while (i > 0){
        const nr = itemCount[i].ebene.substring(0, 9);
        kennrList.push(nr);
        i--;
      }
      // tslint:disable-next-line:no-shadowed-variable
      this.psmServiceClient.getMittelByKennrList(kennrList).subscribe((data: Items) => {
        this.topTenMittelAuflagen = data.items;
      });
    });
  }
  // tslint:disable-next-line:typedef
  handleDateChange() {
    return this.psmServiceClient.getProduct(this.startDate).subscribe((data: Items) => {
      this.mittelListe = data.items;
    });
  }

  getIndexViaPropertyValueString(list: [], propertyName: string, value: string, substringStartEnd: Array<number>): number{
    let idx = -1;
    const isSubstringCheck = null != substringStartEnd;

    if (isSubstringCheck) {
      const startIdx: number  = substringStartEnd[0];
      const endIdx: number = substringStartEnd[1];
      let checkValue: string;
      for (let i = 0; i < list.length; i++) {
        checkValue = list[i][propertyName];
        if (value === checkValue.substring(startIdx, endIdx)) {
          idx = i;
          break;
        }
      }
    }
    else{
      for (let i = 0; i < list.length; i++) {
        if (value === list[i][propertyName]) {
          idx = i;
          break;
        }
      }
    }
    return idx;
  }

}
