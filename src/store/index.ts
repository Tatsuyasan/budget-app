import { ref, Ref } from 'vue';
import Budget from '@/models/Budget';
import User from '@/models/User';

export const currentBudget = ref(new Budget(null, null, null, null, null)) as Ref<null | Budget>;
export const currentUser = ref(null) as Ref<null | User>;
