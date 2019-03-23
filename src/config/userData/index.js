import model from "./model";
import axios from "axios";

const NODE_ENV = process.env.NODE_ENV;

function getValue(url, fn) {
    axios.get(url).then(resp => {
        let data = resp.data;
        if (data.Success) {
            let value = null;
            if (data.Data && data.Data.Value) {
                value = JSON.parse(data.Data.Value);
            }
            fn(value);
        } else {
            throw data.Message;
        }
    });
}

export default [
    {
        key: "General",
        expired: 5 * 60 * 1000,
        remoteFn: () => {
            return new Promise((resolve, reject) => {
                console.log("userData is loading");
                // 生产环境
                if (NODE_ENV === "production") {
                    getValue("/api/config?scope=Map&key=General", value => {
                        resolve(value);
                    });
                } else {
                    resolve(model["General"]);
                }
            });
        },
        meta: {
            desc: "常规设置"
        }
    }
];
