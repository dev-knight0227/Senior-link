import Image from 'next/image';
import Img1 from '../../../public/common-area-1.png'
import Img2 from '../../../public/common-area-2.png'

const CommonAreaSection = () => {
  return (
    <section className="pb-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3">
        <h2 className="text-3xl sm:text-4xl font-medium mb-5 text-center sm:text-start">
          Common Areas
        </h2>
        <div className="images flex flex-col md:flex-row gap-8">
          <div className="img">
            <Image src={Img1} alt="Common Area Image 1" />
          </div>
          <div className="img">
            <Image src={Img2} alt="Common Area Image 2" />
          </div>
        </div>
        <div className="info mt-5 font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </div>
    </section>
  );
}

export default CommonAreaSection