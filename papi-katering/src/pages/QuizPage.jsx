import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/UI/alert/Alert";
import Button from "../components/UI/button/Button";
import Input from "../components/UI/input/Input";
import Radio from "../components/UI/input/Radio";
import { APIContext, UserContext } from "../context/context";

const quizInfoReducer = (state, data) => {
  return { ...state, ...data };
};

const QuizPage = () => {
  const navigate = useNavigate();
  const { customerID } = useContext(UserContext);
  console.log(customerID);

  const { API_URL } = useContext(APIContext);
  const [update, setUpdate] = useState(null);
  const [fetch, setFetch] = useState(false);

  const halalList = [
    { text: "Only Halal", value: 1 },
    { text: "Only Non-Halal", value: -1 },
    { text: "Both are Fine", value: 0 },
  ];

  const vegetarianList = [
    { text: "Only Vegetarian", value: 1 },
    { text: "Only Non-Vegetarian", value: -1 },
    { text: "Both are Fine", value: 0 },
  ];

  const [error, setError] = useState(null);
  const [quizInfoState, dispatchQuizInfo] = useReducer(quizInfoReducer, {
    halal: "",
    vegetarian: "",
    minPrice: "",
    maxPrice: "",
  });

  const validateFormFields = () => {
    const submissionError = {
      header: "",
      detail: "",
    };

    const { halal, vegetarian, minPrice, maxPrice } = quizInfoState;

    if (halal === "") {
      submissionError.header = "Invalid Halal Section";
      submissionError.detail = "Please Choose the Halal Section !";
    } else if (vegetarian === "") {
      submissionError.header = "Invalid Vegetarian Section";
      submissionError.detail = "Please Choose the Vegetarian Section !";
    } else if (!parseInt(minPrice) > 0) {
      submissionError.header = "Invalid Minimum Price";
      submissionError.detail =
        "Please Insert a Valid Number that is more than 0 !";
    } else if (!parseInt(maxPrice) > 0 && parseInt(maxPrice) <= parseInt(minPrice)) {
      submissionError.header = "Invalid Maximum Price";
      submissionError.detail =
        "Please Insert a Valid Number that is more than the Minimum Price !";
    }

    return submissionError;
  };

  const submissionHandler = async (e) => {
    e.preventDefault();

    const submissionError = validateFormFields();
    const { halal, vegetarian, minPrice, maxPrice } = quizInfoState;

    if (submissionError.header !== "" && submissionError.detail !== "") {
      setError(submissionError);
    } else {
      let URL = `${API_URL}preference`;

      const body = {
        CustomerID: customerID,
        Halal: parseInt(halal),
        Vegetarian: parseInt(vegetarian),
        MinPrice: isNaN(minPrice) ? "" : parseInt(minPrice),
        MaxPrice: isNaN(maxPrice) ? "" : parseInt(maxPrice),
      };
      try {
        if (update) {
          await axios.put(URL, body);
        } else {
          await axios.post(URL, body);
        }
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formValueHandler = (name, value) => {
    if((name === "minPrice" || name === "maxPrice") && !(value > 0)) {
      value = "";
    }
    dispatchQuizInfo({ [name]: value });
  };

  useEffect(() => {
    const getPreference = async () => {
      console.log(customerID)
      const URL = `${API_URL}preference/${customerID}`;
      try {
        const responsePreference = await axios.get(URL);
        const preference = responsePreference.data;
        if (preference.message !== "NOT FOUND") {
          dispatchQuizInfo({
            halal: preference.halal,
            vegetarian: preference.vegetarian,
            minPrice: preference.minprice,
            maxPrice: preference.maxprice,
          });
          setUpdate(true);
        }
        setFetch(true);
      } catch (error) {}
    };

    getPreference();
  }, [API_URL, customerID]);

  const { halal, vegetarian, minPrice, maxPrice } = quizInfoState;

  return (
    fetch && (
      <>
        {error && (
          <Alert
            onFinishError={setError}
            header={error.header}
            detail={error.detail}
          />
        )}
        <div className="min-h-full absolute w-full bg-white top-0 flex flex-row z-10">
          <img
            src="https://images2.alphacoders.com/100/1003810.jpg"
            alt=""
            className="w-3/12 object-cover object-left"
          />
          <div className="ml-64 my-auto w-5/12 flex flex-col gap-8 py-20">
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold mb-4">Papi's Advisor</h3>
              <p className="text-lg">
                Hi ! Papi would like to know your food preferences, so please
                answer the questions below 👏
              </p>
            </div>

            <form onSubmit={submissionHandler}>
              <div className="flex flex-col gap-8 mb-8">
                <div className="flex flex-col gap-6">
                  <h4 className="text-2xl font-bold">Category</h4>
                  <div className="flex flex-col gap-3">
                    <p className="text-lg">
                      Would you like your food to be halal?
                    </p>
                    {halalList.map((halalItem, idx) => (
                      <div key={idx} className="flex flex-row gap-4">
                        <Radio
                          name="halal"
                          value={halalItem.value}
                          checked={halalItem.value.toString() === halal.toString()}
                          onChange={formValueHandler}
                        />
                        <p className="text-lg">{halalItem.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-lg">
                      Would you like your food to be vegetarian?
                    </p>
                    {vegetarianList.map((vegetarianItem, idx) => (
                      <div key={idx} className="flex flex-row gap-4">
                        <Radio
                          name="vegetarian"
                          value={vegetarianItem.value}
                          checked={
                            vegetarianItem.value.toString() === vegetarian.toString()
                          }
                          onChange={formValueHandler}
                        />
                        <p className="text-lg">{vegetarianItem.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h4 className="font-bold text-2xl">Price Range</h4>
                  <p className="text-lg">
                    How much are you willing to spend in a day?
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row border-2 border-[#686868] rounded-lg">
                      <p className="py-2 px-3 bg-[#686868] text-white text-lg font-bold rounded-l-md">
                        Rp
                      </p>
                      <Input
                        type="number"
                        name="minPrice"
                        placeholder="Minimum Price"
                        value={minPrice}
                        onChange={formValueHandler}
                      />
                    </div>
                    <div className="flex flex-row border-2 border-[#686868] rounded-lg self-stretch">
                      <p className="py-2 px-3 bg-[#686868] text-white text-lg font-bold rounded-l-md">
                        Rp
                      </p>
                      <Input
                        type="number"
                        name="maxPrice"
                        placeholder="Maximum Price"
                        value={maxPrice}
                        onChange={formValueHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit">Save</Button>
            </form>
          </div>
        </div>
      </>
    )
  );
};

export default QuizPage;
