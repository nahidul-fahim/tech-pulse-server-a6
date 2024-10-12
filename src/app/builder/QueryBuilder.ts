import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>

    // creating constructor
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    // search method
    search(searchableFields: string[]) {
        const searchTerm = this.query.searchTerm as string;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find(
                {
                    $or: searchableFields.map((field) => (
                        { [field]: { $regex: searchTerm, $options: "i" } }
                    ) as FilterQuery<T>)
                }
            )
        }
        return this;
    }

    // filter method
    filter() {
        const queryObj = { ...this.query };
        const excludedFields = ["searchTerm", "sort", "limit", "page"];
        excludedFields.forEach((field) => delete queryObj[field]);
        // filtering based on isPremium
        if (this.query.isPremium) {
            queryObj["isPremium"] = this.query.isPremium === "true";
        }
        // filtering based on category
        if (this.query.category) {
            queryObj["category"] = { $regex: this.query.category as string, $options: 'i' };
        }
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        return this;
    }

    // sort method
    sort() {
        const sortField = this.query.sort ? this.query.sort as string : '-createdAt';
        this.modelQuery = this.modelQuery.sort(sortField);
        return this;
    }


    // pagination
    paginate() {
        const page = Number(this.query.page);
        const limit = Number(this.query.limit);
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
}

export default QueryBuilder;