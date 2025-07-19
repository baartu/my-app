import { notFound } from "next/navigation";
import Image from "next/image";
import { getApiUrl, getImageUrl } from "../../lib/config";

type Project = {
  id: number;
  baslik?: string;
  aciklama?: any;
  kisaaciklama?: string;
  kapakGorseli?: { url?: string; name?: string };
  galeri?: { url?: string; name?: string }[];
  teknolojiler?: string;
  slug?: string;
  yayinda?: boolean;
  tarih?: string;
};

async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(
      getApiUrl(`/api/projects?filters[slug][$eq]=${slug}&populate=*`),
      { cache: "no-store" }
    );
    const data = await res.json();
    if (data?.data && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error("Project fetch error:", error);
    return null;
  }
}

async function getAllProjects(): Promise<Project[]> {
  try {
    const res = await fetch(getApiUrl("/api/projects?populate=*"), { cache: "no-store" });
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Projects fetch error:", error);
    return [];
  }
}

export async function generateStaticParams() {
  // Return empty array for static export - pages will be generated on demand
  return [];
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) return notFound();

  const kapakUrl = project.kapakGorseli && project.kapakGorseli.url
    ? getImageUrl(project.kapakGorseli.url)
    : "/images/7.jpg";

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-4xl font-bold mb-4 text-center">{project.baslik}</h1>
      <div className="flex flex-col items-center mb-6">
        <Image
          src={kapakUrl}
          alt={project.baslik || "Project"}
          width={600}
          height={400}
          className="w-full max-w-xl h-64 object-cover rounded-md shadow"
        />
      </div>
      
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Description: </span>
        <span className="text-gray-600">
          {typeof project.aciklama === "string" ? (
            <span>{project.aciklama}</span>
          ) : project.aciklama && Array.isArray(project.aciklama) ? (
            <span>{project.aciklama.map((item: any, i: number) => item.children?.map((c: any, j: number) => <span key={i + '-' + j}>{c.text}</span>))}</span>
          ) : null}
        </span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">Technologies: </span>
        <span className="text-gray-600">{project.teknolojiler}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">Date: </span>
        <span className="text-gray-600">{project.tarih}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">Published: </span>
        <span className="text-gray-600">{project.yayinda ? "Yes" : "No"}</span>
      </div>
      
      {/* Galeri görselleri */}
      {project.galeri && project.galeri.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.galeri.map((image, index) => (
              <Image
                key={index}
                src={getImageUrl(image.url || "")}
                alt={image.name || `Gallery image ${index + 1}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md shadow"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
} 