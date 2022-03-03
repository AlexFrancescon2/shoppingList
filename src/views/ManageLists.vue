<template>
  <Loader v-if="isLoading" />
  <BreadCrumb :path="breadCrumbData" />
  <div class="manage-lists content">
    <h1>Shopping Lists</h1>
    <div class="row mt-3">
      <div
        class="col-12 col-sm-6 col-lg-4 mb-4"
        v-for="item in shoppingLists"
        :key="item.id"
      >
        <router-link
          :to="`/manage-shopping/manage-lists/shopping-list/${item.id}`"
          class="shopping-list"
          :style="{
            backgroundColor: item.color,
            '--url': listImageUrl,
            'background-image': `url(${require(`@/assets/list.svg`)})`,
          }"
        >
          <p class="title">{{ item.name }}</p>
          <p class="mb-2">
            {{ item.items.length }} Items on this shopping list:
          </p>
          <ul>
            <template v-for="(listItem, index) in item.items" :key="index">
              <li v-if="index < 2">
                <img
                  :src="require('@/assets/icons/number.svg')"
                  class="icon number-icon"
                />
                {{ listItem.name }} ({{ listItem.amount }}{{ listItem.unit }})
              </li>
            </template>
            <li>...</li>
          </ul>
          <div>
            <div class="icon-wrapper">
              <img
                :src="require('@/assets/icons/trash-black.svg')"
                class="icon trash-black-icon mr3"
              />
              <img
                v-if="favouriteId === item.id"
                :src="require('@/assets/icons/heart-full.svg')"
                class="icon heart-full-icon mr-3"
              />
              <img
                v-if="favouriteId !== item.id"
                :src="require('@/assets/icons/heart.svg')"
                class="icon heart-icon"
              />
            </div>
            <p class="date">Created the: {{ item.created_at }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "../components/BreadCrumb.vue";
import Loader from "../components/Loader.vue";
import shoppingListServices from "../services/shoppingListServices";
import helpers from "../services/helpers";
// import moment from "moment";
export default {
  name: "AddShoppingList",
  components: { BreadCrumb, Loader },
  data: function () {
    return {
      isLoading: false,
      favouriteId: "",
      shoppingLists: [],
      printedShoppingLists: [],
      listImageUrl: require(`@/assets/list.svg`),
      breadCrumbData: [
        {
          name: "Home",
          url: "/",
        },
        {
          name: "Manage shopping",
          url: "/manage-shopping",
        },
        {
          name: "Manage Lists",
          url: "/manage-lists",
        },
      ],
    };
  },
  mounted() {
    this.isLoading = true;
    shoppingListServices
      .getAll()
      .then((result) => {
        this.shoppingLists = helpers.sortData(result, "created_at", "date");
      })
      .catch((e) => {
        console.log(e);
      });

    shoppingListServices
      .getFav()
      .then((result) => {
        this.favouriteId = result.toString();
        this.isLoading = false;
      })
      .catch((e) => {
        console.log(e);
        this.isLoading = false;
      });
  },
};
</script>


<style scoped>
.shopping-list {
  position: relative;
  display: block;
  padding: 12px;
  border-radius: 8px;
  height: 100%;
  background-color: var(--light-grey);
  background-position-x: 107%;
  background-position-y: -45%;
  background-size: 165px;
  background-repeat: no-repeat;
  border: 2px solid white;
  text-decoration: inherit;
  color: inherit;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.shopping-list:hover {
  box-shadow: var(--large-large-shadow);
  transform: scale(1.02);
}

.title {
  font-size: 25px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgb(255 255 255 / 12%) 71%,
    rgb(255 255 255 / 0%) 100%
  );
  width: 100%;
  padding: 10px;
  border-radius: 5px;
}

.date {
  font-size: 14px;
  text-align: end;
  margin-bottom: 0px;
  color: var(--faded-black);
}

ul {
  list-style: none;
  font-size: 15px;
}

.icon {
  display: inline;
  margin-bottom: 2px;
}
.icon-wrapper {
  position: absolute;
}
</style>
