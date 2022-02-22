import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap-4-pagination";
import SearchBox from "./SearchBox";
import axios from "axios";
import { url } from "../url";
import Popup from "./Popup";

const TableView = (props) => {
  const search_ref = useRef(null);
  const newPremiumRef = useRef(0);
  const [searchValue, setsearchValue] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [pageLength, setPageLength] = useState(10);
  const [modalShow, setModalShow] = useState(false);
  const [editData, setEditData] = useState(false);
  const [paginationConfig, setPaginationConfig] = useState({
    size: "md",
    activeBgColor: "#00be71",
    activeBorderColor: "#000000",
    totalPages: 15,
    currentPage: pageNum,
    showMax: 5,
    threeDots: true,
    prevNext: true,
    onClick: function (page) {
      handelPageClick(page);
    },
  });

  function handelEditClick(row) {
    let row_data = JSON.parse(row);
    setEditData(row_data);
    setModalShow(true);
  }

  async function handelUpdateClick(policy_id) {
    let premium = newPremiumRef.current.value;
    let response;
    try {
      response = await axios.patch(`${url}/policy/`, {
        premium: parseInt(premium),
        policy_id: parseInt(policy_id),
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Update Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
    }

    setModalShow(false);
    fetch_data(paginationConfig.currentPage, searchValue);
  }

  function handelPageClick(page_num) {
    setPageNum(page_num);
    setPaginationConfig((prevState) => ({
      ...paginationConfig,
      currentPage: page_num,
    }));
  }

  const HEADERS = [
    "Action",
    "Policy ID",
    "Date of purchase",
    "Customer ID",
    "Fuel",
    "Vehicle Segment",
    "Premium",
    "Bodily Injury Liability",
    "Personal Injury Protection",
    "Property Damage Liability",
    "Collision",
    "Comprehensive",
    "Customer Gender",
    "Customer Income Group",
    "Customer Region",
    "Customer Marital Status",
  ];

  async function fetch_data(page_num, search_value) {
    let response = await axios.get(
      `${url}/policy/?page_num=${page_num}&search_value=${search_value}&pageLength=${pageLength}`
    );
    console.log(response.data);
    setTableData(response.data["data"]);
    setPaginationConfig((prevState) => ({
      ...paginationConfig,
      totalPages: response.data["total_num_pages"],
    }));
  }

  useEffect(() => {
    console.log(paginationConfig.currentPage, searchValue);
    fetch_data(paginationConfig.currentPage, searchValue);
  }, [searchValue, pageNum, pageLength]);

  return (
    <Container fluid>
      <br />
      <SearchBox
        search_ref={search_ref}
        setsearchValue={setsearchValue}
        handelPageClick={handelPageClick}
        searchValue={searchValue}
        setPageLength={setPageLength}
      />
      <br />
      <Table striped bordered hover responsive style={{ textAlign: "center" }}>
        <thead
          style={{
            backgroundColor: "#7f7f7f",
            color: "#ffffff",
            fontSize: "14px",
            verticalAlign: "middle",
          }}
        >
          <tr>
            {HEADERS.map((title) => {
              return <th key={title}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((row) => {
              return (
                <tr key={row.id}>
                  <td>
                    <button
                      className="btn  btn-sm"
                      style={{ backgroundColor: "#00be71" }}
                    >
                      <i
                        className="bi bi-pencil-square"
                        id={JSON.stringify(row)}
                        onClick={(e) => handelEditClick(e.target.id)}
                        style={{ color: "#ffffff" }}
                      ></i>
                    </button>
                  </td>
                  <td>{row.policy_id}</td>
                  <td>{row.date_of_purchase}</td>
                  <td>{row.customer_id}</td>
                  <td>{row.fuel}</td>
                  <td>{row.vehicle_segment}</td>
                  <td>{row.premium}</td>
                  <td>
                    {row.bodily_injury_liability ? (
                      <svg
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        style={{ fill: "#000000" }}
                      >
                        <path
                          fill="#c8e6c9"
                          d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                        ></path>
                        <polyline
                          fill="none"
                          stroke="#4caf50"
                          stroke-miterlimit="10"
                          stroke-width="4"
                          points="14,24 21,31 36,16"
                        ></polyline>
                      </svg>
                    ) : (
                      <img src="https://img.icons8.com/emoji/20/000000/cross-mark-emoji.png" />
                    )}
                  </td>
                  <td>
                    {row.personal_injury_protection ? (
                      <svg
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        style={{ fill: "#000000" }}
                      >
                        <path
                          fill="#c8e6c9"
                          d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                        ></path>
                        <polyline
                          fill="none"
                          stroke="#4caf50"
                          stroke-miterlimit="10"
                          stroke-width="4"
                          points="14,24 21,31 36,16"
                        ></polyline>
                      </svg>
                    ) : (
                      <img src="https://img.icons8.com/emoji/20/000000/cross-mark-emoji.png" />
                    )}
                  </td>
                  <td>
                    {row.property_damage_liability ? (
                      <svg
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        style={{ fill: "#000000" }}
                      >
                        <path
                          fill="#c8e6c9"
                          d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                        ></path>
                        <polyline
                          fill="none"
                          stroke="#4caf50"
                          stroke-miterlimit="10"
                          stroke-width="4"
                          points="14,24 21,31 36,16"
                        ></polyline>
                      </svg>
                    ) : (
                      <img src="https://img.icons8.com/emoji/20/000000/cross-mark-emoji.png" />
                    )}
                  </td>
                  <td>
                    {row.collision ? (
                      <svg
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        style={{ fill: "#000000" }}
                      >
                        <path
                          fill="#c8e6c9"
                          d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                        ></path>
                        <polyline
                          fill="none"
                          stroke="#4caf50"
                          stroke-miterlimit="10"
                          stroke-width="4"
                          points="14,24 21,31 36,16"
                        ></polyline>
                      </svg>
                    ) : (
                      <img src="https://img.icons8.com/emoji/20/000000/cross-mark-emoji.png" />
                    )}
                  </td>
                  <td>
                    {row.comprehensive ? (
                      <svg
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        style={{ fill: "#000000" }}
                      >
                        <path
                          fill="#c8e6c9"
                          d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                        ></path>
                        <polyline
                          fill="none"
                          stroke="#4caf50"
                          stroke-miterlimit="10"
                          stroke-width="4"
                          points="14,24 21,31 36,16"
                        ></polyline>
                      </svg>
                    ) : (
                      <img src="https://img.icons8.com/emoji/20/000000/cross-mark-emoji.png" />
                    )}
                  </td>
                  <td>{row.customer_gender}</td>
                  <td>{row.customer_income_group}</td>
                  <td>{row.customer_region}</td>
                  <td>
                    {row.customer_marital_status ? (
                      <svg
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        style={{ fill: "#000000" }}
                      >
                        <path
                          fill="#c8e6c9"
                          d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                        ></path>
                        <polyline
                          fill="none"
                          stroke="#4caf50"
                          stroke-miterlimit="10"
                          stroke-width="4"
                          points="14,24 21,31 36,16"
                        ></polyline>
                      </svg>
                    ) : (
                      <img src="https://img.icons8.com/emoji/20/000000/cross-mark-emoji.png" />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Pagination {...paginationConfig} />
      <Popup
        data={editData}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handelUpdateClick={handelUpdateClick}
        newPremiumRef={newPremiumRef}
      />
    </Container>
  );
};

export default TableView;
