import { Anchor, Col, Divider, Row, Typography } from "antd";
import React from "react";

const { Link } = Anchor;
const { Text } = Typography;

const FileInformation = ({ file }) => {
  return (
    <>
      <Col style={{ padding: "1em" }}>
        <Row align="middle" justify="start" gutter={[20]}>
          <Anchor style={{ backgroundColor: "#F3F3F3" }}>
            <Link href={file.blob_url} title={file.filename} />
          </Anchor>
        </Row>
        <Row>
          <Text style={{ marginRight: 4 }} strong type="success">
            +{file.additions} 
          </Text>
          <Text strong type="danger">
            -{file.deletions} deletions
          </Text>
        </Row>
        <Divider />
      </Col>
    </>
  );
};

export default FileInformation;
