// 格式化时间
import dayjs from 'dayjs'
const date = function (time) {
    const fmtdate = dayjs(time)
    return fmtdate.format('YYYY-MM-DD HH:mm:ss')
}

export default date