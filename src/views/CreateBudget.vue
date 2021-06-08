<template>
  <ion-page>
    <ion-content class="budget">
      <back-nav-button-component :label="$t('createBudget')" />
      <div class="date">
        <ion-label>Select a date:</ion-label>
        <ion-datetime
          display-format="MMM YYYY"
          placeholder="Select Date"
          :month-short-names="monthShortNames"
          @ionChange="datetime"
        ></ion-datetime>
      </div>
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
import {
  IonPage,
  IonContent,
  IonLabel,
  IonInput,
  IonButton,
  IonDatetime,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent, Ref, ref } from "vue";
import BackNavButtonComponent from "@/components/backNavButton.component.vue";
import { currentBudget, getBudgetByMonthYear, monthShortNames } from "@/store";
import { Budget, Charge } from "@/models/Budget";
import { addBudgetService } from "@/services/budgetsService";
import FormChargesComponent from "@/components/formCharges.component.vue";
import { Plugins } from "@capacitor/core";
const { Toast } = Plugins;

export default defineComponent({
  name: "CreateBudget",
  components: {
    IonPage,
    IonContent,
    IonLabel,
    FormChargesComponent,
    IonInput,
    IonButton,
    BackNavButtonComponent,
    IonDatetime,
  },
  setup() {
    const router = useRouter();
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    const choosenMonth = ref(null) as Ref<string | null>;
    const choosenYear = ref(null) as Ref<number | null>;
    const startMoney = ref(0);
    const budget = ref({} as Budget);
    const outstandingAmount = ref(0);
    const outstandingAmountLastMonth = ref(0);
    const salary = ref(0);
    const fixedRef = ref<InstanceType<typeof FormChargesComponent>>();
    const variableRef = ref<InstanceType<typeof FormChargesComponent>>();

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

    const back = () => {
      router.back();
    };
    const test = () => {
      console.log("TESTTEST");
    };
    const datetime = (e: CustomEvent) => {
      const datetime = e.detail.value as string;
      const partsDatetime: Array<string> = datetime.split("-");
      const monthNumber = parseInt(partsDatetime[1]) - 1;
      choosenYear.value = parseInt(partsDatetime[0]);
      choosenMonth.value = monthShortNames[monthNumber];

      const result = getBudgetByMonthYear(
        choosenYear.value,
        choosenMonth.value
      );
      if (!result) {
        budget.value.year = choosenYear.value;
        budget.value.month = choosenMonth.value;
      } else {
        Toast.show({
          text: "There is already a budget for this date, choose another one.",
        });
      }
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

      if (choosenYear.value && choosenMonth.value) {
        const result = getBudgetByMonthYear(
          choosenYear.value,
          choosenMonth.value
        );
        if (result) {
          Toast.show({
            text:
              "There is already a budget for this date, choose another one.",
          });
          console.log("There is already a budget for this date, choose another Date.");
        } else {
          await addBudgetService(budget.value).then(() => {
            back();
          });
        }
      }
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
      budget,
      monthShortNames,
      datetime,
      test,
    };
  },
});
</script>

<style scoped>
.currentMoney,
.date,
.salary,
.outstandingAmount {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 30px;
  color: white;
}
</style>
