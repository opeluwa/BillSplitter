export class PaidModel {
  constructor(public id: number,
              public billName: string,
              public billUsers: any[],
              public cost: number,
              public dateCreated: number,
              public dateDue: number,
              public partyId: number,
              public description: string,
              public numOfPayers: number,
              public imagePath: string) {}
}
