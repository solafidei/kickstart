export type Request = {
  description: string;
  amount: string;
  recipient: string;
  complete?: boolean;
  approvalCount?: number;
  approversCount?: number;
};
