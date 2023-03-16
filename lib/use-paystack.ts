import { watch } from "vue";
import usePaystackScript from "./paystack-script";
import type { callback, PaystackProps } from "./types";

export default function usePaystackPayment(
  options: PaystackProps
): (callback?: callback, onClose?: () => void) => void {
  const scriptState = usePaystackScript();

  const {
    paystackkey,
    email,
    firstname,
    lastname,
    channels,
    amount,
    access_code,
    reference,
    metadata = {},
    currency = "NGN",
    plan = "",
    quantity,
    split_code,
    split,
    subaccount = "",
    transaction_charge = 0,
    bearer = "account",
    embed,
  } = options;

  function initializePayment(callback?: callback, onClose?: callback): void {
    if (scriptState.scriptError) {
      throw new Error("Unable to load paystack inline script");
    }

    if (scriptState.scriptLoaded) {
      const paystackArgs: Record<string, any> = {
        callback: callback ? callback : () => null,
        onClose: onClose ? onClose : () => null,
        key: paystackkey,
        ref: reference,
        email,
        firstname,
        lastname,
        amount,
        access_code,
        currency,
        plan,
        quantity,
        "data-custom-button": options["data-custom-button"] || "",
        channels,
        subaccount,
        transaction_charge,
        bearer,
        metadata,
        split,
        split_code,
      };

      if (embed) {
        paystackArgs.container = "paystackEmbedContainer";
      }

      // @ts-ignore
      const handler = window.PaystackPop.setup(paystackArgs);
      if (!embed) {
        handler.openIframe();
      }
    }
  }

  return initializePayment;
}
