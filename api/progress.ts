import request from "@/utils/request";

interface DeliveryJob {
  pid: string;
  sid: string;
}
export function deliveryJob(data: DeliveryJob) {
  return request({
    url: "/api/auth/deliveryJob",
    method: "post",
    data,
  });
}
export function getDeliveredJob(sid: string) {
  return request({
    url: "/api/auth/getDeliveredJob",
    method: "post",
    data: {
      sid,
    },
  });
}
