import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate]); // Add navigate to dependencies

  if (loading) return null; // Prevents rendering during navigation check

  return <>{children}</>;
}

export default PublicRoute;
