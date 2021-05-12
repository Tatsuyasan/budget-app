import * as localStorage from '@/services/device/localStorage';

const BUDGET_KEY = 'user';

export default class Budget {
  currentMoney: number | null;
  salary: number | null;
  fixedCharges: number | null;
  charges: number | null;
  outstandingAmount: number | null;

  constructor(
    prmCurrentMoney: number | null,
    prmSalary: number | null,
    prmFixedCharges: number | null,
    prmCharges: number | null,
    prmOutstandingAmount: number | null
  ) {
    this.currentMoney = prmCurrentMoney;
    this.salary = prmSalary;
    this.fixedCharges = prmFixedCharges;
    this.charges = prmCharges;
    this.outstandingAmount = prmOutstandingAmount;
  }

//   get id(): string {
//     return this._id;
//   }

//   get firstname(): string {
//     return this._firstname;
//   }

  public async save(): Promise<void> {
    await localStorage.set(BUDGET_KEY, JSON.stringify(this));
  }

  public static clear(): void {
    localStorage.remove(BUDGET_KEY);
  }
}
