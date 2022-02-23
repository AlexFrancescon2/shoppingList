<template>
  <div class="home">
    <div class="fullscreen dflex flex-centered">
      <MainButton img="cart.svg" routerUrl="/manage-shopping" text="Shopping list" />
      o
    </div>
  </div>
</template>

<script>
import MainButton from "../components/MainButton.vue";
export default {
  name: "Home",
  components: {
    MainButton,
  },
};
</script>


<style scoped lan>
</style>
