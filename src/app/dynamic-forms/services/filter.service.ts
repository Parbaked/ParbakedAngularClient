import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DynamicFormData } from '../dtos/dynamic-form-data';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  filterFields(record: any, form: FormGroup, formDef: DynamicFormData) {
    formDef.tabs.forEach((tab) => {
      tab.sections.forEach((section) => {
        if (section.sectionType == 'fields') {
          section.rows.forEach((row) => {
            row.columns.forEach((column) => {
              if (column.control != null) {
                if (column.control.inputType == 'phone') {
                  var number = record[column.control.dataField];
                  var transformed = this.transformPhone(number);
                  if (number != transformed) {
                    var patch = {};
                    patch[column.control.dataField] = transformed;
                    form.patchValue(patch);
                  }
                }
              }
            });
          });
        }
      });
    });
  }

  transformPhone(tel) {
    var value = tel.toString().trim().replace('-', '');

    // if (value.match(/[^0-9]/)) {
    //   return tel;
    // }

    var country, city, number;

    switch (value.length) {
      case 10: // +1PPP####### -> C (PPP) ###-####
        country = 1;
        city = value.slice(0, 3);
        number = value.slice(3);
        break;

      case 11: // +CPPP####### -> CCC (PP) ###-####
        country = value[0];
        city = value.slice(1, 4);
        number = value.slice(4);
        break;

      case 12: // +CCCPP####### -> CCC (PP) ###-####
        country = value.slice(0, 3);
        city = value.slice(3, 5);
        number = value.slice(5);
        break;

      default:
        return tel;
    }

    if (country == 1) {
      country = '';
    }

    number = number.slice(0, 3) + '-' + number.slice(3);

    return (country + ' (' + city + ') ' + number).trim();
  }
}
