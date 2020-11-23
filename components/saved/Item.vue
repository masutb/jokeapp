<template>
  <div class="item">
    <Btn type="delete" @click.prevent="remove">
      <template v-slot:icon>
        <Icon />
      </template>
    </Btn>
    <span>{{ jokeText }}</span>
  </div>
</template>

<script>
import Btn from '~/components/Btn'
import Icon from '~/assets/svgs/bin.svg?inline'

export default {
  components: {
    Btn,
    Icon,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    jokeText() {
      return this.data.type === 'twopart'
        ? this.data.setup + ' ' + this.data.delivery
        : this.data.joke
    },
  },
  methods: {
    remove() {
      this.$store.commit('jokes/removeFromSaved', this.data)
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid fade(#000, 5%);

  button {
    margin: 0 20px 0 0;
  }
}
</style>
