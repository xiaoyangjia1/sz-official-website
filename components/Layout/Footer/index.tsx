import { Col, Row } from "antd";
import { NextPage } from "next";
const style: React.CSSProperties = { background: "#0092ff", padding: "8px 0" };
const Footer: NextPage = () => {
  return (
    <footer>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={style}></div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
    </footer>
  );
};
export default Footer;
