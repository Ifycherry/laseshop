
import React, { useState } from "react";
import DashboardSideBar from "../components/DashboardSideBar";
import axios from "axios";
import { Link } from "react-router-dom";



export default function Addproduct() {

  //  calling the token and user info
  const authToken = localStorage.getItem('token');

  //const user = JSON.parse(localStorage.getItem('user'));

  // Handle file upload
  const [file, setFile]= useState(null);
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(image)
    // console.log(file)
  }
  

  //Handle for entries
  const [formData, setFormData] = useState({
    product_name : "",
    product_category : "",
    initial_price : "",
    selling_price : "",
    product_description : "",
    product_quantity : "",
    
  });

  const handleChange=(e)=> {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // console.log(formData)
  }

  //Declare Error state
  const [error, setError] = useState({
    product_name : "",
    product_category : "",
    initial_price : "",
    selling_price : "",
    product_description : "",
    product_quantity : "",
    product_image : "",
  });

  //Handle the last submit
  const handleSubmit= async (e) => {
    e.preventDefault();

    const data = new FormData(); 
    data.append("product_name", formData.product_name);
    data.append("product_category", formData.product_category);
    data.append("initial_price", formData.initial_price);
    data.append("selling_price", formData.selling_price);
    data.append("product_description", formData.product_description);
    data.append("product_quantity", formData.product_quantity);
    data.append("product_image", image);
    console.log(data);
    console.log(formData);
    

  
  try {
      const response = await axios.post("http://laseappstore.test/api/addproduct",
      //   {
      //    ...formData,
      //    product_image: image,
      // },
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log(response);
    alert("Product Added Successfully");
    setFormData({
      product_name:"",
      product_category:"",
      initial_price:"",
      selling_price:"",
      product_description:"",
      product_quantity:"",
      product_image:"",
    });
    setFile(null);
    setImage(null);
    setError({
      product_name:"",
      product_category:"",
      initial_price:"",
      selling_price:"",
      product_description:"",
      product_quantity:"",
      product_image:"",
    });
    } catch (error) {
      console.log(error.response.data.errors);
      setError(error.response.data.errors);
    }
  }

  return (
    <>
    <div className="flex flex-row">
    <DashboardSideBar />
    <main className="ml-64 p-5 max-w-screen-lg flex-wrap h-screen grow">
      <form 
      onSubmit={handleSubmit} encType="multipart/form-data" 
      className="space-y-6"
      >

        <h1 className="text-3xl font-extrabold text-green-900">Add Product</h1>

        {/* {File Upload & Preview} */}

        <div>
          <input 
          type="file"
           onChange={handleUpload} 
           className={"w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 mt-7"} id="file_input" 
           />
          <span className="text-red-500">{error.product_image[0]}</span> 
          {file && <img src={file} alt="Uploaded preview " />}
        </div>

        {/* { Product Name } */}
        <div>
        <label
                htmlFor="product_name"
                className="block text-sm font-medium text-gray-700 mt-7"
              >
                Product Name
              </label>
              <input
                type="text"
                name="product_name"
                onChange={handleChange}
                placeholder="Product Name"
                value={formData.product_name}
                 className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 mt-1"
                // className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

              />
              <span className="text-red-500">{error.product_name[0]}</span>

        </div>

        {/* { Product Category } */}
        <div>
        <label
                htmlFor="product_category"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Product Category
              </label>
              <input
                type="text"
                name="product_category"
                onChange={handleChange}
                placeholder="Product Category"
                value={formData.product_category}
                 className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 mt-1"
                // className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

              />
              <span className="text-red-500">{error.product_category[0]}</span>

        </div>

        {/* { Initial Price } */}
        <div>
        <label
                htmlFor="initial_price"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Initial Price
              </label>
              <input
                type="text"
                name="initial_price"
                onChange={handleChange}
                placeholder="Initial Price"
                value={formData.initial_price}
                 className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 mt-1"
                // className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

              />
              <span className="text-red-500">{error.initial_price[0]}</span>

        </div>

        {/* { Selling Price } */}
        <div>
        <label
                htmlFor="selling_price"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Selling Price
              </label>
              <input
                type="text"
                name="selling_price"
                onChange={handleChange}
                placeholder="Selling Price"
                value={formData.selling_price}
                 className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 mt-1"
                // className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

              />
              <span className="text-red-500">{error.selling_price[0]}</span>

        </div>

        {/* { Product Description } */}
        <div>
        <label
                htmlFor="product_description"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Product Description
              </label>
              <input
                type="text"
                name="product_description"
                onChange={handleChange}
                placeholder="Product Description"
                value={formData.product_description}
                 className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 mt-1"
                // className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

              />
              <span className="text-red-500">{error.product_description[0]}</span>
        </div>

        {/* { Product Quantity } */}
        <div>
        <label
                htmlFor="product_quantity"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Product Quantity
              </label>
              <input
                type="text"
                name="product_quantity"
                onChange={handleChange}
                placeholder="Product Quantity"
                value={formData.product_quantity}
                 className="w-full px-4 py-3 rounded-lg border border-gray-200 foc us:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 mt-1"
                // className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200 '} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}

              />
              <span className="text-red-500">{error.product_quantity[0]}</span>

        </div>

        {/* submit button */}
        <div>
              <button type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-lg duration-200 transform hover:scale-[1.01] shadow-md"
                        >
                Add Product
              </button>
            </div>

      </form> 
    </main>
    </div>
    </>
  )
}



























