import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { _ecommerceBestSalesman } from 'src/_mock/arrays';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import FormProvider, { RHFTextField, RHFCodes, RHFSelect } from 'src/components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Scrollbar from 'src/components/scrollbar/Scrollbar';

import { Api } from 'src/webservices';

import { LoadingButton } from '@mui/lab';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useNavigate } from 'react-router';
import { useAuthContext } from 'src/auth/useAuthContext';

type FormValuesProps = {
  amount: string;
  ifsc: string;
  accountNumber: string;
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
};

export default function AEPSsettlement() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [currentTab, setCurrentTab] = useState(1);
  const [userBankList, setUserBankList] = useState([]);

  useEffect(() => {
    BankList();
  }, []);

  const BankList = () => {
    let token = localStorage.getItem('token');
    Api(`user/user_bank_list`, 'GET', '', token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setUserBankList(Response.data.data[0].bankAccounts);
          // enqueueSnackbar(Response.data.message);
        } else {
          enqueueSnackbar(Response.data.message);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>View Update Bank Detail | Tramo</title>
      </Helmet>
      <Box
        sx={{
          pl: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Tabs
          value={currentTab}
          aria-label="basic tabs example"
          onChange={(event, newValue) => setCurrentTab(newValue)}
        >
          <Tab label="Settlement To Main Wallet" value={1} />
        </Tabs>
      </Box>
      <Stack mt={2}>
        <SettlementToMainWallet userBankList={userBankList} />
      </Stack>
    </>
  );
}

type childProps = {
  userBankList: any;
};

// const SettlementToBank = ({ userBankList }: childProps) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const { user, UpdateUserDetail } = useAuthContext();
//   const [eligibleSettlementAmount, setEligibleSettlementAmount] = useState('');
//   const [resetNpin, setResetNpin] = useState(false);
//   const [transferTo, setTransferTo] = useState<boolean | null>(null);

//   const FilterSchema = Yup.object().shape({
//     amount: transferTo
//       ? Yup.number()
//           .required('Amount is required')
//           .integer()
//           .min(500)
//           // .max(Number(eligibleSettlementAmount))
//           .typeError('Amount is required')
//       : Yup.number()
//           .required('Amount is required')
//           .integer()
//           .min(1000)
//           // .max(Number(eligibleSettlementAmount))
//           .typeError('Amount is required'),
//     accountNumber: transferTo ? Yup.string() : Yup.string().required('Bank account is required'),
//     otp1: Yup.string().required(),
//     otp2: Yup.string().required(),
//     otp3: Yup.string().required(),
//     otp4: Yup.string().required(),
//     otp5: Yup.string().required(),
//     otp6: Yup.string().required(),
//   });
//   const defaultValues = {
//     amount: '',
//     accountNumber: '',
//     ifsc: '',
//     otp1: '',
//     otp2: '',
//     otp3: '',
//     otp4: '',
//     otp5: '',
//     otp6: '',
//   };
//   const methods = useForm<FormValuesProps>({
//     resolver: yupResolver(FilterSchema),
//     defaultValues,
//   });
//   const {
//     reset,
//     setError,
//     setValue,
//     handleSubmit,
//     formState: { errors, isSubmitting, isValid },
//   } = methods;

//   useEffect(() => {
//     getEligibleSettlementAmount();
//   }, []);

//   const getEligibleSettlementAmount = () => {
//     let token = localStorage.getItem('token');
//     Api(`settlement/eligible_settlement_amount`, 'GET', '', token).then((Response: any) => {
//       if (Response.status == 200) {
//         if (Response.data.code == 200) {
//           setEligibleSettlementAmount(Response.data.data);
//           // enqueueSnackbar(Response.data.message);
//         } else {
//           enqueueSnackbar(Response.data.message);
//         }
//       }
//     });
//   };

//   const settleToBank = (data: FormValuesProps) => {
//     let token = localStorage.getItem('token');
//     let body = {
//       amount: String(data.amount),
//       accountNumber: data.accountNumber,
//       ifsc: data.ifsc,
//       nPin: data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6,
//     };

//     Api(`settlement/to_bank_account`, 'POST', body, token).then((Response: any) => {
//       if (Response.status == 200) {
//         if (Response.data.code == 200) {
//           UpdateUserDetail({
//             AEPS_wallet_amount: user?.AEPS_wallet_amount - Number(data.amount),
//           });
//           reset(defaultValues);
//           enqueueSnackbar(Response.data.message);
//         } else {
//           enqueueSnackbar(Response.data.message);
//         }
//       }
//     });
//   };

//   return (
//     <Box style={{ borderRadius: '20px' }}>
//       <FormProvider methods={methods} onSubmit={handleSubmit(settleToBank)}>
//         <Scrollbar sx={{ maxHeight: 600, pr: 1 }}>
//           <Grid
//             rowGap={3}
//             columnGap={2}
//             display="grid"
//             pt={1}
//             gridTemplateColumns={{
//               xs: 'repeat(1, 1fr)',
//               // sm: 'repeat(2, 1fr)'
//             }}
//           >
//             <Typography variant="subtitle1" textAlign={'center'}>
//               Maximum Eligible Settlement Amount for Bank account is {eligibleSettlementAmount}
//             </Typography>

//             <Stack gap={2}>
//               <Stack sx={{ width: 250, alignSelf: 'center' }} gap={1}>
//                 {!transferTo && (
//                   <RHFSelect
//                     name="accountNumber"
//                     label="Bank account"
//                     placeholder="Bank account"
//                     SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
//                   >
//                     {userBankList.map((item: any) => {
//                       const lastFourDigits = item.accountNumber.slice(
//                         item.accountNumber.length - 4
//                       );
//                       const maskedDigits = '*'.repeat(item.accountNumber.length - 4);
//                       const maskedNumber = maskedDigits + lastFourDigits;
//                       return (
//                         <MenuItem
//                           key={item._id}
//                           value={item.accountNumber}
//                           onClick={() => setValue('ifsc', item.ifsc)}
//                         >
//                           <Stack>
//                             <span>{item.bankName}</span>
//                             <span>{maskedNumber}</span>
//                           </Stack>
//                         </MenuItem>
//                       );
//                     })}
//                   </RHFSelect>
//                 )}
//                 {eligibleSettlementAmount == '0' && (
//                   <Typography color="red" textAlign={'left'} style={{ fontSize: '1rem' }}>
//                     Please add Bank
//                   </Typography>
//                 )}
//                 <RHFTextField
//                   name="amount"
//                   label="Amount"
//                   placeholder="Amount"
//                   // onChange={(e: any) => convertNumberToWords(Number(e.target.value))}
//                 />
//               </Stack>
//               <Stack alignSelf={'center'}>
//                 <Stack flexDirection={'row'} justifyContent={'space-between'}>
//                   <Typography variant="h5" textAlign={'center'}>
//                     NPIN
//                   </Typography>
//                 </Stack>
//                 <RHFCodes keyName="otp" inputs={['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']} />
//                 {(!!errors.otp1 ||
//                   !!errors.otp2 ||
//                   !!errors.otp3 ||
//                   !!errors.otp4 ||
//                   !!errors.otp5 ||
//                   !!errors.otp6) && (
//                   <FormHelperText error sx={{ px: 2 }}>
//                     Code is required
//                   </FormHelperText>
//                 )}
//               </Stack>
//               <LoadingButton
//                 variant="contained"
//                 type="submit"
//                 disabled={!isValid}
//                 loading={isSubmitting}
//                 sx={{ width: 'fit-content', alignSelf: 'center' }}
//               >
//                 Settle amount to Bank account
//               </LoadingButton>
//             </Stack>
//           </Grid>
//         </Scrollbar>
//       </FormProvider>
//     </Box>
//   );
// };

const SettlementToMainWallet = ({ userBankList }: childProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, UpdateUserDetail } = useAuthContext();
  const [eligibleSettlementAmount, setEligibleSettlementAmount] = useState('');

  const FilterSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Amount is required')
      .integer()
      .min(500)
      .max(Number(eligibleSettlementAmount))
      .typeError('Amount is required'),
    otp1: Yup.string().required(),
    otp2: Yup.string().required(),
    otp3: Yup.string().required(),
    otp4: Yup.string().required(),
    otp5: Yup.string().required(),
    otp6: Yup.string().required(),
  });
  const defaultValues = {
    amount: '',
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FilterSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  useEffect(() => {
    getEligibleSettlementAmount();
  }, []);

  const getEligibleSettlementAmount = () => {
    let token = localStorage.getItem('token');
    Api(`settlement/eligible_settlement_amount`, 'GET', '', token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          setEligibleSettlementAmount(Response.data.data);
          // enqueueSnackbar(Response.data.message);
        } else {
          enqueueSnackbar(Response.data.message);
        }
      }
    });
  };

  const settleToMainWallet = (data: FormValuesProps) => {
    let token = localStorage.getItem('token');
    let body = {
      amount: String(data.amount),
      nPin: data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6,
    };

    Api(`settlement/to_main_wallet`, 'POST', body, token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          UpdateUserDetail({
            main_wallet_amount: user?.main_wallet_amount + Number(data.amount),
            AEPS_wallet_amount: user?.AEPS_wallet_amount - Number(data.amount),
          });

          enqueueSnackbar(Response.data.message);
        } else {
          enqueueSnackbar(Response.data.message);
        }
      }
    });
  };

  return (
    <Box style={{ borderRadius: '20px' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(settleToMainWallet)}>
        <Scrollbar sx={{ maxHeight: 600, pr: 1 }}>
          <Grid
            rowGap={3}
            columnGap={2}
            display="grid"
            pt={1}
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              // sm: 'repeat(2, 1fr)'
            }}
          >
            <Typography variant="subtitle1" textAlign={'center'}>
              Maximum Eligible Settlement Amount for Main wallet is {eligibleSettlementAmount}
            </Typography>

            <Stack gap={2}>
              <Stack sx={{ width: 250, alignSelf: 'center' }} gap={1}>
                <RHFTextField name="amount" label="Amount" placeholder="Amount" />
              </Stack>
              <Stack alignSelf={'center'}>
                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                  <Typography variant="h5" textAlign={'center'}>
                    NPIN
                  </Typography>
                </Stack>
                <RHFCodes keyName="otp" inputs={['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']} />
                {(!!errors.otp1 ||
                  !!errors.otp2 ||
                  !!errors.otp3 ||
                  !!errors.otp4 ||
                  !!errors.otp5 ||
                  !!errors.otp6) && (
                  <FormHelperText error sx={{ px: 2 }}>
                    Code is required
                  </FormHelperText>
                )}
              </Stack>

              <LoadingButton
                variant="contained"
                type="submit"
                // disabled={!isValid}
                loading={isSubmitting}
                sx={{ width: 'fit-content', alignSelf: 'center' }}
              >
                Settle amount to Main Wallet
              </LoadingButton>
            </Stack>
          </Grid>
        </Scrollbar>
      </FormProvider>
    </Box>
  );
};
