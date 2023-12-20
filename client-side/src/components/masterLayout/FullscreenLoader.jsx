import {useSelector} from "react-redux";

const FullscreenLoader = () => {
    const loader = useSelector((state) => state.settings.loader)
    return (
        <div>
            <div className={loader+" LoadingOverlay"}>
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </div>
    );
};
export default FullscreenLoader;