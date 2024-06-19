import React from 'react';

// @mui
import { Box, Tab, Tabs, Typography } from '@mui/material';

import UatCredential from './UatCredential';
import ProductionAccess from './ProductionAccess';
import CallBackUrl from './CallBackUrl';
import MyWhilelistedIp from './MyWhilelistedIp';

function ApiCredential() {
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box style={{ padding: '24px 0' }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const [valueTabs, setvalueTabs] = React.useState(0);
  const handleChangePanels = (event: React.SyntheticEvent, newValue: number) => {
    setvalueTabs(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '3px', fontSize: '20px' }}
        >
          <Tabs value={valueTabs} onChange={handleChangePanels} aria-label="basic tabs example">
            <Tab
              style={{ fontSize: '18px', marginTop: '-20px' }}
              label={<h4> My Whilelisted IP</h4>}
              {...a11yProps(0)}
            />
            {/* <Tab
              style={{ fontSize: '18px', marginTop: '-20px' }}
              label={<h4>UAT Credentials</h4>}
              {...a11yProps(1)}
            /> */}
            <Tab
              style={{ fontSize: '18px', marginTop: '-20px' }}
              label={<h4>Production Access</h4>}
              {...a11yProps(2)}
            />
            <Tab
              style={{ fontSize: '18px', marginTop: '-20px' }}
              label={<h4>Call Back URL</h4>}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
      </Box>
      <TabPanel value={valueTabs} index={0}>
        <MyWhilelistedIp />
      </TabPanel>
      {/* <TabPanel value={valueTabs} index={1}>
        <UatCredential />
      </TabPanel> */}
      <TabPanel value={valueTabs} index={1}>
        <ProductionAccess />
      </TabPanel>
      <TabPanel value={valueTabs} index={2}>
        <CallBackUrl />
      </TabPanel>
    </>
  );
}

export default ApiCredential;
