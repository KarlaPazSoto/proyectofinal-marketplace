import React, { useEffect, useState } from "react";
import Gallery from "../gallery/Gallery";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const { currentItems, paginate, currentPage, totalPages } = usePagination(products, 4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Gallery products={currentItems} />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
