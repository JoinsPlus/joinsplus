<template>
  <div>
    <h1>Frequently Asked Questions</h1>
    <div class="wrapper">
      <div v-for="category in categories" :key="category._id" class="category">
        <p class="categoryTitle">
          <strong>{{ category.title }}</strong>
        </p>
        <faq
          v-for="faq in faqs.filter((a) => {
            return a.parent == category._id;
          })"
          :key="faq._id"
          :title="faq.title"
          :content="faq.content"
        >
        </faq>
      </div>
    </div>
  </div>
</template>

<script>
import faq from "../components/faq";

// @ is an alias to /src
export default {
  name: "FAQ",
  components: {
    faq,
  },
  data() {
    return {
      categories: [
        {
          _id: "joinsp",
          title: "Joins+",
        },
      ],
      faqs: [
        {
          _id: "whatisit",
          parent: "joinsp",
          title: "What is Joins+?",
          content:
            "Joins+ is a way to find communities you would like to partake in, and get people to find your communities",
        },
      ],
    };
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 800px;
}

.category {
  padding: 5px;
  background-color: #2f3136;
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  height: fit-content;
}

.qcontent {
  height: 0px;
  overflow: hidden;
  transition: height 0.5s;
}

.qcontent.open {
  height: fit-content;
}

.categoryTitle {
  font-size: 25px;
  padding: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  height: fit-content;
}
</style>
