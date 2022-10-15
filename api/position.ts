import request from "@/utils/request";

export function getJobs() {
  return request({
    url: "/api/getJobs",
    method: "get",
  });
}

export function getPositionByID(pid: string) {
  return request({
    url: "/api/getPositionByID",
    method: "get",
    params: { pid },
  });
}

export function getJobsByKeyword(keyword: string) {
  return request({
    url: "/api/getJobsByKeyword",
    method: "get",
    params: { keyword },
  });
}

export function getJobsByTags(batch: string) {
  return request({
    url: "/api/getJobsByTags",
    method: "get",
    params: { batch },
  });
}