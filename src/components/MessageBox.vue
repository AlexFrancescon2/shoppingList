<template>
  <div :class="['message-box', type]">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  components: {},
  props: {
    message: String,
    type: String,
  },
  data: function () {
    return {};
  },
};
</script>


<style scoped>
.message-box {
  padding: 10px;
}
.message-box p {
  margin: 0;
}
.message-box.success {
  background-color: rgb(124, 221, 124);
  border-color: rgb(73, 158, 73);
  border-radius: 5px;
  color: rgb(73, 158, 73);
}
.message-box.error {
  background-color: rgb(221, 124, 124);
  border-color: rgb(158, 73, 73);
  border-radius: 5px;
  color: rgb(158, 73, 73);
}
</style>
