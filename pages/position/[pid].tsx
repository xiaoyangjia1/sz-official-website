import { Button, Card } from "antd";
import { deliveryJob } from "@/api/progress";
import styles from "./position.module.scss";
const Position = ({ pid, positionData }: any) => {
  function handleDeliveryJob() {
    deliveryJob({
      pid,
      sid: "3119005073",
    })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  return (
    <div className={styles.position}>
      <Card
        title={<h3>{positionData.Title}</h3>}
        extra={
          <Button type="primary" onClick={handleDeliveryJob}>
            投递简历
          </Button>
        }
      ></Card>
      <Card title={<h3>基础信息</h3>}>
        <p>
          <span>发布时间：2023-9-12</span>
          <span>截止时间：2023-9-23</span>
        </p>
        <p>流程：笔试-面试-一轮考核-二轮考核-offer</p>
        <p>
          <span>招新批次：2023寒假招新</span>
          <span>所属类别：研发-前端</span>
        </p>
        <p>
          <span>招新院校：广东工业大学</span>
          <span>招新对象：大一、大二</span>
        </p>
      </Card>
      <Card title={<h3>职位描述</h3>}>{positionData.Desc}</Card>
      <Card title={<h3>职位要求</h3>}>{positionData.Requirements}</Card>
    </div>
  );
};
export async function getStaticProps({ params }: any) {
  const res = await fetch("http://127.0.0.1:3000/api/getPositionByID");
  const positionData = await res.json();
  return {
    props: {
      positionData,
      pid: params.pid,
    },
  };
}
export async function getStaticPaths() {
  let pidList = ["SZ2023FE"],
    paths = pidList.map((pid) => {
      return {
        params: {
          pid,
        },
      };
    });

  return {
    paths,
    fallback: false,
  };
}
export default Position;
