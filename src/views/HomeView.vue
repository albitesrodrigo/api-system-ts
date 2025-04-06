<template lang="pug">
  .table-list
    Header
    .p-3
      button.btn.btn-primary.mb-3(@click="createProduct()") Crear producto
      table.table.table-hover.table-dark
        thead
          tr
            th(scope="col") #
            th(scope="col") Título
            th(scope="col") Descripción
            th(scope="col") Categoría
            th(scope="col") Precio
            th(scope="col") Stock
            th(scope="col") Calificación
            th(scope="col") Acciones
        tbody
          tr(v-for="(product, index) in listProducts" :key="index")
            th(scope="row") {{ index + 1 }}
            td {{ product.title }}
            td {{ product.description }}
            td {{ product.category }}
            td S/ {{ product.price }}
            td {{ product.stock }}
            td {{ product.rating }}
            td
              .d-flex.justify-content-center
                button.mx-2.btn.btn-primary.btn-sm(@click.stop="editProduct(product.id)") Editar
                button.btn.btn-danger.btn-sm(@click.stop="deleteProduct(product.id)") Eliminar
    Footer
  </template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import toastMixin from "@/shared/toastMixin";
import { mapActions, mapState } from "vuex";

export default {
  name: "HomeView",
  mixins: [toastMixin],
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  computed: {
    ...mapState(["listProducts"]),
  },
  mounted() {
    this.getdata();
  },
  methods: {
    ...mapActions(["setListProducts"]),

    getdata() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
      } else {
        axios
          .get("https://dummyjson.com/products", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            this.setListProducts(response.data.products);
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
            this.makeToast(
              "Error",
              this.errorMessage ?? "Error al cargar los productos",
              "danger"
            );
          });
      }
    },
    createProduct() {
      this.$router.push("/create-product");
    },
    editProduct(id) {
      this.$router.push(`/edit-product/${id}`);
      console.log("Editando producto con ID:", id);
    },
    deleteProduct(id) {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
      } else {
        axios
          .delete(`https://dummyjson.com/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.listProducts = this.listProducts.filter(
                (product) => product.id !== id
              );
              this.makeToast(
                "Producto eliminado",
                "El producto fue eliminado con éxito",
                "success"
              );
            }
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
            this.makeToast(
              "Error",
              this.errorMessage ?? "Error al eliminar el producto",
              "danger"
            );
          });
      }
    },
  },
};
</script>
<style scoped>
.table-list {
  background-color: #ebeced;
  padding-bottom: 100px;
}
</style>
