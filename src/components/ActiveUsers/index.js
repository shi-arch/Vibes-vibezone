import React, { useEffect, useState } from 'react'
import { EyeOffline, VideoIcon } from '../svgComponents';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const ActiveUsers = () => {
  const { activeUsers, camOffUsers } = useSelector(state => state.dashboardSlice)
  const [camOnUsers, setCamOnUsers] = useState([])
  const [camOffUsersArr, setCamOffUsersArr] = useState([])
  const [activeUser, setActiveUser] = useState([])
  useEffect(() => {
    if (camOffUsers.length) {
      const arr = _.cloneDeep(camOffUsers)
      let arr1 = []
      let arr2 = []
      let arr3 = []
      for (let i = 0; i < arr.length; i++) {
        let o = arr[i]
        if(o.isActive){
          arr3.push(o)
        }
        if (o.camOff) {
          arr1.push(o)
        } else {
          arr2.push(o)
        }
      }
      setActiveUser(arr3)
      setCamOffUsersArr(arr1)
      setCamOnUsers(arr2)
    }
  }, [camOffUsers])
  return (
    <div className="active-users-bg-container">
      <div className="active-status-container">
        <div className="active-icon"></div>
        <p className="active-para">{activeUser.length}</p>
      </div>
      <div className="active-status-container">

        <span className="sm-lg-icons-rotate">
          <VideoIcon />
        </span>

        <p className="active-para">
          {camOnUsers.length}
        </p>
      </div>
      <div className="active-status-container">
        <span className="sm-lg-icons-rotate">
          <EyeOffline />
        </span>
        <p className="active-para">{camOffUsersArr.length}</p>
      </div>
      {/* <span style={{ padding: '10px' }} className="green-dots">
        <span style={{ color: 'white' }}>{activeUsers.length}</span>
      </span> */}
    </div>
  );
};

export default ActiveUsers