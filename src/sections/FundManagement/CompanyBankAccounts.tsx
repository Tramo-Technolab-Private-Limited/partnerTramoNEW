import React, { useContext, useEffect, useState } from "react";
import { BankAccountContext } from "./MyFundDeposites";
import {
  Button,
  Card,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { bankAccountProps } from "./Types";
import ICICIBank from "src/assets/icons/Bankicons/IciciBank";
import { DemoBank } from "src/assets/icons/Bankicons/DemoBank";
import useCopyToClipboard from "src/hooks/useCopyToClipboard";
import Iconify from "src/components/iconify/Iconify";
import { useSnackbar } from "notistack";

function CompanyBankAccounts() {
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const bankListContext: bankAccountProps | any =
    useContext(BankAccountContext);
  const [activeBank, setActiveBank] = useState({
    ifsc: "",
    account_number: "",
    bank_name: "",
    branch_name: "",
    address: "",
  });

  useEffect(() => {
    if (bankListContext.length) setActiveBank(bankListContext[0]?.bank_details);
  }, [bankListContext]);

  const onCopy = (text: string) => {
    if (text) {
      enqueueSnackbar("Copied!");
      copy(text);
    }
  };

  return (
    <Card sx={{ p: 2, bgcolor: "#ff30300d" }}>
      <Typography variant="subtitle1" color={"primary"}>
        Company Bank Account
      </Typography>

      <Stack m={1} flexDirection={"row"} alignItems={"center"} gap={2}>
        {bankListContext.map((item: bankAccountProps) => {
          return item.bank_details.bank_name == "ICICI BANK" ? (
            <ICICIBank
              active={
                item.bank_details.account_number === activeBank.account_number
              }
              onClick={() => setActiveBank(item.bank_details)}
            />
          ) : (
            <DemoBank onClick={() => setActiveBank(item.bank_details)} />
          );
        })}
      </Stack>

      <Stack width={{ sm: "100%", md: "50%" }} gap={1}>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography variant="subtitle2">Beneficiary Name</Typography>
          <Typography variant="body2">
            {process.env.REACT_APP_COMPANY_LEGAL_NAME}{" "}
            <Tooltip title="Copy" placement="top">
              <IconButton
                onClick={() =>
                  onCopy(process.env.REACT_APP_COMPANY_LEGAL_NAME as string)
                }
              >
                <Iconify
                  icon="eva:copy-fill"
                  width={20}
                  color={"primary.main"}
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography variant="subtitle2">Bank Name</Typography>
          <Typography variant="body2">
            {activeBank.bank_name}{" "}
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={() => onCopy(activeBank.bank_name)}>
                <Iconify
                  icon="eva:copy-fill"
                  width={20}
                  color={"primary.main"}
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography variant="subtitle2">Account Number</Typography>
          <Typography variant="body2">
            {activeBank.account_number}
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={() => onCopy(activeBank.account_number)}>
                <Iconify
                  icon="eva:copy-fill"
                  width={20}
                  color={"primary.main"}
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography variant="subtitle2">IFSC</Typography>
          <Typography variant="body2">
            {activeBank.ifsc}
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={() => onCopy(activeBank.ifsc)}>
                <Iconify
                  icon="eva:copy-fill"
                  width={20}
                  color={"primary.main"}
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography variant="subtitle2">Account Type</Typography>
          <Typography variant="body2">
            Current
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={() => onCopy("Current")}>
                <Iconify
                  icon="eva:copy-fill"
                  width={20}
                  color={"primary.main"}
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default React.memo(CompanyBankAccounts);
