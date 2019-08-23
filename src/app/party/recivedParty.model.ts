export class RecivedPartyModel {
  constructor(public id: string,
              public Party: string,
              public user: string,
              public accepted: boolean,
              public groupName: string,
              public userEmail: string[]){}
}
