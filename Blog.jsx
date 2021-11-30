import React, { Fragment } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBlog } from "../../services/blogService";
import { onGlobalError } from "../../services/serviceHelpers";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import BlogCard from "./BlogCard";

import debug from "sabio-debug";

const _logger = debug.extend("Blog");

_logger("test blog,");

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      mappedBlogs: [],
      pageIndex: 0,
      pageSize: 3,
      totalCount: 0,
    };
  }

  componentDidMount() {
    this.getPageinate();
  }

  getPageinate = () => {
    getBlog(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetBlogSuccess)
      .catch(onGlobalError);
  };
  onGetBlogSuccess = (thisBlog) => {
    _logger("get Blog is firing", thisBlog); //find array using dev tools

    const blogs = thisBlog.item.pagedItems;
    _logger("blogs array", blogs);

    this.setState((prevState) => {
      return {
        ...prevState,
        blogs,
        totalCount: thisBlog.item.totalCount, //used for pagination
        mappedBlogs: blogs.map(this.mapBlog),
      };
    });
  };

  mapBlog = (blog) => {
    _logger("blog", blog);
    return <BlogCard blog={blog} key={blog.id} />;
  };

  SearchChange = (e) => {
    _logger(e);
    e.preventDefault();

    getBlog(this.state.pageIndex - 1, this.state.pageSize)
      .then(this.onGetBlogSuccess)
      .catch(onGlobalError);
  };
  onGetBlogSuccess = (thisBlog) => {
    _logger("get Blog is firing", thisBlog);

    const blogs = thisBlog.item.pagedItems;
    _logger("blogs array", blogs);

    this.setState((prevState) => {
      return {
        ...prevState,
        blogs, //array
        totalCount: thisBlog.item.totalCount, //used for pagination
        mappedBlogs: blogs.map(this.mapBlog),
      };
    });
  };

  onChange = (page) => {
    _logger("page", page);

    this.setState((prevState) => {
      return {
        ...prevState,
        pageIndex: page - 1,
      };
    }, this.getPageinate);
  };

  render() {
    return (
      <Fragment>
        <div>
          <Button
            size="large"
            color="primary"
            variant="contained"
            className="text-white btn-go-back"
            component={RouterLink}
            to="/"
          >
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={["fas", "arrow-left"]} />
            </span>
            <span className="btn-wrapper--label">Back to dashboard</span>
          </Button>
        </div>
        <div className="py-5 ">
          <div className="text-center mt-5 mb-3 pt-3">
            <h1 className="display-4 text-black mb-3 font-weight-bold ">
              Latest blog posts
            </h1>
          </div>

          <Grid
            container
            spacing={2}
            xs={12}
            md={10}
            lg={10}
            className="mx-auto"
          >
            {this.state.mappedBlogs}
          </Grid>
          <Grid
            container
            spacing={2}
            xs={12}
            md={12}
            lg={12}
            className="justify-content-center"
          >
            <Grid item xs={12} md={4} lg={4} className="text-center">
              <Pagination
                onChange={this.onChange}
                pageSize={this.state.pageSize}
                current={this.state.pageIndex + 1}
                total={this.state.totalCount}
              />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default Blog;
