<template>
  <ion-page>
    <ion-content class="variable-charges">
      <back-nav-button-component label="Add charges" />

      <form-charges-component
        ref="variableRef"
        :data="budget.variableCharges"
        title="variable"
      />
      <ion-button @click="addCharges">create</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import FormChargesComponent from "@/components/formCharges.component.vue";
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { useRoute, useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import BackNavButtonComponent from "@/components/backNavButton.component.vue";
import { budgets, currentBudget } from "@/store";
import { Budget, Charge } from "@/models/Budget";
import { updateBudget } from "@/services/budgetsService";

export default defineComponent({
  name: "VariableCharges",
  components: {
    IonPage,
    IonContent,
    FormChargesComponent,
    IonButton,
    BackNavButtonComponent,
  },
  setup() {
    const route = useRoute();
    const year = parseInt(route.params.year as string);
    const month = route.params.month as string;
    if (!year && !month && !budgets.value) {
      throw new Error("Something is empty !");
    }

    const budget = budgets.value?.find((budget: Budget) => {
      return budget.year == year && budget.month == month;
    });

    if (!budget) {
      throw new Error("budget is empty !");
    }
    console.log("VariableCharges | component | budget => ", budget);
    const router = useRouter();
    const variableRef = ref<InstanceType<typeof FormChargesComponent>>();

    const back = () => {
      router.back();
    };

    const addCharges = async () => {
      const variableCharges = variableRef.value?.getFormValue();

      if (!variableCharges) {
        console.log("variableCharges are undefined");
        return;
      }

      budget.leftovers =
        budget.leftoversWithoutVariableCharges;

      variableCharges.value.forEach((charge) => {
        budget.leftovers -= charge.value;
      });

      budget.variableCharges = variableCharges.value as Charge[];

      const index = budgets.value?.indexOf(budget) as number;

      await updateBudget(budget, index);

      back();
    };
    return {
      back,
      addCharges,
      variableRef,
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
