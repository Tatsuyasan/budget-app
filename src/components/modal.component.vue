<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form-component title="titre test" type="fixed" />
    </ion-content>
  </div>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/vue";
import { defineComponent } from "vue";
import FormComponent from "./form.component.vue";

export default defineComponent({
  name: "ModalComponent",
  components: { IonContent, IonHeader, IonTitle, IonToolbar, FormComponent },
  props: {
    title: { type: String, default: "Super Modal" },
  },
  setup() {
    return {};
  },
});
</script>