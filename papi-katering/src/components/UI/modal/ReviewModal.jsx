import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { APIContext, UserContext } from "../../../context/context";
import Button from "../button/Button";
import Dropdown from "../Dropdown";
import TextArea from "../input/TextArea";
import BaseModal from "./BaseModal";

const dropdownValue = [
  { value: 1, show: 1 },
  { value: 2, show: 2 },
  { value: 3, show: 3 },
  { value: 4, show: 4 },
  { value: 5, show: 5 },
];

export default function ReviewModal(props) {
  const { API_URL } = useContext(APIContext);
  const { customerID } = useContext(UserContext);
  const { selectedReview } = props;

  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");

  const reviewSubmitHandler = async () => {
    if (selectedReview) {
      const API = `${API_URL}review/${selectedReview.reviewid}`;
      const body = {
        rating,
        description,
      };
      try {
        await axios.put(API, body);
        props.onUpdate();
        props.onHideModal();
      } catch (error) {
        console.log(error);
      }
    } else {
      const API = `${API_URL}review`;
      const body = {
        customerid: customerID,
        packetid: props.packetid,
        rating,
        description,
      };
      try {
        await axios.post(API, body);
        props.onUpdate();
        props.onHideModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteReviewHandler = async (reviewID) => {
    const API = `${API_URL}review/${selectedReview.reviewid}`;
    try {
      await axios.delete(API);
      props.onUpdate();
      props.onHideModal();
    } catch (error) {
      console.log(error);
    }
  };

  const formValueHandler = (name, value) => {
    if (name === "rating") {
      setRating(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  useEffect(() => {
    if (selectedReview !== null && selectedReview !== undefined) {
      setRating(selectedReview.reviewrating);
      setDescription(selectedReview.reviewdescription);
    }
  }, [selectedReview]);

  return (
    <BaseModal show={props.show} onHideModal={props.onHideModal}>
      <h3 className="text-xl font-bold mb-6">Add Review</h3>
      <div className="flex flex-col gap-4 mb-4">
        <label htmlFor="score">Review Score</label>
        <Dropdown
          color="white"
          name="rating"
          id="rating"
          value={rating}
          options={dropdownValue}
          onChange={formValueHandler}
        />
        <label htmlFor="">Description</label>
        <TextArea
          type="text"
          name="description"
          id="description"
          color="white"
          rows={12}
          value={description}
          onChange={formValueHandler}
        />
      </div>

      <div className="flex flex-row gap-4">
        {selectedReview && <Button type="button" onClick={deleteReviewHandler}>
          Delete
        </Button>}
        <Button type="button" onClick={reviewSubmitHandler}>
          Save
        </Button>
      </div>
    </BaseModal>
  );
}
