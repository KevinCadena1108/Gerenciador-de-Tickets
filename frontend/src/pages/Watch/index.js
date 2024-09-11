import { Link } from "react-router-dom";
import Table from "../../components/Table";
import CustomButton from "../../components/CustomButton";

function Watch() {
  return (
    <div>
      <h1>Watch</h1>
      <Link to="/">
        <CustomButton />
      </Link>
      <Table />
    </div>
  );
}

export default Watch;
