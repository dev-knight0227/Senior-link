
const PageHeader = ({bgImg,pageTitle}) => {
  return (
    <section
      className="bg-no-repeat bg-cover bg-center bg-"
      style={{
        backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(0,0,0,0.5)),url(${bgImg})`,
      }}
    >
      <div className="container mx-auto px-3 h-[280px] relative">
        <h2 className="text-4xl md:text-5xl text-slate-300 font-medium mb-5 absolute bottom-8">
          {pageTitle}
        </h2>
      </div>
    </section>
  );
}

export default PageHeader