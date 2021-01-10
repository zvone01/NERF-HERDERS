<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" ref="backdrop" @click="closeModal">
        <div class="modal-container">
          <div class="modal-head">
            <span>{{ info.name }}</span>
          </div>
          <div class="modal-body">
            <slot name="body">
              {{ info.description }}
            </slot>
            <button class="modal-default-button" @click="$emit('close')">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  methods: {
    closeModal(e) {
      if (e.target === this.$refs.backdrop) {
        this.$emit("close");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$black: rgba(0, 0, 0);
$white: rgb(255, 255, 255);

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($black, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: $white;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba($black, 0.33);
  transition: all 0.3s;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>
