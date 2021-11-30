import React from "react";
import { Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { Link } from "react-router-dom";

const _logger = debug.extend("BlogCard");

const BlogCard = (props) => {
  _logger(props);

  return (
    <Grid item xs={12} md={4} lg={4}>
      <div className="card card-transparent p-2 mb-4">
        <div className="card-img-wrapper">
          <img
            src={props.blog.imageUrl}
            className="card-img-top rounded"
            alt="..."
            style={{ height: "320px" }}
          />
        </div>

        <div className="card-body card col-3  text-black text-center ">
          <h5 className="card-title mt-1">{props.blog.title}</h5>
          <p className="card-text text-black-50">{props.blog.subject}</p>
          <p className="card-text text-black-50 text-truncate">
            {props.blog.content}
          </p>
          <Link to="/blogs/:id">
            <Button
              size="small"
              variant="contained"
              color="primary"
              className="mt-1"
            >
              View Details
            </Button>
          </Link>
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
    blogTypeId: PropTypes.number.isRequired,
    authorId: PropTypes.number.isRequired,
    isPublished: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    statusId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
export default BlogCard;
