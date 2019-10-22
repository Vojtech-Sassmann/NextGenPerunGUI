import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {NotificatorService} from '../../../../core/services/common/notificator.service';
import {TranslateService} from '@ngx-translate/core';
import {AttributesService} from '../../../../core/services/api/attributes.service';
import {AttributeDefinition} from '../../../../core/models/AttributeDefinition';
import {ActionType, AttributeRights} from '../../../../core/models/AttributeRights';
import {Role} from '../../../../core/models/PerunPrincipal';

@Component({
  selector: 'app-create-attribute-definition-dialog',
  templateUrl: './create-attribute-definition-dialog.component.html',
  styleUrls: ['./create-attribute-definition-dialog.component.scss']
})
export class CreateAttributeDefinitionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateAttributeDefinitionDialogComponent>,
              private notificator: NotificatorService,
              private translate: TranslateService,
              private attributeService: AttributesService) {
  }

  attDef: AttributeDefinition;
  entities: string[] = ['facility', 'resource', 'group', 'group_resource', 'host', 'member', 'member_group',
    'member_resource', 'user', 'user_ext_source', 'user_facility', 'vo', 'entityless'];

  definitionTypes: string[] = ['def', 'opt', 'virt'];
  definitionType = '';

  valueTypes: string[] = ['String', 'Integer', 'Boolean', 'Array', 'LinkedHashMap', 'LargeString', 'LargeArrayList'];
  valueType = '';

  readSelf = false;
  readSelfPublic = false;
  readSelfVo = false;
  readVo = false;
  readGroup = false;
  readFacility = false;

  writeSelf = false;
  writeSelfPublic = false;
  writeSelfVo = false;
  writeVo = false;
  writeGroup = false;
  writeFacility = false;

  ngOnInit() {
    this.attDef = {
      baseFriendlyName: '',
      beanName: '',
      description: '',
      displayName: '',
      entity: '',
      friendlyName: '',
      friendlyNameParameter: '',
      id: undefined,
      namespace: '',
      type: '',
      unique: false,
      writable: false,
    };
  }

  onSubmit() {
    this.attDef.namespace = 'urn:perun:' + this.attDef.entity + ':attribute-def:' + this.definitionType;
    this.readValueType();
    this.attributeService.createAttributeDefinition(this.attDef).subscribe(attDef => {
      this.attDef = attDef;
      this.attributeService.setAttributesRights(this.readRights()).subscribe(() => {
        this.translate.get('DIALOGS.CREATE_ATTRIBUTE_DEFINITION.SUCCESS').subscribe(successMessage => {
          this.notificator.showSuccess(successMessage);
          this.dialogRef.close(true);
        });
      });
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  readRights(): AttributeRights[] {
    const list: AttributeRights[] = [];

    if (this.readSelf) {
      list.push(this.generateRights(Role.SELF, ActionType.READ));
    }
    if (this.readSelfPublic) {
      list.push(this.generateRights(Role.SELF, ActionType.READ_PUBLIC));
    }
    if (this.readSelfVo) {
      list.push(this.generateRights(Role.SELF, ActionType.READ_VO));
    }
    if (this.readVo) {
      list.push(this.generateRights(Role.VOADMIN, ActionType.READ));
    }
    if (this.readGroup) {
      list.push(this.generateRights(Role.GROUPADMIN, ActionType.READ));
    }
    if (this.readFacility) {
      list.push(this.generateRights(Role.FACILITYADMIN, ActionType.READ));
    }

    if (this.writeSelf) {
      list.push(this.generateRights(Role.SELF, ActionType.WRITE));
    }
    if (this.writeSelfPublic) {
      list.push(this.generateRights(Role.SELF, ActionType.WRITE_PUBLIC));
    }
    if (this.writeSelfVo) {
      list.push(this.generateRights(Role.SELF, ActionType.WRITE_VO));
    }
    if (this.writeVo) {
      list.push(this.generateRights(Role.VOADMIN, ActionType.WRITE));
    }
    if (this.writeGroup) {
      list.push(this.generateRights(Role.GROUPADMIN, ActionType.WRITE));
    }
    if (this.writeFacility) {
      list.push(this.generateRights(Role.FACILITYADMIN, ActionType.WRITE));
    }

    return list;
  }

  readValueType() {
    switch (this.valueType) {
      case 'String': {
        this.attDef.type = 'java.lang.String';
        break;
      }
      case 'Integer': {
        this.attDef.type = 'java.lang.Integer';
        break;
      }
      case 'Boolean': {
        this.attDef.type = 'java.lang.Boolean';
        break;
      }
      case 'Array': {
        this.attDef.type = 'java.util.ArrayList';
        break;
      }
      case 'LinkedHashMap': {
        this.attDef.type = 'java.util.LinkedHashMap';
        break;
      }
      case 'LargeString': {
        this.attDef.type = 'java.lang.LargeString';
        break;
      }
      case 'LargeArrayList': {
        this.attDef.type = 'java.util.LargeArrayList';
        break;
      }
    }
  }

  disableConfirmButton(): boolean {
    return (this.attDef.friendlyName === '' || this.attDef.displayName === '' || this.attDef.description === '' ||
      this.attDef.entity === '' || this.definitionType === '' || this.valueType === '');
  }

  disableUniqueToggle(): boolean {
    if (this.definitionType === 'virt' || this.attDef.entity === 'entityless') {
      this.attDef.unique = false;
      return true;
    } else {
      return false;
    }
  }

  private generateRights(role: Role, right: ActionType): AttributeRights {
    const rights = {} as AttributeRights;
    rights.attributeId = this.attDef.id;
    rights.role = role;
    rights.rights = [right];
    return rights;
  }

}
