<template>
  <button
    v-if="!embed"
    class="payButton"
    @click="payWithPaystack"
  >
    <slot>Make Payment</slot>
  </button>
  <div
    v-else
    id="paystackEmbedContainer"
  />
</template>

<script type="text/javascript">
export default {
    props: {
        embed: {
            type: Boolean,
            default: false
        },
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
        transactionCharge: {
            type: Number,
            default: 0
        },
        bearer: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            scriptLoaded: null
        }
    },
    created() {
        this.scriptLoaded = new Promise((resolve) => {
            this.loadScript(() => {
                resolve()
            })
        })
    },
    mounted() {
        if (this.embed) {
            this.payWithPaystack()
        }
    },
    methods: {
        loadScript(callback) {
            const script = document.createElement('script')
            script.src = 'https://js.paystack.co/v1/inline.js'
            document.getElementsByTagName('head')[0].appendChild(script)
            if (script.readyState) {  // IE
                script.onreadystatechange = () => {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null
                        callback()
                    }
                }
            } else {  // Others
                script.onload = () => {
                    callback()
                }
            }
        },

        payWithPaystack() {
            this.scriptLoaded && this.scriptLoaded.then(() => {
                const paystackOptions = {
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
                }

                if (this.embed) {
                    paystackOptions.container = 'paystackEmbedContainer'
                }

                const handler = window.PaystackPop.setup(paystackOptions)
                if (!this.embed) {
                    handler.openIframe()
                }
            })
        }
    }
}
</script>

