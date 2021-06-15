const api = {
  //登录
  login: 'http://localhost:9999/api/user/login',

  //注册
  register:"http://localhost:9999/api/user/register",
  
  //获取所有用户信息
  getMonomers:"http://localhost:9999/api/user/getMonomers",

  //删除某个用户
  delMonomer:"http://localhost:9999/api/user/delMonomer",

  //编辑用户信息
  editUsers:"http://localhost:9999/api/user/editUsers",

  //获取已登录用户信息
  getLoginMonomer:"http://localhost:9999/api/user/getLoginMonomer",

  //获取单个用户信息
  getMonomer:"http://localhost:9999/api/user/getMonomer",

  //获取所有书籍数据
  getProjects:"http://localhost:9999/api/project/getProjects",

  //新建书籍
  addProject:"http://localhost:9999/api/project/addProject",

  //删除书籍
  delProject:"http://localhost:9999/api/project/delProject"

}
export default api
