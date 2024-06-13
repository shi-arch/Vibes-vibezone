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
import { setLoginDetails, setToken, setUserSelectedTopics } from '../../redux/features/loginSlice';
import store from '../../redux/store';
import { setUserLoggedIn, setUserName } from '../../redux/features/chatSlice';
import { setPeerId } from '../../redux/features/callSlice';
import { Cookie } from '@mui/icons-material';

export const restoreLocalData = () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsedData = JSON.parse(userData);
    store.dispatch(setLoginDetails(parsedData.user));
    store.dispatch(setToken(parsedData.token));
  }
}
export const Loader = (style) => {
  return <div style={style.style}>
    <CircularProgress />
  </div>
}

export const getEarlyAccess = async () => {
  const user = "Guest + " + Math.random().toString().substr(2, 8);
  const peerId = (Math.random() + 1).toString(36).substring(7)
  store.dispatch(setUserName(user));
  store.dispatch(setPeerId(peerId))
  const checkUser = localStorage.getItem("user")
  if(!checkUser){
    localStorage.setItem("user", user);
    localStorage.setItem("peerId", peerId);
  }  
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
