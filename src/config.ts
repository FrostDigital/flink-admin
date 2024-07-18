// @ts-ignore
const _env_ = window._env_ || {};

const config = {
  title: _env_.APPNAME || "Admin",
  api: _env_.APIURL || "http://localhost:3333/managementapi",
};
export default config;
