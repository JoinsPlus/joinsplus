<template>
  <div>
    <h1>{{ $t("Credits") }}</h1>
    <h2>{{ $t("BotDevs")}} </h2>
    <div v-for="dev in devs" :key="dev"></div>
  </div>
</template>

<script>
export default {
    name: "Credits",
    data() {
        return {
            devs: [
                '706902380637192212',
                '743183263710969913'
            ]
        }
    }
}
</script>
