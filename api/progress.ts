import request from "@/utils/request";
interface DeliveryJob{
    pid: string;
    sid: string;
}
export function deliveryJob(data: DeliveryJob) {
    console.log(data)
    return request({
      url: "/api/auth/deliveryJob",
      method: "post",
      data,
    });
  }