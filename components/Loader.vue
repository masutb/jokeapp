<template>
  <transition>
    <span
      class="loader"
    >
      <span class="spinner"></span>
      <span v-if="$slots.default" class="text"><slot /></span>
    </span>
  </transition>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    active: Boolean,
  }
}
</script>

<style lang="less" scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 32px;

  .spinner {
    display: block;
    position: relative;
    flex: 0 0 auto;
    width: 32px;
    height: 32px;
    animation: spinner 1s cubic-bezier(0.27, 0.54, 0.44, 0.78) infinite;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 3px solid currentColor;
      box-sizing: border-box;
    }

    &::before {
      opacity: 0.15;
    }

    &::after {
      border-color: transparent;
      border-top-color: currentColor;
    }
  }

  .text {
    padding-top: 10px;
  }

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
