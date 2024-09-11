import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

function Home() {
  return (
    <div>
      <Link to="/watch">
        <CustomButton />
      </Link>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
