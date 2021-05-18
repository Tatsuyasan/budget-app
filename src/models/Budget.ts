import * as localStorage from '@/services/device/localStorage';

const BUDGET_KEY = 'user';

export interface Budget {
  month: string;
  year: number;
  startMoney: number;
  salary: number;
  fixedCharges: Charge[];
  variableCharges: Charge[];
  outstandingAmount: number;
  outstandingAmountLastMonth: number;
  leftovers: number;
  leftoversWithoutVariableCharges: number;
}

export interface Charge {
  name: string;
  value: number;
}
