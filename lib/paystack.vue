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
import { defineComponent, ref, toRefs,onBeforeMount, onMounted } from "vue";

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
            validator: (value)=> {
                return value > 0
            },
        },
        reference: {
            type: String,
            required: true,
        },
        channels: {
            type: Array,
            default:()=> {
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
            default: (response)=> {
                return response;
            },
        },
        close: {
            type: Function,
            required: true,
            default: ()=> {},
        },
        metadata: {
            type: Object,
            default: ()=> {
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
            default:()=> {
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
        const {
            paystackkey,
            email,
            firstname,
            lastname,
            channels,
            amount,
            accessCode,
            reference,
            callback,
            close,
            metadata,
            currency,
            plan,
            quantity,
            splitCode,
            split,
            subaccount,
            transactionCharge,
            bearer,
            embed,
        } = toRefs(props);
        const scriptLoaded = ref(null);
        const loadScript = (callback) => {
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
                    callback()
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
                key: paystackkey.value,
                email: email.value,
                firstname: firstname.value,
                lastname: lastname.value,
                channels: channels.value,
                amount:amount.value,
                access_code: accessCode.value,
                ref: reference.value,
                callback: (response) => {
                    callback.value(response);
                },
                onClose: () => {
                    close.value();
                },
                metadata: metadata.value,
                currency: currency.value,
                plan:plan.value,
                quantity: quantity.value,
                subaccount: isDynamicSplit() ? "" : subaccount.value,
                split: isDynamicSplit() ? split.value : null,
                split_code: isDynamicSplit() ? "" : splitCode.value,
                transaction_charge: isDynamicSplit() ? 0 : transactionCharge.value,
                bearer: isDynamicSplit() ? "" : bearer.value,
            };

            if (embed.value) {
                paystackOptions.container = "paystackEmbedContainer";
            }

            const handler = window.PaystackPop.setup(paystackOptions);
            if (!embed.value) {
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
            if (embed.value) {
                payWithPaystack();
            }
        });
        return {
            payWithPaystack,
        };
    },
});
</script>>
