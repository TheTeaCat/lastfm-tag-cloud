module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/scss/_vars.scss";
        `
      }
    }
  },
};