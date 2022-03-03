<template>
  <BreadCrumb :path="breadCrumbData" />
  <div class="settings">
    <div class="fullscreen dflex flex-centered">
      <MainButton img="unit.svg" routerUrl="/units" text="Units" />
      <MainButton
        img="categories.svg"
        routerUrl="/categories"
        text="Categories"
      />
    </div>
  </div>
</template>

<script>
import MainButton from "../components/MainButton.vue";
import BreadCrumb from "../components/BreadCrumb.vue";
export default {
  name: "Settings",
  components: {
    MainButton,
    BreadCrumb,
  },
  data: function () {
    return {
      breadCrumbData: [
        {
          name: "Home",
          url: "/",
        },
        {
          name: "Settings",
          url: "/settings",
        },
      ],
    };
  },
};
</script>


<style scoped lan>
</style>
