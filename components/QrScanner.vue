<template>
  <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
    <div v-if="validationSuccess" class="validation-success">
      {{ result }}
    </div>

    <div v-if="validationFailure" class="validation-failure">
      This is NOT a URL!
    </div>

    <div v-if="validationPending" class="validation-pending">
      Validazione ...
    </div>
  </qrcode-stream>
</template>

<script>
/* eslint-disable no-console */
import { QrcodeStream } from 'vue-qrcode-reader'

export default {

  components: { QrcodeStream },

  data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null
    }
  },

  computed: {
    validationPending () {
      return this.isValid === undefined &&
        this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },

  methods: {

    onInit (promise) {
      promise
        .catch(console.error)
        .then(this.resetValidationState)
    },

    resetValidationState () {
      this.isValid = undefined
    },

    async onDecode (content) {
      this.turnCameraOff()

      await this.timeout(1000)
      // this.isValid = content.startsWith('http')
      const res = await this.$http.$post('/api/greenpass/validate', { qrData: content })
      this.result = res
      if ((res.code !== null) && (res.code !== undefined)) {
        this.isValid = true
      }

      // some more delay, so users have time to read the message
      await this.timeout(5000)

      this.turnCameraOn()
    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    }
  }
}
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>
