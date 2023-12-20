
import MasterLayout from './../components/masterLayout/MasterLayout';
import { Suspense,lazy } from 'react';
import LazyLoader from './../components/masterLayout/LazyLoader';
const Profile =lazy(() => import('../components/Profile/Profile'));


const ProfilePage = () => {
    return (
        <div>
            <MasterLayout>
            <Suspense fallback={<LazyLoader/>}>
                <Profile/>

            </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ProfilePage;