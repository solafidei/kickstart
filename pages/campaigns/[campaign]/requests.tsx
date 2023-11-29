import { useRouter } from "next/router";
import Layout from "../../../components/Layout/Layout";
import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { GetServerSideProps } from "next";
import CampaignHelper from "../../../ethereum/campaign";
import { Request } from "../../../types/request.types";
import web3 from "../../../ethereum/web3";
import RequestsTable from "../../../components/RequestsTable";
import React from "react";

type RequestsProps = {
  campaign: string;
  requests: Request[];
};

const Requests: React.FC<RequestsProps> = ({ campaign, requests }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const address = campaign;
  const onApprove = async (index: number) => {
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = CampaignHelper(address);
      await campaign.methods.approveRequest(index).send({
        from: accounts[0],
      });
      router.reload();
    } catch (err: any) {
      console.log(err.message);
    }
    setLoading(false);
  };
  const onFinalize = async (index: number) => {
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = CampaignHelper(address);
      await campaign.methods.finalizeRequest(index).send({
        from: accounts[0],
      });
      router.reload();
    } catch (err: any) {
      console.log(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Layout>
        <Grid spacing={2} container direction={"column"}>
          <Grid item>
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
          </Grid>
          <Grid item>
            <Typography variant="h4">Requests</Typography>
          </Grid>
          <Grid mb={2} item container direction={"row-reverse"}>
            <Link href={`/campaigns/${campaign}/requests/new`}>
              <Button variant="contained" size="small">
                Create Request
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <RequestsTable
              props={{
                requests,
                loading,
                onApprove,
                onFinalize,
              }}
            />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

const fetchRequests = async (address: string): Promise<Request[]> => {
  const campaign = CampaignHelper(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array.from({ length: requestCount }, async (_, index) => {
      return campaign.methods.requests(index).call();
    })
  );

  return requests.map(
    ({ description, value, recipient, approvalCount, complete }) => ({
      description,
      amount: web3.utils.fromWei(value, "ether"),
      recipient,
      complete,
      approvalCount,
      approversCount,
    })
  ) as Request[];
};

export const getServerSideProps: GetServerSideProps<RequestsProps> = async (
  context
) => {
  const requests = await fetchRequests(context.query.campaign as string);

  return {
    props: {
      campaign: context.query.campaign as string,
      requests,
    },
  };
};

export default Requests;
