import url3 from "../../assets/images/profile3.svg";
import url4 from "../../assets/images/recentUser1.svg";
import url5 from "../../assets/images/recentUser2.svg";
import url6 from "../../assets/images/recentUser3.svg";

export const recentUsers = [
    {
      id: 1,
      profileIcon: url4,
      onlineStatus: true,
    },
    {
      id: 2,
      profileIcon: url5,
      onlineStatus: false,
    },
    {
      id: 3,
      profileIcon: url6,
      onlineStatus: true,
    },
];

export const chats = [
    {
      id: 1,
      img: { url3 },
      name: "Jane Cooper",
      description: "Hello, don’t forget..",
      lastTime: "11:15 AM",
      selected: false,
    },
    {
      id: 2,
      img: { url3 },
      name: "Jane Cooper",
      description: "Hello, don’t forget..",
      lastTime: "11:15 AM",
      selected: false,
    },
    {
      id: 3,
      img: { url3 },
      name: "Jane Cooper",
      description: "Hello, don’t forget..",
      lastTime: "11:15 AM",
      selected: true,
    },
    {
      id: 4,
      img: { url3 },
      name: "Jane Cooper",
      description: "Hello, don’t forget..",
      lastTime: "11:15 AM",
      selected: false,
    },
    {
      id: 5,
      img: { url3 },
      name: "Jane Cooper",
      description: "Hello, don’t forget..",
      lastTime: "11:15 AM",
      selected: false,
    },
    {
      id: 6,
      img: { url3 },
      name: "Jane Cooper",
      description: "Hello, don’t forget..",
      lastTime: "11:15 AM",
      selected: false,
    },
    {
      id: 7,
      img: { url3 },
      name: "Jane Cooper",
      description: "Hello, don’t forget..",
      lastTime: "11:15 AM",
      selected: false,
    },
    {
      id: 8,
      img: { url3 },
      name: "Jane Cooper",
      description: "Hello, don’t forget..",
      lastTime: "11:15 AM",
      selected: false,
    },
    {
      id: 9,
      img: { url3 },
      name: "John Doe",
      description: "Hi there!",
      lastTime: "12:30 PM",
      selected: false,
    },
    {
      id: 10,
      img: { url3 },
      name: "Alice Smith",
      description: "Nice to meet you",
      lastTime: "2:45 PM",
      selected: true,
    },
    {
      id: 11,
      img: { url3 },
      name: "Bob Johnson",
      description: "What's up?",
      lastTime: "4:20 PM",
      selected: false,
    },
    {
      id: 12,
      img: { url3 },
      name: "Emily Brown",
      description: "How are you doing?",
      lastTime: "5:55 PM",
      selected: false,
    },
    {
      id: 13,
      img: { url3 },
      name: "Michael Wilson",
      description: "Hey!",
      lastTime: "6:30 PM",
      selected: false,
    },
    {
      id: 14,
      img: { url3 },
      name: "Samantha Clark",
      description: "Long time no see",
      lastTime: "7:45 PM",
      selected: false,
    },
    {
      id: 15,
      img: { url3 },
      name: "David Martinez",
      description: "How's it going?",
      lastTime: "9:10 PM",
      selected: false,
    },
    {
      id: 16,
      img: { url3 },
      name: "Emma White",
      description: "Nice weather today!",
      lastTime: "10:25 PM",
      selected: false,
    },
    {
      id: 17,
      img: { url3 },
      name: "James Taylor",
      description: "Happy birthday!",
      lastTime: "11:40 PM",
      selected: false,
    },
    {
      id: 18,
      img: { url3 },
      name: "Olivia Johnson",
      description: "Let's catch up soon",
      lastTime: "1:05 AM",
      selected: false,
    },
    {
      id: 19,
      img: { url3 },
      name: "William Brown",
      description: "See you tomorrow",
      lastTime: "2:20 AM",
      selected: false,
    },
    {
      id: 20,
      img: { url3 },
      name: "Sophia Davis",
      description: "Good night!",
      lastTime: "3:35 AM",
      selected: false,
    },
];

let chatList = [];

const now = new Date();

for (let i = 0; i < 5; i++) {
  const currentDate = new Date(now);
  currentDate.setDate(now.getDate() - i);

  for (let j = 0; j < 5; j++) {
    const sender = j % 2 === 0 ? 1 : 2; 
    const receiver = sender === 1 ? 2 : 1;

    const message = {
      id: chatList.length + 1,
      message: '',
      date: currentDate,
      sender: sender,
      receiver: receiver,
      name: sender === 1 ? 'You' : 'Jenny Wilson',
    };

    if ((i + j) % 5 === 0) {
      if ((i + j) % 2 === 0) {
        message.message = 'https://res.cloudinary.com/dysnxt2oz/image/upload/v1710821971/Rectangle_39_vy2nfe.png';
      } else {
        message.message = 'https://res.cloudinary.com/dysnxt2oz/image/upload/v1710821805/Rectangle_38_wcgnpi.png';
      }
    } else {
       message.message = `Hi there, nice to meet you. My name is ${message.name}, and I’m from Jakarta.`;
    }

    chatList.push(message);
  }
}

chatList = chatList.slice().sort((a, b) => a.date - b.date);

export {chatList};


export const updateChatList = chatList => {
    chatList.forEach((message) => {
        if (!(message.date instanceof Date)) {
            message.date = new Date(message.date);
        }

        message.date.setHours(11);
        message.date.setMinutes(0);
  
        const formattedDate = `${message.date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
        })};${message.date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })}`;
        message.date = formattedDate;
    });
  
    return chatList;
}
