class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }  

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i", //case insensitive
            },
        }: {};

        this.query = this.query.find({...keyword});
        return this;
      }

     filter() {
        const queryCopy = {...this.queryString};
        //Removing fields from the query
        const removeFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
        removeFields.forEach(el => delete queryCopy[el]);

        console.log(queryCopy);

        //advance filters for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(this.queryString));
        return this;        
     } 

     pagination(resPerPage) {   
        const currentPage = Number(this.queryString.page) || 1;
        const skip = (currentPage - 1) * resPerPage;
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
     }
}

module.exports = APIFeatures;