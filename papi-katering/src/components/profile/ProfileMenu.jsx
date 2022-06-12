import { getDownloadURL } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import API from "../../apis/API";
import Button from "../UI/button/Button";
import {
  selectImage,
  uploadAndGetURL,
} from "../UI/button/firebase/uploadUtilities";
import UploadButton from "../UI/button/UploadButton";
import { UserContext } from "../../context/context"

const ProfileMenu = (props) => {

  const { onUserUpdate } = useContext(UserContext)
  
  const customerID = props.custID;
  const [customer, setCustomer] = useState("");
  const [name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const formatDate = (date) => {
    date = new Date(date);

    const year = date.getFullYear().toString();

    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    } else {
      month = month.toString();
    }

    var day = date.getDate();
    if (day < 10) {
      day = "0" + day.toString();
    } else {
      day = day.toString();
    }

    const dateString = year + "-" + month + "-" + day;
    return dateString;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/user/${customerID}`);
        const customerResponse = response.data.data.customerData;
        customerResponse.customerdob = formatDate(customerResponse.customerdob);
        setCustomer(customerResponse);
        setName(customerResponse.customername);
        setDOB(customerResponse.customerdob);
        setGender(customerResponse.customergender);
        setEmail(customerResponse.customeremail);
        setPhone(customerResponse.customerphone);
        setProfileImage(customerResponse.customerimage);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const dob = formatDate(customer.customerdob);

  const validate = (name, email, phone) => {
    if (name.length < 1) {
      return false;
    }
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return false;
    }
    if (phone.length != 12) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validate(name, email, phone)) {
        const image = await uploadAndGetURL(profileImage);
        const response = await API.put(`/user/${customerID}`, {
          CustomerName: name,
          CustomerDOB: DOB,
          CustomerGender: gender,
          CustomerEmail: email,
          CustomerPhone: phone,
          CustomerImage: image,
        });

        if (response.data.status === "success") {

          onUserUpdate(name, image);
          document.getElementById("status").innerHTML =
            "Successfully up dated profile!";
        }
      } else {
        document.getElementById("status").innerHTML = "Invalid input";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const imageChangeHandler = (name, value) => {
    setProfileImage(value);
  };

  return (
    <div className="profile-menu">
      <div className="title text-3xl border-b-2">Profile</div>
      <div className="content container mt-4 mb-12">
        <div className="flex flex-row">
          <div className="left-side basis-2/3">
            <div className="biodata container w-11/12">
              <strong className="text-lg">Biodata</strong>
              <form action="" method="post">
                <div className="name-container my-2">
                  <p htmlFor="name">Name</p>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={customer.customername}
                    className="rounded-md border w-full p-1"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="dob-container my-2">
                  <p htmlFor="dob">Date of Birth</p>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    defaultValue={customer.customerdob}
                    className="rounded-md border w-full p-1"
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </div>

                <div className="gender-container my-2">
                  <p htmlFor="gender">Gender</p>
                  <select
                    name="gender"
                    id="gender"
                    className="rounded-md border w-full px-1 bg-transparent py-2"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="contact container w-11/12 mt-8">
              <strong className="text-lg">Contact</strong>
              <form action="" method="post">
                <div className="email-container my-2">
                  <p htmlFor="email">Email</p>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    defaultValue={customer.customeremail}
                    className="rounded-md border w-full p-1"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="phone-container my-2">
                  <p htmlFor="phone">Phone Number</p>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    defaultValue={customer.customerphone}
                    className="rounded-md border w-full p-1"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <p id="status"></p>
              </form>
            </div>
          </div>
          <div className="right-side basis-1/3">
            <div className="right-container flex flex-col">
              <img
                className="profile-img aspect-square object-cover rounded-md"
                src={selectImage(profileImage, "PROFILE")}
                alt=""
              />
              <div className="button-container flex justify-center mt-4">
                <UploadButton
                  name="customerimage"
                  id="customerimage"
                  onFileSelect={imageChangeHandler}
                >
                  Edit
                </UploadButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Save
      </Button>
    </div>
  );
};

export default ProfileMenu;
