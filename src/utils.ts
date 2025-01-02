export function random(len:number){
    let options = 'abdndeiofaqwoirekjnf234$%^&*';
    let length = options.length
    let ans=""
    for(let i=0;i<len;i++){
        let result = options[Math.floor(Math.random()*length)]
        ans+=result;
    }
}