import request from "@/utils/request";
export function getAllBatch() {
    return request({
      url: "/api/getAllBatch",
      method: "get",
    });
  }
  