<template>
  <Loader v-if="isLoading" />
  <GDialog
    v-model="dialogState"
    max-width="800"
    transition="custom-from-bottom-transition"
  >
    <form @submit="edit" class="p-3">
      <div class="form-group">
        <label for="editvalue" class="control-label">Value</label>
        <input
          type="text"
          name="editvalue"
          id="editvalue"
          class="form-control"
          placeholder="Edit value"
          v-model="editData.value"
        />
      </div>
      <div class="form-group">
        <label for="edittype" class="control-label">Type</label>
        <select
          name="edittype"
          id="edittype"
          class="form-control"
          v-model="editData.type"
        >
          <option value="Quantity" :selected="'Quantity' === editData.type">
            Quantity
          </option>
          <option value="Weight" :selected="'Weight' === editData.type">
            Weight
          </option>
          <option value="Capacity" :selected="'Capacity' === editData.type">
            Capacity
          </option>
        </select>
      </div>
      <div v-if="editMessage && messageType" class="my-3">
        <MessageBox :message="editMessage" :type="messageType" />
      </div>
      <button type="submit" class="btn btn-custom mt-3">Save</button>
    </form>
  </GDialog>
  <BreadCrumb :path="breadCrumbData" />
  <div class="Units content">
    <h1>Units</h1>
    <div class="content-box">
      <h5>Add new unit</h5>
      <form @submit="add">
        <div class="row">
          <div class="col-md-4">
            <FormElement
              label="Value"
              type="text"
              id="value"
              @onInput="
                (newValue) => {
                  value = newValue;
                  resetMessage();
                }
              "
            />
          </div>
          <div class="col-md-4">
            <FormElement
              label="Type"
              type="select"
              id="type"
              :values="['Weight', 'Quantity', 'Capacity']"
              @onInput="
                (newValue) => {
                  type = newValue;
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
      <h5>Unit list</h5>
      <div class="row mb-3">
        <div
          class="col-12 col-md-6 col-lg-4"
          v-for="param in unitList"
          :key="param.id"
        >
          <div class="row">
            <div class="col-8">
              <div class="unit-box">
                <span>{{ param.value }} ({{ param.type }})</span>
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
      <p class="font-italic" v-if="!unitList.length">
        There are no units to display.
      </p>
    </div>
  </div>
</template>

<script>
import FormElement from "../components/FormElement.vue";
import MessageBox from "../components/MessageBox.vue";
import BreadCrumb from "../components/BreadCrumb.vue";
import Loader from "../components/Loader.vue";
import unitServices from "../services/unitServices";
import helpers from "../services/helpers";
export default {
  name: "Units",
  components: { Loader, FormElement, MessageBox, BreadCrumb },
  data: function () {
    return {
      isLoading: false,
      dialogState: false,
      message: "",
      editMessage: "",
      messageType: "",
      value: "",
      type: "",
      unitList: [],
      editData: {
        id: null,
        value: null,
        type: null,
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
          name: "Units",
          url: "/settings/units",
        },
      ],
    };
  },
  mounted() {
    this.isLoading = true;
    unitServices
      .getAll()
      .then((result) => {
        this.unitList = helpers.sortData(result, "value", "string");
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
      if (!this.value) {
        this.message = "Insert the Value.";
        this.messageType = "error";
        return;
      }
      if (!this.type) {
        this.message = "Select the type.";
        this.messageType = "error";
        return;
      }
      //Add stuff in the DB
      const data = {
        id: helpers.makeId(15),
        value: this.value,
        type: this.type,
      };
      unitServices
        .create(data)
        .then(() => {
          unitServices
            .getAll()
            .then((result) => {
              this.unitList = helpers.sortData(result, "value", "string");
              this.message = "Unit correctly created.";
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
      if (!this.editData.value) {
        this.editMessage = "Insert the Value.";
        this.messageType = "error";
        return;
      }
      if (!this.editData.type) {
        this.editMessage = "Select the type.";
        this.messageType = "error";
        return;
      }
      //Add stuff in the DB
      const data = {
        id: this.editData.id,
        value: this.editData.value,
        type: this.editData.type,
      };
      console.log("editData: EDIT", data);
      unitServices
        .update(data)
        .then(() => {
          unitServices
            .getAll()
            .then((result) => {
              this.unitList = helpers.sortData(result, "value", "string");
              this.editMessage = "Unit correctly modified.";
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
      unitServices
        .delete(id)
        .then(() => {
          unitServices
            .getAll()
            .then((result) => {
              this.unitList = helpers.sortData(result, "value", "string");
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
      this.editData.value = data.value;
      this.editData.type = data.type;
      this.dialogState = true;
      console.log("editData: opendialog", this.editData);
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
