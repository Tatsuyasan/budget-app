import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import CreateBudget from '@/views/CreateBudget.vue';
import EditBudget from '@/views/EditBudget.vue';
import VariableCharges from '@/views/VariableCharges.vue';
import { budgets, currentBudget } from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/budget/:year/:month',
    name: 'CurrentBudget',
    component: EditBudget,
  },
  {
    path: '/createBudget',
    name: 'CreateBudget',
    component: CreateBudget,
  },
  {
    path: '/VariableCharges/:year/:month',
    name: 'VariableCharges',
    component: VariableCharges,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('current Budgets => ', budgets.value);
  next();
});

export default router;
