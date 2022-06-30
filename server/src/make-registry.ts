import axios from "axios";
import products from "./products.json";

products.forEach(async ({ idx }, i) => {
  setTimeout(() => {
    axios
      .post("https://iot.cleancitynetworks.com/devices/registry", {
        specifications: 0,
        iccId: null,
      })
      .then(({ data }) => {
        console.log(
          `update \`products\` set device_id = ${data.deviceId} where idx = ${idx}`
        );
      });
  }, i * 500);
});
