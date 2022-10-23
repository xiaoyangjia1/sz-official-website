import { Card, Checkbox, Layout, Input, Divider } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import styles from "./recruitment.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NextPage } from "next";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
interface Position {
  id: number;
  pid: string;
  status: number;
  title: string;
  batch: string;
  category: string;
  deadline: string;
  desc: string;
  requirements: string;
  apply_number: number;
  test: number;
  interview: number;
  check1: number;
  check2: number;
  created_at: string;
  updated_at: string;
}
interface FilterInfo {
  title: string;
  options: OptionsItem[] | MultilevelOptionsItem[];
  onFilter: any;
}
interface OptionsItem {
  label: string;
  value: string;
}
interface MultilevelOptionsItem {
  label: string;
  options: OptionsItem[];
}
const PositionItem = ({ position }: any) => {
  const { pid, title, batch, category, desc } = position;
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
const FilterItem = ({ title, options, onFilter }: FilterInfo) => {
  return (
    <div className="filterItem">
      <h2>{title}</h2>
      <Checkbox.Group
        options={options as OptionsItem[]}
        defaultValue={["Apple"]}
        onChange={onFilter}
      />
    </div>
  );
};
const MultilevelFilterItem = ({ title, options, onFilter }: FilterInfo) => {
  const defaultCheckedList: CheckboxValueType[][] = [];
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[][]>(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean[]>([false]);
  const onChange = (list: CheckboxValueType[], options: OptionsItem[], index: number) => {
    const newCheckedList = JSON.parse(JSON.stringify(checkedList));
    const newCheckAll = JSON.parse(JSON.stringify(checkAll));
    newCheckedList[index] = list;
    newCheckAll[index] = list.length === options.length;
    onFilter(newCheckedList.flat());
    setCheckedList(newCheckedList);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(newCheckAll);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent, options: OptionsItem[], index: number) => {
    const newCheckedList = JSON.parse(JSON.stringify(checkedList));
    const newCheckAll = JSON.parse(JSON.stringify(checkAll));
    newCheckedList[index] = e.target.checked
      ? options.map((el: OptionsItem) => {
          return el.label;
        })
      : [];
    newCheckAll[index] = e.target.checked;
    onFilter(newCheckedList.flat());
    setCheckedList(newCheckedList);
    setIndeterminate(false);
    setCheckAll(newCheckAll);
  };

  return (
    <div className="filterItem">
      <h2>{title}</h2>
      {options.map((el: any, index) => {
        return (
          <div key={el.label}>
            <Checkbox
              indeterminate={indeterminate}
              onChange={(e) => {
                onCheckAllChange(e, el.options, index);
              }}
              checked={checkAll[index]}
            >
              {el.label}
            </Checkbox>
            <Divider />
            <Checkbox.Group
              options={el.options}
              value={checkedList[index]}
              onChange={(list) => onChange(list, el.options, index)}
            />
            <Divider />
          </div>
        );
      })}
    </div>
  );
};
const Recruitment: NextPage = ({ filterData, jobsData }: any) => {
  const [positionList, setPositionList] = useState<Position[]>(jobsData);
  const [categoryFilterList, setCategoryFilterList] = useState<string[]>([]);
  const [batchFilterList, setBatchFilterList] = useState<string[]>([]);
  useEffect(() => {
    const filterRes = jobsData.filter((el: Position) => {
      const { batch, category } = el;
      return (
        (batchFilterList.length===0 || batchFilterList.includes(batch)) &&
        (categoryFilterList.length===0 || categoryFilterList.includes(category))
      );
    });
    setPositionList(filterRes);
  }, [batchFilterList, categoryFilterList]);
  const onSearch = (value: string) => {
    const res =
      value === ""
        ? jobsData
        : jobsData.filter((el: any) => {
            const { title, batch, category, desc } = el;
            const str = title + batch + category + desc;
            return str.includes(value);
          });
    setPositionList(res);
  };
  return (
    <Layout className={styles.recruitment}>
      <Header className={styles.searchHeader}>
        <Search placeholder="输入职位关键字" onSearch={onSearch} enterButton />
      </Header>
      <Layout>
        <Sider className={styles.filterSider}>
          {filterData.map((el: any) => {
            return el.multilevel ? (
              <MultilevelFilterItem
                title={el.title}
                options={el.options}
                onFilter={setCategoryFilterList}
                key={el.title}
              />
            ) : (
              <FilterItem
                title={el.title}
                options={el.options}
                onFilter={setBatchFilterList}
                key={el.title}
              />
            );
          })}
        </Sider>
        <Content className={styles.positionList}>
          {positionList.map((el: any) => {
            return <PositionItem position={el} key={el.id} />;
          })}
        </Content>
      </Layout>
    </Layout>
  );
};
export async function getStaticProps() {
  const baseURL = "http://127.0.0.1:3000/api";
  const res1 = await fetch(baseURL + "/getJobs");
  const jobsData = await res1.json();
  const res2 = await fetch(baseURL + "/getAllBatch");
  const batchData = await res2.json();
  const batch_options = batchData.map((el: any) => {
    return {
      label: el.name,
      value: el.name,
    };
  });
  const res3 = await fetch(baseURL + "/getAllCategory");
  const categoryData = await res3.json();
  const category_options = categoryData
    .filter((el: any) => {
      return el.pid === 0;
    })
    .map((el: any) => {
      return {
        label: el.name,
        options: [],
      };
    });
  categoryData.forEach((el: any) => {
    if (el.pid > 0) {
      category_options[el.pid - 1].options.push({
        label: el.name,
        value: el.name,
      });
    }
  });
  return {
    props: {
      filterData: [
        {
          title: "招聘项目",
          options: batch_options,
          multilevel: false,
        },
        {
          title: "职位类别",
          options: category_options,
          multilevel: true,
        },
      ],
      jobsData,
    },
  };
}
export default Recruitment;
