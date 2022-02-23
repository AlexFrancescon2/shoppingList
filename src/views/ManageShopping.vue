<template>
  <div class="home">
    <div class="fullscreen dflex flex-centered">
      <MainButton
        img="cart-current.svg"
        routerUrl="/manage-shopping/current-shopping-list"
        text="Your list"
      />
      <MainButton
        img="cart-add.svg"
        routerUrl="/manage-shopping/add-shopping-list"
        text="Add list"
      />
      <MainButton
        img="cart-manage.svg"
        routerUrl="/manage-shopping/manage-shopping-list"
        text="Manage lists"
      />
    </div>
  </div>
</template>

<script>
import MainButton from "../components/MainButton.vue";
import shoppingListServices from "../services/shoppingListServices";
export default {
  name: "ManageShopping",
  components: {
    MainButton,
  },
  methods: {
    saveTutorial() {
      var data = {
        title: 'example',
        description: 'example',
        published: false,
      };
      shoppingListServices.create(data)
        .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

  },
};
</script>


<style scoped>
</style>
