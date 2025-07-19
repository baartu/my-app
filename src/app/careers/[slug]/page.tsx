import { notFound } from "next/navigation";
import { getApiUrl, getImageUrl } from "../../lib/config";

type Job = {
  id: number;
  name?: string;
  description?: string;
  requirements?: string;
  responsibilities?: string;
  location?: string;
  type?: string;
  salary?: string;
  image?: string;
  slug?: string;
  publishedAt?: string;
};

async function getJob(slug: string): Promise<Job | null> {
  try {
    const res = await fetch(
      getApiUrl(`/api/careers?filters[slug][$eq]=${slug}&populate=*`),
      { cache: "no-store" }
    );
    const data = await res.json();
    if (data?.data && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error("Job fetch error:", error);
    return null;
  }
}

export async function generateStaticParams() {
  return [];
}

export default async function CareerDetailPage({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug);

  if (!job) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {job.image && (
          <div className="relative h-64">
            <img 
              src={getImageUrl(job.image)} 
              alt={job.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
              <p className="text-gray-600">{job.location}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Type</h3>
              <p className="text-gray-600">{job.type}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Salary</h3>
              <p className="text-gray-600">{job.salary}</p>
            </div>
          </div>

          {job.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>
            </div>
          )}

          {job.requirements && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{job.requirements}</p>
              </div>
            </div>
          )}

          {job.responsibilities && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{job.responsibilities}</p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <a
              href="/careers/apply"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 