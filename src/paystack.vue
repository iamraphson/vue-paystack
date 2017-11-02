<template>
    <button v-text="text" class="payButton" @click="payWithPaystack"></button>
</template>

<script type="text/javascript">
  const script = document.createElement('script')
  script.src = 'https://js.paystack.co/v1/inline.js'
  document.getElementsByTagName('head')[0].appendChild(script)
  export default {
      props: {
          paystackkey: {
              type: String,
              required: true
          },
          email: {
              type: String,
              required: true
          },
          amount: {
              type: Number,
              required: true
          },
          reference: {
              type: String,
              required: true
          },
          callback: {
              type: Function,
              required: true,
              default: function(response) {}
          },
          close: {
              type: Function,
              required: true,
              default: function() {}
          },
          text: {
              type: String,
              default: 'Make Payment'
          },
          metadata: {
              type: Object,
              default: function() { return {} }
          },
          currency: {
              type: String,
              default: 'NGN'
          },
          plan: {
              type: String,
              default: ''
          },
          quantity: {
              type: String,
              default: ''
          },
          subaccount: {
              type: String,
              default: ''
          },
          transaction_charge: {
              type: Number,
              default: 0
          },
          bearer: {
              type: String,
              default: ''
          }
      },
      methods: {
          payWithPaystack() {
              const handler = window.PaystackPop.setup({
                  key: this.paystackkey,
                  email: this.email,
                  amount: this.amount,
                  ref: this.reference,
                  callback: (response) => {
                      this.callback(response)
                  },
                  onClose: () => {
                      this.close()
                  },
                  metadata: this.metadata,
                  currency: this.currency,
                  plan: this.plan,
                  quantity: this.quantity,
                  subaccount: this.subaccount,
                  transaction_charge: this.transaction_charge,
                  bearer: this.bearer
              })
              handler.openIframe()
          }
      }
  }
</script>

