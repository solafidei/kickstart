import {
  Alert,
  AlertTitle,
  FormControl,
  FormGroup,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout/Layout";
import React, { useState } from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";

const CampaignNew: React.FC = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };
  return (
    <Layout>
      <Typography variant="h5">Create a Campaign</Typography>
      <FormGroup>
        <FormControl variant="standard">
          <TextField
            label="Minimum Contribution"
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">Wei</InputAdornment>,
            }}
          />
        </FormControl>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <FormControl sx={{ m: 1, mt: 3, width: "25ch" }}>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={onSubmit}
          >
            Create!
          </LoadingButton>
        </FormControl>
      </FormGroup>
    </Layout>
  );
};

export default CampaignNew;
