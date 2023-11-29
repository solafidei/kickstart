import { LoadingButton } from "@mui/lab";
import {
  FormGroup,
  FormControl,
  Input,
  InputAdornment,
  Alert,
  AlertTitle,
  TextField,
} from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";
import campaignHelper from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const Header: React.FC<{ address: string }> = ({ address }) => {
  const [amountToContribute, setAmountToContribute] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      const accounts = await web3.eth.getAccounts();
      await campaignHelper(address)
        .methods.contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(amountToContribute, "ether"),
        });
      router.reload();
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };
  return (
    <FormGroup>
      <FormControl variant="standard">
        <TextField
          label="Amount to Contribute"
          value={amountToContribute}
          onChange={(e) => setAmountToContribute(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">Ether</InputAdornment>,
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
        <LoadingButton loading={loading} variant="contained" onClick={onSubmit}>
          Create!
        </LoadingButton>
      </FormControl>
    </FormGroup>
  );
};

export default Header;
