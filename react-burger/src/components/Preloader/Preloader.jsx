import { useEffect } from "react";
import { useAuth } from "../../services/utils/auth";

function Preloader() {
  const auth = useAuth();

  useEffect(() => {
    auth.getUser();
  }, []);
  return (
    <>
      <p>Идет загрузка</p>
    </>
  );
}

export default Preloader;
