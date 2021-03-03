<template>
  <div>
    <h1>Frequently Aasked Questions</h1>
    <div class="wrapper">
      <div v-for="category in categories" :key="category" class="category">
        <p class="categoryTitle">{{category.title}}</p>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "FAQ",
  components: {},
  data() {
    return {
      categories: [
        {
          id: 'loading',
          title: 'Loading FAQ...'
        }
      ],
      faqs: [

      ]
    };
  },
};
</script>

<style scoped>
  .wrapper {
    max-width: 300px;
    width: fit-content;
  }

  .category {
    background-color: #2F3136;
  }

  .categoryTitle {
    width: 100%;
    max-width: 100%;
    height: fit-content;
  }
</style>
