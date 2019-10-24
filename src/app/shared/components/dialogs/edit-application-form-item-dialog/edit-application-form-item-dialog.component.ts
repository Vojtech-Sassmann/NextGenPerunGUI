import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApplicationFormItem} from '../../../../core/models/ApplicationFormItem';
import {RegistrarService} from '../../../../core/services/api/registrar.service';
import {AttributesService} from '../../../../core/services/api/attributes.service';
import {AttributeDefinition} from '../../../../core/models/AttributeDefinition';
import {TranslateService} from '@ngx-translate/core';
import {Group} from '../../../../core/models/Group';

export interface EditApplicationFormItemDialogComponentData {
  voId: number;
  group: Group;
  applicationFormItem: ApplicationFormItem;
  applicationFormItems: ApplicationFormItem[];
}

export class SelectionItem {
  value: string;
  displayName: string;

  constructor(displayName: string, value: string) {
    this.value = value;
    this.displayName = displayName;
  }
}

@Component({
  selector: 'app-edit-application-form-item-dialog',
  templateUrl: './edit-application-form-item-dialog.component.html',
  styleUrls: ['./edit-application-form-item-dialog.component.scss']
})
export class EditApplicationFormItemDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditApplicationFormItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EditApplicationFormItemDialogComponentData,
              private registrarService: RegistrarService,
              private attributesService: AttributesService,
              private translateService: TranslateService) { }

  applicationFormItem: ApplicationFormItem;
  attributeDefinitions: AttributeDefinition[];
  federationAttributes: SelectionItem[] = [];
  federationAttribute = '';
  sourceAttributes: SelectionItem[] = [];
  destinationAttributes: SelectionItem[] = [];
  optionsEn: [string, string][] = [];
  optionsCs: [string, string][] = [];


  ngOnInit() {
    this.applicationFormItem = this.data.applicationFormItem;
    this.attributesService.getAttributesDefinition().subscribe( attributeDefinitions => {
      this.attributeDefinitions = attributeDefinitions;
      this.getDestinationAndSourceAttributes();
    });
    this.getFederationAttributes();
    this.getFederationAttribute();
    if (this.applicationFormItem.perunDestinationAttribute === null) {
      this.applicationFormItem.perunDestinationAttribute = '';
    }
    if (this.applicationFormItem.perunSourceAttribute === null) {
      this.applicationFormItem.perunSourceAttribute = '';
    }
    this.getOptions();
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.updateOptions();
    for (const item of this.data.applicationFormItems) {
      if (item.id === this.applicationFormItem.id) {
        this.data.applicationFormItems[item.ordnum] = this.applicationFormItem;
        break;
      }
    }
    if (this.data.group) {      // if the dialog is for group
      this.registrarService.updateFormItemsForGroup(this.data.group.id, this.data.applicationFormItems).subscribe( () => {
        this.dialogRef.close(true);
      });
    } else {
      this.registrarService.updateFormItemsForVo(this.data.voId, this.data.applicationFormItems).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onChangingType(type: string) {
    if (this.applicationFormItem.applicationTypes.includes(type)) {
      const index = this.applicationFormItem.applicationTypes.indexOf(type);
      this.applicationFormItem.applicationTypes.splice(index, 1);
    } else {
      this.applicationFormItem.applicationTypes.push(type);
    }
  }

  getDestinationAndSourceAttributes() {
    this.translateService.get('DIALOGS.APPLICATION_FORM_EDIT_ITEM.NO_SELECTED_ITEM').subscribe( noItem => {
      this.sourceAttributes.push(new SelectionItem(noItem, ''));
      this.destinationAttributes.push(new SelectionItem(noItem, ''));
    });

    for (const attribute of this.attributeDefinitions) {
      if (attribute.entity.toLowerCase() === 'user' || attribute.entity.toLowerCase() === 'member') {
        // add only member and user attributes
        this.sourceAttributes.push(
          new SelectionItem(attribute.friendlyName + ' (' + attribute.entity + ' / ' + this.getDefinition(attribute) + ')',
            attribute.namespace + ':' + attribute.friendlyName)
        );
        this.destinationAttributes.push(
          new SelectionItem(attribute.friendlyName + ' (' + attribute.entity + ' / ' + this.getDefinition(attribute) + ')',
            attribute.namespace + ':' + attribute.friendlyName)
        );
      } else if (attribute.entity.toLowerCase() === 'vo') {
        // source attributes can be VO too
        this.sourceAttributes.push(
          new SelectionItem(attribute.friendlyName + ' (' + attribute.entity + ' / ' + this.getDefinition(attribute) + ')',
            attribute.namespace + ':' + attribute.friendlyName)
        );
      } else if (attribute.entity.toLowerCase() === 'group' && this.data.group) {
        // if dialog is for group
        this.sourceAttributes.push(
          new SelectionItem(attribute.friendlyName + ' (' + attribute.entity + ' / ' + this.getDefinition(attribute) + ')',
            attribute.namespace + ':' + attribute.friendlyName)
        );
      }
    }
  }

  getFederationAttributes() {
    this.translateService.get('DIALOGS.APPLICATION_FORM_EDIT_ITEM.NO_SELECTED_ITEM').subscribe( noItem => {
      this.federationAttributes.push(new SelectionItem(noItem, ''));
      this.translateService.get('DIALOGS.APPLICATION_FORM_EDIT_ITEM.CUSTOM_VALUE').subscribe( custom => {
        this.federationAttributes.push(new SelectionItem(custom, 'custom'));
        this.federationAttributes.push(new SelectionItem('Display name', 'displayName'));
        this.federationAttributes.push(new SelectionItem('Common name', 'cn'));
        this.federationAttributes.push(new SelectionItem('Mail', 'mail'));
        this.federationAttributes.push(new SelectionItem('Organization', 'o'));
        this.federationAttributes.push(new SelectionItem('Level of Assurance (LoA)', 'loa'));
        this.federationAttributes.push(new SelectionItem('First name', 'givenName'));
        this.federationAttributes.push(new SelectionItem('Surname', 'sn'));
        this.federationAttributes.push(new SelectionItem('EPPN', 'eppn'));
        this.federationAttributes.push(new SelectionItem('IdP Category', 'md_entityCategory'));
        this.federationAttributes.push(new SelectionItem('IdP Affiliation', 'affiliation'));
        this.federationAttributes.push(new SelectionItem('EduPersonScopedAffiliation', 'eduPersonScopedAffiliation'));
        this.federationAttributes.push(new SelectionItem('Forwarded Affiliation from Proxy', 'forwardedScopedAffiliation'));
        this.federationAttributes.push(new SelectionItem('schacHomeOrganization', 'schacHomeOrganization'));
        this.federationAttributes.push(new SelectionItem('Login', 'uid'));
        this.federationAttributes.push(new SelectionItem('Alternative login name', 'alternativeLoginName'));
      });
    });
  }

  getFederationAttribute() {
    if (this.applicationFormItem.federationAttribute) {
      for (const attribute of this.federationAttributes) {
        if (attribute.value === this.applicationFormItem.federationAttribute) {
          this.federationAttribute = attribute.value;
          return;
        }
      }
      this.federationAttribute = 'custom';
    }
  }

  federationAttributeschanged() {
    if (this.federationAttribute !== 'custom') {
      this.applicationFormItem.federationAttribute = this.federationAttribute;
    } else {
      this.applicationFormItem.federationAttribute = '';
    }
  }

  private getDefinition(attribute: AttributeDefinition) {
    const temp = attribute.namespace.split(':');
    if (temp[4] === null ) {
      return 'null';
    }
    return temp[4];
  }

  addEnOption() {
    this.optionsEn.push(['', '']);
  }

  addCsOption() {
    this.optionsCs.push(['', '']);
  }

  updateOptions() {
    let enOptions = '';
    for (const item of this.optionsEn) {
      if (item[0] !== '' && item[1] !== '') {
        if (enOptions === '') {
          enOptions = item[0] + '#' + item[1];
        } else {
          enOptions = enOptions + '|' + item[0] + '#' + item[1];
        }
      }
    }
    this.applicationFormItem.i18n['en'].options = enOptions;

    let csOptions = '';
    for (const item of this.optionsCs) {
      if (item[0] !== '' && item[1] !== '') {
        if (csOptions === '') {
          csOptions = item[0] + '#' + item[1];
        } else {
          csOptions = csOptions + '|' + item[0] + '#' + item[1];
        }
      }
    }
    this.applicationFormItem.i18n['cs'].options = csOptions;
  }

  private getOptions() {
    if (this.applicationFormItem.i18n['en'].options) {
      const tempen = this.applicationFormItem.i18n['en'].options.split('|');
      for (const item of tempen) {
        const line = item.split('#');
        this.optionsEn.push([line[0], line[1]]);
      }
    }
    if (this.applicationFormItem.i18n['cs'].options) {
      const tempcs = this.applicationFormItem.i18n['cs'].options.split('|');
      for (const item of tempcs) {
        const line = item.split('#');
        this.optionsCs.push([line[0], line[1]]);
      }
    }
  }

  sortEnOptionsAZ() {
    this.optionsEn = this.optionsEn.sort((n1, n2) => {
      if (n1[1] > n2[1]) {
        return 1;
      }

      if (n1[1] < n2[1]) {
        return -1;
      }

      return 0;
    });
  }

  sortEnOptionsZA() {
    this.optionsEn = this.optionsEn.sort((n1, n2) => {
      if (n1[1] > n2[1]) {
        return -1;
      }

      if (n1[1] < n2[1]) {
        return 1;
      }

      return 0;
    });
  }

  sortCsOptionsZA() {
    this.optionsCs = this.optionsCs.sort((n1, n2) => {
      if (n1[1] > n2[1]) {
        return -1;
      }

      if (n1[1] < n2[1]) {
        return 1;
      }

      return 0;
    });
  }

  sortCsOptionsAZ() {
    this.optionsCs = this.optionsCs.sort((n1, n2) => {
      if (n1[1] > n2[1]) {
        return 1;
      }

      if (n1[1] < n2[1]) {
        return -1;
      }

      return 0;
    });
  }
}
