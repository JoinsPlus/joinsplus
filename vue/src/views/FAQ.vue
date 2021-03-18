<template>
  <div>
    <h1>{{ $t("FrequentlyAsked") }}</h1>
    <div class="wrapper">
      <div v-for="category in categories" :key="category._id" class="category">
        <p class="categoryTitle">
          <strong>{{ $t(category.title) }}</strong>
        </p>
        <div class="categoryContent">
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
          title: "JoinsPlus",
        },
        {
          _id: "trouble",
          title: "Troubleshooting",
        },
        {
          _id: "coins",
          title: "Coins",
        },
        {
          _id: "misc",
          title: "Miscellaneous",
        },
      ],
      faqs: [
        {
          _id: "whatisit",
          parent: "joinsp",
          title: "WhatIsJoinsPlus",
          content: "WhatIsJoinsPlusAnswer",
        },
        {
          _id: "notresponding",
          parent: "trouble",
          title: "NotResponding",
          content: "NotRespondingAnswer",
        },
        {
          _id: "noreactions",
          parent: "trouble",
          title: "CantSeeReactions",
          content: "CantSeeReactionsAnswer",
        },
        {
          _id: "whatarecoins",
          parent: "coins",
          title: "WhatAreCoins",
          content: "WhatAreCoinsAnswer",
        },
        {
          _id: "howtoearn",
          parent: "coins",
          title: "HowToGetCoins",
          content: "HowToGetCoinsAnswer",
        },
        {
          _id: "reportbugs",
          parent: "misc",
          title: "HowToReportBugs",
          content: "HowToReportBugsAnswer",
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
