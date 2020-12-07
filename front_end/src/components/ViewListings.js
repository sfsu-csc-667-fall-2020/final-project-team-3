import React from "react";

const ViewListings = (listing) => {
  return (
    <div>
      <h1>ViewListings</h1>
      <div>
        <div className='.listing'>
          <table className='listing'>
            <thead>
              <tr>
                <th>description</th>
                <th>type</th>
                <th>price</th>
                <th>title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{listing.description}</td>
                <td>{listing.type}</td>
                <td>{listing.price}</td>
                <td>{listing.title}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewListings;
