
import MasterLayout from './../components/masterLayout/MasterLayout';
import { Suspense,lazy } from 'react';
import LazyLoader from './../components/masterLayout/LazyLoader';
const New =lazy(() => import('../components/New/New'));


const NewPage = () => {
    return (
        <div>
            <MasterLayout>
            <Suspense fallback={<LazyLoader/>}>
                <New/>

            </Suspense>
            </MasterLayout>
        </div>
    );
};

export default NewPage;