import axios from 'axios';
var md5 = require("md5");


export default async (query, from, to, account) => {
  const {appid,key, u} = account
  var salt = (new Date).getTime();
  var str1 = appid + query + salt + key;
  var sign = md5(str1)
  const url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(query)}&appid=${appid}&salt=${salt}&from=${from}&to=${to}&sign=${sign}`;
  const res = await axios.get(url)
  // console.log(res.data.trans_result)
  console.log(`[result]: ${JSON.stringify(res.data)} [user]: ${u}`)
  if (res.data.trans_result && res.data.trans_result[0]) {
    if(to === 'jp'){
      return res.data.trans_result[0].dst.replace(/＃.*＃/g,'')
    } 
    return res.data.trans_result[0].dst
  } else {
    console.log({query})
    console.log(res.data);
    
    throw new Error('11')
  }
}