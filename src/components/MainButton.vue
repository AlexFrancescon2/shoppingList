<template>
  <router-link :to="routerUrl" class="main-button dflex flex-centered">
    <img :src="require(`@/assets/${img}`)" />
    <p class="text">{{ text }}</p>
  </router-link>
</template>

<script>
export default {
  name: "MainButton",
  components: {},
  props: {
    img: String,
    routerUrl: String,
    text: String,
  },
  data: function () {
    return {};
  },
};
</script>


<style scoped>
.main-button {
  width: 200px;
  height: 200px;
  border-radius: 8%;
  box-shadow: var(--medium-large-shadow);
  border: 2px solid white;
  background-color: var(--dark-black);
  margin: 30px;
  flex-direction: column;
  text-decoration: none;
}

.main-button:hover {
  -moz-box-shadow: var(--large-large-shadow);
  -webkit-box-shadow: var(--large-large-shadow);
  box-shadow: var(--large-large-shadow);
}
.main-button img {
  width: 90px;
  transition: all 0.2s ease-in-out;
}
.main-button:hover img {
  transform: scale(1.1);
}

.text {
  font-size: 18px;
  color: var(--black);
  background-color: white;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 0px;
  padding: 8px 10px;
  text-decoration: none;
  width: 100%;
  margin-top: 18px;
}
</style>
