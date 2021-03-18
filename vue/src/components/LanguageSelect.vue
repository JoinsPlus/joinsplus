<template>
  <div class="background">
    <div class="main">
      <h2>{{ $t("SelectLang") }}</h2>
      <div class="locale-changer">
        <!--<select v-model="$i18n.locale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
            {{ lang }}
          </option>
        </select>-->
        <div
          v-for="(lang, i) in langs"
          :key="`Langs${i}`"
          :value="lang"
          class="language"
          :class="lang == $i18n.locale ? 'selected' : ''"
        >
          <input
            type="radio"
            :id="lang"
            :value="lang"
            v-model="$i18n.locale"
            v-on:change="update"
          />
          <label :for="lang">
            <img
              :src="`https://twemoji.maxcdn.com/v/13.0.2/72x72/${
                flagReg[lang] || flagReg['en']
              }.png`"
            />
            {{ namesLocal[lang] || names[lang] }}</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "../i18n";
import flagReg from "../flagReg";
import names from "../i18nNames";
import simplebar from "simplebar-vue";
import namesLocal from "../i18nNamesLocal";

export default {
  name: "LanguageSelect",
  components: {
    simplebar,
  },
  methods: {
    close() {
      if (this.$props.exit) this.$props.exit();
    },
    update(ev) {
      console.log(ev.target.id);
      localStorage.lang = ev.target.id;
    },
  },
  mounted() {
    this.$el.addEventListener("click", (ev) => {
      console.log(ev.target == this.$el);
      if (ev.target == this.$el) this.close();
    });
  },
  data() {
    return {
      langs: Object.keys(i18n),
      namesLocal: namesLocal,
      flagReg: flagReg,
      names: names,
    };
  },
  props: {
    exit: undefined,
  },
};
</script>

<style scoped>
.background {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.main {
  height: fit-content;
  width: fit-content;
  padding: 25px;
  background-color: #36393f;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  max-height: calc(100vh - 150px);
  overflow: auto;
}

.main::-webkit-scrollbar {
  display: none;
}

h2 {
  margin: 0;
  margin-top: 5px;
  margin-bottom: 15px;
  margin-left: 25px;
  margin-right: 25px;
}

.language {
  text-align: left;
  background-color: #292b2f;
  border-radius: 8px;
  margin-top: 10px;
  min-width: 280px;
}

.language.selected {
  background-color: #42b960;
}

input {
  display: none;
}

label {
  padding: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  display: block;
  cursor: pointer;
}

img {
  margin-right: 8px;
  float: left;
  height: 40px;
  transform: translateY(-10px);
}
</style>
