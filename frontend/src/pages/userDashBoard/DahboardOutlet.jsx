import { Outlet } from "react-router-dom";

const DashboardOutlet = () => {

    return (
        <>
            <div className="w-full h-full rounded-xl shadow-2xl overflow-auto">
                <Outlet/>
            </div>
        </>
    )
}

export default DashboardOutlet;