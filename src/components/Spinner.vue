<template>
  <div class="full-width full-height row items-center justify-center align-center">
    <q-spinner-cube
      v-for="size in ['xl']"
      :key="size"
      :size="size"
      color="orange"
    />
  </div>
</template>

<script>
export default {
  name: "Spinner"
}
</script>

<style scoped>

</style>
