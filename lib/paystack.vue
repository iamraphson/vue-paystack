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

<script>
import { defineComponent, ref, onBeforeMount, onMounted } from "vue";

export default defineComponent({
    name: "PayStack",
    props: {
        embed: {
            type: Boolean,
            default: false,
        },
        paystackkey: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            default: "",
        },
        lastname: {
            type: String,
            default: "",
        },
        amount: {
            type: Number,
            required: true,
        },
        reference: {
            type: String,
            required: true,
        },
        channels: {
            type: Array,
            default: function() {
                return ["card", "bank"];
            },
        },
        accessCode: {
            type: String,
            default: "",
        },
        callback: {
            type: Function,
            required: true,
            default: function(response) {
                return response;
            },
        },
        close: {
            type: Function,
            required: true,
            default: function() {},
        },
        metadata: {
            type: Object,
            default: function() {
                return {};
            },
        },
        currency: {
            type: String,
            default: "NGN",
        },
        plan: {
            type: String,
            default: "",
        },
        quantity: {
            type: String,
            default: "",
        },
        subaccount: {
            type: String,
            default: "",
        },
        split: {
            type: Object,
            default: function() {
                return {};
            },
        },
        splitCode: {
            type: String,
            default: "",
        },
        transactionCharge: {
            type: Number,
            default: 0,
        },
        bearer: {
            type: String,
            default: "",
        },
    },

    setup(props) {
        const scriptLoaded = ref(null);
        let loadScript = (callback) => {
            const script = document.createElement("script");
            script.src = "https://js.paystack.co/v1/inline.js";

            document.getElementsByTagName("head")[0].appendChild(script);
            if (script.readyState) {
                // IE
                script.onreadystatechange = () => {
                    if (
                        script.readyState === "loaded" ||
            script.readyState === "complete"
                    ) {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                // Others
                script.onload = () => {
                    callback();
                };
            }
        };
        let isDynamicSplit = () => {
            return (
                props.split.constructor === Object &&
        Object.keys(props.split).length > 0
            );
        };

        let payWithPaystack = () => {
            scriptLoaded.value &&
        scriptLoaded.value.then(() => {
            const paystackOptions = {
                key: props.paystackkey,
                email: props.email,
                firstname: props.firstname,
                lastname: props.lastname,
                channels: props.channels,
                amount: props.amount,
                access_code: props.accessCode,
                ref: props.reference,
                callback: (response) => {
                    props.callback(response);
                },
                onClose: () => {
                    props.close();
                },
                metadata: props.metadata,
                currency: props.currency,
                plan: props.plan,
                quantity: props.quantity,
                subaccount: isDynamicSplit() ? "" : props.subaccount,
                split: isDynamicSplit() ? props.split.value : null,
                split_code: isDynamicSplit() ? "" : props.splitCode,
                transaction_charge: isDynamicSplit() ? 0 : props.transactionCharge,
                bearer: isDynamicSplit() ? "" : props.bearer,
            };

            if (props.embed) {
                paystackOptions.container = "paystackEmbedContainer";
            }

            const handler = window.PaystackPop.setup(paystackOptions);
            if (!props.embed) {
                handler.openIframe();
            }
        });
        };
        onBeforeMount(() => {
            scriptLoaded.value = new Promise((resolve) => {
                loadScript(() => {
                    resolve();
                });
            });
        });
        onMounted(() => {
            if (props.embed) {
                payWithPaystack();
            }
        });
        return {
            payWithPaystack,
            // scriptLoaded: scriptLoaded.value,
        };
    },
});
</script>>
