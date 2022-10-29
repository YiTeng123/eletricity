

// 清空表单的函数
export const clearForms = (form: any) => {
       Object.keys(form).forEach((item) => { form[item] = '' })

}
// 表单添加的函数(完整添加)
export const newFormAdd=(formobj:any)=>{
       const formdata=new FormData()
       Object.keys(formobj).forEach((item)=>{
              formdata.append(`${item}`,formobj[item] )
          })
          return formdata
}
// 表单添加的函数(部分添加)
export const newFormAddx=(obj:any,...params:string[]):FormData=>{
       const form=new FormData()
       params.forEach((item)=>{
              form.append(`${item}`,obj[item])
       })
       return form
}

