<template>
  <ion-card
    color="secondary"
    class="card"
    @click="detailBudget(budget.month, budget.year)"
  >
    <ion-card-header>
      <ion-card-title>{{ budget.month }} {{ budget.year }} </ion-card-title>
      <ion-card-title>{{ $t("leftovers") }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-text
        class="leftovers"
        :color="budget.leftovers >= 0 ? 'success' : 'danger'"
        v-if="budget"
      >
        {{ budget.leftovers }}
      </ion-text>
      <br />
      <ion-button @click.stop="editBudget(budget.month, budget.year)">{{
        $t("cta.edit")
      }}</ion-button>
      <ion-button @click.stop="addVariableCharges(budget.month, budget.year)">{{
        $t("cta.add")
      }}</ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import {
  IonText,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonButton,
} from "@ionic/vue";
import { Budget } from "@/models/Budget";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CardComponent",
  components: {
    IonText,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonButton,
  },
  props: {
    budget: {
      type: Object as () => Budget,
    },
  },
  setup(props) {
    const router = useRouter();

    const addVariableCharges = (month: string, year: string) => {
      router.push(`/VariableCharges/${year}/${month}`);
    };

    const editBudget = (month: string, year: string) => {
      router.push(`/budget/${year}/${month}`);
    };

    const detailBudget = (month: string, year: string) => {
      router.push(`/detail/${year}/${month}`);
    };

    return { addVariableCharges, editBudget, detailBudget };
  },
});
</script>

<style>
</style>