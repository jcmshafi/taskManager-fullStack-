import MasterLayout from "../components/masterLayout/MasterLayout";
import { Suspense,lazy } from 'react';
import LazyLoader from './../components/masterLayout/LazyLoader';
const Create =lazy(() => import('../components/Create/Create'));

const CreatePage = () => {
    return (
        <div>
            <MasterLayout>
            <Suspense fallback={<LazyLoader/>}>
                <Create/>
            </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CreatePage;