<template>
  <li>
    <a @click="clickButton" :class="`${state}`">{{ label }}</a>
  </li>
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
