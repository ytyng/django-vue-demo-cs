<template>
  <div>
    <h2>商品リスト</h2>
    <template v-if="products">
      <ul>
        <li v-for="product in products">
          <div @click="$router.push({name: 'detail', params:{id: product.id}})">
            #{{ product.id }} {{ product.product_name }}
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      loading
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        products: [],
      }
    },
    created() {
      fetch('/product/productitem/').then((data) => {
        return data.json();
      }).then((parsed_data) => {
        this.products = parsed_data;
      });
    },
  }
</script>