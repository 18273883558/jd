import axios from 'axios'

export const post=(url,data={})=>{
  return new Promise((resolve,reject)=>{
    axios.post(url,data,{
      baseURL:'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
      headers:{
          'Content-Type':'application/json'
      }
    }).then((response)=>{
          resolve(response.data)
      },err=>{
          reject(err)
      })
  })
}

// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”即从 pending 变为 resolved），
// 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），
// 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

// then方法可以接受两个回调函数作为参数。
// 第一个回调函数是Promise对象的状态变为resolved时调用，
// 第二个回调函数是Promise对象的状态变为rejected时调用。
// 其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。