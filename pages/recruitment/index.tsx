import {
  Card,
  Checkbox,
  Layout,
  Input,
  Divider,
  Pagination,
  PaginationProps,
  Empty,
} from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import styles from "./recruitment.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { formatDate } from "@/utils/date";

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
  const { pid, title, batch, category, desc, deadline } = position;
  const dateTime = formatDate(deadline);
  return (
    <Link href={`/position/${pid}`} target="_blank">
      <Card
        style={{ marginBottom: "0px", cursor: "pointer" }}
        title={<h2>{title}</h2>}
        extra={
          <span>
            投递截止时间：<time dateTime={dateTime}>{dateTime}</time>
          </span>
        }
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
    <div className={styles.filterItem}>
      <h2>{title}</h2>
      <Checkbox.Group
        options={options as OptionsItem[]}
        onChange={onFilter}
      />
    </div>
  );
};
const MultilevelFilterItem = ({ title, options, onFilter }: FilterInfo) => {
  const defaultCheckedList: CheckboxValueType[][] = [];
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[][]>(defaultCheckedList);
  const [indeterminateList, setIndeterminateList] = useState<boolean[]>([
    false,
    false,
  ]);

  const [checkAll, setCheckAll] = useState<boolean[]>([false]);
  const onChange = (
    list: CheckboxValueType[],
    options: OptionsItem[],
    index: number
  ) => {
    const newCheckedList = JSON.parse(JSON.stringify(checkedList));
    const newCheckAll = JSON.parse(JSON.stringify(checkAll));
    newCheckedList[index] = list;
    newCheckAll[index] = list.length === options.length;
    onFilter(newCheckedList.flat());
    setCheckedList(newCheckedList);
    const newIndeterminateList = JSON.parse(JSON.stringify(indeterminateList));
    newIndeterminateList[index] = !!list.length && list.length < options.length;
    setIndeterminateList(newIndeterminateList);
    setCheckAll(newCheckAll);
  };

  const onCheckAllChange = (
    e: CheckboxChangeEvent,
    options: OptionsItem[],
    index: number
  ) => {
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
    const newIndeterminateList = JSON.parse(JSON.stringify(indeterminateList));
    newIndeterminateList[index] = !newIndeterminateList[index];
    setIndeterminateList(newIndeterminateList);
    setCheckAll(newCheckAll);
  };

  return (
    <div className="filterItem">
      <h2>{title}</h2>
      {options.map((el: any, index) => {
        return (
          <div key={el.label}>
            <Checkbox
              indeterminate={indeterminateList[index]}
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
  const [filterList, setFilterList] = useState<Position[]>(jobsData);

  const [categoryFilterList, setCategoryFilterList] = useState<string[]>([]);
  const [batchFilterList, setBatchFilterList] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(jobsData.length);
  useEffect(() => {
    const filterRes = jobsData.filter((el: Position) => {
      const { batch, category } = el;
      return (
        (batchFilterList.length === 0 || batchFilterList.includes(batch)) &&
        (categoryFilterList.length === 0 ||
          categoryFilterList.includes(category))
      );
    });
    setFilterList(filterRes);
    setPositionList(filterRes.slice(0, 5));
    setTotal(filterRes.length);
  }, [jobsData, batchFilterList, categoryFilterList]);
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
  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    const beginIndex = (pageNumber - 1) * 5;
    setPositionList(filterList.slice(beginIndex, beginIndex + 5));
  };
  if (filterData.length === 0) {
    return <Empty description="目前暂未开启新一轮招新，敬请期待！" />;
  }
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
        <Content className={styles.positionListWarp}>
          {positionList.length > 0 ? (
            <>
              {positionList.map((el: Position) => {
                return <PositionItem position={el} key={el.id} />;
              })}
              <Pagination
                className={styles.pagination}
                onChange={onChange}
                pageSize={5}
                total={total}
              />
            </>
          ) : (
            <Empty description="暂无数据" />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export async function getStaticProps() {
  const res1 = await fetch(`${process.env.baseURL}/getJobs`);
  const { data: jobsList }: { [key: string]: Position[] } = await res1.json();
  const jobsData = jobsList.filter(({ status }: Position) => {
    return status;
  });
  const res2 = await fetch(`${process.env.baseURL}/getAllBatch`);
  const { data: batchData } = await res2.json();
  const batch_options = batchData.map(({ name }: any) => {
    return {
      label: name,
      value: name,
    };
  });
  const res3 = await fetch(`${process.env.baseURL}/getAllCategory`);
  const { data: categoryData } = await res3.json();
  const category_options: MultilevelOptionsItem[] = [];
  jobsData.forEach(({ category }: Position) => {
    const { pid } = categoryData.filter(({ name }: any) => {
      return name === category;
    })[0];
    const level1_label = categoryData[pid - 1].name;
    let level1_index = category_options.findIndex(({ label }: any) => {
      return label === level1_label;
    });
    if (level1_index === -1) {
      const level1 = {
        label: level1_label,
        options: [
          {
            label: category,
            value: category,
          },
        ],
      };
      category_options.push(level1);
    } else {
      const level2_index = category_options[level1_index].options.findIndex(
        ({ label }: any) => {
          label === category;
        }
      );
      if (level2_index === -1) {
        const level2 = {
          label: category,
          value: category,
        };
        category_options[level1_index].options.push(level2);
      }
    }
  });
  const filterData = [];
  if (batch_options.length > 0) {
    filterData.push({
      title: "招聘项目",
      options: batch_options,
      multilevel: false,
    });
  }
  if (category_options.length > 0) {
    filterData.push({
      title: "职位类别",
      options: category_options,
      multilevel: true,
    });
  }
  return {
    props: {
      filterData,
      jobsData,
    },
    revalidate: 10,
  };
}
export default Recruitment;
