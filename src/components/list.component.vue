
<template>
  <div class="dashboard">
    <card-component
      v-for="budget in budgets"
      :key="budget.month + '-' + budget.year"
      :budget="budget"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { budgets } from "@/store";
import CardComponent from "./card.component.vue";

export default defineComponent({
  name: "ListComponent",
  components: {
    CardComponent,
  },
  setup() {
    return {
      budgets,
    };
  },
});
</script>

<style scoped>
.dashboard {
  width: 100vw;
  padding: 5vw;
}

.card {
  height: 200px;
  margin: 10px 0 0 0;
}

.scrollX {
  height: 50px;
}
.scrollX .container-buttons {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  max-height: 100px;
}

.leftovers {
  font-size: 40px;
}
.scrollX .container-buttons .btn {
  font-size: 12px;
  --border-radius: 8px;
}
</style>