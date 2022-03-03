<template>
  <Loader v-if="isLoading" />
  <GDialog
    v-model="dialogState"
    max-width="800"
    transition="custom-from-bottom-transition"
  >
    <form @submit="edit" class="p-3">
      <div class="form-group">
        <label for="editvalue" class="control-label">Name</label>
        <input
          type="text"
          name="editvalue"
          id="editvalue"
          class="form-control"
          placeholder="Edit value"
          v-model="editData.name"
        />
      </div>
      <div v-if="editMessage && messageType" class="my-3">
        <MessageBox :message="editMessage" :type="messageType" />
      </div>
      <button type="submit" class="btn btn-custom mt-3">Save</button>
    </form>
  </GDialog>
  <BreadCrumb :path="breadCrumbData" />
  <div class="categories content">
    <h1>Categories</h1>
    <div class="content-box">
      <h5>Add new category</h5>
      <form @submit="add">
        <div class="row">
          <div class="col-md-4">
            <FormElement
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
          </div>
        </div>
        <div v-if="message && messageType" class="my-3">
          <MessageBox :message="message" :type="messageType" />
        </div>
        <button type="submit" class="btn btn-custom">Save</button>
      </form>
    </div>
    <div class="content-box mt-4">
      <h5>Category list</h5>
      <div class="row mb-3">
        <div
          class="col-12 col-md-6 col-lg-4"
          v-for="param in categoriesList"
          :key="param.id"
        >
          <div class="row">
            <div class="col-8">
              <div class="unit-box">
                <span>{{ param.name }}</span>
              </div>
            </div>
            <div class="col-4 buttons-wrapper">
              <button
                type="button"
                class="btn btn-info d-flex flex-centered mr-3"
                @click="
                  () => {
                    openDialog(param);
                  }
                "
              >
                <img
                  :src="require(`@/assets/icons/edit.svg`)"
                  class="icon edit-icon"
                />
              </button>
              <button
                type="button"
                class="btn btn-danger d-flex flex-centered"
                @click="
                  () => {
                    remove(param.id);
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
        </div>
      </div>
      <p class="font-italic" v-if="!categoriesList.length">
        There are no categories to display.
      </p>
    </div>
  </div>
</template>

<script>
import FormElement from "../components/FormElement.vue";
import MessageBox from "../components/MessageBox.vue";
import BreadCrumb from "../components/BreadCrumb.vue";
import Loader from "../components/Loader.vue";
import categoryServices from "../services/categoryServices";
import helpers from "../services/helpers";
export default {
  name: "Categories",
  components: { Loader, FormElement, MessageBox, BreadCrumb },
  data: function () {
    return {
      isLoading: false,
      dialogState: false,
      message: "",
      editMessage: "",
      messageType: "",
      name: "",
      categoriesList: [],
      editData: {
        id: null,
        name: null,
      },
      breadCrumbData: [
        {
          name: "Home",
          url: "/",
        },
        {
          name: "Settings",
          url: "/settings",
        },
        {
          name: "Categories",
          url: "/settings/categories",
        },
      ],
    };
  },
  mounted() {
    this.isLoading = true;
    categoryServices
      .getAll()
      .then((result) => {
        this.categoriesList = helpers.sortData(result, "name", "string");
        this.isLoading = false;
      })
      .catch((e) => {
        console.log(e);
        this.isLoading = false;
      });
  },
  methods: {
    resetMessage() {
      if (this.message || this.messageType) {
        this.message = "";
        this.messageType = "";
      }
    },
    add(e) {
      e.preventDefault();
      this.isLoading = true;
      // Check for errors
      if (!this.name) {
        this.message = "Insert the Name.";
        this.messageType = "error";
        return;
      }
      //Add stuff in the DB
      const data = {
        id: helpers.makeId(15),
        name: this.name,
      };
      categoryServices
        .create(data)
        .then(() => {
          categoryServices
            .getAll()
            .then((result) => {
              this.categoriesList = helpers.sortData(result, "name", "string");
              this.message = "Category correctly created.";
              this.messageType = "success";
              this.isLoading = false;
            })
            .catch((e) => {
              console.log(e);
              this.isLoading = false;
            });
        })
        .catch((e) => {
          this.message = e;
          this.messageType = "error";
          this.isLoading = false;
        });
    },
    edit(e) {
      e.preventDefault();
      this.isLoading = true;
      // Check for errors
      if (!this.editData.name) {
        this.editMessage = "Insert the Value.";
        this.messageType = "error";
        return;
      }
      //Add stuff in the DB
      const data = {
        id: this.editData.id,
        name: this.editData.name,
      };

      categoryServices
        .update(data)
        .then(() => {
          categoryServices
            .getAll()
            .then((result) => {
              this.categoriesList = helpers.sortData(result, "name", "string");
              this.editMessage = "Category correctly modified.";
              this.messageType = "success";
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
    remove(id) {
      this.isLoading = true;
      categoryServices
        .delete(id)
        .then(() => {
          categoryServices
            .getAll()
            .then((result) => {
              this.categoriesList = helpers.sortData(result, "name", "string");
              this.isLoading = false;
            })
            .catch((e) => {
              console.log(e);
              this.isLoading = false;
            });
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
    openDialog(data) {
      this.editData.id = data.id;
      this.editData.name = data.name;
      this.dialogState = true;
    },
  },
};
</script>


<style scoped>
.unit-box {
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

.buttons-wrapper {
  display: flex;
  align-items: center;
}
.add-line-button {
  display: inline-flex;
  align-items: center;
}
.add-line-button img {
  margin-right: 6px;
}
</style>
