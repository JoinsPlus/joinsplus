<template>
  <div>
    <p v-on:click="toggle" class="clickable">
      <strong>{{ title }}</strong>
    </p>
    <vue-markdown class="qcontent" :class="open ? 'open' : ''">{{
      content
    }}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

// @ is an alias to /src
export default {
  name: "faq",
  components: {
    VueMarkdown,
  },
  methods: {
    toggle() {
      this.$data.open = !this.$data.open;
    },
  },
  data() {
    return {
      open: false,
    };
  },
  props: {
    title: String,
    content: String,
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

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
  margin-top: 0;
  height: 0px;
  overflow: hidden;
  transition: height 0.5s;
  transform: translateY(-25px);
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
<style>
.qcontent.open > p {
  margin-bottom: 0;
}
</style>
