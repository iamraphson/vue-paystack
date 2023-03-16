# Paystack Component for Vue 3.x

A Vue Plugin for Paystack payment gateway.

### Demo

![Demo Image](vue-paystack.png?raw=true "Demo Image")

### Install

#### NPM

```
npm install vue vue-paystack --save
```

#### Javascript via CDN

```javascript 1.8
<!-- Vue -->
  <script src="https://unpkg.com/vue@next"></script>
<!-- Vue-Paystack -->
<script src="https://unpkg.com/vue-paystack/dist/paystack.umd.min.js"></script>
```

### Usage

#### Via NPM

This library can be implemented in 2 different ways:
1. By using the component provided by the library
2. By using the composable provided by the library (For vue versions earlier than 2.7 you would need to install the composition api plugin)

##### Using the Component
###### my-component.vue sample

```vue
<template>
  <paystack
    :amount="amount"
    :email="email"
    :paystackkey="paystackkey"
    :reference="reference"
    :callback="callback"
    :close="close"
    :embed="false"
  >
    <i class="fas fa-money-bill-alt"></i>
    Make Payment
  </paystack>
</template>

<script type="text/javascript">
import paystack from "vue-paystack";
export default {
  components: {
    paystack,
  },
  data() {
    return {
      paystackkey: "pk_test_xxxxxxxxxxxxxxxxxxxxxxx", //paystack public key
      email: "foobar@example.com", // Customer email
      amount: 1000000, // in kobo
    };
  },
  computed: {
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
  },
  methods: {
    callback: function (response) {
      console.log(response);
    },
    close: function () {
      console.log("Payment closed");
    },
  },
};
</script>
```

[Usage Example via NPM or Yarn](examples/commonjs/App.vue)

##### Using the Composable
###### my-component-two.vue sample

```vue
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
```

[Usage Example via NPM or Yarn](examples/commonjs/AppTwo.vue)


#### via CDN

```javascript
const app = Vue.createApp({
  components: { PayStack: Paystack.default },
  setup() {
    const paystackkey = Vue.ref("pk_test_xxxxxxxxxxxxxxxxxxxxxx");
    const email = Vue.ref("foobar@example.com");
    const amount = Vue.ref(1000000);
    let reference = Vue.computed(() => {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    });
    let callback = (response) => {
      console.log({ response });
    };
    let close = () => {
      console.log("payment closed");
    };
    return {
      reference: reference,
      callback: callback,
      close: close,
      paystackkey: paystackkey.value,
      email: email.value,
      amount: amount.value,
    };
  },
});

app.mount("#app");
```

[Usage Example via CDN](examples/index.html)

Please checkout [Paystack Documentation](https://paystack.com/docs/payments/accept-payments#popup) for other available options you can add to the

## Deployment

REMEMBER TO CHANGE THE KEY WHEN DEPLOYING ON A LIVE/PRODUCTION SYSTEM

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/iamraphson)!

Thanks!
Ayeni Olusegun.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
