<template>
  <button :class="classNames" type="button" v-on="$listeners">
    <slot name="icon" />
    <span>
      <slot />
    </span>
    <Loader v-if="isLoading" />
  </button>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  props: {
    isLoading: Boolean,
    size: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
  },
  computed: {
    classNames() {
      const classes = []

      if (this.size) {
        classes.push(`size-${this.size}`)
      }

      if (this.type) {
        classes.push(`type-${this.type}`)
      }

      if (this.isLoading) {
        classes.push('is-loading')
      }

      return classes
    }
  }
}
</script>

<style lang="less" scoped>
button {
  position: relative;
  margin: 10px;
  height: 80px;
  border-radius: 40px;
  background: #fff;
  padding: 0 40px;
  font-size: 20px;
  font-weight: 700;
  transition: padding 0.3s ease;
  box-shadow: 0 10px 20px fade(#000, 35%);
  display: flex;
  align-items: center;
  justify-content: center;

  &.size-sm {
    height: 60px;
    border-radius: 30px;
    padding: 0 30px;
  }

  &.type-delete {
    background: transparent;
    box-shadow: none;
    height: auto;
    border-radius: none;
    font-size: 12px;
    padding: 0;
    color: red;

    ::v-deep svg path:not([fill="none"]) {
      fill: red;
    }
  }

  &.is-loading {
    padding-left: 80px;
  }

  .loader {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
}
</style>