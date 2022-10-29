import { onMounted } from 'vue'

//  定义一个对象接口
type Options = {
    el: string
}
//  类型别名
type Return = {
    Baseurl: string | null
}
export default function (option: Options): Promise<Return> {

    return new Promise((resolve) => {
        onMounted(() => {
            const file: HTMLImageElement = document.querySelector(option.el) as HTMLImageElement;
            // 这里的onload为异步
            file.onload = (): void => {
                resolve({
                    Baseurl: toBase64(file)
                })
            }

        })


        const toBase64 = (el: HTMLImageElement): string => {
            const canvas: HTMLCanvasElement = document.createElement('canvas')
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = el.width
            canvas.height = el.height
            ctx.drawImage(el, 0, 0, canvas.width, canvas.height)
            console.log(el.width);

            return canvas.toDataURL('image/png')

        }
    })


}
function sb(): Promise<string> {
    return new Promise((resolve, reject) => {
        resolve('sdad')
    })
}
sb().then(() => { })
const sbb = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve('sdad')
    })
}

interface ObjQm {
    [index: string]: number
}
let objdemo: ObjQm = {
    name: 424,
    dss: 34
}//定义字符串索引签名---数据结构是对象，对象的value是number类型

interface ArrayAm {
    [index: number]: string
}
let arraydemo: ArrayAm = [
    'dsa', '2313'
]//定义数字索引签名---数据结构是字符串数组

interface ArrayObjAm {
    [index: number]: object
}
let arrayObjdemo: ArrayObjAm = [
    { name: 'dsad' }
]//定义数字索引签名---数据结构是对象数组

interface item {
    name: string;
    age: number
}
interface ikun {
    [index: number]: item
}

let arrayIkun: ikun = [
    { name: '小明', age: 78 }
]//定义数字索引签名---数据结构是特定约束的对象数组

let arrayIkuns:item[]=[
    { name: '小明', age: 78 }
]//另一种写法---数据结构是特定约束的对象数组