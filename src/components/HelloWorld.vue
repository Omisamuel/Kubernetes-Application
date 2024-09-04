<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
h1 {
  font-size: 2em;
  color: #42b983;
}
</style>
