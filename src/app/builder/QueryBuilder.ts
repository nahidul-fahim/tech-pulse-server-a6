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
        const excludedFields = ["searchTerm", "minPricePerHour", "maxPricePerHour"];
        excludedFields.forEach((field) => delete queryObj[field]);

        const priceFilter: Record<string, unknown> = {};
        if (this.query.minPricePerHour) {
            priceFilter.$gte = Number(this.query.minPricePerHour);
        }
        if (this.query.maxPricePerHour) {
            priceFilter.$lte = Number(this.query.maxPricePerHour);
        }
        if (Object.keys(priceFilter).length > 0) {
            queryObj["pricePerHour"] = priceFilter;
        }
        if (this.query.carType) {
            queryObj["carType"] = { $regex: this.query.carType as string, $options: 'i' };
        }

        // finding based on the filters
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

        return this;
    }
}

export default QueryBuilder;