import { Card, Checkbox, Layout, Input, Pagination } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import styles from "./recruitment.module.scss";
import Link from "next/link";
import { getJobsByKeyword } from "@/api/position";
import { useState } from "react";

const { Header, Sider, Content } = Layout;
interface PositionItem {
  Pid: string;
  Title: string;
  Batch: string;
  Category: string;
  Desc: string;
}
const PositionItem = ({ Pid, Title, Batch, Category, Desc }: any) => {
  return (
    <Link href={`/position/${Pid}`} target="_blank">
      <Card
        title={<h2>{Title}</h2>}
        extra={<span>投递截止时间：2023-9-19</span>}
      >
        <p>
          {Batch} | {Category}
        </p>
        <p>{Desc}</p>
      </Card>
    </Link>
  );
};

interface FilterInfo {
  title: string;
  options: OptionsItem[];
}
interface OptionsItem {
  label: string;
  value: string;
}
const FilterItem = ({ title, options }: FilterInfo) => {
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };
  return (
    <div className="filterItem">
      <h2>{title}</h2>
      <Checkbox.Group
        options={options}
        defaultValue={["Apple"]}
        onChange={onChange}
      />
    </div>
  );
};
const Recruitment = ({ filterData, jobsData }: any) => {
  const [positionList, setPositionList] = useState(jobsData);
  const { Search } = Input;
  const onSearch = (value: string) => {
    if (value === "") {
      setPositionList(jobsData);
    } else {
      getJobsByKeyword(value)
        .then((res: any) => {
          setPositionList(res.data.data);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };
  return (
    <Layout className={styles.recruitment}>
      <Header className={styles.searchHeader}>
        <Search placeholder="输入职位关键字" onSearch={onSearch} enterButton />
      </Header>
      <Layout>
        <Sider className={styles.filterSider}>
          {filterData.map((el: any) => {
            return (
              <FilterItem
                title={el.title}
                options={el.options}
                key={el.title}
              />
            );
          })}
        </Sider>
        <Content className={styles.positionList}>
          {positionList.map((el: any) => {
            return (
              <PositionItem
                Pid={el.Pid}
                Title={el.Title}
                Batch={el.Batch}
                Category={el.Category}
                Desc={el.Desc}
                key={el.ID}
              />
            );
          })}
          <Pagination defaultCurrent={1} total={50} />
        </Content>
      </Layout>
    </Layout>
  );
};
export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:3000/api/getJobs");
  const jobsData = await res.json();
  return {
    props: {
      filterData: [
        {
          title: "招聘范围",
          options: [
            { label: "大一", value: "大一" },
            { label: "大二", value: "大二" },
          ],
        },
        {
          title: "招聘项目",
          options: [{ label: "2023寒假招新", value: "2023寒假招新" }],
        },
        {
          title: "职位类别",
          options: [
            { label: "研发", value: "研发" },
            { label: "设计", value: "设计" },
          ],
        },
      ],
      jobsData,
    },
  };
}
export default Recruitment;
