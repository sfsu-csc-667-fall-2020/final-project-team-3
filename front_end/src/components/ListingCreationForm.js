import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateListing, submitListing } from "../redux/actions/listingActions";

const ListingCreationForm = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.listingReducer.description);
  const type = useSelector((state) => state.listingReducer.type);
  const price = useSelector((state) => state.listingReducer.price);
  const title = useSelector((state) => state.listingReducer.title);

  return (
    <div>
      <div>
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
              <td>
                <textarea
                  onChange={(e) =>
                    dispatch(updateListing({ description: e.target.value }))
                  }
                  value={description}
                  id='input-description'
                />
              </td>
              <td>
                <textarea
                  onChange={(e) =>
                    dispatch(updateListing({ type: e.target.value }))
                  }
                  value={type}
                  id='input-type'
                />
              </td>
              <td>
                <textarea
                  onChange={(e) =>
                    dispatch(updateListing({ price: e.target.value }))
                  }
                  value={price}
                  id='input-price'
                />
              </td>
              <td>
                <textarea
                  onChange={(e) =>
                    dispatch(updateListing({ title: e.target.value }))
                  }
                  value={title}
                  id='input-title'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button
          type='submit'
          id='submit'
          onClick={() =>
            dispatch(submitListing({ description, type, price, title }))
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ListingCreationForm;
