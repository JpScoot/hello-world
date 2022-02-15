import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Container, IconButton, Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getBlogId } from "../../services/blogService";
import * as dateService from "../../services/dateService";
import "./blog.css";

import debug from "sabio-debug";

const _logger = debug.extend("BlogViewDetails");

const BlogViewDetails = (props) => {
  _logger(props);
  _logger(props.match.params.id);

  const [blog, setBlog] = useState({});

  useEffect(() => {
    {
      let blogId = parseInt(props.match?.params?.id);

      if (blogId > 0)
        getBlogId(blogId).then(getBlogIdOnSuccess).catch(getBlogIdError);
    }
  }, []);

  const getBlogIdOnSuccess = (response) => {
    _logger("response def", response);
    setBlog(response.item);
  };

  const getBlogIdError = (response) => {
    _logger("get BlogId is firing", response);
    //return toastr["error"]("create blog was unsuccessful, please try again.");
  };

  const getAuthor = () =>
    `${blog?.author?.givenName} ${blog?.author?.surnames}`;

  const getDate = () => dateService.formatDate(blog?.datePublished);

  return (
    <Fragment>
      <div className="feature-box pt-5 py-xl-5 bg-white">
        <Container className="py-5 py-xl-5 ">
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6} md={6} className="my-auto">
              <div className="py-0 pb-5 py-xl-5">
                <div className="pr-0 pr-xl-5">
                  <h3 className="pb-2 text-black-50">{getDate()}</h3>
                  <h1 className="display-3 mb-3 font-weight-bold">
                    {blog.title}
                  </h1>

                  <h3 className="pb-2">{blog.subject}</h3>
                  <div className="hero-footer pb-0">
                    <h6 className="mb-0 font-weight">Share this:</h6>
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
                    src={blog?.imageUrl}
                    alt="..."
                    style={{ height: "300px" }}
                  />
                </div>
              </div>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8} lg={8} className="px-4 pb-5">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <div className="text-center py-4 blog-card card rounded-0">
                  <div className="avatar-icon-wrapper rounded-circle m-0 ">
                    <div className="d-block p-0 avatar-icon-wrapper m-0 d-90 ">
                      <div className="rounded-circle overflow-hidden">
                        <img
                          alt="..."
                          className="img-fluid"
                          src={blog?.author?.avatarUrl}
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-weight-bold mt-3 text-secondary">
                    {getAuthor()}
                  </h3>
                  <p className="mb-0 font-size-md text-black-50">Author</p>
                  <h2 className="mb-0 font-size-sm text muted text-primary">
                    {getDate()}
                  </h2>
                  <div className="pt-3"></div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
};

BlogViewDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),

  location: PropTypes.shape({
    state: PropTypes.shape({
      blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        blogTypeId: PropTypes.number.isRequired,
        authorId: PropTypes.number.isRequired,
        isPublished: PropTypes.bool.isRequired,
        imageUrl: PropTypes.string.isRequired,
        statusId: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
      }),
    }),
  }),
};

export default BlogViewDetails;
