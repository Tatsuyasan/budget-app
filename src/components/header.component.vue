
<template>
  <ion-header class="ion-no-border">
    <ion-toolbar color="secondary-shade">
      <ion-title color="primary">{{ title }}</ion-title>
      <ion-button @click="logout">logOut</ion-button>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonToolbar, IonTitle, IonHeader } from "@ionic/vue";
import { logout } from "@/services/firebase/authentification";

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
    return {logout};
  },
});
</script>

<style scoped>

</style>