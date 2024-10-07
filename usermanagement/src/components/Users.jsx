import { useEffect, useState } from "react";
import { deleteUser, getUser, } from "../api/UserApi";

import "../App.css";
import { Form } from "./Form";

export const Users = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getUserData = async () => {
    const res = await getUser();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  //   function to delete User whole data from local file
  const handleDeleteUser = async (id) => {
    
    try {
      const res = await deleteUser(id);
      if (res.status === 200) {
        const newUpdatedUsers = data.filter((curUser) => {
          return curUser.id !== id;
        });
        setData(newUpdatedUsers);
      } else {
        console.log("Failed to delete the user:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleUpdateUser = (curElem) => setUpdateDataApi(curElem);

  return (
    < >

      <div className=" ">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </div>
      <section className="w-full"  >
        
        <ol>
          {data.map((curElem) => {
            const { id,name,username,email,phone,address,website,company } = curElem;
            return (
                <div className="">
              <li key={id} className="">
                <table className="w-full bg-blue-300">
                    <tr >
                    {/* s no is not maintained while deleting this */}
                        {/* <th>Sl no.</th> */}
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Company</th>
                        <th>Website</th>
                    </tr>
                    <tr >
                        {/* <td>{id}</td> */}
                        <td>{name}</td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{address.street}</td>
                        <td>{company.name}</td>
                        <td>{website}</td>
                        <td><button onClick={() => handleUpdateUser(curElem)} className="bg-green-600 w-28 h-10 rounded-2xl">Edit</button></td>
                        <td><button
                  className="btn-delete bg-red-600 w-28   h-10  rounded-2xl"
                  onClick={() => handleDeleteUser(id)}
                >
                  Delete
                </button></td>
                    </tr>
                </table>
                <div className="flex justify-center space-x-20 ">
                
                
                </div>
              </li>
              </div>
            );
          })}
        </ol>
      </section>
    </>
  );
};