import MovieReviewViewModel from "./MovieReviewViewModel";

export default interface FormServerModel {
    id?: string
    name: string;
    description: string;
    genre: string;
    lunchDate: Date;
    reviews?: MovieReviewViewModel[]
}