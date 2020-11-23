<template>
  <header>
    <label
      >Joke<em>App</em><span>!<em>?</em></span></label
    >

    <transition>
      <div v-if="currentJoke.hasOwnProperty('id')" class="header--actions">
        <Btn size="sm" :is-loading="isLoading" @click.prevent="requestJoke">
          Tell me another joke!
        </Btn>
        <Btn size="sm" :disabled="isCurrentSaved" @click.prevent="saveJoke">
          {{ isCurrentSaved ? 'Joke saved!' : 'Save this joke!' }}
        </Btn>
      </div>
    </transition>
  </header>
</template>

<script>
import Btn from '~/components/Btn'

export default {
  components: {
    Btn,
  },
  computed: {
    isLoading() {
      return this.$store.state.jokes.isLoading
    },
    currentJoke() {
      return this.$store.state.jokes.current
    },
    isCurrentSaved() {
      return this.$store.getters['jokes/isCurrentSaved']
    },
  },
  methods: {
    requestJoke() {
      this.$store.dispatch('jokes/request')
    },
    saveJoke() {
      this.$store.commit('jokes/addToSaved', this.currentJoke)
    },
  },
}
</script>

<style lang="less" scoped>
header {
  position: fixed;
  padding: 0 40px;
  top: 0;
  left: 0;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 4;

  label {
    font-size: 40px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -3px;

    span {
      margin-left: 10px;
      letter-spacing: -6px;
      color: fade(#fff, 25%);
    }
  }

  .header--actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 -10px;
  }
}
</style>
