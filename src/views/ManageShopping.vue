<template>
  <BreadCrumb :path="breadCrumbData" />
  <div class="manage-shopping-list">
    <div class="fullscreen dflex flex-centered">
      <MainButton
        img="cart.svg"
        routerUrl="/manage-shopping/current-shopping-list"
        text="Your fav list"
      />
      <MainButton
        img="cart-add.svg"
        routerUrl="/manage-shopping/add-shopping-list"
        text="Add list"
      />
      <MainButton
        img="cart-manage.svg"
        routerUrl="/manage-shopping/manage-lists"
        text="Manage lists"
      />
    </div>
    <!-- <div @click="getAll">GET ALL</div> -->
  </div>
</template>

<script>
import MainButton from "../components/MainButton.vue";
import BreadCrumb from "../components/BreadCrumb.vue";
import shoppingListServices from "../services/shoppingListServices";
export default {
  name: "ManageShopping",
  components: {
    MainButton,
    BreadCrumb,
  },
  data: function () {
    return {
      breadCrumbData: [
        {
          name: 'Home',
          url: '/'
        },
        {
          name: 'Manage shopping',
          url: '/manage-shopping'
        },
      ],
    };
  },
  methods: {
    getAll() {
      // var ooo = shoppingListServices.getAllz();
      // console.log("ooo", ooo);
      shoppingListServices
        .getAllz()
        .then((result) => {
          console.log("Data well fetched!!", result);
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
