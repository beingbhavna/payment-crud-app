//bind the corresponding properties from the paymentapi

export class PaymentDetail {
  paymentDetailId: number = 0;
  cardOwnerName: string = ''; //initialize a property with string
  cardNumber: string = '';
  expirationDate: string = '';
  securityCode: string = '';
}
