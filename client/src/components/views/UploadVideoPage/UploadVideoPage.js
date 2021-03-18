import React, { useState, useEffect } from "react";

import { Form, Icon, Input, Button, Typography } from "antd";

import Dropzone from "react-dropzone";

import axios from "axios";

const { Title } = Typography;

const PrivacyLabel = [
  { value: 0, label:'Private'},
  { value: 1, label:'Public'}
];
const CategoryLabel = [
  { value: 0, label: "Film & Animation" },
  { value: 0, label: "Autos & Vehicles" },
  { value: 0, label: "Pets & Animals" },
  { value: 0, label: "Travel & Events" },
  { value: 0, label: "People & Blogs" },
  { value: 0, label: "News & Politics" },
  { value: 0, label: "Science & Technology" },
  { value: 0, label: "Howto & Styles" },
  { value: 0, label: "Sports & Gaming" },
  { value: 0, label: "Music & Entertainment" },
];

function UploadVideoPage() {
  const [TitleVideo, setTitle] = useState("");
  const [DescriptionVideo, setDescription] = useState("");
  const [CategoryVideo, setCategories] = useState("Film & Animation");
  const [PrivacyVideo, setPrivacy] = useState(0);
  const [FilePath, setFilePath] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  }

  const handleChangeDescription = (event) => {
    setDescription(event.currentTarget.value);
  }

  const handleChangeCategory = (event) => {
    setCategories(event.currentTarget.value);
  }

  const handleChangePrivacy = (event) => {
    setPrivacy(event.currentTarget.value);
  }

  const onSubmit = () => {
    
  }

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    axios.post("/api/video/uploadFile", formData, config)
    .then(response => {
      if (response.data.success) {

        let fileData = {
          fileName: response.data.fileName,
          filePath: response.data.filePath,
        }

        setFilePath(response.data.filePath);

      } else {
        alert("Failed to save the video in server");
      }
    })
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>

          <Dropzone
          onDrop={onDrop}
           multiple={false}
            maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input onChange={handleChangeTitle} value={TitleVideo} />

        <br />
        <br />
        <label>Description</label>
        <Input onChange={handleChangeDescription} value={DescriptionVideo} />

        <br />
        <br />
        <select onChange={handleChangeCategory}>
          {CategoryLabel.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />
        <select onChange={handleChangePrivacy}>
          {PrivacyLabel.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
           Submit
        </Button>     

      </Form>
    </div>
  );
}

export default UploadVideoPage;
