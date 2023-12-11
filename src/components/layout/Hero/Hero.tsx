export type HeroProps = {
  /**
   * Header
   */
  header: string
  /**
   * Sub header
   */
  subheader: string
}

export const Hero: React.FC<HeroProps> = ({ header, subheader}) => {
  return (
    <>
      <h1 className="text-dark-shades font-extrabold text-3xl">{header}</h1>
      <p className="text-darkMidGray text-base">{subheader}</p>
    </>
  );
}