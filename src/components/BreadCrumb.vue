<template>
  <div class="breadcrumb">
    <router-link
      :to="element.url"
      v-for="(element, index) in path"
      :key="index"
    >
      <span :class="index === path.length - 1 ? 'chevron' : 'normal'">{{
        element.name
      }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  components: {},
  props: {
    path: Array,
  },
  data: function () {
    return {};
  },
};
</script>


<style scoped>
.breadcrumb {
  background-color: var(--grey);
  padding-left: var(--bs-gutter-x, 0.75rem);
  display: flex;
  align-items: center;
  min-height: var(--breadcrumb-height);
  margin-bottom: 0px;
}

a {
  text-decoration: none;
  color: var(--black);
  display: flex;
}

a span {
  padding: 5px 10px 5px 30px;
  height: 100%;
  position: relative;
}

.chevron {
  background-color: white;
}

.chevron::after {
  content: "";
  position: absolute;
  top: 0;
  right: -20px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 17.5px 0 17.5px 20px;
  border-color: transparent transparent transparent #ffffff;
}
.chevron::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 17.5px 0 17.5px 20px;
  border-color: transparent transparent transparent var(--grey);
}
</style>
