import { useParams } from "react-router-dom";

const Presentation = () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <iframe
      src={`https://hugonannystory.lovable.app/presentation/${slug}`}
      style={{ width: "100vw", height: "100vh", border: "none", display: "block" }}
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
    />
  );
};

export default Presentation;
