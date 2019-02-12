<template>
  <div class="asdasd">
    首页首页aaa
    {{ shit }}
    <br>
    {{ count }}
    <button @click="$store.commit('increment')">点我a</button>
  </div>
</template>
<style lang="less" scoped>
  .asdasd {
    color: #aaaaaa;
  }
</style>
<script>
export default {
  components: {},
  data() {
    return {
      shit: '1啊啊撒旦asdasdasdf'
    }
  },
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>


