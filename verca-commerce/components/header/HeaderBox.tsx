const HeaderBox = ({
  type = "title",
  title,
  subtext,
  name,
}: {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  name?: string;
}) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-bankGradient">&nbsp;{name}</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
