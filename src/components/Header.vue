<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"> Home </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menu
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link to="/manage-shopping" class="dropdown-item">
                  Shopping list
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <div class="settings-wrapper">
          <router-link to="/settings">
            <img
              :src="require('@/assets/icons/settings.svg')"
              class="icon icon-settings"
            />
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: {},
  data: function () {
    return {};
  },
};
</script>


<style scoped>
.navbar {
  background-color: var(--dark-black) !important;
  min-height: var(--header-height);
}
a {
  color: white !important;
}
.dropdown-item {
  color: var(--black) !important;
}
.settings-wrapper {
  width: 25px;
  height: 25px;
}
</style>
