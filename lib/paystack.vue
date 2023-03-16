<template>
  <button
    v-if="!embed"
    class="payButton"
    @click="payWithPaystack(callback, close)"
  >
    <slot>Make Payment</slot>
  </button>
  <div v-else id="paystackEmbedContainer" />
</template>

<script lang="ts">
import { defineComponent, toRefs, onMounted, onBeforeMount, watch } from "vue";
import usePaystack from "./use-paystack";
import usePaystackScript from "./paystack-script";

import type { PropType } from "vue";
import type {
  callback,
  PaymentChannels,
  PaystackMetadata,
  Currency,
  Bearer,
} from "./types";

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
      validator: (value: number) => {
        return value > 0;
      },
    },
    reference: {
      type: String,
      required: true,
    },
    channels: {
      type: Array as PropType<PaymentChannels[]>,
      default: () => {
        return ["card", "bank"];
      },
    },
    accessCode: {
      type: String,
      default: "",
    },
    callback: {
      type: Function as PropType<callback>,
      required: true,
      default: (response: any) => {
        return response;
      },
    },
    close: {
      type: Function as PropType<() => void>,
      required: true,
      default: () => {},
    },
    metadata: {
      type: Object as PropType<PaystackMetadata>,
      default: () => {
        return {};
      },
    },
    currency: {
      type: String as PropType<Currency>,
      default: "NGN",
    },
    plan: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    subaccount: {
      type: String,
      default: "",
    },
    split: {
      type: Object,
      default: () => {
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
      type: String as PropType<Bearer>,
      default: "",
    },
  },

  setup(props) {
    const { close, callback, ...others } = props;
    const scriptState = usePaystackScript();
    const payWithPaystack = usePaystack(others);

    const loadOnEmbed = () => {
      if (others.embed && scriptState.scriptLoaded) {
        payWithPaystack(callback, close);
      }
      if (scriptState.scriptError) {
        throw new Error("Unable to load paystack inline script");
      }
    };

    onMounted(() => {
      loadOnEmbed();
    });

    watch(scriptState, (newValue) => {
      loadOnEmbed();
    });

    return {
      payWithPaystack,
    };
  },
});
</script>
