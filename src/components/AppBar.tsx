import useGetProfile from "../api/useGetProfile"

function AppBar() {
    const {data} = useGetProfile();
    console.log(data, 'datadata');
    
    return <div className="bg-plum fixed top-0 left-0 right-0 text-white">
{}
    </div>
}

export default AppBar