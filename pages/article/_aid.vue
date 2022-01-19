<template>
  <milkdown-editor />
</template>

<script>
export default {
  name: 'BlogPage',
  asyncData ({ params }) {
    const aid = params.aid
    return { aid }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
