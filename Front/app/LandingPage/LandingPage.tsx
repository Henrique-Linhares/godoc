import { Children } from 'react';
import Button from '../components/Button'
import Header from "./Header"
import { Interface } from 'readline';


interface landingPageProps {
    Header: () => void

}

function LandingPage() {
    return (
        <div className='landing-page-container'>
            <Header />
        </div>
    );
};

export default LandingPage;