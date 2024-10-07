
import { useEffect, useState } from "react";
import { postData, updateData } from "../api/UserApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address:
    {street:""},
    company:
    {name:""},
    website: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;
  
 
  //   this is use to update the table by adding data
  useEffect(() => {
    updateDataApi &&
      setAddData({
        name: updateDataApi.name || "",
        username: updateDataApi.username || "",
        email: updateDataApi.email || "",
        phone: updateDataApi.phone || "",
        address: updateDataApi.address||"" ,
        website: updateDataApi.website || "",
        company:updateDataApi.company||""
      });
  }, [updateDataApi]);


//handing form changes at each event specifcally 
// object create problem in dynamic allation
const handleNameChange = (e) => {
    setAddData((prev) => ({ ...prev, name: e.target.value }));
  };
  const handleEmailChange = (e) => {
    setAddData((prev) => ({ ...prev, email: e.target.value }));
  };
  const handleUsernameChange = (e) => {
    setAddData((prev) => ({ ...prev, username: e.target.value }));
  };
  const handlePhoneChange = (e) => {
    setAddData((prev) => ({ ...prev, phone: e.target.value }));
  };  
  const handleAddressChange = (e) => {
    setAddData((prev) => ({ ...prev, address:{
                street: e.target.value,
            } }));
  };
  const handleWebsiteChange = (e) => {
    setAddData((prev) => ({ ...prev, website: e.target.value }));
  };
  const handleCompanyChange = (e) => {
    setAddData((prev) => ({ ...prev, company:{
                name: e.target.value,
            } }));
  };





  const addUserData = async () => {
    const res = await postData(addData);
    console.log("res", res);
    console.log(addData)
     console.log(data)
    if (res.status === 201) {
      setData([...data, res.data]);
      console.log(data)
      setAddData({ 
        name: "",
        username: "",
        email: "",
        phone: "",
        address:{street:""},
        website: "",
        company:{name:""},
     });
    }
   
  };

  //   updateUserData is to update while clicking on update
  const updateUserData = async () => {
    try {
      console.log(addData)
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });

        setAddData({ 
        name: "",
        username: "",
        email: "",
        phone: "",
        address:{street:""},
        website: "",
        company:{name:""},
         });
        setUpdateDataApi({});
      }
    } catch ({ error }) {
      console.log(error);
    } 
  }; 

  //   form submission  makes event occur
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addUserData();
    } 
    else if (action === "Edit") {
      updateUserData();
    }
  };

  return (
    
    <form  onSubmit={handleFormSubmit} className="">
      
        <table className=" bg-slate-500">
            <tr >
                
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Address</th>
                <th>Company</th>
                <th>Website</th>
               
            </tr>
            <tr className="border border-black" >
               
                <td >
                <label htmlFor="name"></label>
                <input
                type="text"
                autoComplete="off"
                id="name"
                name="name"
                placeholder="Add Name"
                value={addData.name}
                onChange={handleNameChange}
                />
                </td>
                <td>
                <label htmlFor="email"></label>
                <input
                type="email"
                autoComplete="off"
                id="email"
                name="email"
                placeholder="Add Email"
                value={addData.email}
                onChange={handleEmailChange}
                />
                </td>
                <td>
                <label htmlFor="phone"></label>
                <input
                type="tel"
                autoComplete="off"
                id="phone"
                name="phone"
                placeholder="Add Phone"
                value={addData.phone}
                onChange={handlePhoneChange}
                />
                </td>
                <td>
                <label htmlFor="username"></label>
                <input
                type="text"
                autoComplete="off"
                id="username"
                name="username"
                placeholder="Add Username"
                value={addData.username}
                onChange={handleUsernameChange}
                />
                </td>
                <td>
                <label htmlFor="address"></label>
                <input
                type="text"
                autoComplete="off"
                id="address"
                name="address"
                placeholder="Add Address"
                value={addData.address.street}
                onChange={handleAddressChange}
                />
                </td>
                <td>
                <label htmlFor="company"></label>
                <input
                type="text"
                autoComplete="off"
                id="company"
                name="company"
                placeholder="Add Company"
                value={addData.company.name}
                onChange={handleCompanyChange}
                />
                </td>
                <td>
                <label htmlFor="website"></label>
                <input
                type="text"
                autoComplete="off"
                id="website"
                name="website"
                placeholder="Add Website"
                value={addData.website}
                onChange={handleWebsiteChange}
                />
                </td>
               
            </tr>
        </table>

        
    
      
      <button className="bg-green-900  w-full text-white h-12" type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};