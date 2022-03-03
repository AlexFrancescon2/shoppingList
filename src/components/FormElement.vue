<template>
  <div
    :class="['form-group', classes]"
    v-if="type === 'text' || type === 'number'"
  >
    <label :for="id" class="control-label">{{ label }}</label>
    <input
      :type="type"
      :name="id"
      :id="id"
      class="form-control"
      :placeholder="placeholder"
      v-model="theValue"
    />
  </div>
  <div :class="['form-group', classes]" v-if="type === 'select'">
    <label :for="id" class="control-label">{{ label }}</label>
    <select :name="id" :id="id" v-model="theValue" class="form-control">
      <option v-for="(value, index) in values" :key="index" :value="value">
        {{ value }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FormElement",
  components: {},
  emits: ["onInput"],
  props: {
    id: String,
    label: String,
    type: String,
    placeholder: String,
    values: Array,
    classes: String,

  },
  data: function () {
    return {
      theValue: null,
    };
  },
  watch: {
    theValue() {
      this.$emit("onInput", this.theValue);
    },
  },
};
</script>


<style scoped>
.form-control {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 2px;
}
.form-control:focus {
  border-color: var(--black);
  outline: 0;
  box-shadow: 0 0 0 0.1rem var(--faded-black);
}
</style>
