import React from "react";
import { API } from "../../utils/Config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/image/${item._id}`}
      alt={item.name}
      className="mb-2"
      //    style={{ maxHeight:"100%", maxWidth:"100%"}}
      style={{ maxHeight: "250px", maxWidth: "400px" }}
    />
  </div>
);

export default ShowImage;
