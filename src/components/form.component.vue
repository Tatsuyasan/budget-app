<template>
  <section class="form-component">
    <div class="container">
      <ion-text class="title" color="primary">
        <h2>{{ title }}</h2>
      </ion-text>
      <div class="container-input">
        <div
          class="line"
          v-for="(input, index) in form"
          :key="`input-${index}`"
        >
          <ion-input
            type="text"
            class="name"
            placeholder="name"
            value=""
            v-model.number="input.name"
          ></ion-input>

          <ion-input
            type="number"
            class="value"
            placeholder="value"
            value=""
            v-model.number="input.value"
          ></ion-input>
          <div class="container-fab">
            <ion-fab-button
              v-if="form.length > 1"
              class="remove"
              @click="removeInput(index)"
            >
              <ion-icon :icon="removeCircleOutline"></ion-icon>
            </ion-fab-button>
            <ion-fab-button
              v-if="form.length - 1 === index"
              class="add"
              @click="addInput"
            >
              <ion-icon :icon="addCircleOutline"></ion-icon>
            </ion-fab-button>
          </div>
        </div>
      </div>
      <ion-button @click="submit" class="submit">Ajouter</ion-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, toRefs } from "vue";
import {
  IonInput,
  IonFabButton,
  IonIcon,
  IonText,
  IonButton,
} from "@ionic/vue";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { currentBudget } from "@/store";

export default defineComponent({
  name: "FormComponent",
  components: {
    IonInput,
    IonFabButton,
    IonIcon,
    IonText,
    IonButton,
  },
  props: {
    title: {
      type: String,
      default: "Titre du formulaire",
    },
    type: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const input = { name: "", value: "" };
    const form: Ref<Array<any>> = ref([input]);

    const addInput = () => {
      const input = { name: "", value: "" };
      form.value.push(input);
    };
    const removeInput = (i: number) => {
      if (i < form.value.length) {
        form.value.splice(i, 1);
      }
    };

    const submit = () => {
      if (!currentBudget.value) {
        return;
      }

      const array = form.value;
      let result = 0;
      array.forEach((item) => {
        if (item.value) {
          result += item.value;
        }
      });
      switch (props.type) {
        case "fixed":
          currentBudget.value.fixedCharges = result;
          break;
        case "variable":
          currentBudget.value.charges = result;
          break;
      }

      console.log("currentBudget => ", currentBudget.value);
    };

    return {
      form,
      addCircleOutline,
      removeCircleOutline,
      addInput,
      removeInput,
      submit,
    };
  },
});
</script>

<style scoped>
.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add,
.remove {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-fab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 15vw;
}

.container-input {
    margin: 10px 0 ;
}

.name {
  max-width: 40vw;
  margin-right: 20px;
}

.value {
  max-width: 25vw;
}

h2 {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20;
  margin: 0;
}

ion-input {
  background: rgb(235, 235, 235);
  border-radius: 50px;
  margin: 5px 0;
  --padding-end: 20px;
  --padding-start: 20px;
}

.submit {
  --border-radius: 50px;
}
</style>