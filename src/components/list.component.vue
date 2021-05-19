
<template>
  <div class="dashboard">
    <ion-content class="scrollX" :scroll-x="true" :scroll-y="false">
      <div class="container-buttons">
        <ion-button class="btn" @click="createBudget">
          Create budget
        </ion-button>
      </div>
    </ion-content>
    <ion-card
      v-for="budget in budgets"
      :key="budget.month"
      color="secondary"
      class="card"
    >
      <ion-card-header>
        <ion-card-title
          >Budgets {{ budget.month }} {{ budget.year }}
        </ion-card-title>
        <ion-card-title>Leftovers</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-text
        class="leftovers"
          :color="budget.leftovers >= 0 ? 'success' : 'danger'"
          v-if="budget"
        >
          {{ budget.leftovers }}
        </ion-text>
        <br>
        <ion-button @click="editBudget(budget.month, budget.year)">edit budget</ion-button>
        <ion-button @click="addVariableCharges(budget.month, budget.year)">Add charges</ion-button>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonText,
  IonContent,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { budgets, currentBudget, getLastBudget } from "@/store";
import { getBudgetsService } from "@/services/budgetsService";

export default defineComponent({
  name: "ListComponent",
  components: {
    IonButton,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonText,
    IonContent,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const leftovers = undefined;

    const addBudget = () => {
      // emit("addBudget");
    };
    const addVariableCharges = (month: string, year: string) => {
      router.push(`/VariableCharges/${year}/${month}`);
    };
    const createBudget = () => {
      router.push("/createBudget");
    };
    const editBudget = (month: string, year: string) => {
      router.push(`/budget/${year}/${month}`);
    };

    return {
      currentBudget,
      leftovers,
      addBudget,
      createBudget,
      addVariableCharges,
      editBudget,
      budgets,
    };
  },
});
</script>

<style scoped>
.dashboard ion-content {
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
}

.card {
  height: 200px;
  margin: 10px 0 0 0;
}

.scrollX {
  height: 50px;
}
.scrollX .container-buttons {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  max-height: 100px;
}

.leftovers {
  font-size: 40px;
}
.scrollX .container-buttons .btn {
  font-size: 12px;
  --border-radius: 8px;
}
</style>