<template>
  <div>
    <h1>{{ $t("NotFound") }}</h1>
    <p>{{ $t("PageDoesntExist") }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "NotFound",
  components: {},
  data() {
    return {};
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
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  height: fit-content;
}

.category:not(:first-child) {
  margin-top: 10px;
}

.categoryContent {
  background-color: #2f3136;
  border-radius: 5px;
  padding-bottom: 5px;
  margin-right: 8px;
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
  text-align: left;
  font-size: 25px;
  padding: 0px;
  padding-left: 2px;
  margin-top: 10px;
  margin-bottom: 3px;
  height: fit-content;
}
</style>
