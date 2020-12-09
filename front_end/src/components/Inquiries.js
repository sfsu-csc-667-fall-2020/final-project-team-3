import React from "react";
import { useSelector } from "react-redux";

const Inquiries = () => {
  const inquiries = useSelector((state) => state.inquiryReducer.inquiries);
  return (
    <div>
      <h2>Inquiries</h2>
      <h3>
        {inquiries.map((inquiry, index) => (
          <div key={index} className='inquiry'>
            {inquiry.message}
          </div>
        ))}
      </h3>
    </div>
  );
};

export default Inquiries;
