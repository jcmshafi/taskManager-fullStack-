
import { Suspense,lazy } from 'react';
import LazyLoader from './../components/masterLayout/LazyLoader';
const Forgetpass =lazy(() => import('../components/Forgetpass/Forgetpass'));

const ForgetpassPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <Forgetpass/>

            </Suspense>
        </div>
    );
};

export default ForgetpassPage;