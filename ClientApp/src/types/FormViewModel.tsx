import { MovieGenre } from "./Enums/MovieGenre";
import MovieReviewViewModel from "./MovieReviewViewModel";

export default interface FormViewModel {
    Id: number;
    Name: string;
    Description: string;
    Genre: MovieGenre;
    LunchDate: Date;
    Reviews: MovieReviewViewModel[]
}