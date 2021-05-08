<template>
  <div class="App">
    <p class="App-intro">
      <paystack
        :amount="amount"
        :email="email"
        :firstname="firstname"
        :lastname="lastname"
        :accessCode="accessCode"
        :splitCode="splitCode"
        :split="split"
        :paystackkey="paystackkey"
        :reference="genReference"
        :callback="callback"
        :close="close"
        :embed="false"
      >
        <i>Pay me, My Money</i>
      </paystack>
      <paystack
        :amount="amount"
        :email="email"
        :firstname="firstname"
        :lastname="lastname"
        :accessCode="accessCode"
        :splitCode="splitCode"
        :split="split"
        :paystackkey="paystackkey"
        :reference="genReference"
        :callback="callback"
        :close="close"
        :embed="false"
        :custombutton="true"
      >
        <button
          style="
            border-radius: 5px;
            color: white;
            padding: 15px;
            background: crimson;
            border: 1px solid;
            cursor: pointer;
            margin: 20px;
        "
        >
          PAY WITH CUSTOM BUTTON
        </button>
      </paystack>
    </p>
  </div>
</template>

<script type="text/javascript">
import paystack from '../../src';
export default {
    components: {
        paystack
    },
    data(){
        return{
            paystackkey: "pk_test_xxxxxxxxxxxxxxxxxxxxxxx",
            firstname: "Foo",
            lastname: "Bar",
            email: "foo@bar.com",
            amount: 200000,
            splitCode: "",
            split: {},
            channels: ['card']
        }
    },
    computed: {
        genReference(){
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
<style>
    .App {
        text-align: center;
    }

    .App-intro {
        font-size: large;
    }
    .payButton{
        color: #61DAFB;
        width: 250px;
        height: 50px;
        font-weight: 800;
    }
</style>
