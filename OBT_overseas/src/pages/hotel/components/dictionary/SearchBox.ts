interface Idictionary {
    languageTxt: string
    destinationTxt: string
    checkInTxt: string
    checkOutTxt: string
    hotelAddressTxt: string
    keyWordsTxt: string
    allTxt: string
    searchTxt: string
}

interface ISearchDic {
    CN: Idictionary
    EN: Idictionary
}

const dictionary = {
    CN: {
        languageTxt: 'English',
        destinationTxt: '入住城市',
        checkInTxt: '入住日期',
        checkOutTxt: '离店日期',
        hotelAddressTxt: '酒店地址',
        keyWordsTxt: '关键字',
        allTxt: '全部',
        searchTxt: '搜索',
    },
    EN: {
        languageTxt: '中文',
        destinationTxt: 'Destination',
        checkInTxt: 'Check In',
        checkOutTxt: 'Check Out',
        hotelAddressTxt: 'Hotel Address',
        keyWordsTxt: 'Key Words',
        allTxt: 'All',
        searchTxt: 'Search',
    },
}

export default dictionary
