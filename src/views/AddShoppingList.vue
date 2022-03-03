<template>
  <Loader v-if="isLoading" />
  <BreadCrumb :path="breadCrumbData" />
  <div class="add-shopping-list content">
    <h1>Add Shopping list</h1>
    <div class="content-box">
      <form @submit="add">
        <FormElement
          placeholder="Add a name for the shopping list"
          label="Name"
          type="text"
          id="name"
          @onInput="
            (newValue) => {
              name = newValue;
              resetMessage();
            }
          "
        />
        <h5 class="mt-3">Add ingredients:</h5>
        <div
          class="row mb-3"
          v-for="(param, index) in inputParams"
          :key="param.id"
        >
          <div class="col-md-4">
            <FormElement
              placeholder="Add a name for the ingredient"
              :label="'Name'"
              type="text"
              :id="'Name_' + index"
              @onInput="
                (newValue) => {
                  inputParams[index].name = newValue;
                  resetMessage();
                }
              "
            />
          </div>
          <div class="col-md-3">
            <FormElement
              :label="'Category'"
              type="select"
              :id="'Category_' + index"
              :values="categoriesList"
              @onInput="
                (newValue) => {
                  inputParams[index].category = newValue;
                  resetMessage();
                }
              "
            />
          </div>
          <div class="col-md-2">
            <FormElement
              placeholder="Quantity"
              :label="'Quantity'"
              type="number"
              :id="'Quantity_' + index"
              @onInput="
                (newValue) => {
                  inputParams[index].amount = newValue;
                  resetMessage();
                }
              "
            />
          </div>
          <div class="col-md-2">
            <FormElement
              :label="'Unit'"
              type="select"
              :id="'Unit_' + index"
              :values="unitsList"
              @onInput="
                (newValue) => {
                  inputParams[index].unit = newValue;
                  resetMessage();
                }
              "
            />
          </div>
          <div class="col-md-1 remove-container">
            <button
              type="button"
              class="btn btn-danger d-flex flex-centered"
              @click="
                () => {
                  removeNewLine(index);
                }
              "
            >
              <img
                :src="require(`@/assets/icons/trash.svg`)"
                class="icon trash-icon"
              />
            </button>
          </div>
        </div>
        <div v-if="message && messageType" class="my-3">
          <MessageBox :message="message" :type="messageType" />
        </div>
        <button
          @click="addNewLine"
          type="button"
          class="btn btn-custom mr-3 add-line-button"
        >
          <img
            :src="require(`@/assets/icons/plus.svg`)"
            class="d-inline icon plus-icon"
          />
          Add new Ingredients
        </button>
        <button type="submit" class="btn btn-custom">Create list</button>
      </form>
    </div>
  </div>
</template>

<script>
import FormElement from "../components/FormElement.vue";
import MessageBox from "../components/MessageBox.vue";
import BreadCrumb from "../components/BreadCrumb.vue";
import Loader from "../components/Loader.vue";
import shoppingListServices from "../services/shoppingListServices";
import categoryServices from "../services/categoryServices";
import unitServices from "../services/unitServices";
import helpers from "../services/helpers";
export default {
  name: "AddShoppingList",
  components: { FormElement, MessageBox, BreadCrumb, Loader },
  data: function () {
    return {
      isLoading: false,
      message: "",
      messageType: "",
      name: "",
      unitsList: [],
      categoriesList: [],
      inputParams: [],
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
          name: "Create List",
          url: "/add-shopping-list",
        },
      ],
    };
  },
  mounted() {
    this.isLoading = true;
    categoryServices
      .getAll()
      .then((result) => {
        const newArray = helpers.sortData(result, "name", "string");
        newArray.forEach((element) => {
          this.categoriesList.push(element.name);
        });
      })
      .catch((e) => {
        console.log(e);
      });
    unitServices
      .getAll()
      .then((result) => {
        const newArray = helpers.sortData(result, "value", "string");
        newArray.forEach((element) => {
          this.unitsList.push(element.value);
        });
        this.isLoading = false;
      })
      .catch((e) => {
        console.log(e);
        this.isLoading = false;
      });
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
    addNewLine() {
      this.resetMessage();
      this.inputParams.push({
        id: helpers.makeId(20),
        name: "",
        category: "",
        amount: 0,
        unit: "",
      });
    },
    removeNewLine(index) {
      this.resetMessage();
      this.inputParams.splice(index, 1);
    },
    add(e) {
      e.preventDefault();
      // Check for errors
      let flag = true;
      let flagLine = "";
      if (!this.name) {
        this.message = "You can't create a list without its name.";
        this.messageType = "error";
        return;
      }
      if (!this.inputParams.length) {
        this.message = "Add some ingredients before to proceed.";
        this.messageType = "error";
        return;
      }
      this.inputParams.forEach((element, index) => {
        if (
          !element.name ||
          !element.amount ||
          !element.unit ||
          !element.category
        ) {
          flag = false;
          flagLine = index + 1;
          return;
        }
      });
      if (!flag) {
        this.message =
          "The ingredient's row number " + flagLine + " contains empty values.";
        this.messageType = "error";
        return;
      }
      // Add stuff in the DB
      const data = {
        id: helpers.makeId(20),
        color: helpers.randomColor(),
        name: this.name,
        items: this.inputParams,
      };
      console.log(data);
      shoppingListServices
        .create(data)
        .then(() => {
          this.message = "List correctly created.";
          this.messageType = "success";
          this.name = "";
          this.inputParams = [];
        })
        .catch((e) => {
          this.message = e;
          this.messageType = "error";
        });
    },
    resetMessage() {
      if (this.message || this.messageType) {
        this.message = "";
        this.messageType = "";
      }
    },
  },
};
</script>


<style scoped>
.remove-container {
  display: flex;
  align-items: end;
  margin-bottom: 17px;
}

.add-line-button {
  display: inline-flex;
  align-items: center;
}
.add-line-button img {
  margin-right: 6px;
}
</style>
