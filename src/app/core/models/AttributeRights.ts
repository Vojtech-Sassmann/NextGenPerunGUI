import {Role} from './PerunPrincipal';

export interface AttributeRights {
  attributeId: number;
  role: Role;
  rights: ActionType[];
}

export enum ActionType {
  WRITE = 'WRITE',
  WRITE_VO = 'WRITE_VO',
  WRITE_PUBLIC = 'WRITE_PUBLIC',
  READ = 'READ',
  READ_VO = 'READ_VO',
  READ_PUBLIC = 'READ_PUBLIC',
}
