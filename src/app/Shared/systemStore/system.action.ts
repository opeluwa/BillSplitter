import {Action} from '@ngrx/store';

export const CONNECTION_UPDATE = '[SYSTEM] CONNECTION_UPDATE';
export const HEADER_COLLAPSE_UPDATE = '[SYSTEM] HEADER_COLLAPSE_UPDATE';

export class connectionUpdate implements Action {
  readonly type = CONNECTION_UPDATE;
  constructor(public payload: boolean) {}
}

export class headerCollapseUpdate implements Action {
  readonly type = HEADER_COLLAPSE_UPDATE;
  constructor(public payload: boolean) {}
}

export type systemAction = connectionUpdate | headerCollapseUpdate;
