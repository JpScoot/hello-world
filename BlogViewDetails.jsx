import React, { Fragment } from "react";
import "./blog.css";

import { Grid, Container, IconButton, Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar2 from "@assets/images/avatars/avatar2.jpg";
import exampleImg from "@assets/images/site/education_chart.PNG";

export default function BlogViewDetails() {
  return (
    <Fragment>
      <div className="feature-box py-3 py-xl-5 bg-white">
        <Container className="py-3 py-xl-5 ">
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6} md={6} className="my-auto">
              <div className="py-0 pb-5 py-xl-5">
                <div className="pr-0 pr-xl-5">
                  <h1 className="display-3 mb-3 font-weight-bold">Elections</h1>

                  <h3>
                    example: Mexico’s 2021 elections: more Morena and glimmers
                    of hope for AMLO’s opponents in 2024
                  </h3>
                  <div className="hero-footer pb-4">
                    <h6 className="mb-1 font-weight">Share this:</h6>
                    <Tooltip arrow title="Facebook">
                      <IconButton
                        color="inherit"
                        size="medium"
                        variant="outlined"
                        className="text-black-50"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "facebook"]}
                          className="font-size-lg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Twitter">
                      <IconButton
                        color="inherit"
                        size="medium"
                        variant="outlined"
                        className="text-black-50"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "twitter"]}
                          className="font-size-lg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Google">
                      <IconButton
                        color="inherit"
                        size="medium"
                        variant="outlined"
                        className="text-black-50"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "google"]}
                          className="font-size-lg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Instagram">
                      <IconButton
                        color="inherit"
                        size="medium"
                        variant="outlined"
                        className="text-black-50"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "instagram"]}
                          className="font-size-lg"
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} lg={6} md={6}>
              <div className="p-4 mb-4 ">
                <div className="text-center">
                  <img
                    className="d-flex align-self-center display-3"
                    src={exampleImg}
                    alt="..."
                    style={{ height: "300px" }}
                  />
                </div>
              </div>
            </Grid>
            <Grid container xs={12} lg={12} md={12} spacing={2}>
              <Grid item xs={12} md={8} lg={8} className="p-5">
                <p>
                  example: State election losses notwithstanding, the opposition
                  should feel somewhat reassured that running as a coalition
                  gives it a real opportunity to continue making gains against
                  Morena in Congress – and possibly even a shot at the
                  presidency in 2024..{" "}
                </p>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <div className="text-center pt-4 blog-card card">
                  <div className="avatar-icon-wrapper rounded-circle m-0 ">
                    <div className="d-block p-0 avatar-icon-wrapper m-0 d-90 ">
                      <div className="rounded-circle overflow-hidden">
                        <img alt="..." className="img-fluid" src={avatar2} />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-weight-bold mt-3 ">Lacie-Mae Mckay</h3>
                  <p className="mb-0 font-size-md text-black-50">Author</p>
                  <p2 className="mb-0 font-size-sm text muted">
                    Summary about the Author
                  </p2>
                  <div className="pt-3"></div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
}
