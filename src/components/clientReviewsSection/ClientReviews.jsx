import ReviewCard from "./reviewCard/ReviewCard";
import { reviews } from "./clientReviesData";
import SliderProvider from "./sliderProvider/SliderProvider";

const ClientReviews = () => {
  return (
    <section className="py-20 bg-slate-200 dark:bg-slate-700 dark:text-slate-100">
      <div className="container mx-auto px-3">
        <h2 className="text-3xl sm:text-4xl font-medium text-center">
          Client Reviews
        </h2>
        <div className="reviews slider-container">
          <SliderProvider>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </SliderProvider>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
