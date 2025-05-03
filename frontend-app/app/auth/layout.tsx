const layout = ({
    children
}: Readonly<{ children: React.ReactNode }>) => {
    return <div className="flex flex-col items-center justify-center h-screen gap-14">
        <div>
            <h1 className="text-[5rem] font-bold">LOGO</h1>
        </div>
        <div className="flex flex-row gap-5">
            <div className="min-w-[32rem] min-h-[35rem] bg-black/80 hidden md:block rounded-lg"></div>
            <div className="border border-black/40"></div>
            <div className="flex items-center">
                {children}
            </div>
        </div>
    </div>
}

export default layout