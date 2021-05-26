export const MapTest = () => {
    const map:any = new Map([
        ['oligai', 'dfff'],
        ['oligai', 'dfff'],
        ['oligfai', 'dfaa'],
    ]) //能通过数组赋值

    console.log(map)
    console.log(map.get('oligai'))
    const set = new Set([1, 2, 3, 4])
    map.set(set, 'jdkf')
    console.log(map)
    for(let key of map.entries()){
        console.log(key)
    }
}
