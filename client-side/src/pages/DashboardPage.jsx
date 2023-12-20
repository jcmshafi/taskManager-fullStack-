
import { Suspense, lazy } from 'react';
import MasterLayout from './../components/masterLayout/MasterLayout';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Dashboard =lazy(() => import('../components/Dashboard/Dashboard'));

const DashboardPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <Dashboard/>
                 
                
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default DashboardPage;