<template>
  <ion-page>
    <header-component title="Dashboard" />
    <ion-content>
      <div class="container-buttons">
        <ion-button class="btn" @click="createBudget">
          Create budget
        </ion-button>
      </div>
      <list-component v-if="loaded" />
      <div v-else>En cours de chargement...</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import { closeCircleOutline } from "ionicons/icons";
import { defineComponent, onMounted, ref } from "vue";
import { budgets } from "@/store/index";
import HeaderComponent from "@/components/header.component.vue";
import ListComponent from "@/components/list.component.vue";
import { getBudgetsService } from "@/services/budgetsService";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    HeaderComponent,
    ListComponent,
    IonButton,
  },
  setup() {
    const loaded = ref(false);
    const router = useRouter();

    const createBudget = () => {
      router.push("/createBudget");
    };

    onMounted(() => {
      getBudgetsService().then((data) => {
        if (data) {
          budgets.value = data;
        } else {
          budgets.value = [];
        }
        console.log("budget.value is filled");
        loaded.value = true;
      });
    });
    return {
      loaded,
      closeCircleOutline,
      createBudget,
    };
  },
});
</script>

<style scoped>
ion-content {
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-top: 10px;
}
ion-fab-button {
  width: 24px;
  height: 24px;
}
</style>