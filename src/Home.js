import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { paginationMachine } from "./paginationMachine";
import { useMachine } from "@xstate/react";

function formatUnixTimestamp(timestamp) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(timestamp * 1000);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const time = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12}:${minutes} ${time}`;

  const formattedDate = `${month} ${day}, ${year} ${formattedTime} IST`;
  return formattedDate;
}

const Home = () => {
  const MAX_CHAR_COUNT = 70;

  function truncateTitleByCharCount(title) {
    if (title.length <= MAX_CHAR_COUNT) {
      return title;
    } else {
      return title.substring(0, MAX_CHAR_COUNT) + "...";
    }
  }

  const fetchNextPage = () => {
    send("NEXT");
  };

  const fetchPrevPage = () => {
    send("PREVIOUS");
  };
  const [state, send] = useMachine(paginationMachine, {
    services: {
      fetchPage: async (context) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/data?page=${context.currentPage}`
          );
          return response.data.nodes;
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  });

  useEffect(() => {
    send("FETCH");
  }, [send]);

  const { data, currentPage } = state.context;
  const isLoading = state.matches("loading");

  //  const [data, setData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   fetchPage(currentPage);
  // }, [currentPage]);

  // const fetchNextPage = () => {
  //   const nextPage = currentPage + 1;
  //   setCurrentPage(nextPage);
  // };

  // const fetchPrevPage = () => {
  //   const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  //   setCurrentPage(prevPage);
  // };

  // const fetchPage = async (currentPage) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/api/data?page=${currentPage}`
  //     );
  //     setData(response.data.nodes);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Container
        className="containerDiv"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          textAlign: "center",
        }}
      >
        <div style={{ marginTop: "3vh" }}>
          <Button onClick={fetchPrevPage} disabled={currentPage === 1}>
            Previous Page
          </Button>
          <Button onClick={fetchNextPage} disabled={currentPage === 5}>
            Next Page
          </Button>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Grid
            style={{
              borderRadius: "5px",
              margin: "2vh 0",
            }}
          >
            {data &&
              data.map((item, i) => (
                <Grid
                  container
                  xs={12}
                  spacing={2}
                  key={i}
                  style={{
                    padding: "8px 11px 16px",
                    margin: "12px 12px 20px",
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <Grid item xs={3}>
                    <img
                      src={item.node?.field_photo_image_section}
                      alt="Item"
                      style={{
                        width: "100%",
                        height: "220px",
                        borderRadius: "32px",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    style={{ alignItems: "left", textAlign: "left" }}
                  >
                    <Typography variant="h5">
                      {truncateTitleByCharCount(item.node?.title)}
                    </Typography>
                    <Typography variant="h6" style={{ color: "#666" }}>
                      {formatUnixTimestamp(item.node?.last_update)}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Home;
