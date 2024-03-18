import {
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { sentenceCase } from 'change-case';
import React, { useEffect, useState } from 'react';
import EditIcon from 'src/assets/icons/EditIcon';
import Label from 'src/components/label/Label';
import { TableHeadCustom } from 'src/components/table';
import { fIndianCurrency } from 'src/utils/formatNumber';
import { fDate } from 'src/utils/formatTime';
import { fundRequestProps } from './Types';
import { format } from 'date-fns';
import MotionModal from 'src/components/animate/MotionModal';
import UpdateFundRequest from './UpdateFunRequest';
import dayjs from 'dayjs';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/routes/paths';
import MyFundRequest from './MyFundRequest';

type props = {
  tableData: fundRequestProps[];
  getRaisedRequest: VoidFunction;
};

function FundDepositeTable({ tableData, getRaisedRequest }: props) {
  const navigate = useNavigate();
  const tableLabels = [
    { id: 'frid', label: 'FRID' },
    { id: 'depositor', label: 'Deposited To' },
    { id: 'Ref', label: 'UTR/Payment Reference Number' },
    { id: 'RequestType', label: 'Request Mode' },
    { id: 'From', label: 'Amount' },
    { id: 'tobank', label: 'Charge/Commission' },
    { id: 'depositormobile', label: 'Status' },
    { id: 'amount', label: 'Edit', align: 'center' },
  ];

  return (
    <>
      <Stack direction={"row"} justifyContent={'space-between'} mb={2}>
        <Typography variant="h5">Last 5 Transaction &#9660;</Typography>
        <LoadingButton onClick={() => navigate(PATH_DASHBOARD.fundmanagement.myfundrequest)}
        variant='contained'
        sx={{width:'200px'}}
        >
          View All Transaction
        </LoadingButton>
      </Stack>
      <Card>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 720 }}>
              <TableHeadCustom headLabel={tableLabels} />

              <TableBody>
                {tableData.map((row: any) => (
                  <FundRequestTable key={row._id} row={row} getRaisedRequest={getRaisedRequest} />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>
    </>
  );
}

export default FundDepositeTable;

const FundRequestTable = ({ row, getRaisedRequest }: any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  var localTime: any;
  const [localTiming, setLocalTiming] = React.useState(0);

  useEffect(() => {
    row.createdAt + row.requestEditTime - Date.now() > 0 &&
      setLocalTiming(Math.floor(row.createdAt + row.requestEditTime - Date.now()));
  }, []);

  useEffect(() => {
    localTime = setTimeout(() => {
      setLocalTiming(localTiming - 1000);
    }, 1000);
    if (localTiming <= 0) {
      clearTimeout(localTime);
      handleClose();
    }
  }, [localTiming]);

  return (
    <>
      <TableRow key={row?._id} hover>
        <TableCell>
          <Typography variant="body2">{row?.fund_request_Id}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">
            {`${
              row?.bankId?.bank_details?.bank_name
            } (Ending with ${row?.bankId?.bank_details?.account_number.slice(
              row?.bankId?.bank_details?.account_number.length - 4
            )})`}
          </Typography>
          <Typography noWrap variant="body2">
            {fDate(row?.date_of_deposit)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row?.transactional_details?.trxId}</Typography>
          <Typography variant="body2">{row?.transactional_details?.mobile}</Typography>
        </TableCell>
        <TableCell>
          <Typography noWrap variant="body2">
            {row?.modeId?.transfer_mode_name}
          </Typography>
        </TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              ((row.status.toLowerCase() === 'failed' || row.status.toLowerCase() === 'rejected') &&
                'error') ||
              ((row.status.toLowerCase() === 'pending' ||
                row.status.toLowerCase() === 'in_process') &&
                'warning') ||
              'success'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {fIndianCurrency(row?.amount)}
          </Label>
        </TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={row.Charge !== 'NA' ? 'error' : 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {fIndianCurrency(row.Charge !== 'NA' ? row.Charge : row.Commission)}
          </Label>
        </TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              ((row.status.toLowerCase() === 'failed' || row.status.toLowerCase() === 'rejected') &&
                'error') ||
              ((row.status.toLowerCase() === 'pending' ||
                row.status.toLowerCase() === 'in_process') &&
                'warning') ||
              'success'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {row.status ? sentenceCase(row.status) : ''}
          </Label>
        </TableCell>
        <TableCell sx={{ width: 150 }}>
          <Stack justifyContent={'center'} alignItems={'center'} gap={1}>
            <Stack onClick={() => !!(localTiming / 1000 > 0) && handleOpen()}>
              <EditIcon active={!!(localTiming / 1000 > 0)} />
            </Stack>
            {localTiming / 1000 > 0 && (
              <Label
                variant="soft"
                color={localTiming <= 60000 ? 'error' : 'success'}
                sx={{ textTransform: 'capitalize' }}
              >
                {format(
                  new Date(dayjs(localTiming).subtract(5, 'hours').subtract(30, 'minutes') as any),
                  'mm : ss'
                )}
              </Label>
            )}
          </Stack>
        </TableCell>
        <MotionModal open={open} onClose={handleClose}>
          <UpdateFundRequest
            preData={row}
            handleClose={handleClose}
            getRaisedRequest={getRaisedRequest}
          />
        </MotionModal>
      </TableRow>
    </>
  );
};
