<template lang="pug">
    div
      b-navbar(toggleable="lg" type="dark" variant="info")
        b-navbar-brand(:to="{ path: '/home' }") Inicio
        //- Botón para el cierre de sesión
        b-button.ml-auto.btn-outline-light(variant="outline-light" @click="logout()") Cerrar Sesion
    </template>
<script>
export default {
  name: "AppHeader",
  data() {
    return {
      // Define any data properties you need here
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
