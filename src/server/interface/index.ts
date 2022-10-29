// * 请求响应参数(不包含data)
export interface Result {
	resp_code: string;
	msg: string;
	status_code: 200

}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}


/**
 * @name 登录
 */
export type formInterface = {
	account: string
	password: string
}

export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
	export interface ResAuthButtons {
		// 赋值的时候，变量的形状必须和接口的形状保持一致，希望一个接口允许有任意的属性
		[propName: string]: any;
	}
}
/**
 * @name 用户
 */
export interface userObject {
	account: string,
	level: string,
	log: string,
	status: string,
	img: string
}
export interface userRequest extends Result {
	users: userObject[]
}
export interface userListData extends userRequest {
	status_code: 200
}

/**
 * @name 设备
 */
export type equipmentListInter = {
	algorithm: string,
	desc: string,
	equipment_status: string,
	ip_path: string,
	ip_path_copy: string
	name: string
	run_status: string
	uuid: string
}
export type equipmentResponse = Result & {
	equipments: equipmentListInter[]
}

/**
 * @name 日志
 */
export type journalListInter = {
	nickname: string,
	op: string,
	time: string
}
export type journalResponse = Result & {
	journals: journalListInter[]
}
/**
 * @name 监控详情
 */
export type monitorList_interface = {
	ip_path: string,
	name: string,
	uuid: string,
	port:string
}
export type alarms_list = {
	type: string,
	img: string,
	name: string
}
export type equipmentX = {
	人脸识别: monitorList_interface[]
	压板识别: monitorList_interface[]
}

export type monitor_inter = {
	alarms: alarms_list[]
	equipments: equipmentX
}

export type monitorRequest = Result & {
	monitors: monitor_inter
}


/**
 * @name 报警列表
 */
export type alarmlst = Result & {
	img: string,
	level: string,
	name: string,
	status: string,
	time: string,
	type: string,
	uuid: string
}

export type alarmListRequest = Result & {
	alarms: alarmlst[]
}
export type alarmRq = {
	uuid: string,
	status: string
}

export type alarminfoInter={
	level:string
	name:string
	time:string
	type:string
 }

 /**
 * @name 首页
 */
export type equipmentinfoInter={
	AlarmCnt:number
	algorithm:string
	duration_time:string
	last_time:string
	name:string
	untreatCnt:string
}
export type osInter={
	alarmTotalCnt:number
	closeCnt:number
	equipmentCnt:number
	openCnt:number
}
 export interface datainter{
	alarm_info:alarminfoInter[]
	equipment_info:equipmentinfoInter[]
	os_info:osInter
}
export interface indexResponse extends Result{
	data:datainter
	
}



/**
 * @name 侧边栏
 */
export type AsideListItem = {
	icon: string,
	label: string,
	name: string,
	path: string,
	url: string
}
export interface indexDataList {
	AsideList: AsideListItem[]
}
// 描述请求返回值的数据结构，这个数据的结构包含content字段，content字段
// 的value形如indexDataList，为AsideList，是个AsideListItem型的对象数组
export interface AsidelistResdata extends Result {
	content: indexDataList

}
export type sideRes = {
	// sideList是个AsideListItem型的对象数组
	sideList: AsideListItem[]
}

export type asideForm = {
	account: string
	new1: string
	new2: string
}

