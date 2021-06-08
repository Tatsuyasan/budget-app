<template>
  <ion-page>
    <header-component title="Dashboard" />
    <div class="container-btn">
      <ion-fab-button class="btn" @click="createBudget">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </div>
    <ion-content>
      <ion-slides
        v-if="loaded"
        @ionSlideDidChange="ionSlideDidChange"
        pager="false"
        :options="slideOpts"
      >
        <ion-slide class="month-budget">
          <list-component />
        </ion-slide>
        <ion-slide>
          <h1>Second écran pour les budgets sans les calcules de salaire ( par exemple un budget pour pendant les vacances, ect ) </h1>
        </ion-slide>
      </ion-slides>
      <div v-else>En cours de chargement...</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonSlides,
  IonSlide,
  IonFabButton,
  IonIcon,
} from "@ionic/vue";
import { add } from "ionicons/icons";
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
    IonSlides,
    IonSlide,
    IonFabButton,
    IonIcon,
  },
  setup() {
    const loaded = ref(false);
    const slide = ref(0);
    const router = useRouter();

    const createBudget = () => {
      if (slide.value === 0) router.push("/createBudget");
      if (slide.value === 1)
        console.log(
          "Go to creation budget simple ( sans calcul avec salaire ect )"
        );
    };

    const ionSlideDidChange = (e: any) => {
      e.target.getActiveIndex().then((i: number) => {
        slide.value = i;
      });
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
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    return {
      loaded,
      createBudget,
      slideOpts,
      add,
      ionSlideDidChange,
    };
  },
});
</script>

<style scoped>
ion-content {
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-top: 10px;
  --padding-bottom: 75px;
}
ion-fab-button {
  width: 24px;
  height: 24px;
}

ion-slides ion-slide {
  flex-flow: column;
  width: 100vw;
}

.container-btn {
  position: absolute;
  bottom: 25px;
  right: 25px;
  z-index: 99;
}
.btn {
  width: 50px;
  height: 50px;
}
</style>