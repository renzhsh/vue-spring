// vue.config.js
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.externals({
        axios: "axios",
        vue: "Vue",
        "vue-router": "vue-router",
        vuex: "vuex"
      });
    }
  }
};
