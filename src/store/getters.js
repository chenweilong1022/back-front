const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  host: state => state.app.host,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menus: state => state.user.menus,
  roleId: state => state.user.roleId,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
