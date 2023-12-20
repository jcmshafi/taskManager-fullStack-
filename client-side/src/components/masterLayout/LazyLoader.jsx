

const LazyLoader = () => {
    return (
        <div>
            <div  className="LoadingOverlay">
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </div>
    );
};

export default LazyLoader;