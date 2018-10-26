<template>
  <div>
    <template v-if="product">
      <h2>{{ product.product_name }}</h2>
      <div>
        <small>¥</small>
        {{ product.price }}</div>
      <div>{{ product.description }}</div>
    </template>
    <template v-else>
      loading...
    </template>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {
        product: null,
      }
    },
    created() {
      fetch(`/product/productitem/${this.id}`).then((data) => {
        return data.json();
      }).then((parsed_data) => {
        this.product = parsed_data;
      });
    },
  }
</script>