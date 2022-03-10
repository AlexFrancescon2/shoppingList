<template>
  <Loader v-if="isLoading" />
  <GDialog
    v-model="dialogState"
    max-width="800"
    transition="custom-from-bottom-transition"
  >
    OEEEH
  </GDialog>
  <BreadCrumb :path="breadCrumbData" />
  <div class="content">
    <div
      v-if="Object.keys(shoppingList).length === 0 && !isLoading"
      class="box"
    >
      <p>Error. The list you are looking for does not exist.</p>
    </div>
    <div v-else>
      <h1>{{ shoppingList.name }}</h1>
      <div>
        <div v-for="(category, key) in shoppingList.items" :key="category">
          <div class="strike mb-2">
            <span>
              <img
                :src="require('@/assets/icons/category.svg')"
                class="icon category-icon"
              />
              {{ key }}
            </span>
          </div>
          <div class="row">
            <div
              class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
              v-for="item in category"
              :key="item.id"
            >
              <div
                :class="[
                  'list-item',
                  selectedItems.includes(item.id) ? 'selected' : '',
                ]"
                @click="
                  () => {
                    selectItem(item.id);
                  }
                "
              >
                <div>
                  <h4>{{ item.name }}</h4>
                  <p>{{ item.amount }} {{ item.unit }}</p>
                </div>
                <div class="amountinput">
                  <button
                    class="input plus"
                    @click="
                      ($event) => {
                        editAmount($event, item.id, '+');
                      }
                    "
                  >
                    <span>+</span>
                  </button>
                  <button
                    class="input minus"
                    @click="
                      ($event) => {
                        editAmount($event, item.id, '-');
                      }
                    "
                  >
                    <span>-</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import FormElement from "../components/FormElement.vue";
// import MessageBox from "../components/MessageBox.vue";
import BreadCrumb from "../components/BreadCrumb.vue";
import Loader from "../components/Loader.vue";
// import unitServices from "../services/unitServices";
import shoppingListServices from "../services/shoppingListServices";
import helpers from "../services/helpers";
export default {
  name: "ShoppingList",
  components: { Loader, BreadCrumb },
  props: ["id"],
  data: function () {
    return {
      isLoading: false,
      dialogState: false,
      message: "",
      unorderedShoppingList: {},
      shoppingList: {},
      selectedItems: [],
      unitList: [],
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
          url: "/manage-shopping/manage-lists",
        },
        {
          name: "...",
          url: "/",
        },
      ],
    };
  },
  mounted() {
    this.isLoading = true;
    shoppingListServices
      .getById(this.id)
      .then((result) => {
        this.unorderedShoppingList = result;
        console.log("unorderedShoppingList", this.unorderedShoppingList);
        this.shoppingList = result;
        this.shoppingList.items = helpers.subsetListItems(
          this.shoppingList.items
        );
        this.breadCrumbData[3].name = result.name;
        this.isLoading = false;
      })
      .catch((e) => {
        console.log(e);
        this.isLoading = false;
      });
  },
  methods: {
    selectItem(id) {
      if (this.selectedItems.includes(id)) {
        let index = this.selectedItems.indexOf(id);
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(id);
      }
    },
    editAmount(e, itemId, operation) {
      e.preventDefault();
      this.selectItem(itemId);
      this.isLoading = true;
      const data = {
        id: this.shoppingList.id,
        itemId: itemId,
        items: this.unorderedShoppingList.items,
        operation: operation,
      };
      shoppingListServices
        .updateItemAmount(data)
        .then(() => {
          shoppingListServices
            .getById(this.id)
            .then((result) => {
              this.shoppingList = result;
              this.shoppingList.items = helpers.subsetListItems(
                this.shoppingList.items
              );
              this.isLoading = false;
            })
            .catch((e) => {
              console.log(e);
              this.isLoading = false;
            });
        })
        .catch((e) => {
          this.editMessage = e;
          this.messageType = "error";
          this.isLoading = false;
        });
    },
    decreaseAmount() {},
  },
};
</script>


<style scoped>
.box {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 2px;
}

.strike {
  display: block;
  /* text-align: center; */
  overflow: hidden;
  white-space: nowrap;

  font-size: 20px;
}

.strike > span {
  color: white;
  position: relative;
  display: inline-block;
}

.strike > span:before,
.strike > span:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 9999px;
  /* Here is the modification */
  border-top: 4px double rgb(255, 255, 255);
}

.strike > span:before {
  right: 100%;
  margin-right: 15px;
}

.strike > span:after {
  left: 100%;
  margin-left: 15px;
}

.list-item {
  position: relative;
  padding: 12px;
  border-radius: 8px;
  height: 100%;
  background-color: white;
  background-position-x: 107%;
  background-position-y: -45%;
  background-size: 165px;
  background-repeat: no-repeat;
  border: 2px solid white;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.list-item p {
  margin-bottom: 0px;
}
.list-item.selected {
  background-color: #abe4ae;
}
.list-item:hover {
  background-color: #e6e6e6;
  box-shadow: var(--large-large-shadow);
  transform: scale(1.02);
}
.list-item.selected:hover {
  background-color: #80b482;
}

.category-icon {
  margin-bottom: 4px;
}

.amountinput .input {
  padding: 10px;
  border: 1px solid grey;
  display: block;
  background-color: white;
  text-align: center;
  font-size: 20px;
  width: 100%;
}
.amountinput .input.plus {
  border-radius: 6px 6px 0px 0px;
}
.amountinput .input.minus {
  border-radius: 0px 0px 6px 6px;
}
</style>
