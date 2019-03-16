<template>
  <button
    class="payButton"
    @click="payWithPaystack"
  >
    <slot>Make Payment</slot>
  </button>
</template>

<script type="text/javascript">
export default {
    props: {
        disabled: {
            type:Boolean,
            default: false,
        },
        paystackkey: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: 'NGN'
        },
        email: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            default: ""
        },
        lastname: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        customercode: {
            type:String,
            default: null
        },
        channels: {
            type: Array,
            default: () => []
        },
        paymentrequest: {
            type: String,
            default: ""
        },
        paymentpage: {
            type: String,
            default: ""
        },
        metadata: {
            type: Object,
            default: null
        },
        reference: {
            type: String,
            required: true
        },
        error: {
            type: Function,
            default: (response) => {}
        },
        load: {
            type: Function,
            default: (response) => {}
        },
        callback: {
            type: Function,
            required: true,
            default: (response) => {}
        },
        close: {
            type: Function,
            required: true,
            default:  () => {}
        },
        subaccount: {
            type: String,
            default: ""
        },
        bearer: {
            type: String,
            default: ""
        },
        transactionCharge: {
            type: Number,
            default: 0
        },
        plan: {
            type: String,
            default: null
        },
        subscriptionCount: {
            type: Number,
            default: 0
        },
        planInterval: {
            type: String,
            default: ""
        },
        subscriptionLimit: {
            type: Number,
            default: 0
        },
        subscriptionDate: {
            type: String,
            default: ""
        }
    },
    data() {
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
    methods: {
        loadScript(callback) {
            const script = document.createElement('script')
            script.src = `https://js.paystack.co/v2/inline.js`
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
            console.log(this.reference)
            this.scriptLoaded &&
        this.scriptLoaded.then(() => {

            const {
                paystackkey,
                email,
                amount,
                callback,
                close,
                currency,
                metadata,
                reference,
                error,
                load,
                firstname,
                lastname,
                phone,
                customercode,
                channels,
                paymentrequest,
                paymentpage,
                subaccount,
                bearer,
                transaction_charge, //eslint-disable-line
                plan,
                subscription_count, //eslint-disable-line
                plan_interval, //eslint-disable-line
                subscription_limit, //eslint-disable-line
                subscription_date //eslint-disable-line
            } = this

            const payload = {
                key: paystackkey,
                email,
                amount,
                currency,
                metadata,
                reference,
                onSuccess: (transaction) => callback(transaction),
                onCancel: () => close(),
                onLoad: (response) => load(response),
                onError: (response) => error(response),
                firstName: firstname,
                lastName: lastname,
                phone,
                channels,
                paymentRequest: paymentrequest,
                paymentPage: paymentpage,
                subaccountCode: subaccount,
                bearer,
                transactionCharge: transaction_charge,
                subscriptionCount: subscription_count,
                planInterval: plan_interval,
                subscriptionLimit: subscription_limit,
                subscriptionStartDate: subscription_date
            }

            if(customercode){
                payload.customerCode = customercode
            }

            if(plan){
                payload.planCode = plan
            }

            const paystackInstance  = new window.PaystackPop();
            paystackInstance.newTransaction(payload)
        })
        }
    }
}
</script>

