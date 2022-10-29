// 接口地址字典枚举
enum Api {
  index = "/back_stage/index/sidebar",
  login = "/login",

  upload_image = '/upload_image',
  userList = '/back_stage/user/list',
  userListAdd = '/back_stage/user/add',
  updateUser = '/back_stage/user/update',
  userdel = '/back_stage/user/delete',
  user_reset = '/back_stage/user/resetpwd',
  user_updatepwd = '/back_stage/user/updatepwd',
  equipment = '/back_stage/equipment/list',
  equipmentAdd = '/back_stage/equipment/add',
  equipmentUpdate = '/back_stage/equipment/update',
  equipmentDelete = '/back_stage/equipment/delete',
  journalList = '/back_stage/journal/list',

  monitorList = '/back_stage/monitor/list',
  alarmList = '/back_stage/alarm/list',
  alarmUpdate='/back_stage/alarm/update',

    // 首页
    indexList='/back_stage/index/list',

    indexEcharts='/back_stage/index/alarmrank',

    indexFirst='/back_stage/index/alarmcnt'
}

export default Api