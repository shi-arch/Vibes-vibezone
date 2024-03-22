"use client"
import {Input, Button} from '../components/commonComponents/commonComponents'

const Home = (props) => {
    const testChange = (e) => {
        const {value} = e.target
    }

    const testClick = (val) => {
        console.log(val)
    }
    return (
        <>
        <h1>Welcome to Home page</h1>
        <Input type="text" onChange={testChange} placeholder={"Enter your emaail"} />
        <Input type="password" onChange={testChange} placeholder={"Enter your password"} />
        <Button type="button"  onClick={testClick} label="Click"/>
        </>
    )
}

export default Home