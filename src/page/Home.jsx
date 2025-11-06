import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import Header from '../components/Header';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);

   useEffect(()=>{
     const fetechData = async () => {
       const response = await axios.get("http://laseappstore.test/api/allproduct");
       setProducts(response.data.products);

     }
     fetechData();
   }, [])
  return (
    <>
    <Header/>
    <h1>Hello Welcome</h1>
    {console.log(products)}
    <section className='flex flex-wrap justify-start gap-4 p-4'>

      {products.map((product, index) => (
        <ItemCard key={index} id={product.product_id} name={product.product_name} initial={product.initial_price} selling={product.selling_price} image={product.product_image} category={product.product_category} description={product.product_description}/>
      ))}
      {/* <ItemCard />
      <ItemCard />
      <ItemCard /> */}
    </section>
    </>
  );
}
