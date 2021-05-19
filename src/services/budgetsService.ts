import { Budget } from '@/models/Budget';
import { budgets, sortBudgetByMonthYear } from '@/store';
import firebase from 'firebase/app';

export const addBudgetService = async (budget: Budget) => {
  if (budgets.value && budget) {
    budgets.value = [...budgets.value, budget];
    sortBudgetByMonthYear();
    const budgetRef = firebase
      .firestore()
      .collection('budgets')
      .doc(firebase.auth().currentUser?.uid);

    await budgetRef.set({ data: budgets.value }, { merge: true });
  } else {
    console.log('all budgets or the budget passed is undefined');
  }
};

export const updateBudgetService = async (budget: Budget, index: number) => {
  if (budgets.value && budget) {
    budgets.value[index] = budget;
    const budgetRef = firebase
      .firestore()
      .collection('budgets')
      .doc(firebase.auth().currentUser?.uid);

    await budgetRef.set({ data: budgets.value }, { merge: true });
  } else {
    console.log('all budgets or the budget passed is undefined');
  }
};

export const getBudgetsService = async (): Promise<Budget[] | null> => {
  const query = firebase.firestore().collection('budgets');
  try {
    const data = await query.doc(firebase.auth().currentUser?.uid).get();
    if (data.exists) {
      return data.data()?.data as Budget[];
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Something gone wrong!');
  }
};

// export const updateBudget = async (user: Budget) => {};
