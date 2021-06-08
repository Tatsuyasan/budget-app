<template>
  <ion-page>
    <ion-content class="budget">
      <back-nav-button-component :label="$t('editBudget')" />
      <ion-text
        ><h1>Budget {{ month }} {{ year }}</h1></ion-text
      >
      <div class="currentMoney">
        <ion-label>{{ $t("startMoney") }}</ion-label>
        <ion-input v-model.number="budget.startMoney" type="number"></ion-input>
      </div>
      <div class="salary">
        <ion-label>{{ $t("salary") }}</ion-label>
        <ion-input v-model.number="budget.salary" type="number"></ion-input>
      </div>
      <div v-if="day < 4" class="outstandingAmount">
        <ion-label>{{ $t("outstandingAmountLastMonth") }}</ion-label>
        <ion-input
          v-model.number="budget.outstandingAmountLastMonth"
          type="number"
        ></ion-input>
      </div>
      <div class="outstandingAmount">
        <ion-label>{{ $t("outstandingAmount") }}</ion-label>
        <ion-input
          v-model.number="budget.outstandingAmount"
          type="number"
        ></ion-input>
      </div>

      <form-charges-component
        ref="fixedRef"
        :data="budget.fixedCharges"
        :title="$t('fixedCharges')"
      />
      <ion-button @click="editBudget">{{ $t("cta.edit") }}</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import FormChargesComponent from "@/components/formCharges.component.vue";
import {
  IonPage,
  IonContent,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/vue";
import { useRoute, useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import BackNavButtonComponent from "@/components/backNavButton.component.vue";
import { budgets, currentBudget, getBudgetByMonthYear } from "@/store";
import { Budget } from "@/models/Budget";
import { updateBudgetService } from "@/services/budgetsService";

export default defineComponent({
  name: "EditBudget",
  components: {
    IonPage,
    IonContent,
    IonLabel,
    FormChargesComponent,
    IonInput,
    IonButton,
    BackNavButtonComponent,
    IonText,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const today = new Date();
    const day = today.getDate();
    const startMoney = ref(0);
    const outstandingAmount = ref(0);
    const outstandingAmountLastMonth = ref(0);
    const salary = ref(0);
    const fixedRef = ref<InstanceType<typeof FormChargesComponent>>();
    const year = parseInt(route.params.year as string);
    const month = route.params.month as string;

    if (!year && !month) {
      throw new Error("Year or month params doesn't exist !");
    }

    const budget = getBudgetByMonthYear(year, month) as Budget;

    if (!budget) {
      throw new Error("budget doesn't exist !");
    }

    const back = () => {
      router.back();
    };

    const editBudget = async () => {
      const fixedCharges = fixedRef.value?.getFormValue();

      budget.leftoversWithoutVariableCharges =
        budget.startMoney +
        budget.salary -
        (budget.outstandingAmount + budget.outstandingAmountLastMonth);

      if (!fixedCharges) {
        console.log("fixedCharges are undefined");
        return;
      }
      budget.fixedCharges = fixedCharges.value;

      fixedCharges.value.forEach((charge) => {
        budget.leftoversWithoutVariableCharges -= charge.value;
      });

      budget.leftovers = budget.leftoversWithoutVariableCharges;

      if (budget.variableCharges) {
        budget.variableCharges.forEach((charge) => {
          budget.leftovers -= charge.value;
        });
      }

      const index = budgets.value?.indexOf(budget) as number;

      await updateBudgetService(budget, index).then(() => {
        back();
      });
    };
    return {
      back,
      editBudget,
      fixedRef,
      startMoney,
      outstandingAmount,
      salary,
      currentBudget,
      outstandingAmountLastMonth,
      day,
      year,
      month,
      budget,
    };
  },
});
</script>

<style scoped>
.currentMoney {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
