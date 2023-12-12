export type HeroProps = {
  /**
   * Title
   */
  title: string
  /**
   * Sub header
   */
  subtitle: string
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="text-dark-shades font-extrabold text-3xl">{title}</h1>
      <p className="text-gray text-base">{subtitle}</p>
    </>
  );
};