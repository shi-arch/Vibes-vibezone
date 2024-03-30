
import Home from "../../components/home";
import Styles from '../page.module.css'

function Homepage() {

  return (
    <div className={Styles.main}>
      <h1>Welcome to Vibe Zone</h1>
      <Home />
    </div>
  );
}

export default Homepage;
