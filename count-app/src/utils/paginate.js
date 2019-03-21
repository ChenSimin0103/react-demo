import _ from 'lodash'

// 用于分页功能，将数组items 中以pageSize 大小分割的子数组的第pageNumber项取出来
export function paginate(items, pageNumber, pageSize) {
    // let result = []
    // for(let i = pageNumber*pageSize;i<(pageNumber+1)*pageSize;i++){
    //     result.push(items[i])
    // }
    const startIndex = (pageNumber-1)*pageSize
    return _(items).slice(startIndex).take(pageSize).value()
}