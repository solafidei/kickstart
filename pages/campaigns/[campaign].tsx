import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import { GetServerSideProps } from "next";
import { Campaign } from "../../types/campaign.types";
import campaignHelper from "../../ethereum/campaign";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";

type CampaignProps = {
  campaign: Campaign;
};
const Campaign: React.FC<CampaignProps> = ({ campaign }) => {
  const [request, setRequest] = React.useState<Campaign>(campaign);
  const renderCards = (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card variant="elevation">
            <CardContent sx={{ minHeight: "8rem" }}>
              <Typography style={{ overflowWrap: "break-word" }} variant="h6">
                {campaign.manager}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="textSecondary">
                Address of Manager
              </Typography>
              <Typography variant="body2">
                The manager created this campaign and can create requests to
                withdraw money.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="elevation">
            <CardContent sx={{ minHeight: "8rem" }}>
              <Typography variant="h6">
                {campaign.minimumContribution}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="textSecondary">
                Minimum Contribution (wei)
              </Typography>
              <Typography variant="body2">
                You must contribute at least this much wei to become an
                approver.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="elevation">
            <CardContent sx={{ minHeight: "8rem" }}>
              <Typography variant="h6">{campaign.requestsCount}</Typography>
              <Typography sx={{ mb: 1.5 }} color="textSecondary">
                Number of Requests
              </Typography>
              <Typography variant="body2">
                A request tries to withdraw money from the contract. Requests
                must be approved by approvers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="elevation">
            <CardContent sx={{ minHeight: "8rem" }}>
              <Typography variant="h6">{campaign.approversCount}</Typography>
              <Typography sx={{ mb: 1.5 }} color="textSecondary">
                Number of Approvers
              </Typography>
              <Typography variant="body2">
                Number of people who have already donated to this campaign.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="elevation">
            <CardContent sx={{ minHeight: "8rem" }}>
              <Typography variant="h6">
                {web3.utils.fromWei(campaign.balance.toLocaleString(), "ether")}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="textSecondary">
                Campaign Balance (ether)
              </Typography>
              <Typography variant="body2">
                The balance is how much money this campaign has left to spend.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <Layout>
        <Grid container rowSpacing={1} columnSpacing={3}>
          <Grid item xs={9}>
            {renderCards}
          </Grid>
          <Grid item xs={3}>
            <ContributeForm address={campaign.address} />
          </Grid>
          <Grid mt={2} item xs={3}>
            <Link href={`/campaigns/${campaign.address}/requests`}>
              <Button variant="outlined">View Requests</Button>
            </Link>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<CampaignProps> = async (
  context
) => {
  const campaign = await campaignHelper(context.query.campaign as string)
    .methods.getSummary()
    .call();

  return {
    props: {
      campaign: {
        address: context.query.campaign as string,
        minimumContribution: campaign[0],
        balance: campaign[1],
        requestsCount: campaign[2],
        approversCount: campaign[3],
        manager: campaign[4],
      },
    },
  };
};

export default Campaign;
