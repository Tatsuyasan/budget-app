
<template>
  <ion-header class="ion-no-border header">
    <ion-toolbar color="secondary-shade">
      <ion-title color="primary">{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonToolbar, IonTitle, IonHeader } from "@ionic/vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    IonToolbar,
    IonTitle,
    IonHeader,
  },
  props: {
    title: {
      type: String,
      default: "Titre Header",
      require: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.header {
  height: 5vh;
}
</style>