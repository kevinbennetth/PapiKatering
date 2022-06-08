import profileImg from "../../assets/profileImg.jpg";
import {useState, useEffect} from "react";
import API from "../../apis/API";

const MerchantMenu = (props) => {

  const customerID = props.custID;
  const [merchant, setMerchant] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const renderButtonText = (state) => {
    if(state){
      document.getElementById("submitBtn").innerHTML="Save";
    }
    else{
      document.getElementById("submitBtn").innerHTML="Create Merchant";
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/merchant/?CustomerID=${customerID}`);

        if(response.data.data.merchantData){
          setMerchant(response.data.data.merchantData);
          setName(response.data.data.merchantData.merchantname);
          setAddress(response.data.data.merchantData.merchantaddress);
          setPhone(response.data.data.merchantData.merchantphone);
        }
      } catch(error) {
        console.log(error);
      }
    }

    renderButtonText(merchant);

    fetchData();
  }, []);

  const validate = (name, address, phone) => {
    if(name.length<1 || address.length<1){
      return false;
    }
    if(phone.length!=12){
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if(validate(name, address, phone)){
        if(merchant){
          response = await API.put(`/merchant/${merchant.merchantid}`, {
            MerchantName: name,
            MerchantAddress: address,
            MerchantPhone: phone
          });
  
          if(response.data.status=="success"){
            document.getElementById("status").innerHTML = "Successfully udpated merchant profile!";
          }
        }
        else{
          response = await API.post(`/merchant`, {
            CustomerID: customerID,
            MerchantName: name,
            MerchantAddress: address,
            MerchantPhone: phone
          })
        }
      }
      else{
        document.getElementById("status").innerHTML = "Invalid inputs";
      }

      console.log(response);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="profile-menu">
      <div className="title text-3xl border-b-2">Merchant</div>
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
                    className="rounded-md border w-full p-1"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="address-container my-2">
                  <p htmlFor="address">Address</p>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="rounded-md border w-full p-1"
                    defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="phone-container my-2">
                  <p htmlFor="phone">Phone Number</p>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="rounded-md border w-full p-1"
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <p id="status"></p>
              </form>
            </div>
          </div>
          <div className="right-side basis-1/3">
            <div className="right-container flex flex-col">
              <img className="profile-img" src={profileImg} alt="" />
              <div className="button-container flex justify-center mt-4">
                <button
                  className="block px-10 py-2 bg-emerald-600 hover:bg-emerald-700
                            text-white font-bold rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button id="submitBtn" type="submit" 
      className="block px-10 py-2 mt-12 mb-4 bg-emerald-600 hover:bg-emerald-700
                text-white font-bold rounded-md" onClick={(e) => handleSubmit(e)}></button>
    </div>
  );
}


export default MerchantMenu;