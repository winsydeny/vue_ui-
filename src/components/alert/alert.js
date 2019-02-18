import Notification from './notification.js'
let messageInstance;
function getMessageInstance () {
    // 是否已经有实例了
    messageInstance = messageInstance || Notification.newInstance();
    return messageInstance;
}
function notice({ duration = 1.5,content = '',type='default'}){
    let instance = getMessageInstance();
    instance.add({
        content:content,
        duration:duration,
        type:type
    })
}
/*export default info*/ 
// export default {
//     info (option) {
//         console.log(option);
//         return notice(option);
//     },
// }

/* export default func */
export default (option) => {
    return notice(option)
}
