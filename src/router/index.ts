import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import CreateBudget from '@/views/CreateBudget.vue';
import EditBudget from '@/views/EditBudget.vue';
import VariableCharges from '@/views/VariableCharges.vue';
import DetailBudget from '@/views/DetailBudget.vue';
import { budgets } from '@/store';

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
  {
    path: '/detail/:year/:month',
    name: 'DetailBudget',
    component: DetailBudget,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(`current Budgets | ${String(to.name)} | `, budgets.value);
  next();
});

export default router;
