<template lang="pug">
    div.bg-product(:key="$route.meta.key")
      Header
      .page-form
        h1.text-center {{ isEditMode ? "Editar producto" : "Crear producto" }}
        form(@submit.prevent="handleSubmit")
          .mb-3
            label(for="title" class="form-label") Título
            input#title.form-control(
              type="text"
              v-model="product.title"
              :class="{ 'is-invalid': v$.product.title.$error }"
            )
            div.text-danger(v-if="v$.product.title.$error") El título es obligatorio
          .mb-3
            label(for="description" class="form-label") Descripción
            textarea#description.form-control(
              rows="3"
              v-model="product.description"
              :class="{ 'is-invalid': v$.product.description.$error }"
            )
            div.text-danger(v-if="v$.product.description.$error") La descripción es obligatoria
          .row
            .col-md-6.mb-3
              label(for="category" class="form-label") Categoría
              select#category.form-control(
                v-model="product.category"
                :class="{ 'is-invalid': v$.product.category.$error }"
              )
                option(value="" disabled selected) Selecciona una categoría
                option(v-for="cat in categories" :key="cat.id" :value="cat.name") {{ cat.name }}
              div.text-danger(v-if="v$.product.category.$error") La categoría es obligatoria
            .col-md-6.mb-3
              label(for="price" class="form-label") Precio
              input#price.form-control(
                type="number"
                v-model.number="product.price"
                step="0.01"
                :class="{ 'is-invalid': v$.product.price.$error }"
              )
              div.text-danger(v-if="v$.product.price.$error") El precio debe estar entre {{ getPriceRange().min }} y {{ getPriceRange().max }} para la categoría seleccionada.
          .row
            .col-md-6.mb-3
              label(for="stock" class="form-label") Stock
              input#stock.form-control(
                type="number"
                v-model.number="product.stock"
                :class="{ 'is-invalid': v$.product.stock.$error }"
              )
              div.text-danger(v-if="v$.product.stock.$error") El stock debe ser un número válido
            .col-md-6.mb-3
              label(for="rating" class="form-label") Rating
              input#rating.form-control(
                type="number"
                v-model.number="product.rating"
                step="0.01"
                :class="{ 'is-invalid': v$.product.rating.$error }"
              )
              div.text-danger(v-if="v$.product.rating.$error") El rating debe ser un número válido
          .d-flex.justify-content-start.mt-2
            button.btn.btn-primary.mx-2(type="submit") {{ isEditMode ? "Actualizar" : "Crear" }}
            button.btn.btn-dark(type="button" @click="cancel") Cancelar
      Footer
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, numeric, minValue, between } from "@vuelidate/validators";
import { categories } from "@/util/mock-data";
import axios from "axios";
import toastMixin from "@/shared/toastMixin";

export default {
  name: "ProductForm",
  mixins: [toastMixin],
  components: {
    Header,
    Footer,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      categories,
      product: {
        title: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        rating: 0,
      },
      productId: null,
      isEditMode: false,
    };
  },
  validations() {
    return {
      product: {
        title: { required },
        description: { required },
        category: { required },
        price: {
          required,
          numeric,
          between: between(this.getPriceRange().min, this.getPriceRange().max),
        },
        stock: { required, numeric, minValue: minValue(1) },
        rating: { required, numeric, minValue: minValue(1) },
      },
    };
  },
  mounted() {
    this.updateFormState();
  },
  methods: {
    updateFormState() {
      this.productId = this.$route.params.id;
      if (this.productId) {
        this.isEditMode = true;
        this.loadProduct();
      } else {
        this.isEditMode = false;
        this.resetForm();
      }
    },
    getPriceRange() {
      const ranges = {
        "Productos electrónicos": { min: 250, max: 2000 },
        Libros: { min: 2, max: 50 },
        "Ropa y accesorios": { min: 10, max: 500 },
        Muebles: { min: 100, max: 5000 },
        Juguetes: { min: 5, max: 100 },
        "Deportes y aire libre": { min: 20, max: 1000 },
        "Belleza y cuidado personal": { min: 5, max: 200 },
        "Alimentos y bebidas": { min: 1, max: 100 },
      };
      // Retorna el rango de precios según la categoría del producto
      // Si la categoría no está definida, retorna un rango por defecto
      return ranges[this.product.category] || { min: 0, max: Infinity };
    },
    loadProduct() {
      const token = localStorage.getItem("token");
      axios
        .get(`https://dummyjson.com/products/${this.productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.product = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar el producto:", error);
          this.makeToast(
            "Error",
            "Error al cargar el producto. Por favor intenta nuevamente.",
            "danger"
          );
        });
    },
    resetForm() {
      this.product = {
        title: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        rating: 0,
      };
    },
    handleSubmit() {
      this.v$.product.$touch();
      if (this.v$.product.$invalid) {
        this.makeToast(
          "Error",
          "Por favor completa todos los campos requeridos.",
          "danger"
        );
        return;
      }

      const token = localStorage.getItem("token");
      const url = this.isEditMode
        ? `https://dummyjson.com/products/${this.productId}`
        : "https://dummyjson.com/products/add";
      const method = this.isEditMode ? "put" : "post";

      axios[method](url, this.product, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201)
            this.makeToast(
              "Éxito",
              `Producto ${
                this.isEditMode ? "actualizado" : "creado"
              } correctamente.`,
              "success"
            );
          setTimeout(() => {
            this.$router.push("/home");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error al guardar el producto:", error);
          this.makeToast(
            "Error",
            "Error al guardar el producto. Por favor intenta nuevamente.",
            "danger"
          );
        });
    },
    cancel() {
      this.$router.push("/home");
    },
  },
};
</script>
<style scope>
.bg-product {
  background-color: #e7f1fb;
}

.page-form {
  margin: auto;
  width: 80%;
  height: 90vh;
  padding: 20px;
}
</style>
