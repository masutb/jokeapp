<template>
  <div class="item" :style="{ fontSize: fontSize + 'px' }">
    <span class="part" v-for="(part, i) in textParts" :key="i">{{ part + (i !== textParts.length - 1 ? '&nbsp;' : '')}}</span>
  </div>
</template>

<script>
import anime from 'animejs'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    jokeText() {
      return this.data.type === 'twopart' ? this.data.setup + ' ' + this.data.delivery : this.data.joke
    },
    textParts() {
      if (!this.jokeText.length) {
        return ['Try again.']
      }

      return this.jokeText.split(' ')
    },
    fontSize() {
      if (!this.jokeText.length) {
        return 80
      }

      let size = 80 + ((80 - this.jokeText.length) / 7.5)
      return Math.max(size, 32)
    }
  },
  watch: {
    active(val) {
      this.toggle(val)
    }
  },
  mounted() {
    this.active && this.toggle()
  },
  methods: {
    toggle(active = true) {
      if (active) {
        setTimeout(() => {
          anime({
            targets: this.$el.children,
            translateY: [-100, 0],
            opacity: 1,
            duration: 600,
            delay: (el, i) => 15 * i
          })
        }, 300)
      } else {
        anime({
          targets: this.$el.children,
          translateY: [0, -100],
          opacity: 0,
          duration: 600,
          delay: (el, i) => 15 * i
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  position: relative;
  display: inline-block;
  font-size: 60px;
  font-family: @font-fancy;
  color: #fff;
  margin: 0 auto;
  text-align: center;
  word-break: break-word;

  ::v-deep > span {
    transform: translateY(-100px);
    display: inline-block;
    opacity: 0;
  }
}
</style>
