export class RecivedPartyModel {
  constructor(public id: string,
              public Party: any,
              public user: string,
              public accepted: boolean,
              public groupName: string,
              public userEmail: string[]){}
}
