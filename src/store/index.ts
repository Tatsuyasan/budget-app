import { ref, Ref } from 'vue';
import { Budget } from '@/models/Budget';
import User from '@/models/User';

export const budgets = ref(null) as Ref<Budget[] | null>;
export const currentBudget = ref(null) as Ref<null | Budget>;
export const currentUser = ref(null) as Ref<null | User>;

export const monthShortNames = ['jan', 'fev', 'mar', 'avr', 'mai', 'jui', 'jui', 'aou', 'sep', 'oct', 'nov', 'dec' ];

export const getLastBudget = (): Budget => {
  if (!budgets.value) {
    throw new Error('budgets.value is empty');
  }
  const length = budgets.value.length;
  const lastIndex = length - 1;
  return budgets.value[lastIndex];
};
