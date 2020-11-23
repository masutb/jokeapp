<template>
  <div
    class="saved"
    :class="{ 'saved-visible': list.length, 'saved-open': isOpen }"
  >
    <div class="saved__inner">
      <div class="saved__inner__top">
        <label id="label"
          >Saved Jokes (<span id="num">{{ list.length }}</span
          >)</label
        >
        <Btn size="sm" @click.prevent="isOpen = !isOpen">{{
          isOpen ? 'Hide' : 'Show'
        }}</Btn>
      </div>

      <transition-group
        tag="ul"
        :css="false"
        name="expand"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <li v-for="item in list" :key="item.id">
          <Item :data="item" />
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import Item from './Item'
import Btn from '~/components/Btn'

export default {
  components: {
    Btn,
    Item,
  },
  data() {
    return {
      isOpen: false,
      duration: 300,
    }
  },
  computed: {
    list() {
      return this.$store.getters['jokes/saved']
    },
  },
  watch: {
    list(curr, prev) {
      if (!curr.length) {
        this.isOpen = false
      }

      if (JSON.stringify(curr) === JSON.stringify(prev)) {
        return
      }

      const jokeIDs = curr.map((item) => item.id)
      localStorage.jokeIDs = JSON.stringify(jokeIDs)

      const tl = anime.timeline({
        targets: '#num',
        duration: 250, // Can be inherited
        easing: 'easeOutExpo', // Can be inherited
      })

      tl.add({
        scale: 1.25,
      }).add({
        scale: 1,
      })

      tl.play()
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
      el.style.overflow = 'hidden'
    },
    afterEnter(el) {
      el.style.opacity = ''
      el.style.height = ''
      el.style.overflow = 'hidden'
    },
    enter(el, done) {
      setTimeout(() => {
        el.style.height = 'auto'
        const height = el.clientHeight
        el.style.height = 0

        anime({
          targets: el,
          opacity: 1,
          height,
          duration: this.duration,
          easing: 'easeOutQuart',
          complete: done,
        })
      }, this.timeout)
    },
    leave(el, done) {
      anime.remove(el)
      anime({
        targets: el,
        opacity: 0,
        height: 0,
        duration: this.duration,
        easing: 'easeOutQuart',
        complete: done,
      })
    },
    beforeLeave(el) {
      el.style.overflow = 'hidden'
    },
    afterLeave(el) {
      el.style.overflow = 'visible'
    },
  },
}
</script>

<style lang="less" scoped>
.saved {
  position: fixed;
  z-index: 4;
  bottom: 0;
  height: 50%;
  width: 100%;
  box-shadow: inset 0 80px 40px -40px fade(#000, 25%);
  background: fade(#fff, 95%);
  transform: translate3d(0, 100%, 0);
  transition: transform 0.3s ease;
  overflow: auto;

  &-visible {
    transform: translate3d(0, calc(100% - 100px), 0);
  }

  &-open {
    transform: translate3d(0, 0, 0);
    transition: transform 0.45s ease;
  }

  &__inner {
    max-width: 1200px;
    padding: 20px 40px;
    margin: auto;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      label span {
        display: inline-block;
      }

      ::v-deep button {
        margin: 0;
      }
    }

    ul {
      padding: 20px 0 60px;

      li {
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

  label {
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
  }
}
</style>
