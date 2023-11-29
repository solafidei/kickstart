import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  FormGroup,
  Grid,
  Input,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import Layout from "../../../../components/Layout/Layout";
import { LoadingButton } from "@mui/lab";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { Request } from "../../../../types/request.types";
import web3 from "../../../../ethereum/web3";
import campaignHelper from "../../../../ethereum/campaign";
import { useRouter } from "next/router";

type RequestProps = {
  address: string;
};
const RequestNew: React.FC<RequestProps> = ({ address }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [request, setRequest] = React.useState<Request>({
    description: "",
    amount: "",
    recipient: "",
  });
  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      const accounts = await web3.eth.getAccounts();

      await campaignHelper(address)
        .methods.createRequest(
          request.description,
          web3.utils.toWei(request.amount.toLocaleString(), "ether"),
          request.recipient
        )
        .send({
          from: accounts[0],
        });
      router.push(`/campaigns/${address}/requests`);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Layout>
        <Grid>
          <Link href={`/campaigns/${address}/requests`}>
            <Button variant="contained">Back</Button>
          </Link>
          <h3>Create Request {address}</h3>
          <FormGroup>
            <FormControl variant="standard">
              <TextField
                label="Description"
                value={request.description}
                onChange={(e) =>
                  setRequest({ ...request, description: e.target.value })
                }
              />
            </FormControl>
            <FormControl variant="standard">
              <TextField
                label="Amount in Ether"
                value={request.amount}
                onChange={(e) =>
                  setRequest({ ...request, amount: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Ether</InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl variant="standard">
              <TextField
                label="Recipient Address"
                value={request.recipient}
                onChange={(e) =>
                  setRequest({ ...request, recipient: e.target.value })
                }
              />
            </FormControl>
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
            <FormControl>
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={onSubmit}
              >
                Create
              </LoadingButton>
            </FormControl>
          </FormGroup>
        </Grid>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<RequestProps> = async (
  context
) => {
  return {
    props: {
      address: context.query.campaign as string,
    },
  };
};

export default RequestNew;
