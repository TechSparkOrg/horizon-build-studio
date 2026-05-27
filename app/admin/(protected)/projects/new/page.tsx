import { Suspense } from "react";
import { ProjectForm } from "../project-form";

export default function NewProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProjectForm />
    </Suspense>
  );
}
