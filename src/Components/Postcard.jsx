import React from "react";

// data from database that is from app write
import dataservice from "../services/dataservice";
import { Link } from "react-router-dom";

const Postcard = ({ $id, title, featuredimage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="">
        <div className="">
          <div className="">
            <img src={dataservice.getfilepreview(featuredimage)} alt={title} />
          </div>
		  <div className="">
          <h2>{title}</h2>
		  </div>
        </div>
      </div>
    </Link>
  );
};

export default Postcard;
