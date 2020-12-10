import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateListing, submitListing } from "../redux/actions/listingActions";


// TODO: hook to axios to post
const ListingCreationForm = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.listingReducer.description);
  const type = useSelector((state) => state.listingReducer.type);
  const price = useSelector((state) => state.listingReducer.price);
  const title = useSelector((state) => state.listingReducer.title);

  return (
    <div class = "listing-creation-form">   
    <form action="http://localhost:4000/api/listings/create" method="post" enctype="multipart/form-data">
        <h2>Create Listing</h2>
        <div class = "form-entry">
        <label for="title">Title:</label>
        <input onChange={(e) =>
            dispatch(updateListing({ title: e.target.value }))
          }
          value={title}
          id='input-title'></input>
        </div>

        <div class = "form-entry">
        <label for="description">Description:</label>
        <input onChange={(e) =>
            dispatch(updateListing({ description: e.target.value }))
          }
          value={description}
          id='input-description'></input>
        </div>

        <div class = "form-entry">
        <label for="price">Price:</label>
        <input onChange={(e) =>
            dispatch(updateListing({ price: e.target.value }))
          }
          value={price}
          id='input-price'></input>
        </div>

        <div class = "form-entry">
        <label for="type">Type:</label>
        <input onChange={(e) =>
            dispatch(updateListing({ type: e.target.value }))
          }
          value={type}
          id='input-type'></input>
        </div>
        
        <div class = "form-entry">
        <input id="photos" name="photos" type="file" multiple accept="image/*"></input>
        </div>
        <button type='submit' id='submit' onClick={() =>
        dispatch(submitListing({ description, type, price, title }))}>
        Submit
        </button>
    </form>
    </div>
  );
};



export default ListingCreationForm;
