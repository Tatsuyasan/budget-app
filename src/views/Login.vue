<template>
  <ion-page>
    <ion-content
      color="tertiary"
      force-overscroll="false"
      class="movie-container"
    >
      <ion-text class="logo" color="secondary">
        <h1>My budget</h1>
      </ion-text>
    </ion-content>
    <footer>
      <login-component />
    </footer>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonText } from "@ionic/vue";
import LoginComponent from "@/components/login.component.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  components: {
    IonPage,
    IonContent,
    LoginComponent,
    IonText,
  },
});
</script>

<style scoped>
.logo {
  position: fixed;
  top: 5vh;
  left: 0;
  right: 0;
  margin: auto;
  width: min(34vw, 34vh);
}

footer {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100vw;
}
footer ion-button {
  margin: 0;
}
</style>
