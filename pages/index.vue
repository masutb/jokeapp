<template>
  <div class="jokes">
    <img :src="require('~/assets/images/joker.jpeg')" />

    <transition>
      <div v-if="!currentJoke.hasOwnProperty('id')" class="jokes__actions">
        <Btn :is-loading="isLoading" @click.prevent="requestJoke">
          Tell me {{ currentJoke.id ? 'another' : 'a' }} joke!
        </Btn>
      </div>
    </transition>

    <ul id="list" class="jokes__current">
      <li
        v-for="item in list"
        ref="item"
        :key="item.id"
        class="jokes__current__item"
      >
        <Joke :data="item" :active="currentJoke.id === item.id" />
      </li>
    </ul>

    <Saved />
  </div>
</template>

<script>
import anime from 'animejs'
import Joke from '~/components/Joke'
import Btn from '~/components/Btn'
import Saved from '~/components/saved/List'

export default {
  components: {
    Joke,
    Btn,
    Saved,
  },
  data() {
    return {
      isSaving: false,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.jokes.isLoading
    },
    currentJoke() {
      return this.$store.state.jokes.current
    },
    list() {
      return this.$store.state.jokes.list
    },
  },
  watch: {
    currentJoke() {
      setTimeout(() => {
        anime({
          targets: '#list',
          duration: 600,
          // easing: 'easeOutExpo',
          height: this.$refs.item[this.list.length - 1].clientHeight + 'px',
        })
      }, 0)
    },
  },
  mounted() {
    this.$store.dispatch('jokes/load')
  },
  methods: {
    requestJoke() {
      this.$store.dispatch('jokes/request')
    },
  },
}
</script>

<style lang="less" scoped>
.jokes {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: linear-gradient(to right, #1e3c72, #2a5298);
  box-sizing: border-box;

  img {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top center;
    mix-blend-mode: overlay;
  }

  &__actions {
    position: relative;
    z-index: 3;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translate3d(0, -50%, 0);
  }

  &__current {
    position: relative;
    z-index: 2;
    mix-blend-mode: difference;
    flex: 0 0 auto;
    width: 100%;
    max-width: 800px;
    margin: auto;
    overflow: hidden;

    &__item {
      position: absolute;
      top: 0;
      left: 0;
      height: auto;
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
