<template>
  <button :class="classNames" type="button" v-on="$listeners">
    <slot name="icon" />
    <span class="button__text">
      <slot />
    </span>
    <Loader v-if="isLoading" />

    <div class="button__bg"></div>
  </button>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader,
  },
  props: {
    isLoading: Boolean,
    size: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    classNames() {
      const classes = ['button']

      if (this.size) {
        classes.push(`button--size-${this.size}`)
      }

      if (this.type) {
        classes.push(`button--type-${this.type}`)
      }

      if (this.isLoading) {
        classes.push('button--is-loading')
      }

      return classes
    },
  },
}
</script>

<style lang="less" scoped>
.button {
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
  overflow: hidden;
  mask-image: -webkit-radial-gradient(white, black);

  &--size-sm {
    height: 60px;
    border-radius: 30px;
    padding: 0 30px;
  }

  &--type-delete {
    background: transparent;
    box-shadow: none;
    height: auto;
    padding: 10px;

    .button__bg {
      background: fade(red, 15%);
    }
  }

  &--is-loading {
    padding-left: 80px;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: @color-blue;
    transform: translate3d(0, 100%, 0);
    transition: transform 0.45s ease;
  }

  &__text,
  svg {
    position: relative;
    z-index: 2;
  }

  .loader {
    z-index: 2;
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }

  @media (hover: hover) {
    &:not(:disabled):hover .button__bg {
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>
