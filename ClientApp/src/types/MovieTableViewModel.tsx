import { MovieGenre } from "./Enums/MovieGenre";

export default interface MovieTableViewModel {
    Id: number;
    Name: string;
    Description: string;
    Genre: MovieGenre;
    LunchDate: Date;
    Reviews: boolean;
}