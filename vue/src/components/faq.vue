<template>
  <div class="wrapper">
    <p v-on:click="toggle" class="clickable">
      <i class="fas fa-sort-down" :class="open ? 'open' : ''"></i>
      <strong>{{ $t(title) }}</strong>
    </p>
    <vue-markdown class="qcontent" v-if="open" :source="$t(content)" />
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown-render'

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
.fas.fa-sort-down {
  padding-right: 15px;
  transition: transform 0.25s;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  transform: translateX(-3px) rotate(-90deg);
}
.fas.fa-sort-down.open {
  transform: translateY(-2px);
}
.clickable {
  cursor: pointer;
  text-align: left;
  padding-top: 15px;
  margin-top: 0;
  padding-left: 15px;
}

.wrapper {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 800px;
}

.category {
  padding: 5px;
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  height: fit-content;
}

.qcontent {
  margin-top: 0;
  height: fit-content;
  overflow: hidden;
  transition: height 0.5s;
  /*transform: translateY(-25px);*/
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
.qcontent > p {
  padding: 25px;
  padding-top: 0;
  margin-bottom: 0;
  margin-top: 0;
  text-align: left;
}
</style>
