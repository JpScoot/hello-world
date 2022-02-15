import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import PropTypes from "prop-types";
import * as dateService from "../../services/dateService";

import debug from "sabio-debug";

const _logger = debug.extend("BlogCard");

const BlogCard = (props) => {
  _logger(props);

  const isAuthor = props.currentUser?.id === props.blog.author?.userId;

  const handleClick = () => {
    props.handleId(props.blog);
  };

  const editBlog = (e) => {
    e.stopPropagation();
    props.handleEditId(props.blog);
  };

  const getDate = () => dateService.formatDateTime(props?.blog?.datePublished);

  const getAuthor = () =>
    `${props.blog?.author?.givenName} ${props.blog?.author?.surnames}`;

  return (
    <Grid item xs={12} md={4} lg={4}>
      <div className="card card-transparent p-2 mb-4">
        <div className="card-img-wrapper" onClick={handleClick}>
          {isAuthor && (
            <div className="card-badges">
              <Button
                variant="contained"
                className="h-auto py-1 badge badge-warning badge-pill"
                style={{ opacity: ".5" }}
                onClick={editBlog}
              >
                <Edit />
              </Button>
            </div>
          )}
          <img
            src={props.blog.imageUrl}
            className="card-img-top"
            alt="..."
            style={{ height: "320px", cursor: "pointer" }}
          />
        </div>

        <div className="card-body card col-3  text-secondary rounded-0">
          <h6 className="text-uppercase pl-1">
            {props.blog?.blogCategory?.name}
          </h6>
          <h5 className="card-title mt-1 pr-5 p-2">{props.blog.title}</h5>
          <p className="card-text text-secondary text-truncate pr-5 pl-2">
            {props.blog.subject}
          </p>
          <div className="pb-3"></div>
          <div className="d-flex ">
            <div className="card-text text-black-50 pl-2">
              {`${getDate()}  -  ${getAuthor()}`}
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    blogTypeId: PropTypes.number,
    authorId: PropTypes.number.isRequired,
    isPublished: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    statusId: PropTypes.number.isRequired,
    datePublished: PropTypes.string,
    blogCategory: PropTypes.shape({
      name: PropTypes.string,
    }),
    author: PropTypes.shape({
      userId: PropTypes.number,
      givenName: PropTypes.string,
      surnames: PropTypes.string,
    }),
    id: PropTypes.number.isRequired,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
  handleId: PropTypes.shape({}),
  handleEditId: PropTypes.shape({}),
};
export default BlogCard;
