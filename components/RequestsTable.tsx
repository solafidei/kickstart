import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Request } from "../types/request.types";
import { LoadingButton } from "@mui/lab";

type RequestsTableProps = {
  requests: Request[];
  loading: boolean;
  onApprove: (index: number) => void;
  onFinalize: (index: number) => void;
};

const RequestsTable: React.FC<{ props: RequestsTableProps }> = ({ props }) => {
  const { requests } = props;
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Approval Count</TableCell>
              <TableCell>Complete</TableCell>
              <TableCell>Approve</TableCell>
              <TableCell>Finalize</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: request.complete
                    ? "lightgray"
                    : "lightgreen",
                }}
              >
                <TableCell>{index}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{request.amount}</TableCell>
                <TableCell>{request.recipient}</TableCell>
                <TableCell>
                  {request.approvalCount}/{request.approversCount}
                </TableCell>
                <TableCell>{request.complete ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {!request.complete && (
                    <LoadingButton
                      loading={props.loading}
                      variant="outlined"
                      color="primary"
                      onClick={() => props.onApprove(index)}
                    >
                      Approve
                    </LoadingButton>
                  )}
                </TableCell>
                <TableCell>
                  {!request.complete && (
                    <LoadingButton
                      loading={props.loading}
                      variant="outlined"
                      color="secondary"
                      onClick={() => props.onFinalize(index)}
                    >
                      Finalize
                    </LoadingButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item mt={2}>
        <Typography variant="h7">Found {requests.length} requests</Typography>
      </Grid>
    </>
  );
};

export default RequestsTable;
