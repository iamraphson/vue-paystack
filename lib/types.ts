export type Currency = "NGN" | "GHS" | "USD" | "ZAR" | "KES" | "XOF";

export type PaymentChannels =
  | "bank"
  | "card"
  | "qr"
  | "ussd"
  | "mobile_money"
  | "eft"
  | "bank_transfer"
  | "payattitude";

export type Bearer = "account" | "subaccount";

type phone = number | string;

export type PaystackMetadata = {
  [key: string]: any;
};

export type callback = (error?: any, response?: any) => void;

export interface PaystackProps {
  paystackkey: string;
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: phone;
  channels?: PaymentChannels[];
  amount: number;
  reference?: string;
  access_code?: string;
  metadata?: PaystackMetadata;
  currency?: Currency;
  label?: string;
  plan?: string;
  quantity?: number;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: Bearer;
  embed?: Boolean;
  "data-custom-button"?: string;
  split_code?: string;
  split?: Record<string, any>;
}
