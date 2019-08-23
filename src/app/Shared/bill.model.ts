export class BillModel {
  constructor(public Id: number,
              public billName: string,
              public cost: number,
              public dateCreated: number,
              public dateDue: number,
              public partyId: number,
              public userId: boolean,
              public description: string,
              public numOfPayers: number,
              public imagePath: string) {}

}
