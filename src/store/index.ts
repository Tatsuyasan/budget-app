import { ref, Ref } from 'vue';
import { Budget } from '@/models/Budget';
import User from '@/models/User';

export const budgets = ref(null) as Ref<Budget[] | null>;
export const currentBudget = ref(null) as Ref<null | Budget>;
export const currentUser = ref(null) as Ref<null | User>;

export const monthShortNames = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'aout',
  'septembre',
  'octobre',
  'novembre',
  'decembre',
];

export const getLastBudget = (): Budget => {
  if (!budgets.value) {
    throw new Error('budgets.value is empty');
  }
  const length = budgets.value.length;
  const lastIndex = length - 1;
  return budgets.value[lastIndex];
};

export const getBudgetByMonthYear = (year: number, month: string) => {
  if (!budgets.value) {
    throw new Error('budgets.value is empty');
  }
  return budgets.value.find((budget: Budget) => {
    return budget.year == year && budget.month == month;
  });
};

export const sortBudgetByMonthYear = () => {
  if (!budgets.value) {
    throw new Error('budgets.value is empty');
  }
  budgets.value.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return monthShortNames.indexOf(b.month) - monthShortNames.indexOf(a.month);
  });
};
