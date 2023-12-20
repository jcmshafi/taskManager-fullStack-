
import MasterLayout from './../components/masterLayout/MasterLayout';
import { Suspense,lazy } from 'react';
import LazyLoader from './../components/masterLayout/LazyLoader';
const Completed =lazy(() => import('../components/Completed/Completed'));
const CompletedPage = () => {
    return (
        <div>
            <MasterLayout>
            <Suspense fallback={<LazyLoader/>}>
            <Completed/>
            </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CompletedPage;