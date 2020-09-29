# Paystack Component for Vue 2.x
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
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- Vue-Paystack -->
<script src="https://unpkg.com/vue-paystack/dist/paystack.min.js"></script>
```

### Usage

#### Via NPM

###### my-compnent.vue sample
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
import paystack from 'vue-paystack';
export default {
    components: {
        paystack
    },
    data(){
        return{
          paystackkey: "pk_test_xxxxxxxxxxxxxxxxxxxxxxx", //paystack public key
          email: "foobar@example.com", // Customer email
          amount: 1000000 // in kobo
        }
    },
    computed: {
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    },
    methods: {
      callback: function(response){
        console.log(response)
      },
      close: function(){
          console.log("Payment closed")
      }
    }
}
</script>
```
[Usage Example via NPM or Yarn](examples/commonjs/App.vue)
#### via CDN
```javascript 1.8
new Vue({
        el: '#app',
        components:{
          'paystack': VuePaystack.default
        },
        computed: {
        reference(){
          let text = "";
          let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for( let i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
        }
        },
        methods: {
          callback: function(response){
            console.log(response)
          },
          close: function(){
            console.log("Payment closed")
          }
        },
        data: {
          paystackkey: "pk_test_xxxxxxxxxxxxxxxxxxxxxx", //paystack public key
          email: "foobar@example.com", // Customer email
          amount: 1000000, // in kobo
        }
    });
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



