import Image from "next/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { comment, user } = review;
  return (
    <div className="card flex flex-col items-center gap-8">
      <div className="comment mx-8 text-center relative mt-20">
        <div className="comma">
          <FaQuoteLeft className="text-green-400 text-3xl absolute -top-8 -left-6 z-10" />
          <FaQuoteRight className="text-green-400 text-3xl absolute -bottom-8 -right-4 md:-bottom-4 md:-right-2 z-10" />
        </div>
        <p>{comment}</p>
      </div>
      <div className="user-info flex gap-4 items-center">
        <div className="img w-16 h-16 rounded-full overflow-hidden border-2 border-green-400 cursor-pointer">
          <Image
            src={user.image}
            alt={user.name}
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>
        <div className="info">
          <h4 className="text-md sm:text-lg mb-1 font-medium">{user.name}</h4>
          <h5 className="text-sm  text-slate-400">{user.profession}</h5>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
