import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Presentation = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.location.replace(`https://hugonannystory.lovable.app/presentation/${slug}`);
  }, [slug]);

  return null;
};

export default Presentation;
