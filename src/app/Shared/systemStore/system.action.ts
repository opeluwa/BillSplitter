import {Action} from '@ngrx/store';

export const CONNECTION_UPDATE = '[SYTEM] CONNECTION_UPDATE';


export class connectionUpdate implements Action {
  readonly type = CONNECTION_UPDATE;
  constructor(public payload: boolean) {}
}

export type systemAction = connectionUpdate;
