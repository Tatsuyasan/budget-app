<template>
  <ion-page>
    <ion-content class="detail">
      <back-nav-button-component :label="$t('detail')" />
      <div>
        <ion-text
          >Les details du budget, avec peut être un graph pour illustrer
          rapidement le budget,
        </ion-text>
        <br>
        <ion-text>avec un style dashboard</ion-text>
        <br><br><br><br>
        {{ budget }}
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonText } from "@ionic/vue";
import { useRoute } from "vue-router";
import { defineComponent } from "vue";
import BackNavButtonComponent from "@/components/backNavButton.component.vue";
import { budgets, getBudgetByMonthYear } from "@/store";

export default defineComponent({
  name: "DetailBudget",
  components: {
    IonPage,
    IonContent,
    BackNavButtonComponent,
    IonText
  },
  setup() {
    const route = useRoute();
    const year = parseInt(route.params.year as string);
    const month = route.params.month as string;
    if (!year && !month && !budgets.value) {
      throw new Error("Something is empty !");
    }
    const budget = getBudgetByMonthYear(year, month);

    if (!budget) {
      throw new Error("budget is empty !");
    }

    return {
      budget,
    };
  },
});
</script>

<style scoped>
</style>
