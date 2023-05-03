import factory from "../ethereum/factory";
import { GetServerSideProps } from "next";
import { CampaignAddress } from "../types/campaign-address.types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Fab,
  Grid,
  Typography,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Layout from "../components/Layout/Layout";

type CampaignIndexProps = {
  campaigns: CampaignAddress[];
};

const Index: React.FC<CampaignIndexProps> = ({ campaigns }) => {
  const RenderCampaigns: Array<JSX.Element> = campaigns.map((address) => {
    return (
      <Card variant="elevation" key={address}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {address}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small">
            View Campaign
          </Button>
        </CardActions>
      </Card>
    );
  });

  return (
    <>
      <Layout>
        <Typography variant="h5">Open Campaigns</Typography>

        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            container
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <Fab variant="extended">
              <AddCircleIcon />
              Create Campaign
            </Fab>
          </Grid>
          <Grid item xs={12}>
            {RenderCampaigns}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  CampaignIndexProps
> = async () => {
  const campaigns: CampaignAddress[] = await factory.methods
    .getDeployedCampaigns()
    .call();

  return {
    props: {
      campaigns,
    },
  };
};

export default Index;
