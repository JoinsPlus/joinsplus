<template>
  <div>
    <h1>Frequently Aasked Questions</h1>
    <div class="wrapper">
      <div v-for="category in categories" :key="category._id" class="category">
        <p class="categoryTitle">{{category.title}}</p>
        <div v-for="faq in faqs.filter((a) => {return a.parent == category._id})" :key="faq._id">
          <p>{{faq.title}}</p>
          <vue-markdown>{{faq.content}}</vue-markdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

// @ is an alias to /src
export default {
  name: "FAQ",
  components: {
    VueMarkdown
  },
  data() {
    return {
      categories: [
        {
          _id: 'loading',
          title: 'Loading FAQ...'
        }
      ],
      faqs: [
        {
          _id: 'loadingf',
          parent: 'loading',
          title: 'Is this loading?',
          content: '~~Yes~~ **No**, not really. This part isn\'t implemented yet :)[https://joins.plus/freecoin](https://www.youtube.com/watch?v=dQw4w9WgXcQ)'
        }
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
