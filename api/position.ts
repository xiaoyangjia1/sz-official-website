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
