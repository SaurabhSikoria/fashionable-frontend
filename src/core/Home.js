import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../features/cartSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        if (data?.error) console.log(data.error);
        else {
          setProducts(data.products);
          setTotalPages(150);
          setCurrentPage(data.currentPage);
        }
      })
      .catch((err) => console.log("Error fetching products", err));
    dispatch(fetchCartData());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];
    const pageLimit = 5; // Number of page buttons to display

    let startPage = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
    let endPage = startPage + pageLimit - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(totalPages - pageLimit + 1, 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="page-item btn"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="page-ellipsis">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-item btn ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="page-ellipsis">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="page-item btn"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <Base>
      <div className="home p-2">
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-sm-2">
              <div className="">filters</div>
            </div>
            {products &&
              products.map((product, index) => {
                return (
                  <div key={index} className="col-md-3">
                    <Card product={product} />
                  </div>
                );
              })}
            <div className="pagination-wrapper">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  {currentPage > 1 && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        &laquo;
                      </button>
                    </li>
                  )}
                  {renderPagination()}
                  {currentPage < totalPages && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        &raquo;
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
