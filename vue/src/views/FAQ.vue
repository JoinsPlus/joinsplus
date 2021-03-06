<template>
  <div>
    <h1>Frequently Asked Questions</h1>
    <div class="wrapper">
      <div v-for="category in categories" :key="category._id" class="category">
        <p class="categoryTitle">
          <strong>{{ category.title }}</strong>
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
          title: "Joins+",
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
          title: "Miscellaneous"
        }
      ],
      faqs: [
        {
          _id: "whatisit",
          parent: "joinsp",
          title: "What is Joins+?",
          content:
            "It is a free-to-use discord bot made by `Demon Martin#0193` & `VB_Dojnaz#6167`. \nThe bot's main function is to find new communities or build your community with the help of the bot. Some people are getting frustrated because they can't grow their community to a good amount of users. Joins+ is one of the easiest ways to grow your community.",
        },
        {
          _id: "notresponding",
          parent: "trouble",
          title: "The bot isn't responding",
          content:
            "If the Joins+ Bot is not responding it could have multiple reasons.\n**Here are the most common reasons:**\n**1**. The bot doesn't have enough permissions to send messages and embeds.\nTo fix this issue, give the bot a role with administrator permissions. Or use the command `-invite` then kick the bot and add it with the permissions it needs to your guild.\n**2**. The bot is offline. First, check if the bot is offline. You can check that by clicking on the profile picture of the Joins+ bot and checking if the dot bottom right is gray or green.\nIf the bot is offline join the support discord by using the command `-support` or by [clicking here](https://joins.plus/support) and check the `📣・news` channel.\n**3**. Your bot access may get revoked by a bot developer or administrator due to breaking any rules.",
        },
        {
          _id: "noreactions",
          parent: "trouble",
          title: "I can't see any reactions",
          content:
            "There are **2** possible issues.\n**1**. You have disabled the `Show emoji reactions on messages` setting.\nCheck it by navigating to `User Settings > Text & Images > Show emoji reactions on messages`.\n**2**. The bot doesn't own enough permissions to react to the message. To fix this issue, give the bot `Add Reactions` permissions.",
        },
        {
          _id: "whatarecoins",
          parent: "coins",
          title: "What are coins?",
          content:
            "Coins is the virtual currency of Joins+. Use the coins to order invitations to your guild, or give them to a friend",
        },
        {
          _id: "howtoearn",
          parent: "coins",
          title: "How do I get these coins?",
          content:
            "There are many ways to earn coins. \n**The most common ways are listed here:**\n **1**. By using the `-find` command. *(First you need to log in by using `-login` or by [clicking here](https://joins.plus/login) to be able to use the command.)* \n **2**. By using the `-daily` command which gives you every 24h **3 Coins**,\n **3**. By getting it gifted from a friend. *(You can gift coins with the `-pay <USER> <COINS>` command.\n **4**. Getting the coins from an event hosted on the support discord server [link](https://joins.plus/support). We have a daily public `guess the number` & more events hosted by our community.\n  **5**. Winning a Giveaway hosted by us.",
        },
        {
          _id: "reportbugs",
          parent: "misc",
          title: "How do I report bugs?",
          content:
            "If you found a bug you can report it by joining our discord support guild.\nTo join us, use the `-support` command or [click here](https://joins.plus/login).",
        }
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
