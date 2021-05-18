<template>
  <ion-page>
    <header-component title="Dashboard" />
    <ion-content>
      <list-component v-if="loaded" />
      <div v-else>En cours de chargement...</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { closeCircleOutline } from "ionicons/icons";
import { defineComponent, onMounted, ref } from "vue";
import { budgets, monthShortNames } from "@/store/index";
import HeaderComponent from "@/components/header.component.vue";
import ListComponent from "@/components/list.component.vue";
import { getBudgets } from "@/services/budgetsService";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    HeaderComponent,
    ListComponent,
  },
  setup() {
    const loaded = ref(false);

    onMounted(() => {
      getBudgets().then((data) => {
        if (data) {
          budgets.value = data;
        } else {
          budgets.value = [];
        }
        loaded.value = true;
      });
    });
    return {
      loaded,
      closeCircleOutline,
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