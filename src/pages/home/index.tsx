import { Link } from "react-router";
import "../../App.css";
function Home() {
  return (
    <div>
      <h1>Scondrel</h1>
      <Link to="/game">
        <button>Start</button>
      </Link>
    </div>
  );
}

export default Home;
