<template>
  <div v-if="loading" class="loader">
    <img
      :src="require('./../assets/svg/pokeball.svg')"
      alt="Pokeball"
      class=""
      width="150"
      height="150"
    >
    <p class="text-white text-2xl mt-8 font-bold">
      Loading
    </p>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.loader img {
  animation: 1s loading-animation infinite linear;
}

.loader p::after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  animation: ellipsis steps(4, end) 1s infinite;
  content: "...";
  width: 0;
}

@keyframes ellipsis {
  to {
    width: 25px;
  }
}

@keyframes loading-animation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
