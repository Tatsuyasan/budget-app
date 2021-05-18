<template>
  <ion-button class="back" @click="back()">
    <ion-icon :src="chevronBackOutline" />
    <ion-text>{{ label }}</ion-text>
  </ion-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonButton, IonText, IonIcon } from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "BackNavButtonComponent",
  components: {
    IonButton,
    IonText,
    IonIcon,
  },
  props: {
    label: {
      type: String,
      default: "home",
    },
  },
  setup() {
    const back = () => {
      if (history.state.back) {
        history.back();
      } else {
        useRouter().replace("/home");
      }
    };

    return {
      back,
      chevronBackOutline,
    };
  },
});
</script>

<style>
.back {
  --box-shadow: none;
  margin: 5vh 0 0 0;
}
.back ion-img {
  width: 40px;
  height: 40px;
}

.back ion-text {
  font-size: 14px;
  text-transform: uppercase;
}
</style>