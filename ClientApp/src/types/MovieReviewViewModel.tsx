import FormViewModel from "./FormViewModel";

export default interface MovieReviewViewModel {
    Id: number;
    Rate: number;
    Comment: string;
    CreatedAt: Date;
    MovieId: number;
    Movie: FormViewModel
}