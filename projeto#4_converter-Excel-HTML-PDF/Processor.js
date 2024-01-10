class Processor {

    static Process(data){
        const a = data.split("\r\n")
        let rows = []
        a.forEach(row => {
            let arr = row.split(',')
            rows.push(arr)
        })
        return rows
    }
}

export default Processor