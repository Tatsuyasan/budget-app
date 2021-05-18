<template>
  <section class="form-component">
    <div class="container">
      <ion-text v-if="title" class="title">
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
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, toRefs } from "vue";
import { IonInput, IonFabButton, IonIcon, IonText } from "@ionic/vue";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { Charge } from "@/models/Budget";

export default defineComponent({
  name: "FormComponent",
  components: {
    IonInput,
    IonFabButton,
    IonIcon,
    IonText,
  },
  props: {
    title: {
      type: String,
    },
    data: {
      type: Object as () => Charge[],
    },
  },
  setup(props) {
    const input = { name: "", value: 0 } as Charge;
    const { data } = toRefs(props);
    const form: Ref<Array<Charge>> = ref([]);
    
    if (data && data.value) {
      if (data.value?.length === 0) form.value.push(input);
      else form.value = data.value as Charge[];
    } else {
      form.value.push(input);
    }

    const addInput = () => {
      const input = { name: "", value: 0 };
      form.value.push(input);
    };
    const removeInput = (i: number) => {
      if (i < form.value.length) {
        form.value.splice(i, 1);
      }
    };

    const getFormValue = () => {
      return form;
    };

    return {
      form,
      addCircleOutline,
      removeCircleOutline,
      addInput,
      removeInput,
      getFormValue,
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
  margin: 10px 0;
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

.submit {
  --border-radius: 50px;
}
</style>