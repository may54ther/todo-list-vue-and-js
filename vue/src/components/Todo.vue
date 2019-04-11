<template>
  <button @click="clickButton" :class="`${state}`">{{ label }}</button>
</template>

<script>
export default {
  props: ["label", "state"],
  methods: {
    clickButton() {
      this.$emit(`todoItemsClick`);
    }
  }
};
</script>
