import trans from './trans'
import accounts from './accounts';
import {cloneDeep, shuffle} from 'lodash'


export default async (fromLang, to, oldLocales = {}) => {
  const newLocale = cloneDeep(oldLocales)

  const keys = Object.keys(fromLang.locales).filter(key=>!oldLocales[key]);
  let queueCount = 10;
  let count = 0;
  let queueList:string[][] = [];
  keys.forEach((key, index)=>{
    let queueIndex = Math.floor(index / queueCount);
    queueList[queueIndex] = queueList[queueIndex] || [];
    queueList[queueIndex].push(key)
  })

  let accountQueueList: string[][][] = [];
  queueList.forEach((queue, index)=>{
    let accountQueueIndex = index % accounts.length;
    accountQueueList[accountQueueIndex] = accountQueueList[accountQueueIndex] || [];
    accountQueueList[accountQueueIndex].push(queue);
  })

  const tmpAccounts = shuffle(cloneDeep(accounts));

  await Promise.all(accountQueueList.map((queueList, index)=>{
    const account = tmpAccounts[index];
    return queueList.reduce<Promise<any>>((acc, queue)=>{
      return acc.then(()=>{
          return Promise.all(queue.map(key=>{
            if (oldLocales[key]) {
              return new Promise((resolve) => {
                newLocale[key] = oldLocales[key]
                count++;
                console.log(`${to}:${count}/${keys.length}`)
                resolve({});
              })
            } else {
              const query = fromLang.locales[key]
              return trans(query, fromLang.from,to, account).then(result => {
                newLocale[key] = result
                count++;
                console.log(`${to}:${count}/${keys.length}`)
              })
            }
          })).then(()=>{
            return new Promise(resolve=>setTimeout(resolve, 1000))
          })
      })
    }, Promise.resolve())
  }))


  // await queueList.reduce<Promise<any>>((acc, queue)=>{
  //   return acc.then(()=>{
  //       return Promise.all([Promise.all(queue.map(key=>{
  //         if (oldLocales[key]) {
  //           return new Promise((resolve) => {
  //             newLocale[key] = oldLocales[key]
  //             count++;
  //             console.log(`${to}:${count}/${keys.length}`)
  //             resolve({});
  //           })
  //         } else {
  //           const query = cnLocale[key]
  //           const index = Date.now() % accounts.length;
  //           return trans(query, to,accounts[index]).then(result => {
  //             newLocale[key] = result
  //             count++;
  //             console.log(`${to}:${count}/${keys.length}`)
  //           })
  //         }
  //       })), new Promise(resolve=>setTimeout(resolve, 1100))])
  //   })
  // }, Promise.resolve())

  return Object.keys(fromLang.locales).reduce((acc, key)=>{
    acc[key] = newLocale[key];
    return acc;
  }, {})
}