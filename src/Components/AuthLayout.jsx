import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {  useNavigate } from "react-router-dom";

export const AuthLayout = ({ children, authentication = true }) => {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const authstatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authstatus !== authentication) {
      navigate("/");
    } else if (!authentication && authstatus !== authentication) {
      navigate("/login");
    }
    setloading(false);
  }, [authstatus, navigate, authentication]);
  return <>{loading ? <div>loading...</div> : children}</>;
};
