// SquarePayment.tsx
"use client";
import React from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";

interface SquarePaymentProps {
  amount: number;
  onSuccess: (token: string) => void;
  onError: (error: any) => void;
}

const SquarePayment: React.FC<SquarePaymentProps> = ({
  amount,
  onSuccess,
  onError,
}) => {
  const handlePayment = async (token: string) => {
    try {
      // ✅ Call your Node backend API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/api/square-pay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            amount,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Payment failed");
      }

      // ✅ Payment success
      onSuccess(token);
    } catch (err: any) {
      onError(err);
    }
  };

  return (
    <PaymentForm
      applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!}
      locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
      cardTokenizeResponseReceived={(tokenResult) => {
        if (tokenResult.token) {
          handlePayment(tokenResult.token);
        }
      }}
      createVerificationDetails={() => ({
        amount: amount.toFixed(2),
        currencyCode: "INR",
        intent: "CHARGE",
        billingContact: {
          addressLines: ["MAIT,Delhi"],
          familyName: "user",
          givenName: "user",
          countryCode: "IN",
          city: "Rohini",
        },
      })}
    >
      <CreditCard />
    </PaymentForm>
  );
};

export default SquarePayment;
