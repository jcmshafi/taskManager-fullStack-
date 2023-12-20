
import MasterLayout from './../components/masterLayout/MasterLayout';
import { Suspense,lazy } from 'react';
import LazyLoader from './../components/masterLayout/LazyLoader';

const Canceled = lazy(() => import('../components/Canceled/Canceled'));


const CanceledPage = () => {
    return (
        <div>
            <MasterLayout>
            <Suspense fallback={<LazyLoader/>}>
                <Canceled/>
                
                
            </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CanceledPage;