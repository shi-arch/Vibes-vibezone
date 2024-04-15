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
import { setUserSelectedTopics } from '../../redux/features/loginSlice';

export const Loader = () => {
  return <div style={{position: 'absolute'}}>
    <CircularProgress />
  </div>
}

export const Input = (props) => {
  return (
    <input
      type={props.type}
      className={props.css}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}
    />
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
  const {data} = useSelector((state) => state.loginSlice.allPreferences);

  React.useEffect(() => {
    if(personName){
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
