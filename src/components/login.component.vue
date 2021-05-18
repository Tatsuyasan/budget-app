<template>
  <div class="button-container">
    <ion-button
      id="google"
      fill="solid"
      expand="block"
      size="medium"
      strong
      @click="logIn(LOGIN_PROVIDER.google)"
      :disabled="loading"
    >
      <span v-if="loading !== LOGIN_PROVIDER.google">Login with Google</span>
      <ion-spinner v-else></ion-spinner>
    </ion-button>
  </div>
</template>

<script lang="ts">
import { IonButton, IonSpinner } from "@ionic/vue";
import { defineComponent, ref, Ref } from "vue";
import {
  LOGIN_PROVIDER,
  login,
  LoginError,
} from "@/services/firebase/authentification";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginComponent",
  components: {
    IonButton,
    IonSpinner,
  },
  setup() {
    const loading = ref(false) as Ref<boolean | LOGIN_PROVIDER>;
    const router = useRouter();

    const logIn = (provider: LOGIN_PROVIDER): void => {
      loading.value = provider;

      login(LOGIN_PROVIDER.GOOGLE)
        .then(() => {
          router.replace("/home");
        })
        .catch((err: LoginError) => {
          console.error("Login failed => ", err.message);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    return {
      loading,
      logIn,
      LOGIN_PROVIDER,
    };
  },
});
</script>

<style scoped>
ion-button {
  --border-radius: 60px;
  width: 80vw;
  height: 8vh;
  margin: 0;
  font-family: Montserrat, sans-serif;
}

.button-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: Montserrat, sans-serif;
  padding-bottom: 10vh;
}
.divider-container {
  display: flex;
  justify-content: center;
}
.or {
  display: inline-block;
  text-transform: uppercase;
  position: relative;
  font-weight: 700;
  font-size: 14px;
  color: var(--ion-color-light, white);
  margin: 25px 0 25px 0;
  padding: 0 10px 0 10px;
}
.or::before,
.or::after {
  content: "";
  display: block;
  position: absolute;
  width: 50px;
  height: 0px;
  border-top: 1px solid var(--ion-color-light, white);
  transform: translateY(-50%);
  top: 50%;
}
.or::before {
  right: 100%;
}
.or::after {
  left: 100%;
}
</style>