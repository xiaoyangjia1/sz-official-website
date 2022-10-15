import { Card, Checkbox, Layout, Input } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import styles from "./recruitment.module.scss";
import Link from "next/link";
import { getJobsByKeyword, getJobsByTags } from "@/api/position";
import { useState } from "react";

const { Header, Sider, Content } = Layout;
interface PositionItem {
  Pid: string;
  Title: string;
  Batch: string;
  Category: string;
  Desc: string;
}
const PositionItem = ({ pid, title, batch, category, desc }: any) => {
  return (
    <Link href={`/position/${pid}`} target="_blank">
      <Card
        title={<h2>{title}</h2>}
        extra={<span>投递截止时间：2023-9-19</span>}
      >
        <p>
          {batch} | {category}
        </p>
        <p>{desc}</p>
      </Card>
    </Link>
  );
};

interface FilterInfo {
  title: string;
  options: OptionsItem[];
  onFilter: any;
}
interface OptionsItem {
  label: string;
  value: string;
}
const FilterItem = ({ title, options, onFilter }: FilterInfo) => {
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues,checkedValues[0]);
    getJobsByTags(checkedValues[0] as string)
      .then((res: any) => {
        console.log(res);
        onFilter(res.data.data)
      })
      .catch((err: any) => {
        console.log(err);
      });
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
                onFilter={setPositionList}
                key={el.title}
              />
            );
          })}
        </Sider>
        <Content className={styles.positionList}>
          {positionList.map((el: any) => {
            return (
              <PositionItem
                pid={el.pid}
                title={el.title}
                batch={el.batch}
                category={el.category}
                desc={el.desc}
                key={el.id}
              />
            );
          })}
        </Content>
      </Layout>
    </Layout>
  );
};
export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:3000/api/getJobs");
  const jobsData = await res.json();
  const getAllBatch_res = await fetch("http://127.0.0.1:3000/api/getAllBatch");
  const batchData = await getAllBatch_res.json();
  const batch_options = batchData.map((el: any) => {
    return {
      label: el.name,
      value: el.name,
    };
  });
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
          options: batch_options,
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
