import Link from "next/link";

export interface TagProps {
  /**
   * Tag id
   */
  id: string
  /**
   * Tag name
   */
  name: string
}

export const Tag: React.FC<TagProps> = ({ id, name}) => {
  return (
    <Link href={`/tag/${id}`}>
      <div className="max-w-fit rounded-xl bg-light-accent py-1 px-1 text-light-shades">
        {name}
      </div>
    </Link>
  );
}