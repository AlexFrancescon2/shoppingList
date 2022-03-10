<template>
  <Loader v-if="isLoading" />
  <GDialog
    v-model="dialogState"
    max-width="600"
    transition="custom-from-bottom-transition"
  >
    <h2>Are you sure to remove this list?</h2>
    <p>This operation is irreversible.</p>
    <div class="d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-custom-secondary mr-2"
        @click="dialogState = false"
      >
        No
      </button>
      <button
        type="button"
        class="btn btn-custom"
        @click="
          () => {
            removeList(removingId);
          }
        "
      >
        Confirm
      </button>
    </div>
  </GDialog>
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
            <div class="icons-wrapper">
              <div
                class="icon-wrapper"
                title="Remove list"
                @click="
                  ($event) => {
                    openDialog($event, item.id);
                  }
                "
              >
                <img
                  :src="require('@/assets/icons/trash-black.svg')"
                  class="icon trash-black-icon"
                />
              </div>
              <div
                class="icon-wrapper"
                v-if="favouriteId === item.id"
                @click="
                  ($event) => {
                    unsetFavourite($event);
                  }
                "
              >
                <img
                  :src="require('@/assets/icons/heart-full.svg')"
                  class="icon heart-full-icon"
                />
              </div>
              <div
                class="icon-wrapper"
                v-if="favouriteId !== item.id"
                @click="
                  ($event) => {
                    setNewFavourite($event, item.id);
                  }
                "
              >
                <img
                  :src="require('@/assets/icons/heart.svg')"
                  class="icon heart-icon"
                />
              </div>
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
      dialogState: false,
      favouriteId: "",
      removingId: "",
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
  methods: {
    setNewFavourite(e, id) {
      e.preventDefault();
      this.isLoading = true;
      shoppingListServices
        .setFav(id)
        .then(() => {
          this.favouriteId = id;
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
    unsetFavourite(e) {
      e.preventDefault();
      this.isLoading = true;
      shoppingListServices
        .unsetFav()
        .then(() => {
          this.favouriteId = "";
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
    removeList(id) {
      this.isLoading = true;
      this.dialogState = false;
      shoppingListServices
        .delete(id)
        .then(() => {
          shoppingListServices
            .getAll()
            .then((result) => {
              this.shoppingLists = helpers.sortData(
                result,
                "created_at",
                "date"
              );
              this.isLoading = false;
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
    openDialog(e, id) {
      e.preventDefault();
      this.removingId = id;
      this.dialogState = true;
    },
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
  position: absolute;
  font-size: 14px;
  bottom: -11px;
  /* margin-bottom: 0px; */
  color: var(--faded-black);
}

ul {
  list-style: none;
  font-size: 15px;
}

.icons-wrapper {
  position: absolute;
  bottom: 5px;
  right: 0px;
  display: flex;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  border: 3px solid rgba(85, 85, 85, 0.212);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
}
.icon-wrapper img {
  transition: all 0.1s ease-in-out;
}
.icon-wrapper:hover img {
  transform: scale(1.2);
}
</style>
