<template>
  <ion-page>
    <ion-content class="budget">
      <back-nav-button-component label="Create your budget" />
      <ion-text
        ><h1>Budget {{ month }} {{ year }}</h1></ion-text
      >
      <div class="currentMoney">
        <ion-label>startMoney</ion-label>
        <ion-input v-model.number="budget.startMoney" type="number"></ion-input>
      </div>
      <div class="salary">
        <ion-label>salary</ion-label>
        <ion-input v-model.number="budget.salary" type="number"></ion-input>
      </div>
      <div v-if="day < 4" class="outstandingAmount">
        <ion-label>outstandingAmountLastMonth</ion-label>
        <ion-input
          v-model.number="budget.outstandingAmountLastMonth"
          type="number"
        ></ion-input>
      </div>
      <div class="outstandingAmount">
        <ion-label>outstandingAmount</ion-label>
        <ion-input
          v-model.number="budget.outstandingAmount"
          type="number"
        ></ion-input>
      </div>

      <form-charges-component
        ref="fixedRef"
        :data="budget.fixedCharges"
        title="fixed"
      />
      <ion-button @click="createBudget">create</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import FormChargesComponent from "@/components/formCharges.component.vue";
import { IonPage, IonContent, IonLabel, IonInput, IonButton } from "@ionic/vue";
import { useRoute, useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import BackNavButtonComponent from "@/components/backNavButton.component.vue";
import { currentBudget } from "@/store";
import { Budget, Charge } from "@/models/Budget";
import { addBudget } from "@/services/budgetsService";

export default defineComponent({
  name: "Budget",
  components: {
    IonPage,
    IonContent,
    IonLabel,
    FormChargesComponent,
    IonInput,
    IonButton,
    BackNavButtonComponent,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const today = new Date();
    const day = today.getDate();
    const startMoney = ref(0);
    const budget = ref({} as Budget);
    const outstandingAmount = ref(0);
    const outstandingAmountLastMonth = ref(0);
    const salary = ref(0);
    const fixedRef = ref<InstanceType<typeof FormChargesComponent>>();
    const variableRef = ref<InstanceType<typeof FormChargesComponent>>();
    const year = parseInt(route.params.year as string);
    const month = route.params.month as string;

    if (year && month) {
      // var result = jsObjects.filter((obj) => {
      //   return obj.b === 6;
      // });
    }

    if (!currentBudget.value) {
      budget.value = {
        month: month,
        year: year,
        startMoney: 50,
        salary: 50,
        fixedCharges: [{ name: "restau", value: 25 }] as Charge[],
        variableCharges: [] as Charge[],
        outstandingAmount: 25,
        outstandingAmountLastMonth: 0,
        leftovers: 0,
        leftoversWithoutVariableCharges: 0,
      };
    } else {
      budget.value = {
        month: currentBudget.value.month,
        year: currentBudget.value.year,
        startMoney: currentBudget.value.startMoney,
        salary: currentBudget.value.salary,
        fixedCharges: currentBudget.value.fixedCharges as Charge[],
        variableCharges: currentBudget.value.variableCharges as Charge[],
        outstandingAmount: currentBudget.value.outstandingAmount,
        outstandingAmountLastMonth:
          currentBudget.value.outstandingAmountLastMonth,
        leftovers: currentBudget.value.leftovers,
        leftoversWithoutVariableCharges:
          currentBudget.value.leftoversWithoutVariableCharges,
      };
    }

    const back = () => {
      router.back();
    };

    const createBudget = async () => {
      const fixedCharges = fixedRef.value?.getFormValue();

      budget.value.leftoversWithoutVariableCharges =
        budget.value.startMoney +
        budget.value.salary -
        (budget.value.outstandingAmount +
          budget.value.outstandingAmountLastMonth);

      if (!fixedCharges) {
        console.log("fixedCharges are undefined");
        return;
      }
      budget.value.fixedCharges = fixedCharges.value;

      fixedCharges.value.forEach((charge) => {
        budget.value.leftoversWithoutVariableCharges -= charge.value;
      });

      budget.value.leftovers = budget.value.leftoversWithoutVariableCharges;

      currentBudget.value = budget.value;

      await addBudget(budget.value).then(() => {
        back();
      });
    };
    return {
      back,
      createBudget,
      fixedRef,
      variableRef,
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
