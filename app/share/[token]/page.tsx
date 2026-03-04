import AssessmentResult from "@/components/AssessmentResult";

export default async function SharePage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/share/${token}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Not found");
    }

    const data = await res.json();

    return <AssessmentResult assessment={data} showActions={false} />;
}
