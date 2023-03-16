<template>
  <div class="App">
    <p class="App-intro">
      <button @click="handlePayWithPaystack">Pay with paystack</button>
    </p>
  </div>
</template>

<script type="text/javascript">
import usePaystackPayment from "../../src";

export default {
  setup() {
    const paystackArgs = {
      paystackkey: "pk_test_a137d402b5975716e89952a898aad2832c961d69",
      email: "foobar@example.com",
      amount: 1000000,
      reference: "PayXYZ344234",
    };

    const payWithPaystack = usePaystackPayment(paystackArgs);

    const callback = (response) => {
      console.log(response);
    };

    const close = () => {
      console.log("Payment closed");
    };

    const handlePayWithPaystack = () => {
      payWithPaystack(callback, close);
    };

    return {
      handlePayWithPaystack,
    };
  },
};
</script>
<style>
.App {
  text-align: center;
}

.App-intro {
  font-size: large;
}
.payButton {
  color: #61dafb;
  width: 250px;
  height: 50px;
  font-weight: 800;
}
</style>
