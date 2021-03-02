<template>
  <div class="home">
    <p>API is hosted at {{ api }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      api: process.env.VUE_APP_API,
    };
  },
};
</script>
