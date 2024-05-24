import * as React from 'react';
import styles from "../../app/page.module.css";
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from "react-redux";
import { setLoginDetails, setToken, setTotalUsers, setUserSelectedTopics } from '../../redux/features/loginSlice';
import store from '../../redux/store';
import { setBgColor, setButtonLabel, setDisableButton, setFlag, setTimer, setTriggerCall, setTimeDiff, setUserObjectId } from '../../redux/features/callSlice';
import { setLoader, setMessages } from '../../redux/features/chatSlice';
import { getActiveUser, sendRequest } from '../../app/utils/wssConnection/wssConnection';
import { callToOtherUser, hangUpAutomateCall } from '../../app/utils/webRTC/webRTCHandler';
import { getApi } from '../../response/api';

export const restoreLocalData = () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsedData = JSON.parse(userData);
    store.dispatch(setLoginDetails(parsedData.user));
    store.dispatch(setToken(parsedData.token));
  }
}

export const startRandomCall = async () => {
  getActiveUser()
  store.dispatch(setTimer(true))
  store.dispatch(setDisableButton(true))
  store.dispatch(setBgColor("#dc9c26"))
  store.dispatch(setLoader(true))
}

export const skipCall = async () => {
  await hangUpAutomateCall()
  const dispatch = store.dispatch
  dispatch(setMessages([]))
  dispatch(setDisableButton(true))
  dispatch(setBgColor("#dc9c26"))
//   const disconnectedTime = new Date().getTime() - store.getState().callSlice.connectedTime
// const differenceInMinutes = disconnectedTime / (1000 * 60);
//   console.log(differenceInMinutes)
//   if(differenceInMinutes > 5){
//     dispatch(setTimeDiff(differenceInMinutes))
//   }    
}

const getConnectedUserDetails = () => {
  
}

export const setUseEffectdata = () => {
  const dispatch = store.dispatch
  const {buttonLabel, bgColor, flag, callState, userToCall, triggerCall, timer, userObjectId, timeDiff} = store.getState().callSlice
  const {token} = store.getState().loginSlice
  if (userObjectId && timeDiff) {
    getApi("/profile", token).then(res => {
      if (res) {
        const { profileImage, name, contact, userName, status } = res.data
        const o = {
          profileImage: profileImage || "",
          name: name || contact || email
        }
        sendRequest({userData: o, callerSocketId: userToCall.socketId})
      }
    })
    dispatch(setTimeDiff(""))
    dispatch(setUserObjectId(""))
  }
  if (buttonLabel == 'Skip' && callState == 'CALL_AVAILABLE') {
    dispatch(setLoader(true))
  }
  if (callState == "CALL_IN_PROGRESS") {
    dispatch(setLoader(false))
  }
  if (userToCall && triggerCall) {
    callToOtherUser(userToCall)
    dispatch(setTriggerCall(false))
  }
  if (timer) {
    dispatch(setTimer(false))
    setTimeout(() => {
      dispatch(setButtonLabel("Skip"))
      dispatch(setBgColor("#ec4242"))
      dispatch(setDisableButton(false))
      dispatch(setTimer(true))
      dispatch(setFlag(!flag))
    }, 5000)
  }
}



export const Loader = (style) => {
  return <div style={style.style}>
    <CircularProgress />
  </div>
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const Input = (props) => {
  return (
    <input
      id="msg"
      type={props.type}
      className={props.css}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      onKeyDown={(e) => props.onKeyDown(e)}
      value={props.value}
    />
  );
};

export const LabelInput = ({ type, label, onChange, placeholder, value, name }) => {
  return (
    <div className="label-input-container">
      <span class="Gender">
        {label}
        <span class="text-style-1">*</span>
      </span>
      <input
        type={type}
        name={name}
        onChange={(e) => onChange(e.target.value, name)}
        value={value}
        className="input-container-pf"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const MultipleSelectChip = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [personName, setPersonName] = React.useState([]);
  const { data } = useSelector((state) => state.loginSlice.allPreferences);

  React.useEffect(() => {
    if (personName) {
      dispatch(setUserSelectedTopics(personName))
    }
  }, [personName]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-chip-label">Key word</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data && data.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export const result = window.matchMedia("(max-width: 500px)");

export const Button = (props) => {
  return (
    <button
      type={props.type}
      className={styles.saveButton}
      onClick={() => props.onClick()}
    >
      {props.label}
    </button>
  );
};

export const SideBarSelections = (props) => (
  <div
    className={styles.sideBarIconTextContainer}
    type="button"
    onClick={() => props.onClick()}
  >
    <props.name color={props.color} size={props.size} />
    <p className={styles.sideBarText}>{props.label}</p>
  </div>
);
