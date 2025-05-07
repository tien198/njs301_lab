
module.exports = class Pagination {
    constructor(arr) {
        this.arr = arr
        this._page = 1
    }

    page(_page = 0) {
        this._page = +_page
        return this
    }

    limit(_limit) {
        this._limit = +_limit
        return this
    }

    docsCount() {
        this._totalPage = Math.ceil(this.arr.length / this._limit)

        const page = this._page
        if (page <= 0)
            this._page = 1
        else if (page > this._totalPage)
            this._page = this._totalPage

        const iStart = (this._page - 1) * this._limit
        const iEnd = this._page * this._limit - 1
        const results = this.arr.slice(iStart, iEnd)
        return {
            page: this._page,
            total_pages: this._totalPage,
            results,
        }
    }

    _page
    _limit
    _totalPage
    _currentPage
}
