import React, { Fragment } from "react";
//import * as Yup from "yup";
import { addBlog, updateBlog } from "../../services/blogService";
import PropTypes from "prop-types";
import {
  Grid,
  Container,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as lookUpService from "../../services/lookUpService";
import { onGlobalError } from "../../services/serviceHelpers";

import debug from "sabio-debug";

const _logger = debug.extend("BlogForm");
import toastr from "toastr";
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

_logger("test blogform");

class BlogForm extends React.Component {
  state = {
    formData: {
      blogTypeId: 0,
      title: "",
      subject: "",
      content: "",
      imageUrl: "",
      isPublished: false,
      statusId: 1,
    },
    blogTypes: [],
    statusTypes: [],

    isEditing: false,
  };

  componentDidMount() {
    const types = { types: ["BlogTypes", "StatusTypes"] };
    lookUpService
      .get(types)
      .then(this.onGetBlogTypesSuccess)
      .catch(onGlobalError);
  }

  onGetBlogTypesSuccess = (response) => {
    let blog = { ...this.state.formData };
    if (this.props.location.state) {
      blog = { ...this.props.location.state };
      blog.blogTypeId = this.props.location.state.blogCategory.id;
    }
    this.setState(() => {
      return {
        formData: blog,
        blogTypes: response.item.blogTypes,
        statusTypes: response.item.statusTypes,
      };
    });

    _logger("define blogtypes here", response);
  };

  handleSumbit = (values) => {
    const blog = values;

    if (this.props.location?.state?.id) {
      updateBlog(blog).then(this.onAddBlogSuccess).catch(this.onAddBlogError);
    } else {
      addBlog(blog).then(this.onAddBlogSuccess).catch(this.onAddBlogError);
    }
  };

  onAddBlogSuccess = (response) => {
    _logger("Add Blog is firing", response);
    this.props.history.push("/blogs");

    return toastr["success"]("You have successfully created a blog.");
  };
  onAddBlogError = (response) => {
    _logger("Add Blog Error is firing", response);
    return toastr["error"]("create blog was unsuccessful, please try again.");
  };

  mapBlogsId = (blogId) => {
    return (
      <MenuItem key={`blog_${blogId.id}`} value={blogId.id}>
        {blogId.name}
      </MenuItem>
    );
  };

  mapStatus = (statusId) => {
    return (
      <MenuItem key={`blog_${statusId.id}`} value={statusId.id}>
        {statusId.name}
      </MenuItem>
    );
  };

  render() {
    return (
      <Fragment>
        <div className="app-wrapper min-vh-100 bg-white">
          <div className="app-main min-vh-100">
            <div className="app-content p-0">
              <div className="app-inner-content-layout--main">
                <div className="flex-grow-1 w-100 d-flex align-items-center">
                  <div className="bg-composed-wrapper--content">
                    <Formik
                      enableReinitialize={true}
                      /* validationSchema={Yup.object().shape({
                        blogTypeId: Yup.number().required("Is Required"),

                        title: Yup.string()
                          .min(2)
                          .max(50)
                          .required("Is Required"),
                        subject: Yup.string()
                          .min(2)
                          .max(50)
                          .required("Is Required"),
                        content: Yup.string().required("Is Required"),

                        isPublished: Yup.boolean().required("Is Required"),
                        imageUrl: Yup.string().required("Is Required"),
                        statusId: Yup.number().required("Is Required"),
                      })} */
                      initialValues={this.state.formData}
                      onSubmit={this.handleSumbit}
                    >
                      {({
                        values,
                        handleChange,
                        setFieldValue,
                        touched,
                        errors,
                      }) => (
                        <Form>
                          <Grid container spacing={0} className="min-vh-100">
                            <Card className="w-75 mr-4">
                              <Grid
                                item
                                xs={12}
                                md={8}
                                lg={12}
                                className="d-flex align-items-center bg-white"
                              >
                                <Container maxWidth="xl">
                                  <h3 className="display-4 mb-2 pt-4 font-weight-bold text-primary">
                                    Create blog
                                  </h3>
                                  <p className="font-size-lg mb-5 text-primary-50 ">
                                    Fill in the fields below and youll be good
                                    to go.
                                  </p>

                                  <Box m={1}>
                                    <Box m={1}>
                                      <FormControl fullWidth>
                                        <InputLabel> Blog Type </InputLabel>
                                        <Select
                                          name="blogTypeId"
                                          value={values.blogTypeId}
                                          onChange={handleChange}
                                        >
                                          {this.state.blogTypes.map(
                                            this.mapBlogsId
                                          )}
                                        </Select>
                                      </FormControl>
                                    </Box>
                                  </Box>

                                  <div className="mb-3">
                                    <TextField
                                      variant="outlined"
                                      label="Title"
                                      fullWidth
                                      placeholder="Enter your title"
                                      name="title"
                                      value={values.title}
                                      onChange={handleChange}
                                      error={
                                        touched.title && Boolean(errors.title)
                                      }
                                      helperText={touched.title && errors.title}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <TextField
                                      variant="outlined"
                                      label="Subject"
                                      fullWidth
                                      placeholder="Enter Subject"
                                      name="subject"
                                      value={values.subject}
                                      onChange={handleChange}
                                      error={
                                        touched.subject &&
                                        Boolean(errors.subject)
                                      }
                                      helperText={
                                        touched.subject && errors.subject
                                      }
                                    />
                                  </div>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={values.content}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();

                                      setFieldValue("content", data);
                                    }}
                                    onError={(String, Boolean)}
                                  />
                                  <div className="mb-3 mx-2">
                                    <div className="form-check">
                                      <Field
                                        type="checkbox"
                                        name="isPublished"
                                        className="form-check-input"
                                      />
                                      <label
                                        htmlFor="isPublished"
                                        className="form-check-label m-2 text"
                                      >
                                        <br />
                                        Publish
                                      </label>
                                    </div>
                                  </div>
                                  {/* <Box m={1}>
                                    <Box m={1}>
                                      <FormGroup>
                                        <FormControlLabel
                                          control={<Checkbox defaultChecked />}
                                          label="IsPublished"
                                          value={values.isPublished}
                                          name="isPublished"
                                          onChange={handleChange}
                                        />
                                      </FormGroup>
                                    </Box>
                                  </Box> */}

                                  <div className="mb-3">
                                    <TextField
                                      variant="outlined"
                                      label="ImageUrl"
                                      fullWidth
                                      placeholder="imageUrl"
                                      name="imageUrl"
                                      value={values.imageUrl}
                                      onChange={handleChange}
                                      error={
                                        touched.imageUrl &&
                                        Boolean(errors.imageUrl)
                                      }
                                      helperText={
                                        touched.imageUrl && errors.imageUrl
                                      }
                                    />
                                  </div>

                                  <Box m={1}>
                                    <Box m={1}>
                                      <FormControl fullWidth type="number">
                                        <InputLabel> Status </InputLabel>
                                        <Select
                                          name="statusId"
                                          value={values.statusId}
                                          onChange={handleChange}
                                        >
                                          {this.state.statusTypes.map(
                                            this.mapStatus
                                          )}
                                        </Select>
                                      </FormControl>
                                    </Box>
                                  </Box>

                                  <div className="form-group pt-2 mb-4">
                                    By clicking the <strong>Create blog</strong>{" "}
                                    button below you agree to our terms of
                                    service and privacy statement.
                                  </div>

                                  <div>
                                    <Button
                                      tabIndex="4"
                                      color="primary"
                                      size="large"
                                      variant="contained"
                                      className="mb-5 ml-2"
                                      type="submit "
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </Container>
                              </Grid>
                            </Card>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
BlogForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number,
      blogCategory: PropTypes.shape({
        id: PropTypes.number,
      }),
      title: PropTypes.string,
      subject: PropTypes.string,
      content: PropTypes.string,
      isPublished: PropTypes.bool,
      imageUrl: PropTypes.string,
      statusId: PropTypes.numnber,
    }),
  }),
};

export default BlogForm;
