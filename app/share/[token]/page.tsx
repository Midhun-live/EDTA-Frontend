import AssessmentResult from "@/components/AssessmentResult";
import { API_BASE_URL } from "@/lib/api";

async function getData(token: string) {
    const res = await fetch(
        `${API_BASE_URL}/share/${token}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export default async function SharePage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;

    const data = await getData(token);

    if (!data) {
        return (
            <div className="min-h-screen bg-sky-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">Assessment Not Found</h2>
                    <p className="text-slate-500">The share link may be invalid or has expired.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-50 overflow-x-hidden">
            <div className="max-w-7xl mx-auto py-6">
                <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl mt-8">
                    <AssessmentResult assessment={data} showActions={false} />
                </div>
            </div>
        </div>
    );
}
