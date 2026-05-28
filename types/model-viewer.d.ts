import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src: string;
        alt?: string;
        "auto-rotate"?: boolean;
        "auto-rotate-delay"?: string;
        "rotation-per-second"?: string;
        "camera-controls"?: boolean;
        ar?: boolean;
        loading?: "eager" | "lazy";
        "shadow-intensity"?: string;
        exposure?: string;
        "shadow-softness"?: string;
        "environment-image"?: string;
        slot?: string;
        class?: string;
      };
    }
  }
}
