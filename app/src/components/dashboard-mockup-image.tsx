import Image from "next/image"

export default function DashboardMockupImage() {
    return (
        <div className="p-6">
            <Image src="/dashboard-mockup.png" alt={"Nevo Dashboard"} width={1440} height={900} />
        </div>
    )
}
