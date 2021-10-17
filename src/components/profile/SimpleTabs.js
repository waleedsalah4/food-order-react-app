import React from 'react';
import AcountInfo from './AcountInfo';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import MyORders from './MyOrders';

function TabPanel(props) {
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
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '260px',
    overflow: 'auto'
  },
  appBar: {
      backgroundColor: 'transparent',
      color: 'black',
      boxShadow: 'none'
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
 
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} aria-label="account tabs">
          <Tab label="account" />
          <Tab label="orders" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AcountInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyORders />
      </TabPanel>
    </div>
  );
}
