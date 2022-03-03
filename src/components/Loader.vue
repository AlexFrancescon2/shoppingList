<template>
  <div class="loader-wrapper">
    <div class="loader">
      <div class="triple-spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  components: {},
  props: {},
  data: function () {
    return {};
  },
};
</script>


<style scoped>
.loader-wrapper {
  position: absolute;
  top: 0%;
  height: 100vh;
  width: 100%;
  z-index: 999;
  background-color: rgb(0 0 0 / 85%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.triple-spinner {
  display: block;
  position: relative;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top: 4px solid #058500;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

.triple-spinner::before,
.triple-spinner::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 4px solid transparent;
}
.triple-spinner::before {
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-top-color: #40a506;
  -webkit-animation: spin 3s linear infinite;
  animation: spin 3.5s linear infinite;
}
.triple-spinner::after {
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-top-color: #31d455;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.75s linear infinite;
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
