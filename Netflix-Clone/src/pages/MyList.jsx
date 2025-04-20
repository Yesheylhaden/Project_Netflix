import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Row from "../Components/Row/Row";
import { isAuthenticated } from "../utils/auth";

export default function MyList() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="bg-black text-white min-h-screen pt-20 px-4">
      <h1 className="text-3xl font-bold mb-4">My List</h1>
      <Row title="My List" fetchUrl="/api/my-list" isLargeRow={true} />
    </div>
  );
}
