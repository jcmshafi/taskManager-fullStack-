
import MasterLayout from './../components/masterLayout/MasterLayout';
import { Suspense,lazy } from 'react';
import LazyLoader from './../components/masterLayout/LazyLoader';
const Progress =lazy(() => import('../components/Progress/Progress'));


const ProgressPage = () => {
    return (
        <div>
            <MasterLayout>
            <Suspense fallback={<LazyLoader/>}>
                <Progress/>

            </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ProgressPage;