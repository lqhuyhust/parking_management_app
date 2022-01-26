import React from "react";
import StripeCheckout from 'react-native-stripe-checkout-webview';

export default function Payment({route, navigation}) {
  const {stripePublicKey, sessionId} = route.params;
  return (
    <StripeCheckout
      stripePublicKey={stripePublicKey}
      checkoutSessionInput={{sessionId}}
      onSuccess={({checkoutSessionId}) => {
        console.log(`Stripe checkout session succeeded. session id: ${checkoutSessionId}.`);
      }}
      onCancel={() => {
        console.log(`Stripe checkout session cancelled.`);
      }}
    />
  )
}
