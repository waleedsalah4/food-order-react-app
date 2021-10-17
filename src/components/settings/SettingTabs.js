import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AcountInfo from '../profile/AcountInfo';

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
  },
  appBar: {
      backgroundColor: 'transparent',
      color: 'black',
      boxShadow: 'none'
  },
  link: {
      textDecoration: 'none',
  }
}));

export default function SettingTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
 
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} aria-label="setting tabs">
          <Tab label="Name and Email" />
          <Tab label="Update Password" />
          <Tab label="Delete My Acount" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
            <div>
                <AcountInfo />
            
            </div>
            <div>
            <Link to='/update-me' className={classes.link}>
            <Button variant='outlined' color='secondary'>
                Update
            </Button>
        </Link>
            </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <Link to='/update-password' className={classes.link}>
            <Button variant='outlined' color='secondary'>
                Update Password
            </Button>
        </Link>
      </TabPanel>
      <TabPanel value={value} index={2}>
          <Button variant='outlined' color='secondary'>
            Delete My Acount
          </Button>
      </TabPanel>
    </div>
  );
}
