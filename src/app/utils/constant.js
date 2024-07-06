import store from '../../redux/store';
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegex = /^[6-9]\d{9}$/

export const disableColor = '#dc9c26'
export const enableColor = '#ec4242'
export const initialColor = 'rgb(143, 71, 255)'


export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
};

export const getStats = async (peerConnection) => {
    const stats = await peerConnection.getStats();
    let bandwidth, roundTripTime;
    stats.forEach(report => {
      if (report.type === 'candidate-pair' && report.state === 'succeeded') {
        bandwidth = report.availableOutgoingBitrate;
        roundTripTime = report.currentRoundTripTime;
      }
    });
    return { bandwidth, roundTripTime };
  }

export const getRandomTimeInMilliseconds = (minSeconds, maxSeconds) => {
    const minMilliseconds = minSeconds * 1000;
    const maxMilliseconds = maxSeconds * 1000;
    const randomMilliseconds = Math.random() * (maxMilliseconds - minMilliseconds) + minMilliseconds;
    return randomMilliseconds;
}
export const validation = async (dataToValidate, data) => {
    let result = { isErr: false, msg: "", type: "" }
    for (let i = 0; i < dataToValidate.length; i++) {
        result = validate(dataToValidate[i], data)
        if (result.isErr) {
            result
            break;
        }
    }
    return result
}

const validate = (expression, o) => {
    const obj = { isErr: false, msg: "", type: "" }
    switch (expression) {
        case 'email':
            const email = o.email
            if (!email) {
                obj.isErr = true
                obj.msg = "Email is required!"
                obj.type = "email"
            } else if (email && !emailRegex.test(email)) {
                obj.isErr = true
                obj.msg = "Email is incorrect!"
                obj.type = "email"
            }
            break;
        case 'contact':
            const contact = o.contact
            if (!contact) {
                obj.isErr = true
                obj.msg = "Contact is required!"
                obj.type = "contact"
            } else if (contact && !phoneRegex.test(contact)) {
                obj.isErr = true
                obj.msg = "Contact is incorrect!"
                obj.type = "contact"
            }
            break;
        case 'name':
            const name = o.name
            if (!name) {
                obj.isErr = true
                obj.msg = "Name is required!"
                obj.type = "name"
            }
            break;
        case 'userName':
            const userName = o.userName
            if (!userName) {
                obj.isErr = true
                obj.msg = "UserName is required!"
                obj.type = "userName"
            }
            break;
        case 'gender':
            const gender = o.gender
            if (!gender) {
                obj.isErr = true
                obj.msg = "gender is required!"
                obj.type = "gender"
            }
            break;
        case 'dob':
            const dob = o.dob
            if (!dob) {
                obj.isErr = true
                obj.msg = "Date of birth is required!"
                obj.type = "dob"
            }
    }
    return obj
}

export const isNumeric = (str) => {
    if (typeof str != "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}




//   const disconnectedTime = new Date().getTime() - store.getState().callSlice.connectedTime
// const differenceInMinutes = disconnectedTime / (1000 * 60);
//   console.log(differenceInMinutes)
//   if(differenceInMinutes > 5){
//     dispatch(setTimeDiff(differenceInMinutes))
//   }


// if (userObjectId && timeDiff) {
//   getApi("/profile", token).then(res => {
//     if (res) {
//       const { profileImage, name, contact, userName, status } = res.data
//       const o = {
//         profileImage: profileImage || "",
//         name: name || contact || email
//       }
//       sendRequest({userData: o, callerSocketId: userToCall.socketId})
//     }
//   })
//   dispatch(setTimeDiff(""))
//   dispatch(setUserObjectId(""))
// }