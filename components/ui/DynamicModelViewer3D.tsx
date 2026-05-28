import dynamic from "next/dynamic";

export const ModelViewer3D = dynamic(
  () => import("@/components/ui/ModelViewer3D").then((mod) => mod.ModelViewer3D),
  { ssr: false },
);
