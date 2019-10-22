import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Attribute} from '../../models/Attribute';
import {AttributeDefinition} from '../../models/AttributeDefinition';
import {Graph} from '../../models/Graph';
import {HttpParams} from '@angular/common/http';
import {AttributeRights} from '../../models/AttributeRights';

export type Entity = 'vo' | 'group' | 'user' | 'member' | 'facility' | 'resource';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(
    private apiService: ApiService
  ) {
  }

  getAttribute(entityId: number, entity: Entity, urn: string, showNotificationOnError = true): Observable<Attribute> {
    return this.apiService.get(`json/attributesManager/getAttribute?${entity}=${entityId}&attributeName=${urn}`,
      new HttpParams(), showNotificationOnError);
  }

  setAttribute(entityId: number, entity: Entity, attribute: Attribute, showNotificationOnError = true): Observable<void> {
    const payload = {};
    payload[entity] = entityId;
    payload['attribute'] = attribute;

    return this.apiService.post(`json/attributesManager/setAttribute`, payload, showNotificationOnError);
  }

  getAttributeModulesDependenciesGraphText(format: string, showNotificationOnError = true): Observable<Graph> {
    return this.apiService.get(`json/attributesManager/getAttributeModulesDependenciesGraphText?format=${format}`,
      new HttpParams(), showNotificationOnError);
  }

  getAttributesDefinition(showNotificationOnError = true): Observable<AttributeDefinition[]> {
    return this.apiService.get('json/attributesManager/getAttributesDefinition',
      new HttpParams(), showNotificationOnError);
  }

  getAllAttributes(entityId: number, entity: Entity, showNotificationOnError = true): Observable<Attribute[]> {
    return this.apiService.get(`json/attributesManager/getAttributes?${entity}=${entityId}`, new HttpParams(), showNotificationOnError);
  }

  deleteAttributes(entityId: number, entity: Entity, attributeIDs: number[], showNotificationOnError = true) {
    const payload = {};
    payload[entity] = entityId;
    payload['attributes'] = attributeIDs;

    return this.apiService.post('json/attributesManager/removeAttributes', payload, showNotificationOnError);
  }

  getAttributeDefinitions(voId: number, entity: string, showNotificationOnError = true): Observable<AttributeDefinition[]> {
    return this.apiService.get(`json/attributesManager/getAttributesDefinitionWithRights?${entity}=${voId}`,
      new HttpParams(), showNotificationOnError);
  }

  setAttributes(entityId: number, entity: Entity, attributes: Attribute[], showNotificationOnError = true): Observable<number> {
    const payload = {};
    payload[entity] = entityId;
    payload['attributes'] = attributes;

    return this.apiService.post('json/attributesManager/setAttributes', payload, showNotificationOnError);
  }

  getAttributes(entityId: number, entity: Entity, attributes: string[], showNotificationOnError = true): Observable<Attribute[]> {
    const payload = {};
    payload[entity] = entityId;
    payload['attrNames'] = attributes;

    return this.apiService.post('json/attributesManager/getAttributes', payload, showNotificationOnError);
  }

  deleteAttributeDefinitions(attributeDefIds: number[], showNotificationOnError = true) {
    const payload = {};
    payload['attributes'] = attributeDefIds;

    return this.apiService.post('json/attributesManager/deleteAttributes', payload, showNotificationOnError);
  }

  createAttributeDefinition(attrDef: AttributeDefinition, showNotificationOnError = true): Observable<AttributeDefinition> {
    const payload = {};
    payload['attribute'] = attrDef;

    return this.apiService.post('json/attributesManager/createAttribute', payload, showNotificationOnError);
  }

  setAttributesRights(rights: AttributeRights[], showNotificationOnError = true) {
    const payload = {};
    payload['rights'] = rights;

    return this.apiService.post('json/attributesManager/setAttributeRights', payload, showNotificationOnError);
  }
}

