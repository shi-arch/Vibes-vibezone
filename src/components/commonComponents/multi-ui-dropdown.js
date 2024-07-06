import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setKeyWords, setKeywords } from '../../redux/features/chatSlice';
import { updateKeywords } from '../../app/utils/wssConnection/wssConnection';
import { postApi } from '../../response/api';

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

const names = [
  'Music',
  'Business',
  'Arts',
  'Meet up',
  'Communication Skills',
  'Casual',
  'Education'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const {ipAddress} = useSelector(state => state.callSlice)
  const {keyWords} = useSelector(state => state.chatSlice)
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    if (keyWords) {
      setPersonName(typeof keyWords === 'string' ? keyWords.split(',') : keyWords)
    }
  }, [keyWords])
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(typeof value === 'string' ? value.split(',') : value,'ddddddd')
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
    dispatch(setKeyWords(value))    
  };

  const handleBlur = async (event) => {
    dispatch(setIsLoading(true))    
    const {
      target: { value },
    } = event;
    await postApi('/earlyAccess', {ipAddress, keyWords: value.join(',') })
    dispatch(setIsLoading(false))    
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Keys</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          onBlur={handleBlur}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
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