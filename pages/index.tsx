import factory from "../ethereum/factory";
import { GetServerSideProps } from "next";
import { CampaignAddress } from "../types/campaign-address.types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";

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
      <Typography variant="h5">Open Campaigns</Typography>
      {RenderCampaigns}
      <Button variant="contained" startIcon={<AddCircleIcon />}>
        Create Campaign
      </Button>
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
