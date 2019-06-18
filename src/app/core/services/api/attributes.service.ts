import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Attribute} from '../../models/Attribute';
import {AttributeDefinition} from '../../models/AttributeDefinition';
import {Graph} from '../../models/Graph';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(
    private apiService: ApiService
  ) { }

  getMemberAttribute(memberId: number, urn: string): Observable<Attribute> {
    return this.apiService.get(`json/attributesManager/getAttribute?member=${memberId}&attributeName=${urn}`);
  }

  getVoAttribute(voId: number, urn: string): Observable<Attribute> {
    return this.apiService.get(`json/attributesManager/getAttribute?vo=${voId}&attributeName=${urn}`);
  }

  setVoAttribute(voId: number, attribute: Attribute): Observable<void> {
    return this.apiService.post(`json/attributesManager/setAttribute`, {
      vo: voId,
      attribute: attribute
    });
  }

  getAttributeModulesDependenciesGraphText(format: string): Observable<Graph> {
    return this.apiService.get(`json/attributesManager/getAttributeModulesDependenciesGraphText?format=${format}`);
  }

  getAttributesDefinition(): Observable<AttributeDefinition[]> {
    return this.apiService.get('json/attributesManager/getAttributesDefinition');
  }
}
