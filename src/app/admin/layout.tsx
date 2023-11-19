
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
        <div className="layer full-screen atomic-pattern"></div>
        <main className="main max-width gap padding z-20">
            <div className="box center gap">
                <span className="text-3 title">Control Panel</span>
            </div>
            {children}
        </main>
        </>
    )
}
